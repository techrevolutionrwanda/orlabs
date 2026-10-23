import { createHmac, timingSafeEqual } from "node:crypto";
import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import User from "../models/user.model.js";

const passwordCost = 12;

type AdminSession = {
    role: "admin";
    userId: string;
    name: string;
    issuedAt: string;
    expiresAt: number;
};

function sessionSecret(): string {
    const secret = process.env.PORTAL_SESSION_SECRET;
    if (!secret || secret.length < 32) {
        throw new Error("PORTAL_SESSION_SECRET must be set to at least 32 characters");
    }
    return secret;
}

export async function seedAdminAccount(): Promise<void> {
    sessionSecret();
    const legacyUsers = await User.collection
        .find({ passwordHash: { $exists: false } })
        .toArray();
    for (const legacyUser of legacyUsers) {
        if (
            typeof legacyUser.username !== "string" ||
            typeof legacyUser.password !== "string"
        ) {
            throw new Error("A legacy user record is missing its username or password");
        }

        const passwordHash = await bcrypt.hash(legacyUser.password, passwordCost);
        await User.collection.updateOne(
            { _id: legacyUser._id },
            { $set: { passwordHash }, $unset: { password: "" } },
        );
    }

    if (await User.exists({})) {
        return;
    }

    const username = process.env.ADMIN_USERNAME?.trim();
    const password = process.env.ADMIN_PASSWORD;
    if (!username || !password || password.length < 12) {
        throw new Error("Set ADMIN_USERNAME and an ADMIN_PASSWORD of at least 12 characters");
    }

    const passwordHash = await bcrypt.hash(password, passwordCost);
    await User.create({ username, passwordHash });
    console.log("Seed administrator created");
}

export async function login(req: Request, res: Response) {
    const { username, password } = req.body ?? {};
    if (
        typeof username !== "string" ||
        typeof password !== "string" ||
        username.trim().length === 0 ||
        username.length > 128 ||
        password.length === 0 ||
        password.length > 1024
    ) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        const user = await User.findOne({ username: username.trim() });
        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        return res.status(200).json({
            user: { id: user.id, username: user.username },
        });
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

function decodeAdminSession(token: string | undefined): AdminSession | null {
    if (!token) return null;

    const parts = token.split(".");
    if (parts.length !== 2 || !parts[0] || !parts[1]) return null;

    try {
        const [payload, signature] = parts;
        const expected = createHmac("sha256", sessionSecret()).update(payload).digest();
        const supplied = Buffer.from(signature, "base64url");
        if (
            supplied.length !== expected.length ||
            !timingSafeEqual(supplied, expected)
        ) {
            return null;
        }

        const parsed: unknown = JSON.parse(
            Buffer.from(payload, "base64url").toString("utf8"),
        );
        if (
            typeof parsed !== "object" ||
            parsed === null ||
            !("role" in parsed) ||
            parsed.role !== "admin" ||
            !("userId" in parsed) ||
            typeof parsed.userId !== "string" ||
            !("name" in parsed) ||
            typeof parsed.name !== "string" ||
            !("issuedAt" in parsed) ||
            typeof parsed.issuedAt !== "string" ||
            !("expiresAt" in parsed) ||
            typeof parsed.expiresAt !== "number" ||
            parsed.expiresAt <= Date.now()
        ) {
            return null;
        }

        return {
            role: "admin",
            userId: parsed.userId,
            name: parsed.name,
            issuedAt: parsed.issuedAt,
            expiresAt: parsed.expiresAt,
        };
    } catch {
        return null;
    }
}

async function authenticatedAdmin(req: Request) {
    const authorization = req.get("authorization");
    const token = authorization?.startsWith("Bearer ")
        ? authorization.slice("Bearer ".length)
        : undefined;
    const session = decodeAdminSession(token);
    if (!session || !mongoose.isValidObjectId(session.userId)) {
        return null;
    }

    return User.findById(session.userId);
}

export async function requireAdmin(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const user = await authenticatedAdmin(req);
        if (!user) {
            return res.status(401).json({ message: "Authentication required" });
        }
        return next();
    } catch (error) {
        console.error("Error verifying administrator session:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function getCurrentAdmin(req: Request, res: Response) {
    try {
        const user = await authenticatedAdmin(req);
        if (!user) {
            return res.status(401).json({ message: "Authentication required" });
        }

        return res.status(200).json({
            user: { id: user.id, username: user.username },
        });
    } catch (error) {
        console.error("Error fetching authenticated user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateAdminCredentials(req: Request, res: Response) {
    const { currentPassword, newUsername, newPassword } = req.body ?? {};
    if (
        typeof currentPassword !== "string" ||
        typeof newUsername !== "string" ||
        typeof newPassword !== "string" ||
        currentPassword.length === 0 ||
        newUsername.trim().length < 3 ||
        newUsername.length > 128 ||
        newPassword.length < 12 ||
        newPassword.length > 1024
    ) {
        return res.status(400).json({
            message: "Provide your current password, a username of at least 3 characters, and a new password of at least 12 characters",
        });
    }

    try {
        const user = await authenticatedAdmin(req);
        if (!user) {
            return res.status(401).json({ message: "Authentication required" });
        }

        if (!(await bcrypt.compare(currentPassword, user.passwordHash))) {
            return res.status(401).json({ message: "Current password is incorrect" });
        }

        user.username = newUsername.trim();
        user.passwordHash = await bcrypt.hash(newPassword, passwordCost);
        await user.save();

        return res.status(200).json({
            user: { id: user.id, username: user.username },
        });
    } catch (error) {
        if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === 11000
        ) {
            return res.status(409).json({ message: "That username is already in use" });
        }

        console.error("Error updating administrator credentials:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

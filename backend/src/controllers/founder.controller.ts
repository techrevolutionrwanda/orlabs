import type { Request, Response } from "express";
import mongoose from "mongoose";
import Founder from "../models/founder.model.js";

const founderStatuses = [
    "available",
    "away",
    "partly-booked",
    "fully-booked",
] as const;

const requiredFields = [
    "name",
    "email",
    "phone",
    "jobTitle",
    "location",
    "withUsSince",
] as const;

const allowedFields = new Set([
    ...requiredFields,
    "status",
    "imageUrl",
]);

type FounderInput = {
    name?: string;
    email?: string;
    phone?: string;
    jobTitle?: string;
    location?: string;
    status?: (typeof founderStatuses)[number];
    withUsSince?: Date;
    imageUrl?: string;
};

function parseFounderInput(
    body: unknown,
    partial: boolean,
): { data: FounderInput } | { error: string } {
    if (typeof body !== "object" || body === null || Array.isArray(body)) {
        return { error: "Founder data must be a JSON object" };
    }

    const input = body as Record<string, unknown>;
    const unsupportedFields = Object.keys(input).filter(
        (field) => !allowedFields.has(field),
    );
    if (unsupportedFields.length > 0) {
        return {
            error: `Unsupported founder fields: ${unsupportedFields.join(", ")}`,
        };
    }

    const data: FounderInput = {};
    for (const field of [
        "name",
        "email",
        "phone",
        "jobTitle",
        "location",
    ] as const) {
        const value = input[field];
        if (value === undefined) continue;
        if (typeof value !== "string" || value.trim().length === 0) {
            return { error: `${field} must be a non-empty string` };
        }
        data[field] = value.trim();
    }

    if (input.imageUrl !== undefined) {
        if (typeof input.imageUrl !== "string") {
            return { error: "imageUrl must be a string" };
        }
        data.imageUrl = input.imageUrl.trim();
    }

    if (input.status !== undefined) {
        if (
            typeof input.status !== "string" ||
            !founderStatuses.includes(input.status as (typeof founderStatuses)[number])
        ) {
            return {
                error: `status must be one of: ${founderStatuses.join(", ")}`,
            };
        }
        data.status = input.status as (typeof founderStatuses)[number];
    }

    if (input.withUsSince !== undefined) {
        if (
            typeof input.withUsSince !== "string" ||
            input.withUsSince.trim().length === 0
        ) {
            return { error: "withUsSince must be a valid date string" };
        }

        const withUsSince = new Date(input.withUsSince);
        if (Number.isNaN(withUsSince.getTime())) {
            return { error: "withUsSince must be a valid date string" };
        }
        data.withUsSince = withUsSince;
    }

    if (!partial) {
        const missingField = requiredFields.find(
            (field) => data[field] === undefined,
        );
        if (missingField) {
            return { error: `${missingField} is required` };
        }
    } else if (Object.keys(data).length === 0) {
        return { error: "Provide at least one founder field to update" };
    }

    return { data };
}

function isFounderValidationError(
    error: unknown,
): error is mongoose.Error.ValidationError | mongoose.Error.CastError {
    return (
        error instanceof mongoose.Error.ValidationError ||
        error instanceof mongoose.Error.CastError
    );
}

export async function createFounder(req: Request, res: Response) {
    const parsed = parseFounderInput(req.body, false);
    if ("error" in parsed) {
        return res.status(400).json({ message: parsed.error });
    }

    try {
        const founder = await Founder.create(parsed.data);
        return res.status(201).json(founder);
    } catch (error) {
        if (isFounderValidationError(error)) {
            return res.status(400).json({
                message: "Invalid founder data",
                error: error.message,
            });
        }

        console.error("Error creating founder:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function getAllFounders(_req: Request, res: Response) {
    try {
        const founders = await Founder.find();
        return res.status(200).json(founders);
    } catch (error) {
        console.error("Error fetching founders:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function getPublicFounders(_req: Request, res: Response) {
    try {
        const founders = await Founder.find(
            {},
            { name: 1, jobTitle: 1, imageUrl: 1 },
        ).sort({ name: 1 });
        return res.status(200).json(founders);
    } catch (error) {
        console.error("Error fetching public founders:", error);
        return res.status(500).json({ message: "Unable to load team members" });
    }
}

export async function getFounderById(req: Request, res: Response) {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid founder ID" });
    }

    try {
        const founder = await Founder.findById(id);
        if (!founder) {
            return res.status(404).json({ message: "Founder not found" });
        }

        return res.status(200).json(founder);
    } catch (error) {
        console.error("Error fetching founder:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateFounderById(req: Request, res: Response) {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid founder ID" });
    }

    const parsed = parseFounderInput(req.body, true);
    if ("error" in parsed) {
        return res.status(400).json({ message: parsed.error });
    }

    try {
        const founder = await Founder.findByIdAndUpdate(id, parsed.data, {
            new: true,
            runValidators: true,
        });
        if (!founder) {
            return res.status(404).json({ message: "Founder not found" });
        }

        return res.status(200).json(founder);
    } catch (error) {
        if (isFounderValidationError(error)) {
            return res.status(400).json({
                message: "Invalid founder data",
                error: error.message,
            });
        }

        console.error("Error updating founder:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function deleteFounderById(req: Request, res: Response) {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "Invalid founder ID" });
    }

    try {
        const founder = await Founder.findByIdAndDelete(id);
        if (!founder) {
            return res.status(404).json({ message: "Founder not found" });
        }

        return res.status(200).json({ message: "Founder deleted successfully" });
    } catch (error) {
        console.error("Error deleting founder:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

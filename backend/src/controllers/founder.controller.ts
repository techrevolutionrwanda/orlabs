import type { Request, Response } from "express";
import mongoose from "mongoose";
import Founder from "../models/founder.model.js";

export async function createFounder(req: Request, res: Response) {
    try {
        const founder = await Founder.create(req.body);
        return res.status(201).json(founder);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ message: "Invalid founder data", errors: error.errors });
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

    try {
        const founder = await Founder.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!founder) {
            return res.status(404).json({ message: "Founder not found" });
        }

        return res.status(200).json(founder);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ message: "Invalid founder data", errors: error.errors });
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

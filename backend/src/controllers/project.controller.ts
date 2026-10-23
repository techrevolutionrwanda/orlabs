import type { Request, Response } from "express";
import mongoose from "mongoose";
import Work from "../models/project.model.js";

const requiredFields = [
    "projectName",
    "oneLineSummary",
    "startDate",
    "targetDate",
    "techenologies",
    "projectScreenshotUrl",
] as const;

const allowedFields = new Set([
    ...requiredFields,
    "client",
]);

const clientFields = ["clientName", "role", "companyName"] as const;

type ProjectInput = {
    projectName?: string;
    oneLineSummary?: string;
    startDate?: Date;
    targetDate?: Date;
    techenologies?: string;
    client?: Partial<Record<(typeof clientFields)[number], string>>;
    projectScreenshotUrl?: string;
};

function parseProjectInput(
    body: unknown,
    partial: boolean,
): { data: ProjectInput } | { error: string } {
    if (typeof body !== "object" || body === null || Array.isArray(body)) {
        return { error: "Project data must be a JSON object" };
    }

    const input = body as Record<string, unknown>;
    const unsupportedFields = Object.keys(input).filter(
        (field) => !allowedFields.has(field),
    );
    if (unsupportedFields.length > 0) {
        return {
            error: `Unsupported project fields: ${unsupportedFields.join(", ")}`,
        };
    }

    const data: ProjectInput = {};
    for (const field of [
        "projectName",
        "oneLineSummary",
        "techenologies",
        "projectScreenshotUrl",
    ] as const) {
        const value = input[field];
        if (value === undefined) continue;
        if (typeof value !== "string" || value.trim().length === 0) {
            return { error: `${field} must be a non-empty string` };
        }
        data[field] = value.trim();
    }

    for (const field of ["startDate", "targetDate"] as const) {
        const value = input[field];
        if (value === undefined) continue;
        if (typeof value !== "string" || value.trim().length === 0) {
            return { error: `${field} must be a valid date string` };
        }
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) {
            return { error: `${field} must be a valid date string` };
        }
        data[field] = date;
    }

    if (input.client !== undefined) {
        if (
            typeof input.client !== "object" ||
            input.client === null ||
            Array.isArray(input.client)
        ) {
            return { error: "client must be a JSON object" };
        }

        const clientInput = input.client as Record<string, unknown>;
        const unsupportedClientFields = Object.keys(clientInput).filter(
            (field) => !clientFields.includes(field as (typeof clientFields)[number]),
        );
        if (unsupportedClientFields.length > 0) {
            return {
                error: `Unsupported client fields: ${unsupportedClientFields.join(", ")}`,
            };
        }

        const client: ProjectInput["client"] = {};
        for (const field of clientFields) {
            const value = clientInput[field];
            if (value === undefined) continue;
            if (typeof value !== "string" || value.trim().length === 0) {
                return { error: `client.${field} must be a non-empty string` };
            }
            client[field] = value.trim();
        }

        if (!partial) {
            const missingField = clientFields.find(
                (field) => client[field] === undefined,
            );
            if (missingField) {
                return { error: `client.${missingField} is required` };
            }
        } else if (Object.keys(client).length === 0) {
            return { error: "Provide at least one client field to update" };
        }

        data.client = client;
    }

    if (!partial) {
        const missingField = requiredFields.find(
            (field) => data[field] === undefined,
        );
        if (missingField) {
            return { error: `${missingField} is required` };
        }
        if (data.client === undefined) {
            return { error: "client is required" };
        }
    } else if (Object.keys(data).length === 0) {
        return { error: "Provide at least one project field to update" };
    }

    return { data };
}

function isProjectValidationError(
    error: unknown,
): error is mongoose.Error.ValidationError | mongoose.Error.CastError {
    return (
        error instanceof mongoose.Error.ValidationError ||
        error instanceof mongoose.Error.CastError
    );
}

function isValidProjectId(
    id: string | string[] | undefined,
    res: Response,
): id is string {
    if (typeof id === "string" && mongoose.isValidObjectId(id)) return true;
    res.status(400).json({ message: "Invalid project ID" });
    return false;
}

export async function workCreate(req: Request, res: Response) {
    const parsed = parseProjectInput(req.body, false);
    if ("error" in parsed) {
        return res.status(400).json({ message: parsed.error });
    }

    try {
        const work = await Work.create(parsed.data);
        return res.status(201).json(work);
    } catch (error) {
        if (isProjectValidationError(error)) {
            return res.status(400).json({
                message: "Invalid project data",
                error: error.message,
            });
        }

        console.error("Error creating project:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function getAllWorks(_req: Request, res: Response) {
    try {
        const works = await Work.find();
        return res.status(200).json(works);
    } catch (error) {
        console.error("Error fetching projects:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function getWorkById(req: Request, res: Response) {
    const { id } = req.params;
    if (!isValidProjectId(id, res)) return;

    try {
        const work = await Work.findById(id);
        if (!work) {
            return res.status(404).json({ message: "Project not found" });
        }
        return res.status(200).json(work);
    } catch (error) {
        console.error("Error fetching project:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateWorkById(req: Request, res: Response) {
    const { id } = req.params;
    if (!isValidProjectId(id, res)) return;

    const parsed = parseProjectInput(req.body, true);
    if ("error" in parsed) {
        return res.status(400).json({ message: parsed.error });
    }

    const update: Record<string, unknown> = { ...parsed.data };
    if (parsed.data.client) {
        delete update.client;
        for (const [field, value] of Object.entries(parsed.data.client)) {
            update[`client.${field}`] = value;
        }
    }

    try {
        const work = await Work.findByIdAndUpdate(id, update, {
            new: true,
            runValidators: true,
        });
        if (!work) {
            return res.status(404).json({ message: "Project not found" });
        }
        return res.status(200).json(work);
    } catch (error) {
        if (isProjectValidationError(error)) {
            return res.status(400).json({
                message: "Invalid project data",
                error: error.message,
            });
        }

        console.error("Error updating project:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function deleteWorkById(req: Request, res: Response) {
    const { id } = req.params;
    if (!isValidProjectId(id, res)) return;

    try {
        const work = await Work.findByIdAndDelete(id);
        if (!work) {
            return res.status(404).json({ message: "Project not found" });
        }
        return res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        console.error("Error deleting project:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

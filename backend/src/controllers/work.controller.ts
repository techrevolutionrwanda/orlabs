import Work from "../models/work.model.js";
import type { Request, Response } from "express";


export async function workCreate(req: Request, res: Response) {
    try {
        const { projectName, description, startDate, companyName, role, clientQuote, projectScreenshotUrl } = req.body;

        const newWork = new Work({
            projectName,
            description,
            startDate,
            companyName,
            role,
            clientQuote,
            projectScreenshotUrl
        });

        const savedWork = await newWork.save();
        res.status(201).json(savedWork);
    } catch (error) {
        res.status(500).json({ message: 'Error creating work entry', error });
    }
};


export async function getAllWorks(req: Request, res: Response) {
    try {
        const works = await Work.find();
        res.status(200).json(works);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching work entries', error });
    }
}

export async function getWorkById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const work = await Work.findById(id);
        if (!work) {
            return res.status(404).json({ message: 'Work entry not found' });
        }
        res.status(200).json(work);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching work entry', error });
    }
}

export async function updateWorkById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const updatedWork = await Work.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedWork) {
            return res.status(404).json({ message: 'Work entry not found' });
        }
        res.status(200).json(updatedWork);
    } catch (error) {
        res.status(500).json({ message: 'Error updating work entry', error });
    }
};

export async function deleteWorkById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const deletedWork = await Work.findByIdAndDelete(id);
        if (!deletedWork) {
            return res.status(404).json({ message: 'Work entry not found' });
        }
        res.status(200).json({ message: 'Work entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting work entry', error });
    }
};

import TrustedBy from '../models/trustedBy.model.js';
import type { Request, Response } from 'express';

export default async function createTrustedBy(req: Request, res: Response) {
  try {
    const { name, logoUrl } = req.body;

    // Create a new TrustedBy document
    const trustedBy = new TrustedBy({ name, logoUrl });
    await trustedBy.save();

    res.status(201).json(trustedBy);
  } catch (error) {
    console.error('Error creating TrustedBy:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export async function getTrustedBy(req: Request, res: Response) {
  try {
    const trustedByList = await TrustedBy.find();
    res.status(200).json(trustedByList);
  } catch (error) {
    console.error('Error fetching TrustedBy:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


export async function DeleteTrustedBy(req: Request, res: Response) {
  try {
    const { id } = req.params;

    // Find and delete the TrustedBy document by ID
    const deletedTrustedBy = await TrustedBy.findByIdAndDelete(id);

    if (!deletedTrustedBy) {
      return res.status(404).json({ message: 'TrustedBy not found' });
    }

    res.status(200).json({ message: 'TrustedBy deleted successfully' });
  } catch (error) {
    console.error('Error deleting TrustedBy:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
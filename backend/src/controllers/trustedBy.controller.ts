import TrustedBy from '../models/trustedBy.model.js';
import type { Request, Response } from 'express';
import mongoose from 'mongoose';

function validTrustedByBody(body: unknown): body is { name: string; logoUrl: string } {
  if (typeof body !== 'object' || body === null) return false;
  if (!('name' in body) || typeof body.name !== 'string' || !body.name.trim()) return false;
  if (!('logoUrl' in body) || typeof body.logoUrl !== 'string' || !body.logoUrl.trim()) return false;
  return true;
}

export async function createTrustedBy(req: Request, res: Response) {
  try {
    if (!validTrustedByBody(req.body)) {
      return res.status(400).json({ message: 'Name and logoUrl are required strings' });
    }

    const trustedBy = await TrustedBy.create({
      name: req.body.name.trim(),
      logoUrl: req.body.logoUrl.trim(),
    });
    return res.status(201).json(trustedBy);
  } catch (error) {
    console.error('Error creating TrustedBy:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


export async function getTrustedBy(_req: Request, res: Response) {
  try {
    const trustedByList = await TrustedBy.find();
    return res.status(200).json(trustedByList);
  } catch (error) {
    console.error('Error fetching TrustedBy:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function updateTrustedBy(req: Request, res: Response) {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid TrustedBy ID' });
  }
  if (!validTrustedByBody(req.body)) {
    return res.status(400).json({ message: 'Name and logoUrl are required strings' });
  }

  try {
    const trustedBy = await TrustedBy.findByIdAndUpdate(
      id,
      { name: req.body.name.trim(), logoUrl: req.body.logoUrl.trim() },
      { new: true, runValidators: true },
    );
    if (!trustedBy) {
      return res.status(404).json({ message: 'TrustedBy entry not found' });
    }
    return res.status(200).json(trustedBy);
  } catch (error) {
    console.error('Error updating TrustedBy:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

export async function deleteTrustedBy(req: Request, res: Response) {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: 'Invalid TrustedBy ID' });
  }

  try {
    const deletedTrustedBy = await TrustedBy.findByIdAndDelete(id);
    if (!deletedTrustedBy) {
      return res.status(404).json({ message: 'TrustedBy entry not found' });
    }

    return res.status(200).json({ message: 'TrustedBy entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting TrustedBy:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
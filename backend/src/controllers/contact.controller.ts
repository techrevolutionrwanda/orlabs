import type { Request, Response } from "express";
import mongoose from "mongoose";
import Contact from "../models/contact.model.js";

const requiredFields = ["name", "email", "service", "message"] as const;

export async function createContact(req: Request, res: Response) {
  const body: unknown = req.body;
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return res.status(400).json({ message: "Contact data must be a JSON object" });
  }

  const input = body as Record<string, unknown>;
  if (
    typeof input.company_website === "string" &&
    input.company_website.trim().length > 0
  ) {
    return res.status(201).json({ message: "Contact request received" });
  }

  const data: Record<string, string> = {};
  for (const field of [...requiredFields, "company"] as const) {
    const value = input[field];
    if (field === "company" && value === undefined) {
      data.company = "";
      continue;
    }
    if (typeof value !== "string") {
      return res.status(400).json({ message: `${field} must be a string` });
    }
    const trimmed = value.trim();
    if (requiredFields.includes(field as (typeof requiredFields)[number]) && !trimmed) {
      return res.status(400).json({ message: `${field} is required` });
    }
    if (trimmed.length > (field === "message" ? 5000 : 200)) {
      return res.status(400).json({ message: `${field} is too long` });
    }
    data[field] = trimmed;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return res.status(400).json({ message: "Provide a valid email address" });
  }

  try {
    const contact = await Contact.create(data);
    return res.status(201).json({ message: "Contact request received", id: contact.id });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ message: "Invalid contact data" });
    }
    console.error("Error creating contact:", error);
    return res.status(500).json({ message: "Unable to save contact request" });
  }
}

export async function getContacts(_req: Request, res: Response) {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return res.status(500).json({ message: "Unable to load contacts" });
  }
}

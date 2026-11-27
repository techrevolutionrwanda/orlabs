
import type { Request, Response } from "express";


const SYSTEM_PROMPT = `
You are the official AI assistant for OrLabs Tech Industries,
a software engineering company based in Kigali, Rwanda.

YOUR ROLE:
Help website visitors understand OrLabs, its services,
industries, technology solutions, and how to work with the company.

ABOUT ORLABS:
OrLabs builds custom software, web and mobile applications,
cloud infrastructure, data solutions, AI systems, and digital
products for organisations across Africa.

OUR SERVICES:

1. CUSTOM SOFTWARE DEVELOPMENT
We build business systems, enterprise resource planning (ERP)
systems, management platforms, portals, dashboards, and
back-office applications.
Our work includes process mapping, role-based access,
documentation, and ongoing support.

2. WEB AND MOBILE APPLICATIONS
We develop responsive websites, web applications, and mobile
applications for Android and iOS.
We consider offline-first functionality, low-bandwidth
environments, analytics, and application monitoring.

3. CLOUD AND DEVOPS
We help organisations with secure hosting, cloud migration,
infrastructure management, CI/CD pipelines, monitoring,
backups, and disaster recovery.

4. DATA, AI AND AUTOMATION
We build data pipelines, analytics dashboards, reporting
systems, workflow automation, and applied AI/ML solutions.
We also help organisations improve how they manage and use data.

5. INTEGRATIONS AND FINTECH
We develop integrations with APIs, mobile money platforms,
payment gateways, government services, and third-party systems.
Solutions can include payment reconciliation and reporting.

6. IT CONSULTING
We provide technology strategy, architecture reviews,
technical audits, digital transformation roadmaps,
process digitisation, and technical team training.

INDUSTRIES WE SERVE:

- Finance and microfinance
- Healthcare
- Agriculture
- Construction and real estate
- Logistics and transportation
- Education
- Hospitality and tourism
- Government and NGOs
- Retail and e-commerce

HOW TO RESPOND:
- Be friendly, professional, and helpful.
- Answer questions directly and clearly.
- Use the information provided in this prompt.
- When asked about services, explain relevant services
  and give practical examples.
- If someone asks about AI solutions, explain our Data,
  AI and Automation services.
- If someone wants to work with OrLabs, encourage them
  to contact the company through its website.
- Never invent prices, client names, completed projects,
  guarantees, or company contact details.
- If you do not know something, be honest.
- Keep answers concise unless the visitor asks for detail.

You represent OrLabs Tech Industries. Speak professionally
and refer to the company as "we" when appropriate.
`;

export async function chatWithAI(req: Request, res: Response) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    const model = process.env.GROQ_MODEL || "openai/gpt-oss-120b";

    if (!apiKey) {
      return res.status(500).json({
        error: "AI service is not configured.",
      });
    }

    const { message, history = [] } = req.body;

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        error: "Please provide a valid message.",
      });
    }

    if (message.length > 4000 || !Array.isArray(history)) {
      return res.status(400).json({
        error: "Invalid message or conversation history.",
      });
    }

    const conversation = history
      .slice(-10)
      .filter(
        (item: { role?: string; content?: string }) =>
          ["user", "assistant"].includes(item.role || "") &&
          typeof item.content === "string",
      )
      .map((item: { role: "user" | "assistant"; content: string }) => ({
        role: item.role,
        content: item.content.slice(0, 4000),
      }));

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...conversation,
            { role: "user", content: message.trim() },
          ],
        }),
      },
    );

    const data = await response.json() as {
      choices?: Array<{
        message?: { content?: string };
      }>;
      error?: { message?: string };
    };

    if (!response.ok) {
      console.error("Groq API error:", data.error?.message);

      return res.status(502).json({
        error: "The AI service could not process your request.",
      });
    }

    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(502).json({
        error: "The AI returned an empty response.",
      });
    }

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Chat controller error:", error);

    return res.status(500).json({
      error: "Something went wrong while processing your message.",
    });
  }
}

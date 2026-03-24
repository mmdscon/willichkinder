import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot check
    if (body.hp) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const { name, email, phone, situation, duration, approach } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Fehlende Pflichtfelder" },
        { status: 422 }
      );
    }

    // ── Option A: Send via email (nodemailer) ──
    // Install: npm install nodemailer @types/nodemailer
    // Uncomment and configure:
    //
    // const nodemailer = require('nodemailer');
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: Number(process.env.SMTP_PORT) || 587,
    //   auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    // });
    // await transporter.sendMail({
    //   from: process.env.SMTP_FROM,
    //   to: process.env.LEAD_EMAIL || "mail@madeleine-massmann.com",
    //   subject: `Neue Anfrage: ${name}`,
    //   html: `
    //     <h2>Neue Coaching-Anfrage</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>E-Mail:</strong> ${email}</p>
    //     <p><strong>Telefon:</strong> ${phone}</p>
    //     <p><strong>Situation:</strong> ${situation}</p>
    //     <p><strong>Dauer:</strong> ${duration}</p>
    //     <p><strong>Trägt Frage:</strong> ${approach}</p>
    //   `,
    // });

    // ── Option B: Forward to webhook (e.g. Make.com / Zapier) ──
    // const webhookUrl = process.env.WEBHOOK_URL;
    // if (webhookUrl) {
    //   await fetch(webhookUrl, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ name, email, phone, situation, duration, approach }),
    //   });
    // }

    // Log for development
    console.log("Lead received:", { name, email, phone, situation, duration, approach });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Lead API error:", err);
    return NextResponse.json({ error: "Interner Fehler" }, { status: 500 });
  }
}

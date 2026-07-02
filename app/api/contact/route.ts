import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { siteConfig } from "@/data/site-config";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || siteConfig.email;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Contact form is not configured yet." },
      { status: 503 }
    );
  }

  const body = await request.json();
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const { name, email, company, message } = parsed.data;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: `Portfolio Contact Form <onboarding@resend.dev>`,
    to: toEmail,
    replyTo: email,
    subject: `New portfolio inquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || "—"}\n\n${message}`,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

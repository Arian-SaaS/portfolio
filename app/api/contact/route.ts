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
  /*
   * Resend will only accept a `from` on a domain you have verified with them.
   * The fallback is their shared sandbox sender, which works without any setup
   * but can only ever deliver to the address that owns the Resend account, and
   * is filtered hard by everyone else. Set CONTACT_FROM_EMAIL to something on
   * a verified domain before this is worth pointing real visitors at.
   */
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

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
    from: `Portfolio Contact Form <${fromEmail}>`,
    to: toEmail,
    replyTo: email,
    subject: `New portfolio inquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || "—"}\n\n${message}`,
  });

  if (error) {
    // Logged, not swallowed: a rejected send is nearly always a from-address
    // Resend has not verified, and without this the only symptom is a generic
    // 502 on the client with nothing in the deployment logs to act on.
    console.error("contact: resend rejected the send", error);
    return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { choice } = await req.json();

    if (choice !== "yes" && choice !== "no") {
      return NextResponse.json({ error: "Invalid choice" }, { status: 400 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    const notifyEmail = process.env.NOTIFY_EMAIL;
    const fromEmail = process.env.FROM_EMAIL;

    if (!resendKey || !notifyEmail || !fromEmail) {
      console.error("Missing env vars:", {
        hasResendKey: !!resendKey,
        hasNotifyEmail: !!notifyEmail,
        hasFromEmail: !!fromEmail,
      });

      return NextResponse.json(
        { error: "Missing environment variables" },
        { status: 500 }
      );
    }

    const resend = new Resend(resendKey);

    await resend.emails.send({
      from: fromEmail,
      to: notifyEmail,
      subject: `Taran selected: ${choice.toUpperCase()}`,
      html: `
        <div style="font-family:Arial,sans-serif;padding:24px">
          <h2>Apology Website Response</h2>
          <p><strong>Choice:</strong> ${choice.toUpperCase()}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Email send failed:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
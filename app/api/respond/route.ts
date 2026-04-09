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

    console.log("ENV CHECK:", {
      hasResendKey: !!resendKey,
      hasNotifyEmail: !!notifyEmail,
      hasFromEmail: !!fromEmail,
      notifyEmail,
      fromEmail,
    });

    if (!resendKey || !notifyEmail || !fromEmail) {
      return NextResponse.json(
        { error: "Missing environment variables" },
        { status: 500 }
      );
    }

    const resend = new Resend(resendKey);

    const result = await resend.emails.send({
      from: fromEmail,
      to: [notifyEmail],
      subject: `Taran selected: ${choice.toUpperCase()}`,
      html: `
        <div style="font-family:Arial,sans-serif;padding:24px">
          <h2>Apology Website Response</h2>
          <p><strong>Choice:</strong> ${choice.toUpperCase()}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `,
    });

    console.log("RESEND RESULT:", JSON.stringify(result, null, 2));

    if (result.error) {
      return NextResponse.json(
        { error: result.error.message || "Resend send failed", details: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, data: result.data });
  } catch (error) {
    console.error("ROUTE ERROR:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
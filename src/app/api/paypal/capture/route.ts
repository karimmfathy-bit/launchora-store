import { NextRequest, NextResponse } from "next/server";
import { sendReceiptEmail } from "@/lib/email";

const PAYPAL_BASE =
  process.env.PAYPAL_MODE === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";

async function getPayPalAccessToken(): Promise<string> {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !secret) {
    throw new Error("PayPal credentials not configured");
  }

  const credentials = Buffer.from(`${clientId}:${secret}`).toString("base64");
  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) throw new Error("Failed to get PayPal access token");
  const data = await res.json();
  return data.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const { orderID, email, name } = await req.json();

    if (!orderID) {
      return NextResponse.json({ error: "Missing orderID" }, { status: 400 });
    }

    // Capture the PayPal order
    const token = await getPayPalAccessToken();
    const captureRes = await fetch(
      `${PAYPAL_BASE}/v2/checkout/orders/${orderID}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!captureRes.ok) {
      const err = await captureRes.json();
      console.error("PayPal capture error:", err);
      return NextResponse.json(
        { error: "Payment capture failed" },
        { status: 400 }
      );
    }

    const captureData = await captureRes.json();
    const capture =
      captureData.purchase_units?.[0]?.payments?.captures?.[0];
    const captureId = capture?.id || orderID;
    const payerEmail =
      captureData.payer?.email_address || email || "";
    const payerName =
      `${captureData.payer?.name?.given_name || ""} ${captureData.payer?.name?.surname || ""}`.trim() ||
      name ||
      "Valued Customer";

    // Send receipt email
    if (payerEmail) {
      await sendReceiptEmail(
        payerEmail,
        payerName,
        "The AI Business Launch System",
        197,
        captureId
      );
    }

    return NextResponse.json({
      success: true,
      captureId,
      email: payerEmail,
    });
  } catch (err: any) {
    console.error("Capture route error:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}

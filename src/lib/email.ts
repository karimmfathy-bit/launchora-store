import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const PDF_URL = process.env.PDF_DOWNLOAD_URL || "#";
const FROM_EMAIL = "AI Business OS <onboarding@resend.dev>";

export async function sendReceiptEmail(
  toEmail: string,
  customerName: string,
  productName: string,
  amount: number,
  orderId: string
) {
  const formattedAmount = `$${(amount).toFixed(2)}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Purchase — ${productName}</title>
</head>
<body style="margin:0;padding:0;background:#080810;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#080810;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding:32px;background:#0E0E1A;border-radius:20px 20px 0 0;border:1px solid rgba(255,255,255,0.07);border-bottom:none;text-align:center;">
              <div style="display:inline-flex;align-items:center;gap:8px;margin-bottom:8px;">
                <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#6366F1;"></span>
                <span style="font-family:Arial,sans-serif;font-weight:800;font-size:18px;color:#F0F0FF;letter-spacing:-0.02em;">AI Business OS</span>
              </div>
              <div style="width:60px;height:60px;background:rgba(99,102,241,0.15);border:1px solid rgba(99,102,241,0.3);border-radius:50%;margin:20px auto 16px;display:flex;align-items:center;justify-content:center;">
                <span style="font-size:28px;">✅</span>
              </div>
              <h1 style="margin:0 0 8px;font-size:26px;font-weight:800;color:#F0F0FF;letter-spacing:-0.02em;">Payment Confirmed!</h1>
              <p style="margin:0;color:#8B8BA8;font-size:15px;">Thank you, ${customerName || "friend"}. Your order is complete.</p>
            </td>
          </tr>

          <!-- Order Details -->
          <tr>
            <td style="padding:0 32px;background:#0E0E1A;border:1px solid rgba(255,255,255,0.07);border-top:none;border-bottom:none;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#13131F;border-radius:16px;border:1px solid rgba(255,255,255,0.07);margin:16px 0;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 16px;font-size:12px;color:#4A4A6A;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">Order Summary</p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:8px 0;color:#F0F0FF;font-size:15px;font-weight:600;">${productName}</td>
                        <td style="padding:8px 0;color:#6366F1;font-size:15px;font-weight:800;text-align:right;">${formattedAmount}</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="border-top:1px solid rgba(255,255,255,0.07);padding-top:12px;margin-top:8px;"></td>
                      </tr>
                      <tr>
                        <td style="padding:4px 0;color:#8B8BA8;font-size:13px;">Order ID</td>
                        <td style="padding:4px 0;color:#8B8BA8;font-size:13px;text-align:right;font-family:monospace;">${orderId}</td>
                      </tr>
                      <tr>
                        <td style="padding:4px 0;color:#8B8BA8;font-size:13px;">Payment Method</td>
                        <td style="padding:4px 0;color:#8B8BA8;font-size:13px;text-align:right;">PayPal</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Download CTA -->
          <tr>
            <td style="padding:0 32px 32px;background:#0E0E1A;border-radius:0 0 20px 20px;border:1px solid rgba(255,255,255,0.07);border-top:none;">
              <p style="color:#8B8BA8;font-size:15px;line-height:1.7;margin:0 0 24px;">
                Your digital product is ready. Click the button below to access your PDF — bookmark it or save it somewhere safe.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${PDF_URL}" target="_blank"
                      style="display:inline-block;padding:16px 40px;background:#F5A623;color:#000;font-weight:700;font-size:16px;border-radius:12px;text-decoration:none;letter-spacing:-0.01em;">
                      📄 Download Your PDF →
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:20px 0 0;font-size:13px;color:#4A4A6A;text-align:center;">
                Link not working? Copy and paste this URL:<br />
                <span style="color:#6366F1;word-break:break-all;">${PDF_URL}</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 0;text-align:center;">
              <p style="margin:0 0 8px;color:#4A4A6A;font-size:13px;">Questions? Email us at <a href="mailto:hello@aibusinessos.com" style="color:#6366F1;">hello@aibusinessos.com</a></p>
              <p style="margin:0;color:#4A4A6A;font-size:12px;">© 2026 AI Business OS. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  return resend.emails.send({
    from: FROM_EMAIL,
    to: [toEmail],
    subject: `✅ Your purchase is confirmed — ${productName}`,
    html,
  });
}

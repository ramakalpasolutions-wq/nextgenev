import nodemailer from "nodemailer";

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

const adminEmailTemplate = (data) => `
  <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background: #f8f9fa; }
        .container { max-width: 650px; margin: 0 auto; padding: 20px; }
        .card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #4ADE80 0%, #22c55e 100%); padding: 30px 24px; text-align: center; }
        .header h1 { margin: 0; color: white; font-size: 28px; font-weight: 700; }
        .content { padding: 32px 24px; }
        .field { margin-bottom: 24px; }
        .field-label { display: block; font-size: 12px; font-weight: 700; color: #4ADE80; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
        .field-value { font-size: 15px; color: #1f2937; font-weight: 500; }
        .divider { height: 1px; background: #e5e7eb; margin: 24px 0; }
        .message-box { background: linear-gradient(135deg, #f0fdf4 0%, #f0fdfa 100%); border-left: 4px solid #4ADE80; padding: 16px; border-radius: 8px; }
        .message-label { display: block; font-size: 12px; font-weight: 700; color: #4ADE80; text-transform: uppercase; margin-bottom: 12px; }
        .message-text { font-size: 14px; color: #374151; line-height: 1.6; white-space: pre-wrap; }
        .footer { background: #f9fafb; padding: 20px 24px; text-align: center; border-top: 1px solid #e5e7eb; }
        .footer-text { margin: 0; font-size: 12px; color: #6b7280; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        @media (max-width: 600px) {
          .info-grid { grid-template-columns: 1fr; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <div class="header">
            <h1>🚗 New Dealership Request</h1>
            <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">NextGen EV</p>
          </div>
          <div class="content">
            <div class="info-grid">
              <div class="field">
                <span class="field-label">Name</span>
                <div class="field-value">${data.name}</div>
              </div>
              <div class="field">
                <span class="field-label">Location</span>
                <div class="field-value">${data.location}</div>
              </div>
            </div>
            <div class="field">
              <span class="field-label">Email</span>
              <div class="field-value">${data.email}</div>
            </div>
            <div class="field">
              <span class="field-label">Phone</span>
              <div class="field-value">${data.phone}</div>
            </div>
            <div class="divider"></div>
            <div class="message-box">
              <span class="message-label">📝 Message</span>
              <p class="message-text">${data.message || '(No message)'}</p>
            </div>
          </div>
          <div class="footer">
            <p class="footer-text">Reply-To: ${data.email}</p>
          </div>
        </div>
      </div>
    </body>
  </html>
`;

const customerEmailTemplate = (data) => `
  <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background: #f8f9fa; }
        .container { max-width: 650px; margin: 0 auto; padding: 20px; }
        .card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #4ADE80 0%, #22c55e 100%); padding: 40px 24px; text-align: center; }
        .header h1 { margin: 0; color: white; font-size: 28px; font-weight: 700; }
        .content { padding: 32px 24px; text-align: center; }
        .greeting { font-size: 16px; color: #1f2937; margin-bottom: 16px; font-weight: 500; }
        .message-text { font-size: 14px; color: #6b7280; line-height: 1.7; margin-bottom: 32px; }
        .footer { background: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <div class="header">
            <h1>Dealership Request Received!</h1>
          </div>
          <div class="content">
            <p class="greeting">Hi <strong>${data.name}</strong>,</p>
            <p class="message-text">Thank you for your interest in becoming a NextGen EV dealer! We've received your inquiry and will contact you within 24-48 hours.</p>
          </div>
          <div class="footer">
            <p style="margin: 0; font-size: 13px; color: #6b7280;"><strong>Email:</strong> dealership@nextgeneev.com</p>
            <p style="margin: 8px 0 0 0; font-size: 13px; color: #6b7280;"><strong>Phone:</strong> +91 9876543210</p>
          </div>
        </div>
      </div>
    </body>
  </html>
`;

export async function POST(request) {
  try {
    const { name, phone, email, location, message } = await request.json();

    if (!name || !phone || !email || !location) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error("Email credentials not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const transporter = createTransporter();

    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error("SMTP verification failed:", verifyError.message);
      return new Response(
        JSON.stringify({ error: "Email authentication failed" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      replyTo: email,
      subject: `[NextGen EV] New Dealership Request from ${name}`,
      html: adminEmailTemplate({ name, phone, email, location, message }),
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "✓ Dealership Request Received - NextGen EV",
      html: customerEmailTemplate({ name, phone, email, location, message }),
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Dealership request submitted successfully",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("API Error:", error.message);
    return new Response(
      JSON.stringify({ error: "Failed to submit request" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET() {
  return new Response(
    JSON.stringify({ error: "Method not allowed" }),
    { status: 405, headers: { "Content-Type": "application/json" } }
  );
}

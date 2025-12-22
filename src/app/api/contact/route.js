import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    // Validate fields
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Verify env vars exist
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error("❌ Email credentials not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create Gmail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Test connection
    try {
      await transporter.verify();
      console.log("✓ SMTP connection verified");
    } catch (verifyError) {
      console.error("❌ SMTP verification failed:", verifyError.message);
      return new Response(
        JSON.stringify({ error: "Email authentication failed" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Email to admin
    const adminMailOptions = {
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_USER,
  replyTo: email,
  subject: `[NextGen EV] New Contact: ${subject}`,
  html: `
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background: #f8f9fa; }
          .container { max-width: 650px; margin: 0 auto; padding: 20px; }
          .card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #4ADE80 0%, #22c55e 100%); padding: 30px 24px; text-align: center; }
          .header h1 { margin: 0; color: white; font-size: 28px; font-weight: 700; }
          .header p { margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px; }
          .content { padding: 32px 24px; }
          .field { margin-bottom: 24px; }
          .field-label { display: block; font-size: 12px; font-weight: 700; color: #4ADE80; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
          .field-value { font-size: 15px; color: #1f2937; font-weight: 500; }
          .field-value a { color: #000803ff; text-decoration: none; }
          .field-value a:hover { text-decoration: underline; }
          .divider { height: 1px; background: #e5e7eb; margin: 24px 0; }
          .message-box { background: linear-gradient(135deg, #f0fdf4 0%, #f0fdfa 100%); border-left: 4px solid #4ADE80; padding: 16px; border-radius: 8px; margin-top: 16px; }
          .message-label { display: block; font-size: 12px; font-weight: 700; color: #4ADE80; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; }
          .message-text { font-size: 14px; color: #374151; line-height: 1.6; white-space: pre-wrap; word-wrap: break-word; }
          .footer { background: #f9fafb; padding: 20px 24px; text-align: center; border-top: 1px solid #e5e7eb; }
          .footer-text { margin: 0; font-size: 12px; color: #6b7280; }
          .badge { display: inline-block; background: #4ADE80; color: white; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-top: 12px; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
          @media (max-width: 600px) {
            .container { padding: 12px; }
            .content { padding: 20px 16px; }
            .info-grid { grid-template-columns: 1fr; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="card">
            <div class="header">
              <h1>New Contact Message</h1>
              <p>NextGen EV Contact Form Submission</p>
            </div>
            
            <div class="content">
              <div class="info-grid">
                <div class="field">
                  <span class="field-label">Sender Name</span>
                  <div class="field-value">${name}</div>
                </div>
                <div class="field">
                  <span class="field-label">Subject</span>
                  <div class="field-value">${subject}</div>
                </div>
              </div>
              
              <div class="field">
                <span class="field-label">Email Address</span>
                <div class="field-value"><a href="mailto:${email}">${email}</a></div>
              </div>

              <div class="field">
                <span class="field-label">Phone Number</span>
                <div class="field-value">${phone || '—'}</div>
              </div>

              <div class="divider"></div>

              <div class="message-box">
                <span class="message-label">📝 Message</span>
                <p class="message-text">${message}</p>
              </div>
            </div>

            <div class="footer">
              <p class="footer-text">📧 This is a notification from NextGen EV Contact Form</p>
              <p class="footer-text">Reply-To: ${email}</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `,
};

const adminResult = await transporter.sendMail(adminMailOptions);
console.log("✓ Admin email sent:", adminResult.messageId);

// Email to user (confirmation)
const userMailOptions = {
  from: process.env.EMAIL_USER,
  to: email,
  subject: "✓ Message Received - NextGen EV",
  html: `
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background: #f8f9fa; }
          .container { max-width: 650px; margin: 0 auto; padding: 20px; }
          .card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #4ADE80 0%, #22c55e 100%); padding: 40px 24px; text-align: center; }
          .header h1 { margin: 0; color: white; font-size: 28px; font-weight: 700; }
          .header .checkmark { font-size: 48px; margin-bottom: 12px; }
          .content { padding: 32px 24px; text-align: center; }
          .greeting { font-size: 16px; color: #1f2937; margin-bottom: 16px; font-weight: 500; }
          .message-text { font-size: 14px; color: #6b7280; line-height: 1.7; margin-bottom: 32px; }
          .timeline { display: flex; align-items: center; justify-content: center; gap: 12px; margin: 32px 0; }
          .timeline-item { text-align: center; }
          .timeline-item .circle { width: 32px; height: 32px; background: #dbeafe; border: 2px solid #4ADE80; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; color: #4ADE80; margin: 0 auto 8px; }
          .timeline-item .text { font-size: 12px; color: #6b7280; }
          .divider { width: 20px; height: 2px; background: #e5e7eb; }
          .message-box { background: linear-gradient(135deg, #f0fdf4 0%, #f0fdfa 100%); padding: 20px; border-radius: 8px; text-align: left; margin: 32px 0; border-left: 4px solid #4ADE80; }
          .message-label { display: block; font-size: 12px; font-weight: 700; color: #4ADE80; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; }
          .message-text-content { font-size: 14px; color: #374151; line-height: 1.6; white-space: pre-wrap; word-wrap: break-word; }
          .cta-button { display: inline-block; background: linear-gradient(135deg, #4ADE80 0%, #22c55e 100%); color: white; padding: 12px 32px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 14px; margin-top: 24px; transition: transform 0.2s; }
          .cta-button:hover { transform: scale(1.05); }
          .footer { background: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb; }
          .footer-heading { font-size: 12px; font-weight: 700; color: #4ADE80; text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.5px; }
          .footer-text { margin: 8px 0; font-size: 13px; color: #6b7280; }
          .footer-links { margin-top: 16px; }
          .footer-links a { color: #4ADE80; text-decoration: none; margin: 0 12px; font-size: 12px; font-weight: 600; }
          .badge { display: inline-block; background: #dcfce7; color: #166534; padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; margin-left: 8px; }
          @media (max-width: 600px) {
            .container { padding: 12px; }
            .content { padding: 20px 16px; }
            .timeline { flex-direction: column; gap: 8px; }
            .divider { width: 2px; height: 20px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="card">
            <div class="header">
              <h1>Message Received!</h1>
            </div>
            
            <div class="content">
              <p class="greeting">Hi <strong>${name}</strong>,</p>
              
              <p class="message-text">
                Thank you for reaching out to NextGen EV! We've successfully received your message and appreciate your interest in our electric vehicles.
              </p>

              <div class="message-box">
                <span class="message-label">📝 Your Message</span>
                <p class="message-text-content">${message}</p>
              </div>

              <p class="message-text">
                Our team will review your inquiry and get back to you as soon as possible. In the meantime, feel free to explore our product lineup or check out our latest news.
              </p>

              <a href="https://nextgeneev.com" class="cta-button">Explore NextGen EV →</a>
            </div>

            <div class="footer">
              <p class="footer-heading">📞 Need Immediate Help?</p>
              <p class="footer-text">
                <strong>Email:</strong> support@nextgeneev.com<br>
                <strong>Phone:</strong> +91 9876543210
              </p>
              
              <div class="footer-links">
                <a href="https://nextgeneev.com/products">Our Products</a>
                <a href="https://nextgeneev.com/about">About Us</a>
                <a href="https://nextgeneev.com/contact">Contact</a>
              </div>

              <p class="footer-text" style="margin-top: 20px; border-top: 1px solid #e5e7eb; padding-top: 16px;">
                © 2025 NextGen EV. All rights reserved.<br>
                <span style="font-size: 11px;">This is an automated response. Do not reply to this email.</span>
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `,
};

const userResult = await transporter.sendMail(userMailOptions);
console.log("✓ User confirmation sent:", userResult.messageId);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Email sent successfully",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("❌ Contact form error:", error.message);
    console.error("Error details:", error);
    
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to send email",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

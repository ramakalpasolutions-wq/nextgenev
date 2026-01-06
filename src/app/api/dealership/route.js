import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendDealershipEmail(formData) {
  const { fullName, email, phone, city, state, businessName, experience, investment, message } = formData

  // Email to NextGen EV team
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send to yourself
    subject: `🏢 New Dealership Application - ${city}, ${state}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FAF8F1;">
        <div style="background: linear-gradient(to right, #007BFF, #A8E600); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: #F8F9FA; margin: 0;">New Dealership Application</h1>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #212529; border-bottom: 3px solid #A8E600; padding-bottom: 10px;">Personal Information</h2>
          <table style="width: 100%; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #212529;"><strong>Full Name:</strong></td>
              <td style="padding: 8px 0; color: #212529;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #212529;"><strong>Email:</strong></td>
              <td style="padding: 8px 0; color: #007BFF;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #212529;"><strong>Phone:</strong></td>
              <td style="padding: 8px 0; color: #007BFF;">${phone}</td>
            </tr>
          </table>

          <h2 style="color: #212529; border-bottom: 3px solid #007BFF; padding-bottom: 10px; margin-top: 30px;">Business Information</h2>
          <table style="width: 100%; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #212529;"><strong>Business Name:</strong></td>
              <td style="padding: 8px 0; color: #212529;">${businessName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #212529;"><strong>City:</strong></td>
              <td style="padding: 8px 0; color: #212529;">${city}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #212529;"><strong>State:</strong></td>
              <td style="padding: 8px 0; color: #212529;">${state}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #212529;"><strong>Experience:</strong></td>
              <td style="padding: 8px 0; color: #212529;">${experience}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #212529;"><strong>Investment Capacity:</strong></td>
              <td style="padding: 8px 0; color: #A8E600; font-weight: bold;">${investment}</td>
            </tr>
          </table>

          ${message ? `
            <h2 style="color: #212529; border-bottom: 3px solid #A8E600; padding-bottom: 10px; margin-top: 30px;">Additional Information</h2>
            <div style="background-color: #FAF8F1; padding: 15px; border-left: 4px solid #007BFF; border-radius: 5px; margin-top: 15px;">
              <p style="color: #212529; line-height: 1.6; margin: 0;">${message}</p>
            </div>
          ` : ''}

          <div style="margin-top: 30px; padding: 20px; background-color: #007BFF; border-radius: 8px; text-align: center;">
            <p style="color: #F8F9FA; margin: 0; font-size: 14px;">
              📅 Application submitted on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
            </p>
          </div>
        </div>

        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 12px;">
          <p>NextGen EV - Dealership Management System</p>
        </div>
      </div>
    `
  })

  // Confirmation email to applicant
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: '✅ Dealership Application Received - NextGen EV',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FAF8F1;">
        <div style="background: linear-gradient(to right, #007BFF, #A8E600); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: #F8F9FA; margin: 0; font-size: 28px;">Thank You for Your Interest!</h1>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="color: #212529; font-size: 16px; line-height: 1.6;">Dear <strong>${fullName}</strong>,</p>
          
          <p style="color: #212529; font-size: 16px; line-height: 1.6;">
            We have successfully received your dealership application for <strong style="color: #007BFF;">${city}, ${state}</strong>.
          </p>

          <div style="background: linear-gradient(135deg, #007BFF 0%, #A8E600 100%); padding: 25px; border-radius: 10px; margin: 30px 0; text-align: center;">
            <h2 style="color: #F8F9FA; margin: 0 0 10px 0; font-size: 24px;">Application Summary</h2>
            <div style="background-color: rgba(255,255,255,0.9); padding: 20px; border-radius: 8px; margin-top: 15px;">
              <table style="width: 100%;">
                <tr>
                  <td style="padding: 8px; color: #212529; text-align: left;"><strong>Business Name:</strong></td>
                  <td style="padding: 8px; color: #212529; text-align: right;">${businessName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; color: #212529; text-align: left;"><strong>Location:</strong></td>
                  <td style="padding: 8px; color: #212529; text-align: right;">${city}, ${state}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; color: #212529; text-align: left;"><strong>Experience:</strong></td>
                  <td style="padding: 8px; color: #212529; text-align: right;">${experience}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; color: #212529; text-align: left;"><strong>Investment:</strong></td>
                  <td style="padding: 8px; color: #A8E600; text-align: right; font-weight: bold;">${investment}</td>
                </tr>
              </table>
            </div>
          </div>

          <div style="background-color: #FAF8F1; padding: 20px; border-left: 4px solid #007BFF; border-radius: 5px; margin: 25px 0;">
            <h3 style="color: #212529; margin: 0 0 10px 0; font-size: 18px;">⏱️ What's Next?</h3>
            <p style="color: #212529; margin: 0; line-height: 1.6;">
              Our partnerships team will review your application and contact you within <strong>48 hours</strong> at:
            </p>
            <p style="color: #007BFF; margin: 10px 0 0 0;">
              📧 ${email}<br>
              📞 ${phone}
            </p>
          </div>

          <div style="background-color: #A8E600; padding: 20px; border-radius: 8px; margin-top: 30px; text-align: center;">
            <p style="color: #F8F9FA; margin: 0; font-size: 15px; font-weight: bold;">
              🚀 Join us in revolutionizing electric mobility in India!
            </p>
          </div>

          <p style="color: #212529; margin-top: 30px; line-height: 1.6;">
            If you have any immediate questions, feel free to reach out to our partnerships team at:
          </p>
          <p style="color: #007BFF; font-weight: bold; margin: 10px 0;">
            📧 partnerships@nextgenev.com<br>
            📞 +91 9133 913 975
          </p>

          <p style="color: #212529; margin-top: 30px; line-height: 1.6;">
            Best regards,<br>
            <strong style="color: #007BFF;">NextGen EV Partnerships Team</strong>
          </p>
        </div>

        <div style="text-align: center; margin-top: 20px; padding: 20px; background-color: #212529; border-radius: 10px;">
          <p style="color: #F8F9FA; margin: 0; font-size: 12px;">
            This is an automated confirmation email. Please do not reply to this email.
          </p>
          <p style="color: #A8E600; margin: 10px 0 0 0; font-size: 12px;">
            © 2026 NextGen EV. All rights reserved.
          </p>
        </div>
      </div>
    `
  })
}

import nodemailer from 'nodemailer';

// Gmail SMTP configuration example:
// Make sure to set these environment variables in your .env file:
// SMTP_HOST=smtp.gmail.com
// SMTP_PORT=587
// SMTP_USER=your_gmail_address@gmail.com
// SMTP_PASS=your_gmail_app_password
// SMTP_FROM=your_gmail_address@gmail.com

export async function sendOtpEmail(email: string, otp: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER || 'jain.utkarsh215@gmail.com',
      pass: process.env.SMTP_PASS || 'wcqu fpht qofd vobm',
    },
  });

    const mailOptions = {
      from: process.env.SMTP_FROM || 'QuickCourt <youraddress@gmail.com>',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
}

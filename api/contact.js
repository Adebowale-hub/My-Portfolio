const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  // 2. Validate the data
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Please fill out all fields.' });
  }

  try {
    // 3. Configure the email transporter using environment variables
    // You will set these in your Vercel project settings: Settings -> Environment Variables
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // e.g., yourgmail@gmail.com
        pass: process.env.EMAIL_PASS  // your Gmail App Password
      }
    });

    // 4. Set up email data
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`, // Needs to be authenticated user to prevent spam blocking
      to: process.env.EMAIL_USER, // Send it to yourself
      replyTo: email, // So you can hit "reply" and it goes to the sender
      subject: `Portfolio Contact: ${subject}`,
      text: `You have received a new message from your portfolio!\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #2A7B8E;">New Portfolio Message! 🚀</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: 1px solid #eee; my: 20px;" />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `
    };

    // 5. Send the email
    await transporter.sendMail(mailOptions);

    // 6. Return success response
    return res.status(200).json({ success: true, message: 'Email sent successfully!' });

  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ success: false, message: 'Failed to send email. Please try again later.' });
  }
}

const nodemailer = require('nodemailer');

// Create transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // Your Gmail address
    pass: process.env.EMAIL_PASS   // App password (NOT your regular password)
  }
});

// Function to send booking confirmation email
async function sendBookingConfirmation(to, petName, date, service) {
  const mailOptions = {
    from: `"Little Paws 🐾" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Vet Appointment Confirmation - Little Paws',
    html: `
      <h2>Your Vet Appointment is Confirmed</h2>
      <p>Dear Pet Parent,</p>
      <p>Your booking for <strong>${petName}</strong> is confirmed.</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Date:</strong> ${new Date(date).toDateString()}</p>
      <p>We will contact you for further details.</p>
      <p>Thank you for choosing Little Paws 🐾</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to}`);
  } catch (err) {
    console.error('❌ Failed to send email:', err.message);
  }
}

module.exports = { sendBookingConfirmation };

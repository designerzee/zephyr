require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// Email setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Contact Us API
app.post('/contact', async (req, res) => {
  const { email, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.GMAIL_USER,
    subject: `Contact Form Message: ${subject}`,
    text: `Email: ${email}\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

// Order API
app.post('/order', async (req, res) => {
  const { name, email, phone, product, price, paymentMethod } = req.body;

  const bankDetails = `
    Bank Name: Meezan Bank
    Account Title: Muhammad Zeeshan
    Account Number: 269751299
  `;

  let emailBody = `
    New Order Received:

    Customer Name: ${name}
    Email: ${email}
    Phone: ${phone}
    Product: ${product}
    Price: ${price}
    Payment Method: ${paymentMethod}

  `;

  if (paymentMethod.toLowerCase() === 'bank transfer') {
    emailBody += `\nCustomer selected Bank Transfer.\nPlease provide them the following bank details:\n${bankDetails}`;
  }

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: `New Order from ${name}`,
    text: emailBody,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Order placed successfully!' });
  } catch (error) {
    console.error('Error sending order email', error);
    res.status(500).json({ message: 'Failed to place order' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
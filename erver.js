const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/send-order', (req, res) => {
  const { name, email, phone, product, quantity } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yourgmail@gmail.com',
      pass: 'your-app-password'
    }
  });

  const mailOptions = {
    from: `"${name}" <yourgmail@gmail.com>`,
    to: 'zeedesigner09@gmail.com',
    subject: '🌿 New Plant Order',
    replyTo: email,
    text: `🌱 New Order Received:

Name: ${name}
Email: ${email}
Phone: ${phone}
Plant Name: ${product}
Quantity: ${quantity}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      return res.status(500).json({ success: false });
    }
    console.log('Email sent:', info.response);
    res.json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

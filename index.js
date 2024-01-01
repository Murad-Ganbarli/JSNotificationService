const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const credential = "credentials.json";
const port = 3000; // or any port you prefer

app.use(bodyParser.json());

// Configure nodemailer with your email service
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: credential.user,
    pass: credential.pass,
  },
});

// Function to send email notification
const sendNotificationEmail = (title, text, recipient) => {
  const mailOptions = {
    from: credential.user,
    to: recipient,
    subject: title,
    text: text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

// Define the /send-notification route
app.post('/send-notification', (req, res) => {
  const { title, text, recipient } = req.body;

  // Call the function to send notification
  sendNotificationEmail(title, text, recipient);

  // Respond with a JSON indicating success
  res.json({ status: 'Notification sent successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

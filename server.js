const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const transporter = require('./emailConfig'); // Import Nodemailer

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Email sending endpoint
app.post('/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'ahyanromano02@gmail.com',
    subject,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Your message has been sent. Thank you!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'There was an error sending your message.' });
  }
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle other static file requests
app.get('/*.html', (req, res) => {
  const filePath = path.join(__dirname, 'public', req.path);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
    }
  });
});

// Error handling for unsupported methods
app.use((req, res) => {
  res.status(405).json({ error: 'Method Not Allowed' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access your app at: http://localhost:${PORT}`);
});
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('.')); // Serve static files like index.html

// Real email transporter for rishabhjainwal770@gmail.com
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: 'rishabhjainwal770@gmail.com', // Your Gmail
        pass: 'your-app-password-here' // Replace with your Gmail App Password (16 chars, no spaces)
    }
});

// API endpoint to send email
app.post('/send-email', (req, res) => {
    const { to, subject, body } = req.body;

    const mailOptions = {
        from: 'rishabhjainwal770@gmail.com', // Your Gmail
        to: to,
        subject: subject,
        text: body
    };

    // Send real email (uncommented for production)
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Failed to send email' });
        }
        console.log('Email sent: ' + info.response);
        res.json({ message: 'Email sent successfully: ' + info.response });
    });

    // Mock fallback (comment out once real email works)
    /*
    console.log('Mock email sent:');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Body: ${body}`);
    res.json({ message: 'Email logged (mock)' });
    */
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // Fixed typo in 'mongoose'
const Feedback = require('./models/feedback'); // Capitalized 'Feedback' as per convention for models

const app = express();
const port = 3000;

// Fixed typo in mongoose
mongoose.connect('mongodb://localhost:27017/feedback')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));  // Serve static files from the 'public' directory
 // Ensure 'views' folder is correctly structured

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html'); // Check if index.html exists in the 'views' folder
});

app.post('/submit-feedback', async (req, res) => {
    
    const feedback = new Feedback({
        name: req.body.name,
        contactnumber: req.body.contactnumber,
        email: req.body.email,
        feedback: req.body.feedback,
    });

    try {
        await feedback.save();
        console.log('Feedback saved successfully');
        res.send(`
            <html>
            <head>
                <title>Feedback saved successfully</title>
            </head>
            <body>
                <h1>Thank you</h1>
                <p>Your feedback has been successfully submitted.</p>
                <a href="/">Go back to form</a>
            </body>
            </html>
        `);
    } catch (err) {
        console.error('Error saving feedback:', err); // Changed 'error' to 'err' to match the parameter
        res.status(500).send('An error occurred while saving your feedback.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); // Fixed string interpolation
});

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// MongoDB connection
const mongoURI = 'mongodb+srv://rashmikhot5842_db_user:7gEjIWMJH7ADpQPO@cluster0.jga9l2h.mongodb.net/';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Contact form schema
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String
});

// Booking form schema
const bookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    package: String,
    date: String
});

const Contact = mongoose.model('Contact', contactSchema);
const Booking = mongoose.model('Booking', bookingSchema);

// Routes

app.post('/contact', async (req, res) => {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.send('Contact form submitted successfully!');
});

app.post('/booking', async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.send('Booking successful!'); // success message
    } catch (err) {
        console.error(err);
        res.status(500).send('Booking failed. Please try again.'); // error message
    }
});
app.use(express.static('public'));



// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));

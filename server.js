const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/testimonials', (req, res) => {
    res.json(db.testimonials);
});

app.get('/testimonials/random', (req, res) => {
    const randomIndex = Math.floor(Math.random() * db.testimonials.length);
    const randomTestimonial = db.testimonials[randomIndex];
    res.json(randomTestimonial);
});

app.get('/testimonials/:id', (req, res) => {
    const testimonialId = parseInt(req.params.id);
    const testimonial = db.testimonials.find(testimonial => testimonial.id === testimonialId);
    if (testimonial) {
        res.json(testimonial);
    } else {
        res.status(404).json({ message: 'Testimonial not found' });
    }
});

app.post('/testimonials', (req, res) => {
    const { author, text } = req.body;
    if (!author || !text) {
        res.status(400).json({ message: 'Author and text are required' });
    } else {
        const newTestimonial = {
            id: uuidv4(),
            author,
            text
        };
        db.testimonials.push(newTestimonial);
        res.json({ message: 'OK' });
    }
});

app.put('/testimonials/:id', (req, res) => {
    const { author, text } = req.body;
    const testimonialId = parseInt(req.params.id);
    const testimonial = db.testimonials.find(testimonial => testimonial.id === testimonialId);
    if (!testimonial) {
        res.status(404).json({ message: 'Testimonial not found' });
    } else {
        testimonial.author = author;
        testimonial.text = text;
        res.json({ message: 'OK' });
    }
});

app.delete('/testimonials/:id', (req, res) => {
    const index = db.testimonials.findIndex(testimonial => testimonial.id === parseInt(req.params.id));
    if (index === -1) {
        res.status(404).json({ message: 'Testimonial not found' });
    } else {
        db.testimonials.splice(index, 1);
        res.json({ message: 'OK' });
    }
});

app.get('/concerts', (req, res) => {
    res.json(db.concerts);
});

app.get('/concerts/:id', (req, res) => {
    const concertId = parseInt(req.params.id);
    const concert = db.concerts.find(concert => concert.id === concertId);
    if (concert) {
        res.json(concert);
    } else {
        res.status(404).json({ message: 'Concert not found' });
    }
});

app.post('/concerts', (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    if (!performer || !genre  || !price  || !day  || !image) {
        res.status(400).json({ message: 'All fields are required' });
    } else {
        const newConcert = {
            id: uuidv4(),
            performer, 
            genre, 
            price, 
            day, 
            image
        };
        db.concerts.push(newConcert);
        res.json({ message: 'OK' });
    }
});

app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});
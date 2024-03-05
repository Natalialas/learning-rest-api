const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.get('/testimonials', (req, res) => {
    res.json(db);
});

app.get('/testimonials/random', (req, res) => {
    const randomIndex = Math.floor(Math.random() * db.length);
    const randomTestimonial = db[randomIndex];
    res.json(randomTestimonial);
});

app.get('/testimonials/:id', (req, res) => {
    const testimonialId = parseInt(req.params.id);
    const testimonial = db.find(testimonial => testimonial.id === testimonialId);
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
        db.push(newTestimonial);
        res.json({ message: 'OK' });
    }
});

app.put('/testimonials/:id', (req, res) => {
    const { author, text } = req.body;
    const testimonialId = parseInt(req.params.id);
    const testimonial = db.find(testimonial => testimonial.id === testimonialId);
    if (!testimonial) {
        res.status(404).json({ message: 'Testimonial not found' });
    } else {
        testimonial.author = author;
        testimonial.text = text;
        res.json({ message: 'OK' });
    }
});

app.delete('/testimonials/:id', (req, res) => {
    const index = db.findIndex(testimonial => testimonial.id === parseInt(req.params.id));
    if (index === -1) {
        res.status(404).json({ message: 'Testimonial not found' });
    } else {
        db.splice(index, 1);
        res.json({ message: 'OK' });
    }
});

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});
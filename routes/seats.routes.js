const express = require('express');
const db = require('./../db/db');
const router = express.Router();

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
    const seatId = parseInt(req.params.id);
    const seat = db.seats.find(seat => seat.id === seatId);
    if (seat) {
        res.json(seat);
    } else {
        res.status(404).json({ message: 'Seat not found' });
    }
});

router.route('/seats').post((req, res) => {
    const { day, seat, client, email } = req.body;
    if (!day || !seat  || !client  || !email ) {
        res.status(400).json({ message: 'All fields are required' });
    } else {
        const newSeat = {
            id: uuidv4(),
            day, 
            seat, 
            client,
            email
        };
        db.seats.push(newSeat);
        res.json({ message: 'OK' });
    }
});

router.route('/seats/:id').delete((req, res) => {
    const index = db.seats.findIndex(seat => seat.id === parseInt(req.params.id));
    if (index === -1) {
        res.status(404).json({ message: 'Seat not found' });
    } else {
        db.seats.splice(index, 1);
        res.json({ message: 'OK' });
    }
});

router.route('/seats/:id').put((req, res) => {
    const { day, seat, client, email } = req.body;
    const seatId = parseInt(req.params.id);
    const singleSeat = db.seats.find(singleSeat => singleSeat.id === seatId);
    if (!singleSeat) {
        res.status(404).json({ message: 'Seat not found' });
    } else {
        singleSeat.day = day;
        singleSeat.seat = seat;
        singleSeat.client = client;
        singleSeat.email = email;
        res.json({ message: 'OK' });
    }
});

module.exports = router;
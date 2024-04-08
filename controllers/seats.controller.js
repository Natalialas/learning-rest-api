const Seat = require('../models/seat.model')

exports.getAll = async (req, res) => {
    try {
        res.json(await Seat.find({}));
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getRandom =  async (req, res) => {
    try {
        const count = await Seat.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const seat = await Seat.findOne().skip(rand);
        if(!seat) res.status(404).json({ message: 'Not found' });
        else res.json(seat);
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
        const seat = await Seat.findById(req.params.id);
        if(!seat) res.status(404).json({ message: 'Not found' });
        else res.json(seat);
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.addNewSeat = async (req, res) => {
    try {

        const { day, seat, client, email } = req.body;
        const newSeat = new Seat({ day: day, seat: seat, client: client, email: email });
        await newSeat.save();
        res.json({ message: 'OK' });
    
    } catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.updateSeat = async (req, res) => {
    const { day, seat, client, email } = req.body;

    try {
      const oneSeat = await Seat.findById(req.params.id);
      if(oneSeat) {
        await Seat.updateMany({ _id: req.params.id }, { $set: { day: day }, $set: { seat: seat }, $set: { client: client }, $set: { email: email }});
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }

};


exports.deleteSeat = async (req, res) => {
    try {
        const seat = await Seat.findById(req.params.id);
        if(seat) {
          await Seat.deleteOne({ _id: req.params.id });
          res.json({ message: 'OK' });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};
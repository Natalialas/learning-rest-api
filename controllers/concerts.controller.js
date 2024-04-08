const Concert = require('../models/concert.model')

exports.getAll = async (req, res) => {
    try {
        res.json(await Concert.find({}));
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getRandom =  async (req, res) => {
    try {
        const count = await Concert.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const con = await Concert.findOne().skip(rand);
        if(!con) res.status(404).json({ message: 'Not found' });
        else res.json(con);
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getById = async (req, res) => {
    try {
        const con = await Concert.findById(req.params.id);
        if(!con) res.status(404).json({ message: 'Not found' });
        else res.json(con);
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.addNewConcert = async (req, res) => {
    try {

        const { performer, genre, price, day, image } = req.body;
        const newConcert = new Concert({ day: day, performer: performer, genre: genre, price: price, image: image });
        await newConcert.save();
        res.json({ message: 'OK' });
    
    } catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.updateConcert = async (req, res) => {
    const { performer, genre, price, day, image } = req.body;

    try {
      const con = await Concert.findById(req.params.id);
      if(con) {
        await Concert.updateMany({ _id: req.params.id }, { $set: { day: day }, $set: { performer: performer }, $set: { genre: genre }, $set: { price: price }, $set: { image: image }});
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }

};


exports.deleteConcert = async (req, res) => {
    try {
        const con = await Concert.findById(req.params.id);
        if(con) {
          await Concert.deleteOne({ _id: req.params.id });
          res.json({ message: 'OK' });
        }
        else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
        res.status(500).json({ message: err });
    }
};
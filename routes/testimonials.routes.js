const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonials.controller')

router.get('/testimonials', TestimonialController.getAll);

router.get('/testimonials/random', TestimonialController.getRandom);

router.get('/testimonials/:id', TestimonialController.getById);

router.post('/testimonials', TestimonialController.addNewTes);

router.put('/testimonials/:id', TestimonialController.updateTes);

router.delete('/testimonials/:id', TestimonialController.deleteTes);

module.exports = router;
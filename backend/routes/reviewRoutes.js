const express = require('express');
const Review = require('../models/reviewModel');
const router = express.Router();

 
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(400).send('Error retrieving reviews');
  }
});

router.post('/', async (req, res) => {
  const { bookTitle, author, rating, reviewText } = req.body;

  const newReview = new Review({ bookTitle, author, rating, reviewText });

  try {
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).send('Error saving review');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedReview);
  } catch (err) {
    res.status(400).send('Error updating review');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).send('Error deleting review');
  }
});

module.exports = router;

const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const reviews = require('../controllers/reviews');
const catchAsync = require('../utils/catchAsync')
const Campground = require('../models/campground');
const Review = require('../models/review');

router.post('/', validateReview, isLoggedIn, catchAsync(reviews.createReview));

router.delete('/:reviewId', isReviewAuthor, isLoggedIn, catchAsync(reviews.deleteReview));

module.exports = router;
const express = require('express');
const router = express.Router();
const { list, detail, newMovies, recommended } = require('../controllers/moviesController');

router.get('/movies', list);
router.get('/movies/new', newMovies);
router.get('/movies/recommended', recommended);
router.get('/movies/detail/:id', detail);


module.exports = router;
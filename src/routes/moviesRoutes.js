const express = require('express');
const router = express.Router();
const { list, detail, newMovies } = require('../controllers/moviesController');

router.get('/movies', list);
router.get('/movies/new', newMovies);
//router.get('/movies/recommended', moviesController.recomended);
router.get('/movies/detail/:id', detail);


module.exports = router;
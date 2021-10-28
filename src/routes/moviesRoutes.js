const express = require('express');
const router = express.Router();
const { list } = require('../controllers/moviesController');

router.get('/movies', list);
//router.get('/movies/new', moviesController.new);
//router.get('/movies/recommended', moviesController.recomended);
//router.get('/movies/detail/:id', moviesController.detail);


module.exports = router;
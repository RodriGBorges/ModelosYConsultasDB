const express = require('express');
const router = express.Router();
const { list, detail, newMovies, recommended, add, create, edit, update, destroy } = require('../controllers/moviesController');
const moviesController = require('../controllers/moviesController')

router.get('/movies', list);
router.get('/movies/new', newMovies);
router.get('/movies/recommended', recommended);
router.get('/movies/detail/:id', detail);

//Rutas exigidas para la creación del CRUD
router.get('/movies/add', add);
router.post('/movies/create', create);

router.get('/movies/edit/:id', edit);
router.put('/movies/update/:id', update);

router.get('/movies/delete/:id', moviesController.delete);
router.delete('/movies/delete/:id', destroy); 


module.exports = router;
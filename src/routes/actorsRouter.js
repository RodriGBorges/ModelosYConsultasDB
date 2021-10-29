const express = require('express');
const router = express.Router();
const { listActors, detailActors } = require('../controllers/actorsController')

router.get('/actors', listActors);
router.get('/actors/detail/:id', detailActors);


module.exports = router;
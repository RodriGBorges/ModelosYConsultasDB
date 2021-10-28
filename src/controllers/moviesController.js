const db = require('../database/models');
const { Op } = require('sequelize');
// o se puede requerir de esta otra forma: const Op = db.sequelize.Op

const controller = {
    list: (req, res) => {
        db.movies.findAll()
        .then(peliculas => {
            res.render('moviesList', { movies: peliculas })
        })
        .catch(err => {
            console.log('Error al requerir las películas de la base de datos. Erorr:', err);
        })
    },
    detail: async (req, res) => {
        try {
            const pelicula = await db.movies.findByPk(parseInt(req.params.id))
            res.render('moviesDetail', { movie: pelicula })
        } catch (error) {
            console.log('Error al requerir la película de la base de datos. Erorr:', error);
        }
    },
    newMovies: (req, res) => {
        db.movies.findAll({
            order: [
                ['release_date', 'DESC']
            ]
        })
        .then(peliculas => {
            res.render('newestMovies', { movies: peliculas })
        }) 
        .catch(err => {
            console.log('Error al requerir las películas de la base de datos. Erorr:', err);
        })
    },
    recommended: (req, res) => {
        db.movies.findAll({
            where: {
                rating: {[Op.gte]: 9},
                awards: {[Op.gt]: 2}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
        .then(peliculas => {
            res.render('recommendedMovies', { movies: peliculas })
        })
    }
}

module.exports = controller;
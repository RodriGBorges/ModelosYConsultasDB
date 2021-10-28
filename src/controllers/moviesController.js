const db = require('../database/models')

const controller = {
    list: (req, res) => {
        db.movies.findAll()
        .then(peliculas => {
            res.render('moviesList', {movies: peliculas})
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
    }
}

module.exports = controller;
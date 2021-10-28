const db = require('../database/models')

const controller = {
    list: (req, res) => {
        db.movies.findAll()
        .then(peliculas => {
            res.render('moviesList', {movies: peliculas})
        })
        .catch(err => {
            console.log('Error al requerir las películas de la base de datos. Erorr:', err)
        })
    }
}

module.exports = controller;
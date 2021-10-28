const db = require('../database/models')

const controller = {
    list: (req, res) => {
        db.movies.findAll()
        .then(peliculas => {
            res.render('moviesList', {movies: peliculas})
        })
        .catch()
    }
}

module.exports = controller;
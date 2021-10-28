const db = require('../database/models');

const controller = {
    list: (req, res) => {
        db.genres.findAll()
        .then(generos => {
            res.render('genresList', { genres: generos })
        })
        .catch(err => {
            console.log('Error al requerir los generos', err)
        })
    },
    detail: (req, res) => {
        db.genres.findByPk(parseInt(req.params.id))
        .then(genero => {
            res.render('genresDetail', { genre: genero })
        })
        .catch(err => {
            res.send("Tu PC fue hackeada")
        })
    }
}

module.exports = controller;
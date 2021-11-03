const db = require('../database/models');
const { Op } = require('sequelize');
// o se puede requerir de esta otra forma: const Op = db.sequelize.Op

//Otra forma de llamar a los modelos
const Movies = db.Movie;

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
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function (req, res) {
        res.render('moviesAdd');
    },
    create: function (req, res) {
        /* console.log(req.body) */
        db.movies.create(req.body)
        .then( result => {
            res.redirect(`/movies/detail/${result.id}`)
        })
        .catch(err => {
            console.log('Error al crear una nueva película. Erorr:');
            res.render('error', err);
        })
    },
    edit: function(req, res) {
        db.movies.findByPk(parseInt(req.params.id))
        .then(Movie => {
            if(Movie) {
                res.render('moviesEdit', { Movie })
            } else {
                res.send("No se encontró la película con ese id.")
            }
        })
        .catch(err => {
            console.log('Error al mostrar la película que querés editar. Erorr:');
            res.render('error', {error: err})
        })
    },
    update: function (req,res) {
        db.movies.update(
            req.body,
            {
                where: {id: parseInt(req.params.id)}
            }
        )
        .then(result => {
            if (result !== 0) {
                res.redirect(`/movies/detail/${parseInt(req.params.id)}`)
            } else {
                res.send("Hubo un problema al editar la película.")
            }
        })
        .catch(err => {
            res.render('error', {error: err})
            console.log('Error al editar la película. Erorr:', err);
        })
    },
    delete: function (req, res) {
        db.movies.findByPk(parseInt(req.params.id))
        .then(Movie => {
            if(Movie) {
                res.render('moviesDelete', { Movie })
            } else {
                res.send("No se encontró la película con ese id.")
            }
        })
        .catch(err => {
            console.log('Error al mostrar la película que querés borrar. Erorr:');
            res.render('error', {error: err})
        })
    },
    destroy: function (req, res) {
        db.movies.destroy({
            where: {id: parseInt(req.params.id)}
        })
        .then( result => {
            res.redirect('/movies')
        })
        .catch(err => {
            console.log('Error al borrar la película. Erorr:');
            res.render('error', {error: err})
        })
    }
}

module.exports = controller;
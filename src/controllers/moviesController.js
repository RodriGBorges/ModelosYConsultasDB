const db = require('../database/models');
const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
// o se puede requerir de esta otra forma: const Op = db.sequelize.Op

//Otra forma de llamar a los modelos
const Movies = db.Movie;

const controller = {
    list: (req, res) => {
        db.Movie.findAll()
        .then(peliculas => {
            res.render('moviesList', { movies: peliculas })
        })
        .catch(err => {
            console.log('Error al requerir las películas de la base de datos. Erorr:', err);
        })
    },
    detail: async (req, res) => {
        try {
            const pelicula = await db.Movie.findByPk(parseInt(req.params.id))
            res.render('moviesDetail', { movie: pelicula })
        } catch (error) {
            console.log('Error al requerir la película de la base de datos. Erorr:', error);
        }
    },
    newMovies: (req, res) => {
        db.Movie.findAll({
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
        db.Movie.findAll({
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
        db.Genre.findAll()
        .then(allGenres => {
            res.render('moviesAdd', {allGenres});
        })
        .catch(err => {
            res.send(err)
        })
    },
    create: function (req, res) {
        let errors = validationResult(req)
        if (errors.isEmpty()) {

            db.Movie.create(req.body)
            .then( result => {
                res.redirect(`/movies/detail/${result.id}`)
            })
            .catch(err => {
                console.log('Error al crear una nueva película. Erorr:');
                res.render('error', err);
            })
        } else {
            res.render('moviesAdd', { errors: errors.mapped(), old: req.body })
        }
    },
    edit: function(req, res) {

        try {
            const Movie = await db.Movie.findOne({
                where: {id: parseInt(req.params.id)},
                include: [{association: 'genre'}]
            })

            const allGenres = await db.Genre.findAll()
            if(Movie !== null) {
                res.render('moviesEdit', { Movie, allGenres })
            } else {
                res.send('La película no existe')
            }
        } catch (error) {
            res.send(error)
        }
    },
    update: async function (req,res) {
        let errors = validationResult(req);

        if (errors.isEmpty()) {

            db.Movie.update({
                title,
                rating,
                awards,
                release_date,
                length,
                genre_id
            },
            {
                where: {id: req.params.id}
            })
            .then(result => {
                if(result !== 0) {
                    res.redirect(`/movies/detail/${parseInt(req.params.id)}`)
                } else {
                    res.send('No se modificó nada')
                }
            })
            .catch(err => {
                res.send(err)
            })
        } else {
            db.Movie.findByPk(parseInt(req.params.id))
            .then(Movie => {
            if(Movie) {
                res.render('moviesEdit', { 
                    Movie,
                    errors: errors.mapped(), 
                    old: req.body
                })
            } else {
                res.send("No se encontró la película con ese id.")
            }
            })
            
        }
    },
    delete: function (req, res) {
        db.Movie.findByPk(parseInt(req.params.id))
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
        db.Movie.destroy({
            where: {id: parseInt(req.params.id)}
        })
        .then( result => {
            if(result === 1){
                res.redirect('/movies')
            } else {
                res.send('No existe la película con ese id')
            }
            //result = 1 si borró correctamente
        })
        .catch(err => {
            console.log('Error al borrar la película. Erorr:');
            res.render('error', { error: err })
        })
    }
}

module.exports = controller;





/* 
edit:

if(Movie) {
                db.Genre.findAll()
                .then(genres => {
                    Movie.genre = genres.find(genre => genre.id === Movie.genre_id)
                    return res.render('moviesEdit', { Movie, allGenres: genres })
                })
                .catch(err => {
                    res.send(err)
                })
                
            } else {
                res.send("No se encontró la película con ese id.")
            }

edit sin await:
const Movie = db.Movie.findOne({
            where: {id: parseInt(req.params.id)},
            include: [{association: 'genre'}]
        })

        const allGenres = db.Genre.findAll()

        Promise.all([Movie, allGenres])
        .then((result) => {
            res.render('moviesEdit', { Movie: result[0], allGenres: result[1] })
            
        })
        .catch(err => {
            console.log('Error al mostrar la película que querés editar. Erorr:');
            res.render('error', {error: err})
        })
    }
            
            
            
            
            */
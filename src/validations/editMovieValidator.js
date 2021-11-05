const { check } = require('express-validator');

const editMovieValidator = [
    check('title')
    .notEmpty().withMessage('El título de la película es obligatorio.').bail()
    .isLength({ min: 5, max: 30 }).withMessage('El título de la película debe tener entre 5 y 30 caracteres.'),
    check('rating')
    .notEmpty().withMessage('El rating de la película es obligatorio.').bail()
    .isInt().withMessage('El rating de la película debe ser un número sin comas ni puntos.'),
    check('awards')
    .notEmpty().withMessage('Los premios de la película es obligatorio.').bail()
    .isInt().withMessage('Los premios de la película deben ser expresados con un número sin comas ni puntos.'),
    check('release_date')
    .notEmpty().withMessage('El campo fecha no puede estar vacío.').bail()
    .isDate().withMessage('Debe tener una fecha válida.'),
    check('length')
    .notEmpty().withMessage('La duración de la película es obligatorio.').bail()
    .isInt().withMessage('La duración de la película debe ser expresada con un número sin comas ni puntos.')
]


module.exports = editMovieValidator;
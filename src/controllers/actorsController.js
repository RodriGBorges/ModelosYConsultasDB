const db = require('../database/models');
const controller = {
    listActors: (req, res) => {
        db.actors.findAll()
        .then(actores => {
            res.render('actorsList', { actors: actores })
        })
        .catch(err => {
            console.log('Error al requerir los actores de la base de datos', err)
        })
    },
    detailActors: async (req, res) => {
        try {
            const actor = await db.actors.findByPk(parseInt(req.params.id))
            res.render('actorsDetail', { actor: actor })
        } catch (error) {
            console.log('Error al requerir el detalle del actor en la base de datos. Erorr:', error);
        }
    }
}

module.exports = controller;
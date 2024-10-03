const { ValidationError, UniqueConstraintError } = require('sequelize')
const {pokemonFactory} = require('../db/sequelize')

module.exports = (app) => {
    app.put('/api/pokemons/:id/update', (req, res) => {
        const id =  req.params.id
        pokemonFactory.update(req.body, {where: {id: id}})
        .then(
            pokemonFactory.findByPk(id).then(pokemon => {
                const message = `M.A.J du pokémon !`
                res.json({message, Data: pokemon})
            })
        ).catch(error => {
            if(error instanceof ValidationError) {
                return res.status(400).json({
                    message: error.message,
                    data: error
                })
            }

            if(error instanceof UniqueConstraintError) {
                return res.status(400).json({
                    message: error.message
                })
            }
            res.status(500).json({
                error: error
            })
        })
    })
}
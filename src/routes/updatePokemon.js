const {pokemonFactory} = require('../db/sequelize')

module.exports = (app) => {
    app.put('/api/pokemons/:id/update', (req, res) => {
        const id =  req.params.id
        pokemonFactory.update(req.body, {where: {id: id}}).then(
            pokemonFactory.findByPk(id).then(pokemon => {
                const message = `M.A.J du pokémon !`
                res.json({message, Data: pokemon})
            })
        )
    })
}
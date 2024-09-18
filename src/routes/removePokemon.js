const {pokemonFactory} = require('../db/sequelize')

module.exports = (app) => {
    app.delete('/api/pokemons/:id', (req, res) => {
        const id = req.params.id
        pokemonFactory.findByPk(id).then(pokemon => {
            message = `Pokémon supprimé avec succès !`
            pokemonFactory.destroy({where:{ id: id}}).then(_=> res.json({message, Data: pokemon}))
        }).catch(err => console.log(`Une erreur est survenue ${err}`))
    })
}
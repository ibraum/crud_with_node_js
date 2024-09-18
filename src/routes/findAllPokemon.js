const {pokemonFactory} = require('../db/sequelize')

module.exports = (app) => {
    app.get('/api/pokemons/all', (req, res) => {
        pokemonFactory.findAll().then(pokemons => {
            message = "Liste de tous les pokémons."
            res.json({message, data: pokemons})
        }).catch(error => {
            const message = `la liste des pokémons n'a pas pu être recupére ! `
            res.status(500).json({message, data: error})
        })
    })
}
const {pokemonFactory} = require('../../db/sequelize')

module.exports = (app) => {
    app.get('/api/pokemons/:id', (req, res) => {
        pokemonFactory.findByPk(req.params.id).then(pokemon => {
            message = `Le pokemon a été trouvé !`
            res.json({message, Data: pokemon})
        }).catch(error => {
            message = `Le pokemon recherché est introuvable ! `
            res.status(404).json({message})
        })
    })
}
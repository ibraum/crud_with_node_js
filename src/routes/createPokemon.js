const {pokemonFactory} = require('../db/sequelize')


module.exports = (app) => {
    app.post('/api/pokemons/create', (req, res) =>{
        pokemonFactory.create(
            {
                name: req.body.name,
                hp: req.body.hp,
                cp: req.body.cp,
                picture: req.body.picture,
                types: req.body.types
            }
        ).then(pokemon => {
            const message = `Le pokemon ${pokemon.name} crée avec succès !`
            console.log(pokemon)
            res.json({message, pokemonData: pokemon})
        })
    })
}
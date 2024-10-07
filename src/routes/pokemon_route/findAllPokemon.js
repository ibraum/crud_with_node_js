const {pokemonFactory} = require('../../db/sequelize')
const { Op } = require('sequelize')

module.exports = (app) => {
    app.get('/api/pokemons/all', (req, res) => {
        const limit = req.query.limit ? parseInt(req.query.limit) : 4
        if(req.query.name){
            const name = req.query.name
            if(name.length >= 2){
                return pokemonFactory.findAndCountAll(
                    {
                        where: {
                            name: {
                                [Op.like]: `%${name}%`
                            }
                        },
                        order: ['name'],
                        limit: limit
                    }
                )
                .then(({count, rows}) => {
                    res.json({
                        count,
                        rows
                    })
                })
            }else{              
                return res.json({
                    message: "Entrer au minimum deux caractères."
                })
            }
        }
        pokemonFactory.findAll({ order: ['name']} ).then(pokemons => {
            message = "Liste de tous les pokémons."
            res.json({message, data: pokemons})
        }).catch(error => {
            const message = `la liste des pokémons n'a pas pu être recupére ! `
            res.status(500).json({message, data: error})
        })
    })
}
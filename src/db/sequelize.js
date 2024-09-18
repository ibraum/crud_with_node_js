let pokemons = require('./mock-pokemon')
const { succes } = require('../../helper')
const {Sequelize, DataTypes} = require('sequelize')
const PokemonModel = require('../models/pokemon')

const sequelize = new Sequelize(
    "pokedex",
    "root",
    "",
    {
        host: "localhost",
        dialect: "mysql",
        port: 3306
    }
)

sequelize.authenticate().then(_ => console.log("Connexion effectué")).catch(error => console.error("Connexion non effectué" + error))

const pokemonFactory = PokemonModel(sequelize, DataTypes)

const createDB = () => {
    return sequelize.sync({force: true}).then(_ => {
                    pokemons.forEach((pokemon) => {
                        pokemonFactory.create({
                            name: pokemon.name,
                            hp: pokemon.hp,
                            cp: pokemon.cp,
                            picture: pokemon.picture,
                            types: pokemon.types
                        }).then(pokemon => console.log(pokemon))
                    })
                }
            )
}

module.exports = {
    pokemonFactory, createDB
}
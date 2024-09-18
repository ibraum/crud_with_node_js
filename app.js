const express = require('express')
const { pokemonFactory, createDB } = require('./src/db/sequelize')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')

const findAllPokemon = require('./src/routes/findAllPokemon')
const createPokemon = require('./src/routes/createPokemon')
const findPokemon = require('./src/routes/findPokemon')
const removePokemon = require('./src/routes/removePokemon')
const updatePokemon = require('./src/routes/updatePokemon')

const app = express()

const port = 3000

app
    .use(
        favicon(__dirname + '/date.ico')
    ).use(
        (req, res, next) => {
            console.log(`URL :  ${req.url}`)
            next()
        }
    ).use(
        morgan('dev')
    ).use(bodyParser.json())

//Initialize database
createDB()

//Find all pokemons
findAllPokemon(app)

//Find a pokemon
findPokemon(app)

//Create a pokemon
createPokemon(app)

//update a pokemon
updatePokemon(app)

//Delete a pokemon
removePokemon(app)

app.use(({res}) => {
    message = `Impossible de trouvé la ressource demandé`
    res.json({message})
})
app.listen(port, () => console.log(`Notre application node js tourne sur http://localhost:${port}`))
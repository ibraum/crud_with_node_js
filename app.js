const express = require('express')
const { pokemonFactory, createDB, createUserDB } = require('./src/db/sequelize')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')


const login = require('./src/routes/user_route/login')

const findAllPokemon = require('./src/routes/pokemon_route/findAllPokemon')
const createPokemon = require('./src/routes/pokemon_route/createPokemon')
const findPokemon = require('./src/routes/pokemon_route/findPokemon')
const removePokemon = require('./src/routes/pokemon_route/removePokemon')
const updatePokemon = require('./src/routes/pokemon_route/updatePokemon')

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

//Initialize databases
createDB()
createUserDB()

//login 
login(app)

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
app.listen(port, () => console.log(`L'application node js tourne sur http://localhost:${port}`))

//UniqueConstraintError
//ValidationError   
import express from "express"
import mongoose from "mongoose"
import pokemonList from "./data.js"
import Pokemon from "./models/pokemon.js"

const app = express()
app.use(express.json())


app.get("/pokemon/:name", function (req, res) {
    console.log(req.params.name)

    const pokemonName = req.params.name
    const pokemons = pokemonList.find((currentPokemon) => {
        return currentPokemon.name.toLowerCase() === pokemonName.toLowerCase()
    })

    res.send(pokemons)
})


app.get("/pokemon", async function (req, res) {
    
    const allPokemon = await Pokemon.find({}).exec()

    res.send(allPokemon)
})


app.get("/pokemon/:id", async function (req, res) {

    const id = req.params.id
    const pokemonId = await Pokemon.findById(id)

    res.send(pokemonId)
})


app.get("/pokemon-by-name/:name", async function (req, res) {

    const pokemonName = await Pokemon.findOne( { name: { $regex: new RegExp(`^${req.params.name}$`, 'i') }  })

    res.send(pokemonName)
})


app.delete("/pokemon/:id", async function (req, res) {

    const pokemonId = req.params.id
    const deletePokemon = await Pokemon.findByIdAndDelete(pokemonId)

    if (!deletePokemon) {
        return res.send ({ message: "Pokemon does not exist" })
    }

    res.status(204).send(deletePokemon)
})


app.put("/pokemon/:id", async function (req, res) {

    const pokemonId = req.params.id
    const updatedPokemon = await Pokemon.findByIdAndUpdate(pokemonId, req.body, { new: true, runValidators: true })

    res.send(updatedPokemon)
})


app.post("/pokemon", async function (req, res) {

    const newPokemon = await Pokemon.create(req.body)
        console.log(newPokemon)

    res.status(201).send(newPokemon)
})


app.put("/pokemon/:id", function (req, res) {
    const pokemonId = Number(req.params.id)
    const updatedPokemon = req.body

    const pokemonIndex = pokemonList.findIndex((pokemonList) => {
        return pokemonList.id === pokemonId
    })
    pokemonList[pokemonIndex] = updatedPokemon

    res.send(updatedPokemon)
})


app.delete("/pokemon/:id", function (req, res) {
    const pokemonId = Number(req.params.id)
    const pokemonIndex = pokemonList.findIndex((pokemonList) => {
        return pokemonList.id === pokemonId
    })
    pokemonList.splice(pokemonIndex, 1)

    res.sendStatus(204)
})


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

const url = "mongodb://127.0.0.1:27017/"
const dbname = "pokemonList-db"
mongoose.connect(`${url}${dbname}`)
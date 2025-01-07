import express from "express"
const app = express()

app.use(express.json())
import pokemon from "./data.js"


app.get("/pokemon", function (req, res) {
    res.send(pokemon)
})

app.get("/pokemon/:name", function (req, res) {
    console.log(req.params.name)

    const pokemonName = req.params.name
    const pokemons = pokemon.find((currentPokemon) => {
        return currentPokemon.name.toLowerCase() === pokemonName.toLowerCase()
    })

    res.send(pokemons)
})


app.post("/pokemon", function (req, res) {
    const newPokemon = req.body
    pokemon.push(newPokemon)
    res.status(201).send(newPokemon)
})


app.put("/pokemon/:id", function (req, res) {
    const pokemonId = Number(req.params.id)
    const updatedPokemon = req.body

    const pokemonIndex = pokemon.findIndex((pokemon) => {
        return pokemon.id === pokemonId
    })
    pokemon[pokemonIndex] = updatedPokemon

    res.send(updatedPokemon)
})


app.delete("/pokemon/:id", function (req, res) {
    const pokemonId = Number(req.params.id)

    const pokemonIndex = pokemon.findIndex((pokemon) => {
        return pokemon.id === pokemonId
    })
    pokemon.splice(7, 1)

    res.sendStatus(204)
})


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

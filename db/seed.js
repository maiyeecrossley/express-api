// * This program is responsible for adding data to our database for development purposes

import mongoose from "mongoose"
import Pokemon from "../models/pokemon.js"
import pokemonList from "../data.js"


async function seed() {
    console.log("Connecting to database")
    await mongoose.connect("mongodb://127.0.0.1:27017/pokemon-db")
    
    
    console.log("Seeding the database")
    const newPokemon = await Pokemon.create(pokemonList)
    console.log(newPokemon)

await mongoose.disconnect()
    console.log("Disconnecting")
    
}

seed()
import mongoose from "mongoose";

const pokemonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: [{ type: String, required: true }],
    pokedex_number: { type: Number, required: true },
    weakness: [{ type: String, required: true }]
})

export default mongoose.model("Pokemon", pokemonSchema)
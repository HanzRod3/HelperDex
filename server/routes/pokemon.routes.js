import express from "express";
import {
  createPokemon,
  getAllPokemon,
  deletePokemon,
  getPokemonByName, // Corrected function name for searching by name
} from "../controllers/pokemon.controllers.js";

const router = express.Router();

// Define the POST route for creating a Pokemon
router.post("/pokemon", createPokemon);

// Define the GET route for retrieving all Pokemon
router.get("/pokemon", getAllPokemon);

// Define the GET route for retrieving a Pokemon by name
router.get("/pokemon/name/:name", getPokemonByName); // Updated route for searching by name

// Define the DELETE route for deleting a Pokémon by ID
router.delete("/pokemon/:id", deletePokemon);

export default router;

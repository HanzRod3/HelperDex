import Pokemon from "../models/pokemonSchema.js";

// Create a new Pokémon
export const createPokemon = async (req, res) => {
  try {
    const { name, pokedexNumber, types, moves, sprite } = req.body;

    if (!name || !pokedexNumber || !types || !sprite) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    if (moves && moves.length > 4) {
      return res
        .status(400)
        .json({ message: "A Pokémon can have a maximum of 4 moves" });
    }

    const newPokemon = new Pokemon({
      name,
      pokedexNumber,
      types,
      moves,
      sprite,
    });

    await newPokemon.save();
    res.status(201).json(newPokemon);
  } catch (error) {
    if (error.code === 11000) {
      // This code indicates a duplicate key error
      res.status(400).json({
        message: "A Pokémon with this name or Pokédex number already exists",
        error,
      });
    } else {
      res.status(500).json({ message: "Server error", error });
    }
  }
};

// Get all Pokémon
export const getAllPokemon = async (req, res) => {
  try {
    const pokemonList = await Pokemon.find();
    res.status(200).json(pokemonList);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve Pokémon", error });
  }
};

// Get a Pokémon by ID
export const getPokemonByName = async (req, res) => {
  try {
    // Step 1: Fetch all Pokémon from the database
    const allPokemon = await Pokemon.find();

    // Step 2: Search for the Pokémon by name
    const pokemonName = req.params.name;
    const pokemon = allPokemon.find(
      (pokemon) => pokemon.name.toLowerCase() === pokemonName.toLowerCase()
    );

    // Step 3: Check if the Pokémon was found
    if (!pokemon) {
      return res.status(404).json({ message: "Pokémon not found" });
    }

    // Step 4: Return the found Pokémon
    res.status(200).json(pokemon);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve Pokémon", error });
  }
};

// Delete a Pokémon by ID
export const deletePokemon = async (req, res) => {
  try {
    const deletedPokemon = await Pokemon.findByIdAndDelete(req.params.id);
    if (!deletedPokemon) {
      return res.status(404).json({ message: "Pokémon not found" });
    }
    res.status(200).json({ message: "Pokémon deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Pokémon", error });
  }
};

import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AddPokemon = () => {
  const [searchName, setSearchName] = useState(""); // To search for a Pokémon by name
  const [pokemonData, setPokemonData] = useState(null); // To store the Pokémon data fetched from PokeAPI
  const [availableMoves, setAvailableMoves] = useState([]); // To store available moves fetched from PokeAPI
  const [selectedMoves, setSelectedMoves] = useState([]); // To store user-selected moves
  const [message, setMessage] = useState("");
  const [pokemonNames, setPokemonNames] = useState([]); // To store a list of Pokémon names for suggestions

  useEffect(() => {
    const fetchPokemonNames = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=1000"
        );
        setPokemonNames(response.data.results.map((pokemon) => pokemon.name));
      } catch (error) {
        console.error("Failed to fetch Pokémon names", error);
      }
    };

    fetchPokemonNames();
  }, []);

  // Function to search for a Pokémon by name using the PokeAPI
  const searchPokemon = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${searchName.toLowerCase()}`
      );

      // Set the fetched Pokémon data
      setPokemonData({
        name: response.data.name,
        pokedexNumber: response.data.id,
        types: response.data.types.map((type) => type.type.name),
        sprite: response.data.sprites.front_default,
      });

      // Fetch the available moves from the API
      const moves = response.data.moves.map((move) => move.move.name);
      setAvailableMoves(moves);

      // Reset selected moves
      setSelectedMoves([]);
      setMessage("");
    } catch (error) {
      setMessage("Pokémon not found.");
    }
  };

  // Function to handle move selection
  const handleMoveSelect = (e) => {
    const selectedMove = e.target.value;
    if (selectedMoves.length < 4 && !selectedMoves.includes(selectedMove)) {
      setSelectedMoves([...selectedMoves, selectedMove]);
    }
  };

  // Function to remove a move from selected moves
  const removeMove = (move) => {
    setSelectedMoves(selectedMoves.filter((m) => m !== move));
  };

  // Function to handle the submission of the Pokémon with customized moves
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the Pokémon data with customized moves to your database
      const response = await axios.post("http://localhost:8004/api/pokemon", {
        ...pokemonData,
        moves: selectedMoves,
      });

      setMessage(`Pokémon ${response.data.name} added successfully!`);
      setPokemonData(null);
      setSelectedMoves([]);
      setSearchName("");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage(
          "A Pokémon with this name or Pokédex number already exists."
        );
      } else {
        setMessage("Failed to add Pokémon.");
      }
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <div className="mb-4">
          <label className="form-label">Search Pokémon by Name:</label>
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Gotta catch 'em all"
            list="pokemon-suggestions"
            className="form-control"
          />
          <datalist id="pokemon-suggestions">
            {pokemonNames
              .filter((name) =>
                name.toLowerCase().includes(searchName.toLowerCase())
              )
              .map((name) => (
                <option key={name} value={name} />
              ))}
          </datalist>
          <button
            onClick={searchPokemon}
            className="btn btn-warning mt-3 w-100"
          >
            Search
          </button>
        </div>

        {pokemonData && (
          <form onSubmit={handleSubmit}>
            <div className="card mb-4 p-3 shadow-sm">
              <h3 className="card-title">Pokémon Details</h3>
              <img
                src={pokemonData.sprite}
                alt={pokemonData.name}
                className="card-img-top"
                style={{ maxHeight: "150px", objectFit: "contain" }}
              />
              <div className="card-body">
                <p className="card-text">
                  <strong>Name:</strong> {pokemonData.name}
                </p>
                <p className="card-text">
                  <strong>Pokédex Number:</strong> {pokemonData.pokedexNumber}
                </p>
                <p className="card-text">
                  <strong>Types:</strong> {pokemonData.types.join(", ")}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <h3>Select Moves (up to 4)</h3>
              <select
                onChange={handleMoveSelect}
                value=""
                className="form-select mb-3"
              >
                <option value="" disabled>
                  Select a move
                </option>
                {availableMoves.map((move) => (
                  <option key={move} value={move}>
                    {move}
                  </option>
                ))}
              </select>
              <div className="mb-3">
                {selectedMoves.map((move, index) => (
                  <div key={index} className="d-flex justify-content-between">
                    <span>{move}</span>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => removeMove(move)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-success w-100">
              Add Pokémon
            </button>
          </form>
        )}

        {message && <p className="mt-3 text-center">{message}</p>}
      </div>
    </div>
  );
};
export default AddPokemon;

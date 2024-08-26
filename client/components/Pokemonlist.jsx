import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
// Define the type effectiveness chart
const typeEffectiveness = {
  normal: { rock: 0.5, ghost: 0, steel: 0.5 },
  fire: {
    fire: 0.5,
    water: 0.5,
    grass: 2,
    ice: 2,
    bug: 2,
    rock: 0.5,
    dragon: 0.5,
    steel: 2,
    ground: 1,
    fairy: 1,
    fighting: 1,
    poison: 1,
    ghost: 1,
    electric: 1,
    normal: 1,
    flying: 1,
    dark: 1,
    psychic: 1,
  },
  water: {
    fire: 2,
    water: 0.5,
    grass: 0.5,
    ground: 2,
    rock: 2,
    dragon: 0.5,
    steel: 1,
    fairy: 1,
    fighting: 1,
    poison: 1,
    ghost: 1,
    electric: 1,
    normal: 1,
    flying: 1,
    dark: 1,
    ice: 1,
    bug: 1,
    psychic: 1,
  },
  electric: {
    water: 2,
    electric: 0.5,
    grass: 0.5,
    ground: 0,
    flying: 2,
    dragon: 0.5,
    steel: 1,
    fairy: 1,
    fighting: 1,
    poison: 1,
    ghost: 1,
    fire: 1,
    normal: 1,
    rock: 1,
    dark: 1,
    ice: 1,
    bug: 1,
    psychic: 1,
  },
  grass: {
    fire: 0.5,
    water: 2,
    grass: 0.5,
    poison: 0.5,
    ground: 2,
    flying: 0.5,
    bug: 0.5,
    rock: 2,
    dragon: 0.5,
    steel: 0.5,
    fairy: 1,
    fighting: 1,
    ghost: 1,
    electric: 1,
    normal: 1,
    dark: 1,
    ice: 1,
    psychic: 1,
  },
  ice: {
    fire: 0.5,
    water: 0.5,
    grass: 2,
    ice: 0.5,
    ground: 2,
    flying: 2,
    dragon: 2,
    steel: 0.5,
    fairy: 1,
    fighting: 1,
    poison: 1,
    ghost: 1,
    electric: 1,
    normal: 1,
    rock: 1,
    dark: 1,
    bug: 1,
    psychic: 1,
  },
  fighting: {
    normal: 2,
    ice: 2,
    poison: 0.5,
    flying: 0.5,
    psychic: 0.5,
    bug: 0.5,
    rock: 2,
    ghost: 0,
    dark: 2,
    steel: 2,
    fairy: 0.5,
    fire: 1,
    water: 1,
    grass: 1,
    ground: 1,
    electric: 1,
    dragon: 1,
  },
  poison: {
    grass: 2,
    poison: 0.5,
    ground: 0.5,
    rock: 0.5,
    ghost: 0.5,
    steel: 0,
    fairy: 2,
    fire: 1,
    water: 1,
    electric: 1,
    ice: 1,
    fighting: 1,
    bug: 1,
    normal: 1,
    flying: 1,
    psychic: 1,
    dragon: 1,
    dark: 1,
  },
  ground: {
    fire: 2,
    electric: 2,
    grass: 0.5,
    poison: 2,
    flying: 0,
    bug: 0.5,
    rock: 2,
    steel: 2,
    water: 1,
    ice: 1,
    fighting: 1,
    fairy: 1,
    normal: 1,
    psychic: 1,
    dark: 1,
    ghost: 1,
    dragon: 1,
  },
  flying: {
    electric: 0.5,
    grass: 2,
    fighting: 2,
    bug: 2,
    rock: 0.5,
    steel: 0.5,
    fire: 1,
    water: 1,
    ground: 1,
    ice: 1,
    poison: 1,
    normal: 1,
    flying: 1,
    fairy: 1,
    psychic: 1,
    dragon: 1,
    dark: 1,
  },
  psychic: {
    fighting: 2,
    poison: 2,
    psychic: 0.5,
    dark: 0,
    steel: 0.5,
    fire: 1,
    water: 1,
    grass: 1,
    electric: 1,
    ice: 1,
    bug: 1,
    ghost: 1,
    rock: 1,
    ground: 1,
    flying: 1,
    fairy: 1,
    normal: 1,
    dragon: 1,
  },
  bug: {
    fire: 0.5,
    grass: 2,
    fighting: 0.5,
    poison: 0.5,
    flying: 0.5,
    psychic: 2,
    ghost: 0.5,
    dark: 2,
    steel: 0.5,
    fairy: 0.5,
    rock: 1,
    ground: 1,
    water: 1,
    ice: 1,
    electric: 1,
    normal: 1,
    dragon: 1,
  },
  rock: {
    fire: 2,
    ice: 2,
    fighting: 0.5,
    ground: 0.5,
    flying: 2,
    bug: 2,
    steel: 0.5,
    water: 1,
    grass: 1,
    electric: 1,
    psychic: 1,
    poison: 1,
    rock: 1,
    fairy: 1,
    ghost: 1,
    dragon: 1,
    dark: 1,
  },
  ghost: {
    normal: 0,
    psychic: 2,
    ghost: 2,
    dark: 0.5,
    steel: 1,
    fire: 1,
    water: 1,
    grass: 1,
    electric: 1,
    ice: 1,
    fighting: 1,
    bug: 1,
    poison: 1,
    ground: 1,
    flying: 1,
    fairy: 1,
    dragon: 1,
  },
  dragon: {
    dragon: 2,
    steel: 0.5,
    fairy: 0,
    fire: 1,
    water: 1,
    grass: 1,
    electric: 1,
    ice: 1,
    fighting: 1,
    bug: 1,
    ghost: 1,
    rock: 1,
    ground: 1,
    flying: 1,
    psychic: 1,
    dark: 1,
    poison: 1,
  },
  dark: {
    fighting: 0.5,
    psychic: 2,
    ghost: 2,
    dark: 0.5,
    fairy: 0.5,
    steel: 1,
    fire: 1,
    water: 1,
    grass: 1,
    electric: 1,
    ice: 1,
    bug: 1,
    ground: 1,
    flying: 1,
    dragon: 1,
  },
  steel: {
    fire: 0.5,
    water: 0.5,
    electric: 0.5,
    ice: 2,
    rock: 2,
    steel: 0.5,
    fairy: 2,
    fighting: 1,
    bug: 1,
    grass: 1,
    psychic: 1,
    normal: 1,
    flying: 1,
    poison: 1,
    ground: 1,
    dragon: 1,
    ghost: 1,
    dark: 1,
  },
  fairy: {
    fighting: 2,
    poison: 0.5,
    steel: 0.5,
    fire: 0.5,
    dragon: 2,
    dark: 2,
    water: 1,
    grass: 1,
    electric: 1,
    ice: 1,
    ground: 1,
    flying: 1,
    bug: 1,
    ghost: 1,
    psychic: 1,
  },
};

// Function to calculate effectiveness of a single type against opposing types
const calculateEffectiveness = (pokemonType, opposingTypes) => {
  let effectiveness = 1; // Default is neutral effectiveness

  opposingTypes.forEach((opposingType) => {
    if (
      typeEffectiveness[pokemonType] &&
      typeEffectiveness[pokemonType][opposingType] !== undefined
    ) {
      effectiveness *= typeEffectiveness[pokemonType][opposingType];
    }
  });

  console.log(
    `Effectiveness of ${pokemonType} against ${opposingTypes}: ${effectiveness}`
  );
  return effectiveness;
};

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [apiPokemon, setApiPokemon] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [comparisonResult, setComparisonResult] = useState("");
  const [pokemonNames, setPokemonNames] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get("http://localhost:8004/api/pokemon");
        setPokemonList(response.data);
      } catch (error) {
        console.error("Failed to fetch Pokémon", error);
      }
    };

    fetchPokemon();
  }, []);

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

  const searchPokemonInAPI = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${searchName.toLowerCase()}`
      );

      setApiPokemon({
        name: response.data.name,
        types: response.data.types.map((type) => type.type.name),
        sprite: response.data.sprites.front_default,
        moves: response.data.moves.slice(0, 4).map((move) => move.move.name),
      });
      setComparisonResult("");
      console.log(`Fetched Pokémon from API:`, response.data);
    } catch (error) {
      setApiPokemon(null);
      setComparisonResult("Pokémon not found in the API.");
      console.error("Error fetching Pokémon from API:", error);
    }
  };

  const handleSelectPokemon = (pokemon) => {
    setSelectedPokemon(pokemon);
    setComparisonResult("");
    console.log(`Selected Pokémon:`, pokemon);
  };

  const handleDeletePokemon = async (pokemonId) => {
    try {
      await axios.delete(`http://localhost:8004/api/pokemon/${pokemonId}`);
      setPokemonList(
        pokemonList.filter((pokemon) => pokemon._id !== pokemonId)
      );
    } catch (error) {
      console.error("Failed to delete Pokémon", error);
    }
  };

  const compareTypes = () => {
    if (!selectedPokemon || !apiPokemon) return;

    const selectedTypes = selectedPokemon.types;
    const apiTypes = apiPokemon.types;

    console.log(`Comparing ${selectedPokemon.name} vs ${apiPokemon.name}`);
    console.log(`Selected Pokémon types: ${selectedTypes}`);
    console.log(`API Pokémon types: ${apiTypes}`);

    let totalEffectiveness = 1;

    selectedTypes.forEach((selectedType) => {
      const effectiveness = calculateEffectiveness(selectedType, apiTypes);
      totalEffectiveness *= effectiveness;
    });

    console.log(`Total effectiveness: ${totalEffectiveness}`);

    let resultMessage = "";

    if (totalEffectiveness > 1) {
      resultMessage = `${selectedPokemon.name} has an advantage over ${apiPokemon.name}`;
    } else if (totalEffectiveness < 1) {
      resultMessage = `${apiPokemon.name} has an advantage over ${selectedPokemon.name}`;
    } else {
      resultMessage = "The battle would be neutral with no type advantages.";
    }

    console.log(`Comparison Result: ${resultMessage}`);
    setComparisonResult(resultMessage);
  };

  return (
    <div className="container py-4">
      {/* Professor Oak's Pokébox container */}
      <div className="container bg-light p-4 rounded">
        <h2 className="mb-4">Professor Oak's Pokébox</h2>
        <div className="row">
          {pokemonList.map((pokemon) => (
            <div key={pokemon._id} className="col-md-3 mb-4">
              <div
                className={`card ${
                  selectedPokemon && selectedPokemon._id === pokemon._id
                    ? "bg-warning border-warning"
                    : "bg-white border-secondary"
                }`}
                onClick={() => handleSelectPokemon(pokemon)}
                style={{
                  cursor: "pointer",
                  transform:
                    selectedPokemon && selectedPokemon._id === pokemon._id
                      ? "scale(1.05)"
                      : "scale(1)",
                  transition: "transform 0.2s",
                }}
              >
                <img
                  src={pokemon.sprite}
                  className="card-img-top"
                  alt={pokemon.name}
                  style={{ maxHeight: "150px", objectFit: "contain" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{pokemon.name}</h5>
                  <p className="card-text">
                    Pokedex Number: #{pokemon.pokedexNumber}
                  </p>
                  <p className="card-text">Types: {pokemon.types.join(", ")}</p>
                  {selectedPokemon && selectedPokemon._id === pokemon._id && (
                    <p className="card-text">
                      Moves: {pokemon.moves.join(", ")}
                    </p>
                  )}
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeletePokemon(pokemon._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Compare container */}
      <div className="container mt-5">
        <h3 className="mb-4 text-center">Choose Your Next Opponent</h3>
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="....."
              list="pokemon-suggestions"
              className="form-control mb-3"
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
              className="btn btn-warning w-100"
              onClick={searchPokemonInAPI}
            >
              Search
            </button>

            {apiPokemon && (
              <div
                className="card mt-4 bg-dark text-white"
                style={{ maxHeight: "300px" }}
              >
                <div className="card-body text-center">
                  <img
                    src={apiPokemon.sprite}
                    className="card-img-top"
                    alt={apiPokemon.name}
                    style={{ maxHeight: "150px", objectFit: "contain" }}
                  />
                  <h5 className="card-title mt-3">{apiPokemon.name}</h5>
                  <p className="card-text">
                    Types: {apiPokemon.types.join(", ")}
                  </p>
                  <p className="card-text">
                    Moves: {apiPokemon.moves.join(", ")}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="col-md-6">
            {comparisonResult && (
              <div className="card bg-info text-white">
                <div className="card-body">
                  <h4 className="card-title">HelperDex says:</h4>
                  <p className="card-text">{comparisonResult}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={compareTypes}
            disabled={!selectedPokemon || !apiPokemon}
            className="btn btn-warning"
            style={{ opacity: !selectedPokemon || !apiPokemon ? 0.5 : 1 }}
          >
            Compare
          </button>
        </div>
      </div>
    </div>
  );
};
export default PokemonList;

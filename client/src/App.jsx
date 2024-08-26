import React from "react";
import { Route, Link, Routes } from "react-router-dom";
import PokemonList from "../components/Pokemonlist.jsx";
import AddPokemon from "../components/AddPokemon.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link btn btn-warning text-black"
                style={{
                  borderRadius: "5px",
                  padding: "10px 20px",
                  color: "#FFF",
                }}
              >
                Home
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/add-pokemon"
                className="nav-link btn btn-success text-black"
                style={{
                  borderRadius: "5px",
                  padding: "10px 20px",
                  color: "#FFF",
                }}
              >
                Add Pokémon
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Ensure Routes are properly defined */}
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/add-pokemon" element={<AddPokemon />} />
      </Routes>
    </div>
  );
}

export default App;

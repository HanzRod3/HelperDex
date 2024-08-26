import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/mongoose.config.js";
import pokemonRoutes from "./routes/pokemon.routes.js";

const app = express();
dotenv.config();

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors()); // Middleware to handle CORS

const PORT = process.env.PORT || 8004; // Setting the port from environment variables or defaulting to 8004

dbConnect(); // Connecting to the MongoDB database

app.use("/api", pokemonRoutes); // Using the pokemonRoutes for requests starting with /pokemon

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

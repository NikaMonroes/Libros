import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import conectDB from "./config/db.js";
import librosRoutes from "./routes/libros.js";



dotenv.config();

const app = express(); //app sirve para crear las rutas
//agregamos un midleware para poder usar json
app.use(express.json());
//agregamos cors para solicitudes cruzadas
app.use(cors());
// Nos conectamos a la base de datos MongoDB
conectDB();


//Rutas
app.use("/libros", librosRoutes);// /libros es la ruta principal en este grupo de rutas

//Levantamos el puerto
app.listen(3000, () => console.log("Server running on http://localhost:3000/"));



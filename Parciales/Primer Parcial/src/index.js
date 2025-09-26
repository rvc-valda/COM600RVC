require("reflect-metadata");
const express = require("express");
const AppDataSource = require("./database");
const medicoRoutes = require("./medicoRoutes");
const { setDataSource } = require("./medicoController");

const app = express();
app.use(express.json());

// Conectar a BD con TypeORM
AppDataSource.initialize()
    .then(() => {
        console.log("Conexión a MySQL exitosa");
        setDataSource(AppDataSource);

        app.use("/api", medicoRoutes);
        
        app.listen(3000, () => {
            console.log("Servidor corriendo en http://localhost:3000");
        });
    })
    .catch((err) => {
        console.error("Error de conexión a la BD:", err);
    });

const mongoose = require("mongoose");

const connectDB = async () => {
    const uri = process.env.MONGO_URI || "mongodb://localhost:27017/bd_agendas";
    while (true) {
        try {
            await mongoose.connect(uri);
            console.log("Conectado a MongoDB");
            break;
        } catch (err) {
            console.error("Error al conectar a MongoDB. Reintentando en 5s...");
             console.error(err);
            await new Promise(res => setTimeout(res, 5000));
        }
    }
};

module.exports = connectDB;
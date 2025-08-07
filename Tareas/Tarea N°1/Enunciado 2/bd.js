const { createConnection } = require("typeorm");

createConnection()
    .then(() => {
        console.log("¡Conexión a la base de datos con TypeORM exitosa!");
    })
    .catch((error) => {
        console.error("Error al conectar a la base de datos:", error);
    });

const { EntitySchema } = require("typeorm");

const Datos = new EntitySchema({
    name: "Datos", 
    tableName: "datos", // Nombre exacto de tu tabla en la base de datos
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        nombres: {
            type: "varchar",
        },
        apellidos: {
            type: "varchar",
        },
        fecha_nacimiento: {
            type: "varchar",
        },
        direccion: {
            type: "varchar",
        },
        celular: {
            type: "varchar",
        },
        correo: {
            type: "varchar",
        },
    },
});

module.exports = { Datos };
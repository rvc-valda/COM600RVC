const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_agenda'
});

connection.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos: ', error);
        return;
    }
    console.log('¡Conexión a la base de datos exitosa!');
});

module.exports = connection;
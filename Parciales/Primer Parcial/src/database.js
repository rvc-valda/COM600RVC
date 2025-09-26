const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
    type: "mysql",
    host: "mysql", 
    port: 3306,
    username: "root",   
    password: "admin",   
    database: "bd_medico",
});

module.exports = AppDataSource;

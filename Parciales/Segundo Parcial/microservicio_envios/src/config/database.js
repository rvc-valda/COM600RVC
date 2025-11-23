const { AppDataSource } = require('./dataSource');

const initDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log('MySQL conectado con TypeORM');
  } catch (err) {
    console.error('Error conectando MySQL:', err);
    process.exit(1);
  }
};

module.exports = { initDB };
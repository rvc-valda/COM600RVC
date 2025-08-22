const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/bd_agenda', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('¡Conexión a MongoDB exitosa!'))
.catch(err => console.error('Error al conectar a la base de datos:', err));

module.exports = mongoose;

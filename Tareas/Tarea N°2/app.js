const express = require('express');
const bodyParser = require('body-parser');
require('./bd.js'); // conexión a MongoDB
const Dato = require('./dato.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Ruta principal: listar datos
app.get('/', async (req, res) => {
    try {
        const datos = await Dato.find();
        res.render('index', { datos });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Mostrar formulario de agregar
app.get('/add', (req, res) => {
    res.render('add');
});

// Agregar un nuevo contacto
app.post('/add', async (req, res) => {
    try {
        const nuevoDato = new Dato(req.body);
        await nuevoDato.save();
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error);
    }
});

// Mostrar formulario de edición
app.get('/edit/:id', async (req, res) => {
    try {
        const dato = await Dato.findById(req.params.id);
        res.render('edit', { datos: dato });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Procesar edición
app.post('/edit/:id', async (req, res) => {
    try {
        await Dato.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error);
    }
});

// Eliminar contacto
app.get('/delete/:id', async (req, res) => {
    try {
        await Dato.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});

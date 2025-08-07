const express = require('express');
const { getRepository, createConnection } = require('typeorm');
const { Datos } = require('./Datos'); 
const bodyParser = require('body-parser');
const path = require('path');

// Crea la conexión a la base de datos al inicio de la aplicación
createConnection()
    .then(() => {
        const app = express();
        app.use(bodyParser.urlencoded({ extended: true }));
        app.set('view engine', 'ejs');
        app.set('views', path.join(__dirname, 'views'));
        app.use(express.static('public'));
        console.log('¡Conexión a la base de datos con TypeORM exitosa!');

        // --- Rutas del CRUD ---

        // Ruta principal: listar productos
        app.get('/', async (req, res) => {
            try {
                const datosRepository = getRepository(Datos);
                const datos = await datosRepository.find();
                res.render('index', { datos });
            } catch (err) {
                console.error(err);
                res.status(500).send(err.message);
            }
        });

        // Mostrar formulario de agregar
        app.get('/add', (req, res) => {
            res.render('add');
        });

        // Agregar un nuevo contacto
        app.post('/add', async (req, res) => {
            try {
                const datosRepository = getRepository(Datos);
                const nuevoDato = datosRepository.create(req.body);
                await datosRepository.save(nuevoDato);
                res.redirect('/');
            } catch (err) {
                console.error(err);
                res.status(500).send(err.message);
            }
        });

        // Mostrar formulario de edición
        app.get('/edit/:id', async (req, res) => {
            try {
                const datosRepository = getRepository(Datos);
                const datoAEditar = await datosRepository.findOneBy({ id: req.params.id });
                if (!datoAEditar) {
                    return res.status(404).send('Dato no encontrado');
                }
                res.render('edit', { datos: datoAEditar });
            } catch (err) {
                console.error(err);
                res.status(500).send(err.message);
            }
        });

        // Procesar edición
        app.post('/edit/:id', async (req, res) => {
            try {
                const datosRepository = getRepository(Datos);
                // La línea a corregir: Usa findOneBy en lugar de findOne
                const datoAActualizar = await datosRepository.findOneBy({ id: req.params.id });
                if (!datoAActualizar) {
                    return res.status(404).send('Dato no encontrado');
                }
                datosRepository.merge(datoAActualizar, req.body);
                await datosRepository.save(datoAActualizar);
                res.redirect('/');
            } catch (err) {
                console.error(err);
                res.status(500).send(err.message);
            }
        });

        // Eliminar producto
        app.get('/delete/:id', async (req, res) => {
            try {
                const datosRepository = getRepository(Datos);
                await datosRepository.delete(req.params.id);
                res.redirect('/');
            } catch (err) {
                console.error(err);
                res.status(500).send(err.message);
            }
        });

        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
        });

    })
    .catch((error) => {
        console.error("Error al conectar a la base de datos:", error);

    });
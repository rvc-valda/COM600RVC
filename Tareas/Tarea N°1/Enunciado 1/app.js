const express = require('express');
const bodyParser = require('body-parser');
const db = require('./bd.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Ruta principal: listar productos
app.get('/', (req, res) => {
  db.query('SELECT * FROM datos', (err, results) => {
    if (err) return res.status(500).send(err);
    res.render('index', { datos: results });
  });
});

// Mostrar formulario de agregar
app.get('/add', (req, res) => {
  res.render('add');
});

//Agregar un nuevo contacto
app.post('/add', (req, res) => {
    const { nombres, apellidos, fecha_nacimiento, direccion, celular, correo } = req.body;
    const query = 'INSERT INTO datos (nombres, apellidos, fecha_nacimiento, direccion, celular, correo) VALUES (?, ?, ?, ?, ?, ?)';
    // Pasar los valores en el orden correcto
    db.query(query, [nombres, apellidos, fecha_nacimiento, direccion, celular, correo], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        res.redirect('/');
    });
});

// Mostrar formulario de edición
app.get('/edit/:id', (req, res) => {
  db.query('SELECT * FROM datos WHERE Id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.render('edit', { datos: results[0] });
  });
});

// Procesar edición
app.post('/edit/:id', (req, res) => {
  const { nombres, apellidos, fecha_nacimiento, direccion, celular, correo } = req.body;
  const query = 'UPDATE datos SET nombres = ?, apellidos = ?, fecha_nacimiento = ?, direccion = ?, celular = ?, correo = ? WHERE Id = ?';
  db.query(query, [nombres, apellidos, fecha_nacimiento, direccion, celular, correo, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.redirect('/');
  });
});

// Eliminar producto
app.get('/delete/:id', (req, res) => {
  db.query('DELETE FROM datos WHERE Id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.redirect('/');
  });
});

app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});

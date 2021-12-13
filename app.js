const express = require('express');
const bodyParser = require('body-parser');

// Routes
const authRoutes = require('./routers/auth');
const photosRoutes = require('./controllers/photos')
const app = express();

app.use(bodyParser.json());
const port = 3000;

// Usar nuestros controladores
app.use('/auth', authRoutes);
app.use('/photos', photosRoutes);

// HTTP verbs
app.get('/', (req, res) => {
    res.status(200).send('Dj Gsus in da house!');
});

app.get('/sessions', (req, res) => {
    res.status(200).send('Las sesiones de DJ Gsus:');
});

app.listen(port, () => {
    console.log('Server started at port 3000')
});

module.exports = app;
// exports.app = app;
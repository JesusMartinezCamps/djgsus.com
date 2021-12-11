const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const usersController = require('./controllers/users');
usersController.registerUser('gsus', '1234');

const app = express();
//app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
require('./auth')(passport);

const port = 3000;

// Hay que inicializar passport desde app
app.use(passport.initialize());

app.get('/', (req, res) => {
    // console.log(req);
    res.status(200).send('Dj Gsus in da house!');
});

app.post('/login', (req, res) => {
    //console.log('entra --------- req body: ' + req.body.user);
    //console.log('entra --------- req body: ' + req.body.password);
    if(!req.body){
        //console.log(res);
        return res.status(400).json({message: 'Missing data'});
    } else if(!req.body.user || !req.body.password){
        //console.log('el body req es: ' + req.body);
        //console.log('el body res es: ' + res.body);
        return res.status(400).json({message: 'Missing data'});
    }

    // Comprobamos las credenciales
    usersController.checkUserCredentials(req.body.user, req.body.password, (err, result) => {
        // Si no son válidas - Error
        if(err || !result){
            
            console.log('tenemos error en datos')
            console.log('resultado es: ' + result)
            console.log('error es: ' + err)
            return res.status(401).json({message: 'Invalid credentials pana'});
        }
        // Si son válidas - generar jwt token y devolverlo
        const token = jwt.sign({userId: result}, 'secretPassword')
        
        res.status(200).json(
            {token: token}
        );
    });
});

app.get('/sessions', (req, res) => {
    res.status(200).send('Las sesiones de DJ Gsus:');
});

// Con un Middleware para asegurar que está protegido
app.get('/photos',
    passport.authenticate('jwt', {session: false}),
    (req, res, next) => {
    res.status(200).send('Las fotos de DJ Gsus:');
});

app.listen(port, () => {
    console.log('Server started at port 3000')
});

module.exports = app;
// exports.app = app;
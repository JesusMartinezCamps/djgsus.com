const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
// Controllers
const usersController = require('../controllers/users');
// Mock de usuarios de test
usersController.registerUser('gsus', '1234');


router.route('/')
    .get((req, res) => {
        res.send('Auth router');
    });

router.route('/login')
    .post((req, res) => {
        if(!req.body){
            return res.status(400).json({message: 'Missing data'});
        } else if(!req.body.user || !req.body.password){
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

module.exports = router;
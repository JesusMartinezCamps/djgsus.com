const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../auth')(passport);

router.route('/')
    .get(passport.authenticate('jwt', {session: false}),
        (req, res, next) => {
            res.status(200).send('Las fotos de DJ Gsus:');
        });


module.exports = router;
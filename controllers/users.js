const passport = require('passport');
const uuid = require('uuid');
const crypto = require('../crypto.js');

const userDatabase = {};

const registerUser = (userName, password) => {
    // Guardar en la base de datos al usuario
    let hashedPwd = crypto.hashPasswordSync(password);

    userDatabase[uuid.v4()] = {
        userName: userName,
        password: hashedPwd
    }
}
const getUserIdFromUserName = (userName) => {
    for (let user in userDatabase){        
        if (userDatabase[user].userName == userName)
            return userDatabase[user];
    }
}
const checkUserCredentials = (userName, password, done) => {    
    // Comprobar que las credenciales son correctas
    let user = getUserIdFromUserName(userName);
    if(user){
        crypto.comparePassword(password, user.password, done);
    }
    else
        done('Missing user');
}
exports.registerUser = registerUser;
exports.checkUserCredentials = checkUserCredentials;
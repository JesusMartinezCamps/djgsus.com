const chai = require('chai');
const chaiHttp = require('chai-http');


chai.use(chaiHttp);

const app = require('../app');

describe('Suite de prueba auth', () => {
    it('Should return: 400 when no data is provided', (done) => {
        chai.request(app)
            .post('/login')
            .end((err, res) => {
                //console.log('test que entra sin datos');
                chai.assert.equal(res.statusCode, 400);
                done();
            });        
    });
    
    it('Should return: 200 when login valid', (done) => {
        chai.request(app)
            .post('/login')
            .set('content-type', 'application/json')
            .send({user: 'gsus', password: '1234'})
            .end((err, res) => {
                console.log('test que entra con datos');
                chai.assert.equal(res.statusCode, 200);
                done();
            });        
    });
    
    it('Should return: 401 when no jwt token available', (done) => {
        //Cuando la llamada no tiene la llave puesta
        chai.request(app)
            .get('/photos')            
            .send({user: 'gsus', password: '1234'})
            .end((err, res) => {
                //console.log(err.text);
                chai.assert.equal(res.statusCode, 401)
                done();
            });
        console.log('B');
    });
    /*
    it('Should return: 200 when  jwt token is valid in Photos', (done) => {
        //Cuando la llamada no tiene la llave puesta
        chai.request(app)
            .get('/photos')            
            .send({user: 'gsus', password: '1234'})
            .end((err, res) => {
                //console.log(err.text);
                chai.assert.equal(res.statusCode, 200)
                done();
            });
        console.log('B');
    });*/

        /*
    it('Test Photos-Login: Debería devolver: 200 when jwt token is valid', (done) => {
        chai.request(app)
            .post('/login')
            .end((err, res) => {
                //console.log(res.text);
                chai.request(app)
                    .get('/photos')
                    .set('Authorization', `JWT ${res.body.token}`)
                    .end((err, res) => {
                        console.log('A')
                        chai.assert.equal(res.statusCode, 200)
                        done();
                    });
            });
        
    });
    */

});
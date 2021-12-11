const chai = require('chai');
const chaiHttp = require('chai-http');


chai.use(chaiHttp);

const app = require('../app');

describe('Suite de prueba e2e para la página', () => {
    it('Debería devolver: Dj Gsus in da house!', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                console.log('A')
                chai.assert.equal(res.text, 'Dj Gsus in da house!')
                done();
            });
        console.log('B');
    });
    
    it('Debería devolver: Las sesiones de DJ Gsus:', (done) => {
        chai.request(app)
            .get('/sessions')
            .end((err, res) => {
                console.log('A')
                chai.assert.equal(res.text, 'Las sesiones de DJ Gsus:')
                done();
            });
        console.log('B');
    });
    
    it('Debería devolver: Unauthorized si no se accede con credenciales:', (done) => {
        chai.request(app)
            .get('/photos')
            .end((err, res) => {
                console.log('A')
                chai.assert.equal(res.text, 'Unauthorized')
                done();
            });
        console.log('B');
    });
    
});
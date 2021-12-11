const assert =require('chai').assert;

function addValue(a, b){
    return a+b;
}
describe('Suite de prueba', () => {
    let result = 8;
    it('should return ' + result, () => {
        let va = addValue(4,4)
        assert.equal(va, result);

    })
})

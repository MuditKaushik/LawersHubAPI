import 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Common Controller Tests', () => {
    let baseUrl: string = 'http://localhost:1802/api/common/';
    describe('get states', () => {
        it('Should return list of indian states', (done: MochaDone) => {
            chai.request(baseUrl).get('/getstates').end((err, res) => {
                chai.expect(err).to.be.null;
                chai.expect(res.status).to.equal(200);
                chai.expect(res.body).to.be.instanceof(Array);
                chai.expect(res.body).to.include('Bihar');
                chai.expect(res.body[3]).to.equal('Assam');
                done();
            });
        });
        it('Should return error', (done: MochaDone) => {
            chai.request(baseUrl).get('/getstatesws').end((err, res) => {
                chai.assert.isNotNull(err);
                chai.expect(res.status).to.equal(404);
                done();
            });
        });
    });
    describe('get cities', () => {
        it('should return cities by state name', (done: MochaDone) => {
            chai.request(baseUrl).get('/getcities/Uttarakhand').end((err, res) => {
                chai.assert.isNull(err);
                chai.expect(res.status).equals(200);
                chai.expect(res.body).to.instanceOf(Array);
                done();
            });
        });
        it('should return empty array for not found', (done: MochaDone) => {
            chai.request(baseUrl).get('/getcities/abcdefrg').end((err, res) => {
                chai.expect(res.status).equals(200);
                done();
            });
        });
    });
});

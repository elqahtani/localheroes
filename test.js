let mongoose = require("mongoose");
let Pahlawan = require('./pahlawan');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./index');
let should = chai.should();

chai.use(chaiHttp);


describe('/GET pahlawan', () => {
    it('it should GET all the pahlawan', (done) => {
        chai.request(server)
            .get('/api/pahlawan')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('name');
                res.body[0].should.have.property('area');
                res.body[0].name.should.equal('Cut Nyak Dhien');
                res.body[0].area.should.equal('Aceh');
                done();
            });
    });
});

//     it('it should POST a pahlawan ', (done) => {
//         let pahlawan = {
//             name: "Pangeran Diponegoro",
//             area: "Jogja",
//             senjata: "keris",
//             die: "50",

//         }
//         chai.request(server)
//             .post('/api/pahlawan')
//             .send(pahlawan)
//             .end((err, res) => {
//                 var firstItem = body.items[0];
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');
//                 res.firstItem.should.have.property('message').eql('Pahlawan created!');
//                 res.firstItem.should.have.property('name');
//                 res.firstItem.should.have.property('area');
//                 // res.body.pahlawan.should.have.property('senjata');
//                 // res.body.pahlawan.should.have.property('die');
//                 done();
//             });
//     });
// });
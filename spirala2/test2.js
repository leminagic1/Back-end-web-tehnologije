//const { should } = require('chai');
let http = require('http');
let fs = require('fs');
let url = require('url');

let assert=require('chai').assert;
let expect = require('chai').expect;

let should = require('chai').should();
let chai = require('chai');
let chaiHttp = require('chai-http');
const server=require("./server.js");

chai.use(chaiHttp);

describe('testiranje <POST >na /student', function(){
   beforeEach(function(done){
        fs = require('fs');
        fs.writeFile('studenti.csv', 'Ala,Simi,107st\n', function () {
        });
        done();
    });
    afterEach(function(done){
        delete require.cache[require.resolve('fs')];
        done();

    });

it('Index studenta vec postoji u datoteci studenti.csv',function(done){
let noviStudent = {
    ime: "Ala",
    prezime: "Simi",
    index: "107st"
};
let odgovorS= {status: 'Student sa indexom 107st vec postoji'};
chai.request(server)
            .post('/student')
            .send(noviStudent)
            .end(function(err,res){
                res.should.have.status(400);
                should.not.exist(err);
                res.body.should.eql(odgovorS);
                done();
            });     
            }); 

 it('Student je uspješno kreiran',function(done){
    let noviStudent = {
        ime: "Armin",
        prezime: "Kozic",
        index: "115st"
    };
    let odgovorS= {status: 'Kreiran student!'};
    chai.request(server)
                .post('/student')
                .send(noviStudent)
                .end(function(err,res){
                    res.should.have.status(200);
                    should.not.exist(err);
                    res.body.should.eql(odgovorS);
                    done();
                });
            });
        });
describe('testiranje <POST >na /predmet', function(){
    beforeEach(function(done){
        fs = require('fs');
        fs.writeFile('predmeti.csv', 'BWT,RI-BoE-1-1\n', function () {
        });
        done();
    });
    afterEach(function(done){
        delete require.cache[require.resolve('fs')];
        done();

    });

    it('Predmet sa kôdom već postoji u datoteci predmeti.csv',function(done){
        let noviPredmet={
            naziv : "BWT",
            kod: "RI-BoE-1-1"
        };
        let odgovorP={status:'Predmet sa kodom RI-BoE-1-1 vec postoji'};
        chai.request(server)
                    .post('/predmet')
                    .send(noviPredmet)
                    .end(function(err,res){
                        res.should.have.status(400);
                        should.not.exist(err);
                        res.body.should.eql(odgovorP);
                        done();
                    });
    });
    it('Predmet nema ispravan kôd',function(done){
        let noviPredmet={
            naziv : "BWT",
            kod: "TK-MoE-3-1"
        };
        let odgovorP={status:'Kod predmeta nije ispravan'};
        chai.request(server)
                    .post('/predmet')
                    .send(noviPredmet)
                    .end(function(err,res){
                        res.should.have.status(400);
                        should.not.exist(err);
                        res.body.should.eql(odgovorP);
                        done();
                    });
    });
    it('Predmet je uspješno kreiran',function(done){
        let noviPredmet={
            naziv : "BWT",
            kod: "RI-BoE-1-2"
        };
        let odgovorP={status:'Kreiran student!'};
        chai.request(server)
                    .post('/predmet')
                    .send(noviPredmet)
                    .end(function(err,res){
                        res.should.have.status(200);
                        should.not.exist(err);
                        res.body.should.eql(odgovorP);
                        done();
                    });
    });
});
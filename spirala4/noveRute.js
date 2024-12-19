const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const { sequelize, konektovanje } = require('./db');
let Predmet = require('./predmet.js');

const PORT = 3001;

const server = express();
server.use(bodyParser.json());

server.use(express.json());
const Model = require('./modeli.js')(sequelize);


const validirajParametre = (body, props) => {
    for (let i = 0; i < props.length; i++) {
        if (!Object.keys(body).includes(props[i]) || !body[props[i]])
            return false;
    }
    return true;
}



server.post('/student', async (req, res) => {

    const body = req.body;
    if (!validirajParametre(body, ['ime', 'prezime', 'index']))
        return res.status(400).send({ status: 'Student nije u ispravnom formatu' });
    const { ime, prezime, index } = body;

    try {
        const studentData = await sequelize.Student.findAll({ where: { index } });
        if (studentData.length) return res.status(400).send({ status: `Student sa indexom ${index} vec postoji` });
        await sequelize.Student.create({ ime, prezime, index });
        res.send({ status: 'Kreiran student!' });
    } catch (greska) {
        res.status(400).send({ status: 'Nešto nije uredu sa bazom' });
    }


});

server.post('/predmet', async (req, res) => {
    try {
        const body = req.body;
        if (!validirajParametre(body, ['naziv', 'kod']))
            return res.status(400).send({ status: 'Predmet nije u ispravnom formatu' });
        const { naziv, kod } = body;

        const predmetData = await sequelize.Predmet.findOne({ where: { kod } });
        if (predmetData) {
            return res.status(400).send({ status: `Predmet sa kodom ${kod} vec postoji` });
        }
        let pomocna = new Predmet();
        if (pomocna.provjeriKodPredmeta(kod) !== true) {
            return res.status(400).send({ status: `Kod predmeta nije ispravan` });
        }
        await sequelize.Predmet.create({ naziv, kod });
        res.send({ status: 'Kreiran predmet!' });
    } catch (error) {
        res.status(400).send({ status: 'Nešto nije uredu sa kreiranjem predmeta' });
    }


});
server.post('/prisustvo', async (req, res) => {

    try {
        const body = req.body;
        const { tipCasa, redniBrojCasa, sedmica, kodPredmeta, indexStudenta, statusPrisustva } = body;

        if (statusPrisustva !== "prisutan" && statusPrisustva !== "odsutan" && statusPrisustva !== "nijeUneseno") {
            return res.status(400).json({ status: "Status prisustva nije ispravan!" });
        }

        const predmet = await sequelize.Predmet.findOne({ where: { kod: kodPredmeta } });

        if (!predmet) {

            return res.status(400).json({ status: "Kod predmeta ne postoji!" });
        }

        const student = await sequelize.Student.findOne({ where: { index: indexStudenta } });
        if (!student) {
            return res.status(400).json({ status: "Student ne postoji!" });
        }

        const cas = await sequelize.Cas.findOne({
            where: {
                tip: tipCasa,
                redniBroj: redniBrojCasa,
                sedmica: sedmica,
                predmetId: predmet.id
            }
        });

        if (cas) {
            // Azuriranje statusa prisustva
            await sequelize.Prisustvo.update({ statuss: statusPrisustva }, { where: { studentId: student.id, casId: cas.id } });
            return res.json({ status: "Azurirano prisustvo!" });

        } else {

            const noviCas = await sequelize.Cas.create({ tip: tipCasa, redniBroj: redniBrojCasa, sedmica: sedmica, predmetId: predmet.id });

            const novoPrisustvo = await sequelize.Prisustvo.create({ statuss: statusPrisustva, casId: noviCas.id, studentId: student.id });

            return res.json({ status: "Kreirano prisustvo!" });
        }

    } catch (error) {
        res.status(400).send({ status: 'Nešto nije uredu sa kreiranjem prisustva' });
    }


});


server.get("/prisustvo", async (req, res) => {



    const kodPredmetaValue = req.query.kodPredmeta;
    const indexValue = req.query.indexStudenta;
    const sedmicaValue = req.query.sedmica;


    try {
        const student = await sequelize.Student.findOne({ where: { index: indexValue } });

        const predmet = await sequelize.Predmet.findOne({ where: { kod: kodPredmetaValue } });

        const casovi = await sequelize.Cas.findOne({ where: { sedmica: sedmicaValue, predmetId: predmet.id } });

        if (student && predmet && casovi.length == 0) {
            return res.json({ status: "Prisustvo ne postoji!" });
        }



        let pr = 0;
        let od = 0;
        let nU = 0;
       
        const novo = Object.values(casovi);
        for (let i = 0; i < novo.length; i++) {
           
            const prisustvo = await sequelize.Prisustvo.findOne({ where: { casId: cas.id, studentId: student.id } });

            if (!prisustvo) nU++;
            else if (prisustvo.statuss === "prisutan") pr++;
            else if (prisustvo.statuss === "odsutan") od++;
        }


        return res.json({ prisustvoZaSedmicu: sedmicaValue, prisutan: pr, odsutan: od, nijeUneseno: nU });

    } catch (err) {
        console.log(err);
        return res.json({ status: 'Došlo je do greške' });
    }




});

server.listen(PORT, async () => {
    console.log("Server pokrenut na portu 3001");
    await konektovanje();
})

module.exports = server;
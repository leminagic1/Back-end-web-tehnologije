const { FORMERR } = require('dns');
const express=require('express');
const fs = require('fs');
let Predmet = require('./predmet.js');
var http = require('http');

const server=express();
server.use(express.json());

server.post('/student', (req,res)=>{

    const body = req.body;
    const {ime, prezime, index} = body;
    if (!ime || !prezime || !index) 
    return res.status(400).send({status: 'Student nije u ispravnom formatu'});
    fs.readFile('studenti.csv', 'utf8', (error, data) => {
        if (error) {
            fs.writeFile('studenti.csv', `${ime},${prezime},${index}\n`, (error) => {
                if (error) 
                return res.status(400).send({status: 'Nešto nije uredu sa kreiranjem studenti.csv datoteke'});
                res.send({status: 'Kreiran student!'});
            });
        } else {
            const rows = data.split(/\r?\n/);
            for (let i = 0; i < rows.length; i++) {
                const columns = rows[i].split(',');
              
                if (columns[2] === index) 
                return res.status(400).send({status: `Student sa indexom ${index} vec postoji`});
            }
            fs.appendFile('studenti.csv', `${ime},${prezime},${index}\n`, (error) => {
                if (error) 
                return res.status(400).send({status: 'Nešto nije uredu sa kreiranjem novog studenta'});
                res.send({status: 'Kreiran student!'});
            });
        }
    });
});

server.post('/predmet', (req,res)=>{
    const body=req.body;
    const {naziv, kod} = body;
    if (!naziv || !kod) 
    return res.status(400).send({status: 'Predmet nije u ispravnom formatu'});
    fs.readFile('predmeti.csv', 'utf-8', (error, data)=>{
            if(error){
                fs.writeFile('predmeti.csv', `${naziv},${kod}\n`, (error) => {
                    if (error) 
                    return res.status(400).send({status: 'Nešto nije uredu sa kreiranjem predmeti.csv datoteke'});
                    res.send({status: 'Kreiran predmet!'});
                });
            }
            else{
                const rows = data.split(/\r?\n/);
                for (let i = 0; i < rows.length; i++) {
                    const columns = rows[i].split(',');
                    if (columns.length !== 2) continue;
                    if (columns[1] === kod) 
                    return res.status(400).send({status: `Predmet sa kodom ${kod} vec postoji`});
                   
                
            }
            let pomocna=new Predmet();
            if(pomocna.provjeriKodPredmeta(kod)!==true)
            return res.status(400).send({status: `Kod predmeta nije ispravan`});
         

         
            fs.appendFile('predmeti.csv', `${naziv},${kod}\n`, (error) => {
                console.log(body);
                if (error) 
                return res.status(400).send({status: 'Nešto nije uredu sa kreiranjem novog studenta'});
                res.send({status: 'Kreiran student!'});
            });
        }
    });

});

server.post('/prisustvo', (req,res)=>{
    const body=req.body;
    const {tipCasa, redniBrojCasa, sedmica, kodPredmeta, indexStudenta, statusPrisustva} = body;

   if(statusPrisustva!=="prisutan" && statusPrisustva!=="odsutan" && statusPrisustva!="nijeUneseno")
    return res.status(400).send({status: `Status prisustva nije ispravan!`});
 fs.readFile('predmeti.csv', 'utf-8', (error, data)=>{
        if(error){
           throw error;
        }
        else{
            const rows = data.split(/\r?\n/);
            for (let i = 0; i < rows.length; i++) {
                const columns = rows[i].split(',');
                if (columns[1] !== kodPredmeta) 
                return res.status(400).send({status: `Kod predmeta ne postoji!`});
               
            }
        }
  
    });
    
        fs.readFile('studenti.csv', 'utf-8',(error, data)=>{
            if(error){
                
                throw error;  
            }
            else{
                const rows = data.split(/\r?\n/);
                for (let i = 0; i < rows.length; i++) {
                    const columns = rows[i].split(',');
                    if (columns[2] !== indexStudenta) 
                    return res.status(400).send({status: `Student ne postoji!`});
                   
                    
            }
        }
    });
    
 
    fs.readFile('prisustva.csv','utf-8',(error, data)=>{
        
        if(error){
       // throw error;
           fs.writeFile('prisustva.csv', `${tipCasa},${redniBrojCasa},${sedmica},${kodPredmeta},${indexStudenta},${statusPrisustva}\n`, (error) => {
                if (error) 
                return res.status(400).send({status: 'Nešto nije uredu sa kreiranjem prisustva.csv datoteke'});
            res.send({status: 'Kreirano prisustvo!'});
            });
     }
        else{
            const rows = data.split(/\r?\n/);
            
            for (let i = 0; i < rows.length; i++) {
                const columns = rows[i].split(',');
      if(columns[0]==tipCasa && columns[1]==redniBrojCasa && columns[2]==sedmica && columns[3]==kodPredmeta && columns[4]==indexStudenta && columns[5]!=statusPrisustva){    

           let potrebanRed=rows[i];
        
           
         
           let redString=JSON.stringify(potrebanRed);
      
         //  console.log(redString);
           //console.log(typeof redString);


         //  console.log(potrebanRed);
           let nn=JSON.stringify(body);
        
           let Ra=JSON.parse(nn);
         

           let noviBodi=nn.split(/\r?\n/);
           
         let ss=JSON.parse(noviBodi);

           let pomocna=ss.tipCasa+","+ss.redniBrojCasa+","+ss.sedmica+","+ss.kodPredmeta+","+ss.indexStudenta+","+ss.statusPrisustva;
          
            let noviStatus=JSON.stringify(pomocna);
           
          console.log(noviStatus);
        
            fs.writeFile('/prisustva.csv', JSON.stringify(redString,noviStatus)+'\n' ,(err)=>{
                    if(err){
                        console.log('Error');
                        
                    }
                    res.send({status: 'Azurirano prisustvo!'});
            });
                       
            }
        }
                    }
                
         
                
            
            });
        
    
     
        
    });
 
    
    


server.get('/prisustvo?kodPredmeta=kodPredmetaValue&indexStudenta=indexValue&sedmica=sedmicaValue', (req, res) => {
    res.send('hello');

});


 server.listen(8082, ()=> console.log('listening on port 8082'));
 module.exports=server;
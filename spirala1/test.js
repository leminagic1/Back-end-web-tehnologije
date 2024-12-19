let assert = chai.assert;

describe('Prisustvo', function() {
    describe('#prvi parametar', function() {
      it('parametar sedmica nema vrijednost u rasponu od 1 do 15 (uključujući 1 i 15)', function() {
          let par1= new Prisustvo();
          Prisustvo.trenutnaSedmica=15;
          let a=par1.izracunajPrisustvo(16, lista3);
          assert.equal(a.greska, "Parametar sedmica nema vrijednost u rasponu od 1 do 15!");
      });
      
      describe("#drugi parametar", function(){
        it('parametar sedmica ima vrijednost koja je veća od vrijednosti atributa trenutnaSedmica', function(){
            let par2=new Prisustvo();
            Prisustvo.trenutnaSedmica=7;
            let a2=par2.izracunajPrisustvo(9, lista3);
            assert.equal(a2.greska, "Parametar sedmica mora imati vrijednost koja je manja od trenutne sedmice!");
        });
        // treciiiiiiiiiiiiiiii
        describe("#treci parametar", function(){
            it('objekat ili objekti parametra listaPrisustva ima/imaju neispravan jedan ili više properties (npr. nemaju property prisustvo)',function(){
                let par3=new Prisustvo();
                Prisustvo.trenutnaSedmica=7;
                const lista1 = [{ prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }, { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 1, prisutan: -1, odsutan: -1, nijeUneseno: 1 }];
                let a3=par3.izracunajPrisustvo(2,lista1);
                assert.equal(a3.greska, "Parametar listaPrisustva nema ispravne vrijednosti za sedmicu 1 za properties [prisutan,odsutan]!");
            });
        });
        
      describe("#cetvrti parametar", function(){
        it('Zbir properties prisutan, odsutan i nijeUneseno za jednu ili više sedmica je veći od 8', function() {
            let par4=new Prisustvo();
            Prisustvo.trenutnaSedmica=7;
            const lista=[{ prSedmica: 1, prisutan: 3, odsutan: 3, nijeUneseno: 3},{ prSedmica: 2, prisutan: 0, odsutan: 0, nijeUneseno: 0 }];
            let a4=par4.izracunajPrisustvo(1,lista);
            assert.equal(a4.greska, "Parametar listaPrisustva nema ispravnu zbirnu vrijednost!");
          
        });
     
        });
        describe("#peti parametar", function(){
            it('parametri sedmica i listaPrisustva ne ispunjavaju više uslova', function() {
                let par5=new Prisustvo();
                Prisustvo.trenutnaSedmica=7;
                const lista2 = [{ prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }, { prSedmica: 4, prisutan: -2, odsutan: -2, nijeUneseno: -1 }, { prSedmica: 1, prisutan: -1, odsutan: -1, nijeUneseno: 1 }];
                let a5=par5.izracunajPrisustvo(2, lista2);
                assert.equal(a5.greska, "Parametar listaPrisustva nema ispravne vrijednosti za sedmicu 4 za properties [prSedmica,prisutan,odsutan,nijeUneseno]!");
            });
            });
            describe("#sesti parametar", function(){
                it('parametri su ispravni i metoda vraća objekat sa prisustvom za sedmicu koja je navedena kao parametar sedmica', function() {
                    Prisustvo.trenutnaSedmica=7;
                    let par6=new Prisustvo();
                   let a6=par6.izracunajPrisustvo(2, lista3);
                    assert.equal(a6, "{prisustvoZaSedmicu: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0}");
                });
                });
                describe("#sedmi parametar",function (){
                    it('metoda ispravno računa vrijednost atributa prisustvo', function(){
                        let par7=new Prisustvo();
                        Prisustvo.trenutnaSedmica=15;
                        let a7=par7.izracunajPrisustvo(5, lista3);
                        
                        assert.equal(a7, "{prisustvoZaSedmicu: 5, prisutan: -1, odsutan: -1, nijeUneseno: -1}");
                       

                    });
                });
       });
      });
      });
   
 
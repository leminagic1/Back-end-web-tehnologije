class Prisustvo{

    constructor() {
      this.trenutnaSedmica=1;
      this.prisustvo=0;
      this.finalnoStanje=false; 
    }
   
    static trenutnaSedmica;
  
    izracunajPrisustvo(sedmica, listaPrisustva) {
      if(sedmica>15 || sedmica<1 || sedmica!=parseInt(sedmica)) 
        return {greska: "Parametar sedmica nema vrijednost u rasponu od 1 do 15!"};
      if(sedmica>this.trenutnaSedmica)
        return {greska: "Parametar sedmica mora imati vrijednost koja je manja od trenutne sedmice!"};
      var ukupno_prisutan = 0;
      var ukupno_odsutan = 0;
      var nijeUneseno = 0;
      var prisustvoZaSedmicu = { prisustvoZaSedmicu: sedmica, prisutan: -1, odsutan: -1, nijeUneseno: -1 };
      for(var i = 0; i < listaPrisustva.length; i++) {
        var p = listaPrisustva[i];
        var zadnja = true;
        for(var j = i + 1; j < listaPrisustva.length; j++)
            if(listaPrisustva[j].prSedmica == p.prSedmica) {
                zadnja = false;
                break;
            }
        if(zadnja) {
          var greske = [false, false, false, false];
          if(p.prSedmica<1 || p.prSedmica>15) greske[0] = true;
          if(p.prisutan<0 || p.prSedmica>8) greske[1] = true;
          if(p.odsutan<0 || p.odsutan>8) greske[2] = true;
          if(p.nijeUneseno<0 || p.nijeUneseno>8) greske[3] = true;
          if(greske.includes(true)) {
            var s = "[";
            var zarez = false;
            if(greske[0] == true) {
              s = s + "prSedmica";
              zarez = true;
            }
            if(greske[1] == true) {
              if(zarez) s = s + ", ";
              s = s + "prisutan";
              zarez = true;
            }
            if(greske[2] == true) {
              if(zarez) s = s + ", ";
              s = s + "odsutan";
              zarez = true;
            }
            if(greske[3] == true) {
              if(zarez) s = s + ", ";
              s = s + "nijeUneseno";
            
            }
            s = s + "]";
            return {greska: "Parametar listaPrisustva nema ispravne vrijednosti za sedmicu " + p.prSedmica + " za properties " + s + "!"};
          }
          
          if((p.prisutan + p.odsutan + p.nijeUneseno) > 8)
            return {greska: "Parametar listaPrisustva nema ispravnu zbirnu vrijednost!"};
          ukupno_prisutan = ukupno_prisutan + p.prisutan;
          ukupno_odsutan = ukupno_odsutan + p.odsutan;
          nijeUneseno = nijeUneseno + p.nijeUneseno;
          if(p.prSedmica == sedmica) {
            prisustvoZaSedmicu.prisutan = p.prisutan;
            prisustvoZaSedmicu.odsutan = p.odsutan;
            prisustvoZaSedmicu.nijeUneseno = p.nijeUneseno;
          }
        }
      };
      this.prisustvo = (ukupno_prisutan) / (ukupno_prisutan + ukupno_odsutan);
      if(nijeUneseno == 0) this.finalnoStanje = true;
      return prisustvoZaSedmicu;
    }
  }
  let pr = new Prisustvo();
 // Prisustvo.trenutnaSedmica = 7;
 pr.trenutnaSedmica=7;
  
  const lista = [{ prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }];
  // pogresan parametar sedmica
  console.log(pr.izracunajPrisustvo(16, lista)); // treba vratiti {greska: "Parametar sedmica nema vrijednost u rasponu od 1 do 15!"}
  console.log(pr.izracunajPrisustvo(10, lista)); // treba vratiti {greska: "Parametar sedmica mora imati vrijednost koja je manja od trenutne sedmice!"}
  
  // pogresan parametar listaPrisustva
  const lista1 = [{ prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }, { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }, { prSedmica: 1, prisutan: -1, odsutan: -1, nijeUneseno: 1 }];
  console.log(pr.izracunajPrisustvo(2, lista1)); // treba vratiti {greska: "Parametar listaPrisustva nema ispravne vrijednosti za sedmicu 1 za properties [prisutan,odsutan]!"}
  
  const lista2 = [{ prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }, { prSedmica: 4, prisutan: -2, odsutan: -2, nijeUneseno: -1 }, { prSedmica: 1, prisutan: -1, odsutan: -1, nijeUneseno: 1 }];
  console.log(pr.izracunajPrisustvo(2, lista2)); // treba vratiti {greska: "Parametar listaPrisustva nema ispravne vrijednosti za sedmicu 4 za properties [prSedmica,prisutan,odsutan,nijeUneseno]!"}
  
  // ispravna lista
  const lista3 = [{ prSedmica: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0 }, { prSedmica: 1, prisutan: -1, odsutan: -1, nijeUneseno: 1 }, { prSedmica: 1, prisutan: 2, odsutan: 2, nijeUneseno: 1 }];
  console.log(pr.izracunajPrisustvo(2, lista3)); // lista je ispravna i treba vratiti {prisustvoZaSedmicu: 2, prisutan: 5, odsutan: 2, nijeUneseno: 0}
  console.log(pr.izracunajPrisustvo(5, lista3)); // lista je ispravna ali sedmica ne postoji u listi tako da treba vratiti {prisustvoZaSedmicu: 5, prisutan: -1, odsutan: -1, nijeUneseno: -1}
  
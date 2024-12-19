class Predmet{
    static kodPredmeta;
    
    provjeriKodPredmeta(kod){                   
        const arr=kod.split("-");
        var velicina=arr.length;
        if (velicina!=4)
        return false;       
        if(arr[0]!="RI" &&  arr[0]!="AE" && arr[0]!="EE" && arr[0]!="TK")
        return false;
        if(arr[1]!="BoE" && arr[1]!="MoE" && arr[1]!="RS" )
        return false;
        if(arr[2]!=1 && arr[2]!=2 && arr[2]!=3)
        return false;
        if((arr[1]=="MoE" || arr[1]=="RS")&&(arr[2]!=1 && arr[2]!=2)) 
        return false;
        if(arr[3]!=1 && arr[3]!=2)
        return false;

        return true;    
       
    }
    }
    /*let pp=new Predmet();   
console.log(pp.provjeriKodPredmeta("RI-BoE-1-1"));
console.log(pp.provjeriKodPredmeta("TK-MoE-3-1"));
console.log(pp.provjeriKodPredmeta("AE-BoE-1"));
console.log(pp.provjeriKodPredmeta("RS-boe-1-2"));
*/

module.exports=Predmet

const AjaxPozivi = (() => {
   const posaljiStudent = (studentObjekat, callback) => {
      //XMLHttpRequest za Ajax poziv
      const xhr = new XMLHttpRequest();
  
      xhr.open('POST', 'http://localhost:8080/student', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
  
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
        
          callback(null, JSON.parse(xhr.responseText));
        } else {
       
          callback(xhr.statusText, null);
        }
      };
  
      xhr.onerror = function() {
    
        callback(xhr.statusText, null);
      };
  
      xhr.send(JSON.stringify(studentObjekat));
    }


    const posaljiPredmet = (predmetObjekat, callback) => {
     
        const xhr = new XMLHttpRequest();
    
        xhr.open('POST', 'http://localhost:8080/predmet', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
    
        xhr.onload = function() {
          if (xhr.status >= 200 && xhr.status < 300) {
           
            callback(null, JSON.parse(xhr.responseText));
          } else {
            
            callback(xhr.statusText, null);
          }
        };
    
        xhr.onerror = function() {
         
          callback(xhr.statusText, null);
        };
    
        xhr.send(JSON.stringify(predmetObjekat));
      }


      
      const posaljiPrisustvo=(prisustvoObjekat, callback) =>{
        const xhr = new XMLHttpRequest();

        xhr.open('POST', 'http://localhost:8080/prisustvo', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
    
        xhr.onload = function() {
          if (xhr.status >= 200 && xhr.status < 300) {
            
            callback(null, JSON.parse(xhr.responseText));
          } else {
          
            callback(xhr.statusText, null);
          }
        };
    
        xhr.onerror = function() {
         
          callback(xhr.statusText, null);
        };
    
        xhr.send(JSON.stringify(prisustvoObjekat));
      }

      
      const dajPrisustvo = (kodPredmeta, indexStudenta, sedmica, callback) => {
   
    const xhr = new XMLHttpRequest();
    const url = `/prisustvo?kodPredmeta=${kodPredmeta}&indexStudenta=${indexStudenta}&sedmica=${sedmica}`;
    xhr.open('GET', url, true);
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
       
        callback(null, JSON.parse(xhr.responseText));
      } else {
       
        callback(xhr.statusText, null);
      }
    };
    xhr.onerror = function() {
      
      callback(xhr.statusText, null);
    };
    xhr.send();
  };

  
      return {
        posaljiStudent,
        posaljiPredmet,
        posaljiPrisustvo,
       dajPrisustvo
      }
  })();
  //module.exports = AjaxPozivi;
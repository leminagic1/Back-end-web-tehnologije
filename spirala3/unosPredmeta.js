

function callback(error, data) {
    if (error != '') {
        document.getElementById('odgovor').innerHTML = error;
        document.getElementById('odgovor').style.color = 'red';
    } else if (error == '') {
        document.getElementById('odgovor').innerHTML = data;
        document.getElementById('odgovor').style.color = 'green';
    }
}
function foo() {
    var naziv = document.getElementById('nazivPredmeta').value;
    var kod = document.getElementById('kodPredmeta').value;
    var obj = {
        naziv: `${naziv}`,
        kod: `${kod}`
    };
    AjaxPozivi.posaljiPredmet(obj, callback);
}

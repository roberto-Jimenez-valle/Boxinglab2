//FUNCIONES GENERALES

function guardarCambioIdioma(lang){
    
    var data=JSON.parse(localStorage.getItem('BoxingLab-606608'));
    data.perfil.idioma=lang;

    var f = new Date();
    var fechaActual = f.getTime();
    data.fechaMod = fechaActual;
    localStorage.setItem('BoxingLab-606608',JSON.stringify(data)); 
}

function cambiarIdioma(idioma) {
    lang = idioma;
    var elems = document.querySelectorAll('[data-tr]');
    for (var x = 0; x < elems.length; x++) {
        elems[x].innerHTML = idi.hasOwnProperty(lang)
            ? idi[lang][elems[x].dataset.tr]
            : elems[x].dataset.tr;
    }
    guardarCambioIdioma(lang);
}
function calculaEdad(birthday) {
    var birthday_arr = birthday.split("-");
    var birthday_date = new Date(birthday_arr[0], birthday_arr[1] - 1, birthday_arr[2]);
    var ageDifMs = Date.now() - birthday_date.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function getParameterURL(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = 'No network connection';
    
    return states[networkState];
}
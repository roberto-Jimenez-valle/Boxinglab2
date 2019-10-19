function calibrando(){
    $("#btn-pregunta").hide();
    $("#calibrando").show();
}

function empezarDesafio(){
    window.location = window.localStorage.getItem("boxinglab-rutinas-url");
}

var watchID = null;

function onReadyCalibration(){
    watchID = navigator.accelerometer.watchAcceleration(onCalibration, onError, { frequency: 50 });
}

function onCalibration(acceleration) {

    if (on && nuloon) {
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;
    }
}

document.addEventListener("deviceready", onReadyCalibration(true), false);
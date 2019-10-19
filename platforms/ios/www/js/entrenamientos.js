var watchID = null,
    sonido = null,
    datos = [],
    perfil = null,
    edad = 0,
    peso = 0,
    altura = 0,
    resulcalorias = null,
    audi = null,
    bell = null,
    tamCirculos = 0,
    restaX = 0,
    restaY = 0,
    tamTime = 0,
    golpesTotales=0,
    cf = null,
    c1 = null,
    c2 = null,
    c3 = null,
    c4 = null

function reset() {
    stopStart();
    $(".modal").modal("open");
}

function successCallback(result) {
    console.log(result); // true - enabled, false - disabled
}

function errorCallback(error) {
    console.log(error);
}

// device APIs are available
function onDeviceReady() {
    $("body").css("max-width", screen.width);
    $(".modal").modal();
    if (location.href.includes("entrenamiento.html")) {
        if (!screen.orientation.type.includes("portrait")) {
            if (location.href.replace("entrenamiento", "entrenamientoH").includes("entrenamientoHH")) {
                location.href = location.href.replace("entrenamientoHH", "entrenamientoH");
            }
            else {
                location.href = location.href.replace("entrenamiento", "entrenamientoH");
            }
        }
    }

    if (!screen.orientation.type.includes("portrait")) {
        tamCirculos = 0.19;
        restaX = 9.81;
        restaY = 0;
        tamTime = screen.height - 100;
        var tamheiht=$("#rounds").height()+$(".botonesP").height();
        $("#golpea").css("height", window.screen.height - tamheiht);
        var margen = (window.screen.height * 28.5 / 360) + "%";
        $("#golpea").css("margin-left", margen);
    }
    else {
        tamCirculos = 0.34;
        restaX = 0;
        restaY = 9.81;
        tamTime = screen.width - 90;
        $("#golpea").css("width", window.screen.width);
        var margen = (window.screen.width * 8.5 / 411)+"%";
        $("#golpea").css("margin-left", margen);
    }
    
    iniciaCirculos();
    
    if(window.plugins!=undefined){
        window.plugins.insomnia.keepAwake();
        window.plugins.preventscreenshot.enable(successCallback, errorCallback);
    }


    desafio = getParameterURL("desafio");
    var rutin = JSON.parse(window.localStorage.getItem("boxinglab-rutinas"));
    for (var item in rutin) {
        if (rutin[item].nombre == desafio) {
            numrutina = item;
            totalSeg = rutin[item].rondas[0].tiempo;
            rondas = rutin[item].rondas.length;
            TotalDeAsaltos = rutin[numrutina].rondas.length;
            $("#numronda").html('<span style="font-size: 1.1em;">' + ((Math.round(rondaActual / 2)) + '/</span>' + '<span style="font-size: 0.8em;color:darkgray;">' + parseInt(TotalDeAsaltos) / 2 + '</span>'));
        }
    }
    var data = JSON.parse(localStorage.getItem('BoxingLab-606608'));
    usu = data;
    cambiarIdioma(usu.perfil.idioma);
    nivel = parseFloat(usu.calibrado)*2.5;
    sacoBoxeo = usu.pesosaco;
    perfil = usu.perfil;
    edad = calculaEdad(perfil.fechanacimiento);
    peso = perfil.peso;
    altura = perfil.altura;


    function onError() {
        alert('onError!');
    }
    //watchID = navigator.gyroscope.watchGyroscope(onSuccess, onError, { frequency: 50 });
    watchID= navigator.accelerometer.watchAcceleration(onSuccessA, onError, { frequency: 50 });

    audi = new Media("file:///android_asset/www/sonidos/golpe1.mp3",
        // success callback
        function () { console.log("playAudio():Audio Success"); },
        // error callback
        function (err) {
            console.log("playAudio():Audio Error: " + err);
        });

    bell = new Media("file:///android_asset/www/sonidos/bellBoxing.mp3",
        // success callback
        function () { console.log("playAudio():Audio Success"); },
        // error callback
        function (err) {
            console.log("playAudio():Audio Error: " + err);
        });

    setTimeout(() => {
        $(".estadisticasCir").css("margin-top", (screen.height - ($("#circuloTime").height() + $(".estadisticasCir").height())) / 2);
        $(".loader-page").css({ visibility: "hidden", opacity: "0.5" })
    }, 500);

    //$(".page-logro").load("logro.html");
    //$(".page-logro").css("margin-left", "-99999px");

    /*var vieneLogro = getParameterURL("logro");
    if (vieneLogro=="true"){
        window.location ="logro.html"
        //$("#entrenamiento").css("margin-left", "-99999px");
        //$(".page-logro").css("margin-left", "0px");
    }
    else{
        //$("#entrenamiento").css("margin-left", "0px");
        //$(".page-logro").css("margin-left", "-99999px");
    }*/

    //$(".objetivo-100").load("objetivo100x100.html");
    //$(".objetivo-100").css("margin-left", "-99999px");
}

var x = 0,
    z = 0,
    y = 0,
    xold = 0,
    zold = 0,
    yold = 0,
    intensidadOld = 0,
    timestamp = 0,
    timestampOld = 0,
    activo = false,
    formulaOld = 0,
    cont = 0,
    fuerza = 0,
    fuerzag = 0,
    nivelador = 0,
    arrFormulas = []


var ADAPTIVE_ACCEL_FILTER = true;
var lastAccel = [0,0,0];
var accelFilter = [0,0,0];



function clamp(v, min, max)
{
    if (v > max)
        return max;
    else if (v < min)
        return min;
    else
        return v;
}

function norm(x, y, z) {
    return Math.sqrt(x * x + y * y + z * z);
}

var linear_acceleration=[0,0,0];
var gravity = [0, 0, 0];
function quitaGravedad(acelx, acely, acelz){
    var alpha = 0.8;

    gravity[0] = parseFloat(alpha * gravity[0] + (1 - alpha) * acelx);
    gravity[1] = parseFloat(alpha * gravity[1] + (1 - alpha) * acely);
    gravity[2] = parseFloat(alpha * gravity[2] + (1 - alpha) * acelz);

    linear_acceleration[0] = parseFloat(acelx - gravity[0]);
    linear_acceleration[1] = parseFloat(acely - gravity[1]);
    linear_acceleration[2] = parseFloat(acelz - gravity[2]);

    var r = norm(linear_acceleration[0], linear_acceleration[1], linear_acceleration[2]);
    return r;
}

function pasoAlto(accelX, accelY, accelZ) {
    // high pass filter

    var updateFreq = parseFloat(50); // match this to your update speed
    var cutOffFreq = parseFloat(0.05);
    var RC = parseFloat(1.0 / cutOffFreq);
    var dt = parseFloat(1.0 / updateFreq);
    var filterConstant = 0.05;//parseFloat(RC / (dt + RC));
    var alpha = parseFloat(filterConstant);
    var kAccelerometerMinStep = parseFloat(0.033);
    var kAccelerometerNoiseAttenuation = parseFloat(3.0);

    if (ADAPTIVE_ACCEL_FILTER) {
        var d = parseFloat(clamp(Math.abs(norm(accelFilter[0], accelFilter[1], accelFilter[2]) - norm(accelX, accelY, accelZ)) / kAccelerometerMinStep - 1.0, 0.0, 1.0));
        alpha = d * filterConstant / kAccelerometerNoiseAttenuation + (1.0 - d) * filterConstant;
    }

    accelFilter[0] = parseFloat((alpha * (accelFilter[0] + accelX - lastAccel[0])));
    accelFilter[1] = parseFloat((alpha * (accelFilter[1] + accelY - lastAccel[1])));
    accelFilter[2] = parseFloat((alpha * (accelFilter[2] + accelZ - lastAccel[2])));

    lastAccel[0] = accelX;
    lastAccel[1] = accelY;
    lastAccel[2] = accelZ;
    var r = norm(accelX, accelY, accelZ);
    return r;
}
var lastAccelr = 0;
function pasoBajo(r) {
    var kFilteringFactor = parseFloat(0.6);
    var accelr = (r * kFilteringFactor) + (lastAccelr * (1.0 - kFilteringFactor));
    lastAccelx = accelr;
    var r = accelr;
    return r;
}

var lastAccelr2 = 0;
function pasoBajo2(r) {
    var kFilteringFactor = parseFloat(1.3);
    var accelr = (r * kFilteringFactor) + (lastAccelr * (1.0 - kFilteringFactor));
    lastAccelr2 = accelr;
    var r = accelr;
    return r;
}


var input = [];
var noCount=false;
var r=0;
var bajo=false;
var golpesValidos=[];
var golpesValidosLast = 0;
var filtroPunch = [];
var golpeEstrella=3;
var ultimoGolpe=10;

var gyrox=0;
var gyroy = 0;
var gyroz = 0;

function gyroscopeSuccess(Orientation){
    gyrox = Orientation.x;
    gyroy = Orientation.y;
    gyroz = Orientation.z;
}

function pbiir(ant, act) {
    var vari = 0.5;
    var r = (1 - vari) * act + vari * ant;
    return r;
}


var ang_x = 0, ang_y = 0, ang_z = 0, ang_x_prev = 0, ang_y_prev = 0, ang_z_prev = 0, tiempo_prev=0;

function filtroComplementario(acel, gyro){

    var ax = acel.x;
    var ay = acel.y;
    var az = acel.z;
    var gx=gyro.x;
    var gy=gyro.y;
    var time=acel.timestamp;

    dt = 0.010;
    tiempo_prev = time;
    var accel_ang_x=0;
    var accel_ang_y=0;
    if(screen.orientation.type.includes("portrait")) {
        ay = acel.z;
        az = acel.y;
        //Calcular los ángulos con acelerometro
        accel_ang_x = parseFloat(Math.atan(-ax / Math.sqrt(Math.pow(ay, 2) + Math.pow(az, 2))))*(180.0/3.14);
        accel_ang_y = parseFloat(Math.atan(ay / Math.sqrt(Math.pow(ax, 2) + Math.pow(az, 2)))) * (180.0 / 3.14);
    }
    else{
        ax = acel.z;
        az = acel.x;
        //Calcular los ángulos con acelerometro
        accel_ang_x = parseFloat(Math.atan(-ax / Math.sqrt(Math.pow(ay, 2) + Math.pow(az, 2)))) * (180.0 / 3.14);
        accel_ang_y = parseFloat(Math.atan(ay / Math.sqrt(Math.pow(ax, 2) + Math.pow(az, 2)))) * (180.0 / 3.14);
    }

    //Calcular angulo de rotación con giroscopio y filtro complementario
    ang_x = 0.98 * (ang_x_prev + (gx / 131) * dt) + 0.02* accel_ang_x;
    ang_y = 0.98 * (ang_y_prev + (gy / 131) * dt) + 0.02* accel_ang_y;
  
    var r = [ang_x, ang_y]

    ang_x_prev = ang_x;
    ang_y_prev = ang_y;

    
    return r;
}
var acel = null;
function gyroscopeSuccess(Orientation){
    var f = filtroComplementario(acel,Orientation)
    
}

var pasoA=0;
var pasoB=0;

function algorit(){

    
    
    if (pasoB > parseFloat(ultimoGolpe) && cont == 0) {

        golpeValido(r);
        cont++;
        ultimoGolpe = pasoB;
    }
    
}

var datpb2 = 10;
var cont = 0;
var ultimoGolpe = 2;
var ante = 0;
var futuro=0;
function onSuccessA(acceleration) {

    if (on && nuloon) {
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;

        var r = quitaGravedad(x, y, z)
        ante = parseFloat(pbiir(ante, r)) 

        if (cont != 0) {
            if ((cont == 1) && futuro==1){
                golpeValido(r)

                datpb2 = r + 5 //datpb[i]+7)
                ultimoGolpe = r + 5;
            }
            futuro=0;
            cont++;
            datpb2=ultimoGolpe
        }
 
        if (r > datpb2 && (r - datpb2) > parseFloat(nivel) && cont == 0) {
            cont++;
            futuro=1;
        }
        else {
            var r = datpb2
            if (cont == 0) {

                if (r > parseFloat(nivel)) {
                    r = r * 1.7/ 2;
                }
                else {
                    r = parseFloat(nivel);
                }
                datpb2=r
            }
        }

        if (cont > 1) {
            cont = 0;
        }
    }
}


function formulaFuerza(aceleracion) {
    return sacoBoxeo * aceleracion;
}

function golpeValido(resultado) {
    if (ini) {
        bell.stop();
        bell.play();
        startTime();
        ini = false;
        $("#golpea").css("display", "none");
        $("#golpesEntrena").css("display", "block");
    }
    setTimeout(() => {
        golpesTotales++;
        resultado = resultado*10 / 2;
        ngolpes++;
        audi.stop();
        audi.play();
        $("#golpesEntrena").html(ngolpes);
        datos.push(resultado);
        fuerzag = resultado;
        if (resultado > fuerzarecord) {
            fuerzarecord = resultado;
        }
        if (fuerzamenor > resultado) {
            fuerzamenor = resultado;
        }
        sumaFuerzas = sumaFuerzas + resultado;

        var inten = (sumaFuerzas / ngolpes);
        intensidad = (Math.trunc(inten) / 100);
        setTimeout(function () {
            c3.circleProgress('value', intensidad / 10);
        }, 100);

        setTimeout(function () {
            cf.circleProgress('value', fuerzag / 1000);
        }, 100);

        var m = minutes;
        var s = seconds;
        var calor = ((resultado / 1000) * (parseInt(peso) * 2.2)) * 0.25;
        calorias = calorias + (Math.round(calor) / 1000);
        setTimeout(function () {
            c2.circleProgress('value', calorias / 10);
        }, 100);

        if (desafio == "calorias") {
            var numero = getParameterURL("calorias");
            resul = ((calorias) / numero) * 100;
            setTimeout(function () {
                c1.circleProgress('value', resul);
            }, 100);
        }
        else if (desafio == "golpes") {
            var golpes = getParameterURL("golpes");
            resul = (ngolpes / parseInt(golpes));
            setTimeout(function () {
                c1.circleProgress('value', resul);
            }, 100);
        }
        else if (desafio == "superate") {
            if (intensidadOld < intensidad) {
                speak("¡te superaste!");
                var inten = intensidad;
                resul = 1;
                setTimeout(function () {
                    c1.circleProgress('value', resul);
                }, 100);
                intensidadOld = intensidad;
            }
        }
        else if (desafio == "nivel") {
            var nivel2 = getParameterURL("nivel");
            resul = parseFloat(c1.circleProgress('value')) + (resultado / parseInt(nivel2 * 10)) / 1000;
            setTimeout(function () {
                c1.circleProgress('value', resul);
            }, 100);
        }
        else if (desafio == "rutinabasica") {
            resul = 0;
        }
    }, 5);
}

// onError: Failed to get the acceleration
function onError() {
    alert('Error');
}

var iniciosFace=0;
//circle rondas
function iniciaCirculos() {

    c4 = $('#rondascir');

    c4.circleProgress({
        startAngle: -Math.PI / 9 * 4.5,
        value: 0.0,
        size: tamTime,
        lineCap: 'round',
        fill: { gradient: ['#66fe70', '#00ADB5'] }
    }).on('circle-animation-progress', function (event, progress, stepValue) {
        $(this).find('strong').text(min + ":" + seg);

        /*if (iniciosFace==0){
            $(this).prepend('<img id="golpea" src="img/golpea.gif" style="position: absolute;display: none;width: 210px;margin-left: 7.44526%;margin: 40px;border-radius: 116px;">')

            $(this).prepend('<span id="golpesEntrena" style="font-size: 2em;position: absolute;width: 100%;margin-top: 30px;display: block;opacity: 1;" class="center">3000</span>')

            $(this).prepend('<img id="imgFace" src="">');
            iniciosFace=1;
        }*/
    });


    //circle Fuerza
    cf = $('#cirFuerza');

    cf.circleProgress({
        startAngle: -Math.PI / 9 * 4.5,
        value: 0.00,
        size: screen.width * tamCirculos,
        lineCap: 'round',
        fill: { gradient: ['#478a11', '#95de54'] }
    }).on('circle-animation-progress', function (event, progress, stepValue) {
        $(this).find('strong').text(Math.round(fuerzag));
    });

    //circle Golpes
    c3 = $('#cirGolpes');

    c3.circleProgress({
        startAngle: -Math.PI / 9 * 4.5,
        value: 0.00,
        size: screen.width * tamCirculos,
        lineCap: 'round',
        fill: { gradient: ['#DBFF33', '#636A12'] }
    }).on('circle-animation-progress', function (event, progress, stepValue) {
        $(this).find('strong').text(Math.round(intensidad * 100));
    });

    //circle calorias
    c2 = $('#cirCalorias');

    c2.circleProgress({
        startAngle: -Math.PI / 9 * 4.5,
        value: 0.00,
        size: screen.width * tamCirculos,
        lineCap: 'round',
        fill: { gradient: ['#FFBD33', '#FC1111'] }
    }).on('circle-animation-progress', function (event, progress, stepValue) {
        $(this).find('strong').text(Math.round(calorias * 100));
    });

    //circle objetivo
    c1 = $('#cirObjetivo');

    c1.circleProgress({
        startAngle: -Math.PI / 9 * 4.5,
        value: 0.00,
        size: screen.width * tamCirculos,
        lineCap: 'round',
        fill: { gradient: ['#BC3AAC', '#4A3ABC'] }
    }).on('circle-animation-progress', function (event, progress, stepValue) {
        $(this).find('strong').text((resul * 100).toFixed(0) + "%");
    });
}

document.addEventListener("deviceready", onDeviceReady, false);

window.addEventListener("orientationchange", function () {

    if (screen.orientation.type.includes("portrait")) {
        location.href = location.href.replace("entrenamientoH", "entrenamiento");
    } else {
        if (location.href.replace("entrenamiento", "entrenamientoH").includes("entrenamientoHH")) {
            location.href = location.href.replace("entrenamientoHH", "entrenamientoH") + "&logro=" + hayLogro;
        }
        else {
            location.href = location.href.replace("entrenamiento", "entrenamientoH") + "&logro=" + hayLogro;
        }
    }
});


var sonido = null,
usu2 = null,
sacoBoxeo2=30,
nivel2=6,
ngolpescal=0
audi=null;

// device APIs are available
function onDeviceReady2(pasa) {
  
       usu2 = JSON.parse(localStorage.getItem('BoxingLab-606608'));
       nivel2 = parseInt(usu2.calibrado);
       sacoBoxeo2 = parseInt(usu2.pesosaco);
       
       if(pasa){
           if(usu2.pesosaco==undefined){
               $("#example-2").bubbleSlider().setValue(25);
           }
           else{
               $("#example-2").bubbleSlider().setValue(sacoBoxeo2);
           }
           if (usu2.calibrado == undefined) {
               $("#example-3").bubbleSlider().setValue(5);
           }
           else{
               $("#example-3").bubbleSlider().setValue(nivel2);
           }
       }
       else{
           //DBMeter.start(function (dB) {
               //dbmeter = Math.trunc(dB);
           //});
           function onError() {
               alert('onError!');
           }
           var options = { frequency: 50 };
           //watchID1 = navigator.gyroscope.watchGyroscope(onSuccess1, onError, options);
           watchID2 = navigator.accelerometer.watchAcceleration(onSuccess1, onError, options);
           ngolpescal = 0;
       }

   audi = new Media("file:///android_asset/www/sonidos/golpe1.mp3",
       // success callback
       function () { console.log("playAudio():Audio Success"); },
       // error callback
       function (err) { console.log("playAudio():Audio Error: " + err); 
   });   

    cambiarIdioma(lang);
}

var x = 0,
   z = 0,
   y = 0,
   formulaOld = 0,
   milis=0,
   activo=false,
   cont=0,
   fuerza=0,
   nivelador=0,
   arrFormulas=[]


function getNum(val) {
    
       if (isNaN(val) || !isFinite(val)) {
           return 0;
       }
       return val;
   }

function norm(x, y, z) {
    return Math.sqrt(x * x + y * y + z * z);
}

var linear_acceleration = [0, 0, 0];
var gravity = [0, 0, 0];
function quitaGravedad(acelx, acely, acelz) {
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

function pbiir(ant, act) {
    var vari = 0.5;
    var r = (1 - vari) * act + vari * ant;
    return r;
}

var datpb2 = 10;
var cont = 0;
var ultimoGolpe = 2;
var ante = 0;
function onSuccess1(acceleration) {
   //Inicializamos las variables de los ejes
    x = acceleration.x;
    z = acceleration.z;
    y = acceleration.y;

    var r = quitaGravedad(x, y, z)
    ante = parseFloat(pbiir(ante, r))

    if (cont != 0) {
        if ((cont == 1) && futuro == 1) {
            golpeValido(r)

            datpb2 = r + 5 //datpb[i]+7)
            ultimoGolpe = r + 5;
        }
        futuro = 0;
        cont++;
        datpb2 = ultimoGolpe
    }

    if (r > datpb2 && (r - datpb2) > (parseFloat(nivel2)*2.5) && cont == 0) {
        cont++;
        futuro = 1;
    }
    else {
        var r = datpb2
        if (cont == 0) {

            if (r > (parseFloat(nivel2)*2.5)) {
                r = r * 1.7 / 2;
            }
            else {
                r = (parseFloat(nivel2)*2.5);
            }
            datpb2 = r
        }
    }

    if (cont > 1) {
        cont = 0;
    }
}


document.addEventListener("deviceready", onDeviceReady2(true), false);
   

function golpeValido2(resultado) {
    setTimeout(() => {
        ngolpescal++;
        audi.stop();
        audi.play();
        $("#ngolpe2").html(ngolpescal);
    },5);
}

function calibrar2() {
   stopWatch2();
   $(".resul").html('');
   
    var json=JSON.parse(localStorage.getItem('BoxingLab-606608'));
    json.pesosaco=$("#example-2").val();
    json.calibrado=$("#example-3").val();

    var f = new Date();
    var fechaActual = f.getTime();
    json.fechaMod = fechaActual;

    localStorage.setItem('BoxingLab-606608', JSON.stringify(json));
    $("#ngolpe2").html(0);
    onDeviceReady2(false);
}


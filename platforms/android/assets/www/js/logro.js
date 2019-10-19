fotoCargada = function (imageURI) {
    setTimeout(function () {
        $("#foto").attr("src", imageURI);
    }, 500);
    setTimeout(function(){
        segunOrientacion();
    },700);
}

function onFail(message) {
    alert('Failed because: ' + message);
}

cargarFoto = function (pictureSourceType) {
    var options = {
        sourceType: pictureSourceType,
        //encodingType: Camera.EncodingType.JPEG,
        //mediaType: Camera.MediaType.PICTURE,
        destinationType: Camera.DestinationType.FILE_URI,
        //targetWidth: 380,
        //targetHeight: 380,
        quality: 100,
        correctOrientation: true,
        saveToPhotoAlbum: true,
        //allowEdit: true,
        cameraDirection: 1,
    };
    navigator.camera.getPicture(fotoCargada, onFail, options);
    setTimeout(function () {
        segunOrientacion();
    }, 500);
}

var buttonAction = document.querySelector('#button-action');
buttonAction.addEventListener('click', function () { cargarFoto(Camera.PictureSourceType.CAMERA) });
var buttonGallery = document.querySelector('#button-gallery');
buttonGallery.addEventListener('click', function () { cargarFoto(Camera.PictureSourceType.PHOTOLIBRARY) });

function capturar() {

    $(".botones").css("display","none");
    $("#premios").css("margin-top", "0px");
    $("#logo").css("display", "block");
    var tx="";
    if(lang=="es"){
        tx = "Tú también puedes superarte, Descarga Boxing Lab";
    }
    else{
        tx = "You can also improve yourself, Download Boxing Lab";
    }
    setTimeout(function(){
        navigator.screenshot.URI(function (error, res) {
            if (error) {
                console.error(error);
                $(".botones").css("display", "block");
                $("#logo").css("display", "none");
            } else {
                window.plugins.socialsharing.share(tx, null, res.URI, "https://play.google.com/store/apps/details?id=io.cordova.boxinglab",function(){
                    $(".botones").css("display", "block");
                    $("#logo").css("display", "none");
                });
            }
        }, 100);
    },500);
    setTimeout(function () {
        segunOrientacion();
    }, 700);
}

function otherShare() {
    capturar();
};

function segunOrientacion(){
    setTimeout(function () {
        $("body").css("max-width", screen.width);
        $("body").css("max-height", screen.height);
    }, 300);
    if (screen.orientation.type.includes("portrait")) {
        $("#contenedor-logro").css("width", screen.width);

        $("#foto").css("width", "auto");
        $("#foto").css("height", screen.width * 98 / 100);

        if ($("#foto").width() > $("#foto").height() ){
            $("#foto").css("width", screen.width * 66 / 100);
            $("#foto").css("height", "auto");
        }
        else{
            $("#foto").css("width", "auto");
            $("#foto").css("height", screen.width * 98 / 100);
        }

        $(".button-container").css("margin-top","-30px");
        $("#fuerza").css("margin-top", "-16px");
        $("#calorias").css("margin-top", "-16px");
        $("#premios").css("margin-top", "-10px");
    } else {
        $("#contenedor-logro").css("width", screen.height * 66 / 100);
        $("#foto").css("height", screen.height * 66 / 100);
        $("#foto").css("width", "auto");
        $("#contenedor-logro").css("height", "auto");
        $(".button-container").css("margin-top", "-60px");
        $("#fuerza").css("margin-top", "-190px");
        $("#calorias").css("margin-top", "-190px");
        $("#premios").css("margin-top", "-55px");
    }
}

var soundFinal=null;
function onDeviceReady(){

    soundFinal = new Media("file:///android_asset/www/sonidos/final.mp3",
        // success callback
        function () { console.log("playAudio():Audio Success"); },
        // error callback
        function (err) {
            console.log("playAudio():Audio Error: " + err);
        });
    
    var json = JSON.parse(localStorage.getItem('BoxingLab-606608'));
    setTimeout(function () {

        segunOrientacion();
        if (screen.orientation.type.includes("portrait")) {
            $("#foto").css("width", "80%");
            $("#foto").css("height","auto");
        }
        soundFinal.stop();
        soundFinal.play();
    }, 300);
    var cinturon = getParameterURL("cinturon");
    var fuerza = getParameterURL("fuerza");
    var golpes = getParameterURL("golpes");
    var calorias = getParameterURL("calorias");
    var valor = getParameterURL("valor");

    if(cinturon!="" && valor!=""){
        $("#cuadroResultados #valor").html(valor);
        $("#cuadroResultados #fuerza").hide();
        $("#cuadroResultados #calorias").hide();
        $("#cuadroResultados #golpes").hide();
        $("#imgCinto").attr("src", "img/logros/"+cinturon+".svg");
    }
    else if (cinturon != "") {
        $("#cuadroResultados").hide();
        $("#cuadroResultados #valor").hide();
        $("#imgCinto").attr("src", "img/logros/" + cinturon + ".svg");
    }
    else{
        $("#imgCinto").hide();
        $("#cuadroResultados #valor").hide();
        $("#cuadroResultados #golpes .num").html(golpes);
        $("#cuadroResultados #fuerza .num").html(fuerza);
        $("#cuadroResultados #calorias .num").html(calorias);
    }

    window.addEventListener("orientationchange", function () {
        segunOrientacion();
    });

    cambiarIdioma(json.perfil.idioma);
}

document.addEventListener("deviceready", onDeviceReady, false);

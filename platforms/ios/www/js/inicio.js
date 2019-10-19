var lang = "es",
    pasa = false,
    ia = null,
    watchID2=null

function stopWatch2() {
    if (watchID2) {
        navigator.accelerometer.clearWatch(watchID2);
        watchID2 = null;
    }
}

document.addEventListener("deviceready", onDeviceReady, false);

function successCallback(result) {
    console.log(result); // true - enabled, false - disabled
}

function errorCallback(error) {
    console.log(error);
}

$(window).scroll(function () {
    if ($(this).scrollTop() > 63) {
        $('.tabs-transparent').addClass("fixed").fadeIn();
        $('.tabs-transparent').addClass("margen").fadeIn();
        $(".tab-body").css("margin-top","55px");
    }
    else {
        $('.tabs-transparent').removeClass("fixed");
        $('.tabs-transparent').removeClass("margen");
        $(".tab-body").css("margin-top", "0px");
    }
});

function EditarPerfil() {
    $(".nav-extended").hide();
    $(".tab-body").hide();
    $("#test0").load('registrarse.html');
}       

function cargaDatos(data){
    if (data != null) {
        if (data.perfil == undefined) {
            EditarPerfil();
        }
        else {
            if (data.perfil.nombre == "") {
                EditarPerfil();
            }
            else {
                $(".loader-page").css({ visibility: "visible", opacity: "0" });
                setTimeout(function () {
                    $(".button-collapse").sideNav();
                    $('.dropdown-trigger').dropdown();
                    $("#test2").load('desafios.html');
                    $(".loader-page").css({ visibility: "hidden", opacity: "0.5" });
                    if (JSON.parse(localStorage.getItem('BoxingLab-606608-SESION')) == null) {
                        $("#cerrarSesion").html('<a href="index.html?sesion=1" ><i class="fas fa-user-circle"></i><span data-tr="iniciar_sesion">Iniciar sesión</span></a>');
                        $("#restablecerContrasena").hide();
                        $("#eliminarCuenta").hide();
                    }
                    cambiarIdioma(data.perfil.idioma);
                    $("#nav-correo").text(data.perfil.nombre);

                }, 100);
            }
        }
        return true;
    }
    else{
        return false;
    }

}

function onDeviceReady() {
    var data = JSON.parse(localStorage.getItem('BoxingLab-606608'));

    if (window.plugins != undefined) {
        window.plugins.insomnia.allowSleepAgain();
        window.plugins.preventscreenshot.enable(successCallback, errorCallback);
    }

    $(".tab2").on("click", function () {
        stopWatch2();
    });

    var p3 = true;
    $(".tab3").on("click", function () {
        if (p3) {
            if (ia != null) {
                clearInterval(ia);
            }
            datosv = [];
            $("#test3").load('historia.html');
            p3 = false;
        }
        stopWatch2();
    });

    /*var p4 = true;
    $(".tab4").on("click", function () {
        if (p4) {
            $("#test4").load('calibrado.html');
            p4 = false;
        }
        stopWatch2();
    });*/

    var p5 = true;
    $(".tab5").on("click", function () {
        if (p5) {
            $("#test5").load('logros.html');
            p5 = false;
        }
        stopWatch2();
    });

    $("body").css("max-width", "100%");
    
    var res = cargaDatos(data);
    if (!res){
        window.location = "index.html";  
    }
}

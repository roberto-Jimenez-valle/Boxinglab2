(function(window,document){
    _.controlador('user',{
        restablecerContrasena:function(){
            restablecerContrasena();
        },
        resgistrarDatos: function () {
            registrarDatos();
        },
        crearUsuario: function () {
            creausu();
        },
        eliminarCuenta: function(){
            eliminarCuenta();
        }
    });
})(window,document)

function creausu() {
    $(".modal").modal();
    var email = $("#email").val(),
        password = $("#password").val(),
        password2 = $("#passwordd").val()

    if (email != "") {

        if (password == password2 && password != "") {
            if (password.length >= 6) {
                /*Accede a firebase*/
                firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    login();
                    //window.location = "index.html";
                });
            }
            else {
                $(".msgErrorTamano").show();
                $("#password").val(''),
                    $("#passwordd").val('')
            }
        }
        else {
            $(".msgError").show();
            $("#password").val(''),
                $("#passwordd").val('')
        }
    }
    else {
        $(".msgErrorEmail").show();
        $("#password").val(''),
            $("#passwordd").val('')
    }
}


function registrarDatos(){
    $("body").removeClass("b4");
    $("body").addClass("b2");

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 100, // Creates a dropdown of 15 years to control year,
        min: new Date(1930, 1, 1),
        max: true,
        today: false,
        clear: false,
        close: false,
        closeOnSelect: true, // Close upon selecting a date,
        firstDay: true,
        // The title label to use for the month nav buttons
        labelMonthNext: 'Mes siguiente',
        labelMonthPrev: 'Mes anterior',
        format: 'yyyy-mm-dd',

        // The title label to use for the dropdown selectors
        labelMonthSelect: 'Selecciona un mes',
        labelYearSelect: 'Selecciona un año',

        // Months and weekdays
        monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],

        // Materialize modified
        weekdaysLetter: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],

    });

    var json = JSON.parse(localStorage.getItem('BoxingLab-606608'));

    if (json != null && json != undefined) {
        $("#nombre").val(json.perfil.nombre);
        $("#fechanacimiento").val(json.perfil.fechanacimiento);
        $("#" + json.perfil.sexo).prop("checked", true);
        $("#example-2").bubbleSlider().setValue(json.perfil.peso);
        $("#example-3").bubbleSlider().setValue(json.perfil.altura);
        cambiarIdioma(json.perfil.idioma);
    }
    else {
        $("#example-2").bubbleSlider().setValue(70);
        $("#example-3").bubbleSlider().setValue(175);
    }

    setTimeout(function () {
        $("#sidenav-overlay").click();
        $("#fechanacimiento").focus();
        $("#nombre").focus();
        $("#idiomas-nav a:first").focus();
        $(".loader-page").css({ visibility: "hidden", opacity: "0.5" });
    }, 500);
}

function guardar() {

    if ($('#nombre').val() != "") {
        var data = JSON.parse(localStorage.getItem('BoxingLab-606608'));
        if (data != null) {
            data.perfil.nombre = $('#nombre').val();
            data.perfil.fechanacimiento = $("#fechanacimiento").val();
            data.perfil.sexo = $("input[name=sexo]:checked").attr("id");
            data.perfil.peso = $(".peso").val();
            data.perfil.altura = $(".altura").val();
            data.perfil.idioma = lang;
            var f = new Date();
            var fechaActual = f.getTime();
            data.fechaMod = fechaActual;
        }
        localStorage.setItem('BoxingLab-606608', JSON.stringify(data));
        window.location = "inicio.html";
    }
    else {
        $('#nombre').css("border", "1px solid red");
    }
}

function restablecerContrasena(){
    var auth = firebase.auth();
    var emailAddress = $("#emal").val();

    auth.sendPasswordResetEmail(emailAddress).then(function () {
        $("#textOK").show();
        $("#textKO").hide();
        $(".btn-accion").hide();
        $(".btn-volver").show();
    }).catch(function (error) {
        $("#textKO").show();
        $("#textOK").hide();
    });
    var data = JSON.parse(localStorage.getItem('BoxingLab-606608'));
    cambiarIdioma(data.perfil.idioma);
    setTimeout(function () {
        $(".loader-page").css({ visibility: "hidden", opacity: "0.5" })
    }, 100);
}

function eliminarCuenta(){
    var data = JSON.parse(localStorage.getItem('BoxingLab-606608'));
    cambiarIdioma(data.perfil.idioma);

    $("#eliminabtn").on("click",function(){

        var password = $("#password").val();
        var user = firebase.auth().currentUser;
        var email = user.email;
        var credential = firebase.auth.EmailAuthProvider.credential(
            email,
            password
        );

        user.reauthenticateAndRetrieveDataWithCredential(credential).then(function () {
            firebase.database().ref('/users/' + user.uid).once('value').then(function (snapshot) {
                
                user.delete().then(function () {
                    database.ref('users/' + user.uid).set(
                        null
                    );
                    alert("Cuenta eliminada");
                    location.href="index.html?sesion=1";
                }).catch(function (error) {
                    alert("no se pudo eliminar la cuenta")
                });
            });
        }).catch(function (error) {
            alert("La contraseña es incorrecta");
        });
    });
}
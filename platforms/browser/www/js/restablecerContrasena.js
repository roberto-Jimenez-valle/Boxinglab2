//$("body").css("max-width", screen.width);

function restablecer(){
    var auth = firebase.auth();
    var emailAddress = $("#emal").val();

    auth.sendPasswordResetEmail(emailAddress).then(function() {
        $("#textOK").show();
        $("#textKO").hide();
        $(".btn-accion").hide();
        $(".btn-volver").show();
    }).catch(function(error) {
        $("#textKO").show();
        $("#textOK").hide();
    });
}

var data=JSON.parse(localStorage.getItem('BoxingLab-606608'));
cambiarIdioma(data.perfil.idioma);
setTimeout(function () {
    $(".loader-page").css({ visibility: "hidden", opacity: "0.5" })
}, 100);
//$("body").css("max-width", screen.width);

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

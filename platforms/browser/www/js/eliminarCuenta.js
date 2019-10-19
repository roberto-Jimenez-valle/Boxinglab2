$(function () {

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
});
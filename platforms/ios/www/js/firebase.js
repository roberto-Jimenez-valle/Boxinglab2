// Initialize Firebase
var config = {
    apiKey: "AIzaSyArDXUuFvYm_cF7APWpniIAENVzwdqPsaA",
    authDomain: "app-box-lab.firebaseapp.com",
    databaseURL: "https://app-box-lab.firebaseio.com",
    projectId: "app-box-lab",
    storageBucket: "app-box-lab.appspot.com",
    messagingSenderId: "479094175200"
};
firebase.initializeApp(config);
var database = firebase.database(),
provider = new firebase.auth.GoogleAuthProvider()

var elems = null;
var instances = null;

function initGoogle() {
   /*Accede a firebase*/
    firebase.auth().signInWithRedirect(provider).then(function () {
        firebase.auth().getRedirectResult().then(function (result) {
            var token = result.credential.accessToken;
            user = result.user;
            var f = new Date();
            var fechaActual = f.getTime();
            var miObjetoStorage = { 'tipo': 'google', 'user': user, 'email': null, 'password': null };
            localStorage.setItem('BoxingLab-606608-SESION', JSON.stringify(miObjetoStorage));
            pasa=false;
            volcadoDatos(user);
        }).catch(function (error) {
            var errorCode = error.code;
            console.log("code: " + error.code)
            var errorMessage = error.message;
            alert(error.message);
        });
    });
}

function login() {
    var email = $("#email").val();
    var password = $("#password").val();
    /*Accede a firebase*/
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (confirmationResult) {
            
            var miObjetoStorage = { 'tipo': 'email', 'user': null, 'email': email, 'password': password };
            localStorage.setItem('BoxingLab-606608-SESION', JSON.stringify(miObjetoStorage));
            pasa = false;
            
            var f = new Date();
            var fechaActual = f.getTime();
            setTimeout(function(){
                volcadoDatos(confirmationResult.user);
            },300);
        })
        .catch(function (error) {
            var errorCode = error.code;
            console.log("code: "+error.code)
            var errorMessage = error.message;
            
            var titulo="";
            var texto="";
            if (error.code =="auth/user-not-found"){
                titulo = "Usuario inexistente";
                texto="El usuario introducido no existe, inténtelo de nuevo";
            }
            else if (error.code == "auth/invalid-email") {
                titulo = "Email incorrecto";
                texto = "El email introducido no es válido";
            }
            else if (error.code =="auth/wrong-password"){
                titulo = "Contraseña incorrecta";
                texto = "La contraseña introducida no es correcta";
            }
            else{
                titulo = "Alerta";
                texto = errorMessage;
            }
            $("#modal1 .titulo").html(titulo);
            $("#modal1 .texto").html(texto);
            $(".modal").modal("open");
        });
}

function cerrarSesion(sesion) {
    /*Accede a firebase*/
    firebase.auth().signOut().then(function () {
    localStorage.setItem('BoxingLab-606608-SESION', null);
    if(sesion=="0"){
        window.location = "inicio.html";
    }
    }).catch(function (error) {
        localStorage.setItem('BoxingLab-606608-SESION', null);
    });
}

function volcadoDatos(user) {
    firebase.database().ref('/users/' + user.uid).once('value').then(function (snapshot) {
       
        var f = new Date();
        var fechaActual = f.getTime();
        var localS = JSON.parse(localStorage.getItem('BoxingLab-606608'));
        if (localS != null) {
            if (localS.userid != user.uid){
                localS.fechaMod = fechaActual;
                database.ref('users/' + localS.userid).set(
                    localS
                );
                localStorage.setItem('BoxingLab-606608', JSON.stringify(snapshot.val()));
            }
            else{
                localS.fechaMod=fechaActual;
                database.ref('users/' + user.uid).set(
                    localS
                );
                localStorage.setItem('BoxingLab-606608', JSON.stringify(localS));
            }
            window.location = "inicio.html";
        }
        else {
            if (snapshot.val()) {
                data = snapshot.val();
            }
            else{
                data = {
                    calibrado: 4,
                    entrenamientos: null,
                    fechaMod: fechaActual,
                    userid: user.uid,
                    logros: [{
                        "logro": "cin500",
                        "valor": 0
                    }, {
                        "logro": "cin1000",
                        "valor": 0
                    }, {
                        "logro": "cin1500",
                        "valor": 0
                    }, {
                        "logro": "cin2000",
                        "valor": 0
                    }, {
                        "logro": "cin3000",
                        "valor": 0
                    }, {
                        "logro": "cin5000",
                        "valor": 0
                        },{
                            "logro": "recordcalorie",
                            "valor": 0
                        }, {
                            "logro": "recordforce",
                            "valor": 0
                        }, {
                            "logro": "recordhits",
                            "valor": 0
                        }, {
                            "logro": "nivel1",
                            "valor": 0
                        }, {
                            "logro": "nivel2",
                            "valor": 0
                        }, {
                            "logro": "nivel3",
                            "valor": 0
                        }, {
                            "logro": "nivel4",
                            "valor": 0
                        }, {
                            "logro": "nivel5",
                            "valor": 0
                        }],

                    perfil: {
                        "altura": "172",
                        "fechanacimiento": "",
                        "idioma": "es",
                        "nombre": "",
                        "peso": "73",
                        "sexo": "hombre",
                    },
                    pesosaco: 25
                };

                database.ref('users/' + user.uid).set(
                    data
                );
            }
            localStorage.setItem('BoxingLab-606608', JSON.stringify(data));
            window.location = "inicio.html";
        }
        
    });
}
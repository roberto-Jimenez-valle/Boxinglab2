function writeUserData(datos, intensidad, calorias, fuerzamenor, fuerzarecord, asaltosTotales, objetivo, nuevo, totalTiempo,tipoEntrenamiento) {

    var data = JSON.parse(localStorage.getItem('BoxingLab-606608'));
    var cont = 0;
    var f = new Date();
    var fecha = f.getDate() + "-" + (f.getMonth() + 1) + "-" + f.getFullYear() + "-" + f.getHours() + "-" + f.getMinutes() + "-" + f.getSeconds();
    var golpesTotales = datos.length;
    var datosRecord = 0;
    for (var j in datos) {
        if (datos[j] > datosRecord) {
            datosRecord = datos[j];
        }
    }

    if (data.entrenamientos != null) {
        cont = data.entrenamientos.length
        if (!nuevo) {
            if (data.entrenamientos[(cont - 1)].asaltos != null) {
                var contAsaltos = data.entrenamientos[(cont - 1)].asaltos.length
                data.entrenamientos[cont - 1].asaltos[contAsaltos]={
                    
                    intensidad: intensidad,
                    calorias: calorias,
                    fuerzamenor: fuerzamenor,
                    fuerzarecord: datosRecord,
                    golpesTotales: golpesTotales,
                    objetivo: objetivo,
                    totalTiempo: totalTiempo
                };
            }
            else {
                data.entrenamientos[cont]={
                    fecha: f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear(),
                    tipo: tipoEntrenamiento,
                    asaltos:
                        [{
                            intensidad: intensidad,
                            calorias: calorias,
                            fuerzamenor: fuerzamenor,
                            fuerzarecord: datosRecord,
                            golpesTotales: golpesTotales,
                            objetivo: objetivo,
                            totalTiempo: totalTiempo
                        }]
                };
            }
        }
        else {
            data.entrenamientos[cont]={
                fecha: f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear(),
                tipo: tipoEntrenamiento,
                asaltos:
                    [{
                        intensidad: intensidad,
                        calorias: calorias,
                        fuerzamenor: fuerzamenor,
                        fuerzarecord: datosRecord,
                        golpesTotales: golpesTotales,
                        objetivo: objetivo,
                        totalTiempo: totalTiempo
                    }]

            };
        }
    }
    else {
        data.entrenamientos=[];
        data.entrenamientos.push({
            fecha: f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear(),
            tipo: tipoEntrenamiento,
            asaltos:
                [{
                    intensidad: intensidad,
                    calorias: calorias,
                    fuerzamenor: fuerzamenor,
                    fuerzarecord: datosRecord,
                    golpesTotales: golpesTotales,
                    objetivo: objetivo,
                    totalTiempo: totalTiempo
                }]
        });
    }
    var f = new Date();
    var fechaActual = f.getTime();
    data.fechaMod = fechaActual;
    localStorage.setItem('BoxingLab-606608', JSON.stringify(data));
}

function grabarDatos(intensidad, calorias, fuerzamenor, fuerzarecord, asaltosTotales, objetivo, nuevo, totalTiempo,tipoEntrenamiento) {
    writeUserData(datos, Math.round(intensidad), calorias, Math.round(fuerzamenor), Math.round(fuerzarecord), asaltosTotales, objetivo, nuevo, totalTiempo, tipoEntrenamiento);
    document.addEventListener("online", Online, false);
    datos = [];
}

function Online(){
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            firebase.database().ref('/users/' + user.uid).once('value').then(function (snapshot) {
                volcadoDatos(user);
            });
        } else {
            console.log("No logado")
        }
    });
}
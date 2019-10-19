setTimeout(function () {
    $(".loader-page").css({ visibility: "visible", opacity: "0.5" })
}, 10);

var resul = 0,
 desafio = getParameterURL("desafio"),
 time,
 numrutina=0,
 on = false,
 seconds = 0, 
 minutes = 0, 
 ngolpes = 0, 
 segundos=0,
 sumaFuerzas = 0,
 fuerzarecord=0,
 fuerzamenor=0,
 rondaActual=1,
 min = Math.floor(totalSeg/60),
 seg="00",
 rondasReales=0,
 nuloon=false,
 Enhorabuena=true,
 asaltosTotales=0,
 objetivo=0,
intensidad=0,
calorias=0,
rondaMostrar=1,
segundosTotales=0,
TotalDeAsaltos = 0,
objetivo100=true,
ini = true,
hayLogro=false,
cinturon="",
valor="",
fuerzaRecordTotal=0


var startTime = function () {
    var rutin = JSON.parse(window.localStorage.getItem("boxinglab-rutinas"));
    if(seg=="00"){
        
        if (rutin[numrutina].rondas[rondaActual-1].descanso) {

            if (desafio == "rutinabasica") {
                var asaltos = getParameterURL("asaltos");
                resul = ((parseInt(rondaActual) / 2) / parseInt(asaltos));
                c1.circleProgress('value', resul);
            }

            if(rondaActual==2){
                objetivo = parseInt(c1.circleProgress('value')*100);
                if (objetivo100){
                    objetivo100=(objetivo>=100);
                }
                bell.stop();
                bell.play();

                grabarDatos(parseInt($("#cirGolpes strong").html()), calorias, fuerzamenor, fuerzarecord, (asaltosTotales / 2), objetivo, true, segundosTotales,desafio);
                TotalDeAsaltos = rutin[numrutina].rondas.length;
                $("#numronda").html('<span style="font-size: 1.1em;">' + (1) + '/</span>' + '<span style="font-size: 0.8em;color:darkgray;">' + parseInt(TotalDeAsaltos) / 2 + '</span>');
            }
            else{
                objetivo = parseInt(c1.circleProgress('value')*100);
                if (objetivo100) {
                    objetivo100 = (objetivo >= 100);
                }
                bell.stop();
                bell.play();
                grabarDatos(parseInt($("#cirGolpes strong").html()), calorias, fuerzamenor, fuerzarecord, (asaltosTotales / 2), objetivo, false, segundosTotales,desafio);
                
            }
            if (desafio == "golpes"){
                c1.circleProgress('value', 0.0);
                resul=0;
            }
            ngolpes=0;
            sumaFuerzas=0;
            intensidad=0;
            c3.circleProgress('value', 0.0);
            fuerzamenor = 0;
            if(fuerzaRecordTotal<fuerzarecord){
                fuerzaRecordTotal = fuerzarecord
            }
            fuerzarecord=0;
            objetivo=0;
            segundosTotales=0;

            c4.circleProgress({ fill: { gradient: ['#ff6600', '#ff0000'] } });
            nuloon = false;
        }
        else {
            asaltosTotales = asaltosTotales+1;
            c4.circleProgress({ fill: { gradient: ['#66fe70', '#00ADB5'] } });
            nuloon = true;
        }
    }

    seconds++;
    segundos++;
    segundosTotales++;
    objetivo = parseInt(c1.circleProgress('value'))*100;

    if(nuloon){
        if (desafio=="nivel"){
            var nivel = getParameterURL("nivel");
            if (parseFloat(c1.circleProgress('value'))>=0.05){
                c1.circleProgress('value', c1.circleProgress('value') - (5* parseFloat(nivel) / 1000));
                resul = c1.circleProgress('value');
            }
        }
    }

    rondasReales = rondasReales+1;
    time = setTimeout("startTime()", 1000);
    
    min = Math.floor((totalSeg-seconds) /60);
    if(min==0){
        seg = totalSeg - seconds;
    }
    else{
        seg = Math.trunc((Math.trunc(totalSeg - seconds - Math.trunc((min*60)))) % 60);
    }

    if (seg < 10) {
        seg = "0" + seg;
    }

    var s=(segundos / totalSeg)*100;
    setTimeout(function () { 
        c4.circleProgress('value', s/100); 
    }, 5);

    if (parseInt(c1.circleProgress('value')) == 1 && Enhorabuena){
        Enhorabuena=false;
    }

    if (segundos == totalSeg || (desafio == "nivel" && parseFloat(c1.circleProgress('value')) >= 1)) {
        
        seconds = 0;
        minutes = 0;
        segundos=0;
        stopStart();
        if ((desafio == "nivel" && parseFloat(c1.circleProgress('value')) >= 1)){
            finalizaSesion();
        }
        else{
            if (rutin[numrutina].rondas.length>rondaActual ){
                setTimeout(function () { c4.circleProgress('value', 0.0); }, 5);
                
                totalSeg = rutin[numrutina].rondas[rondaActual].tiempo;
                if (rutin[numrutina].rondas[rondaActual].voz){
                    speak(rutin[numrutina].rondas[rondaActual].texto);
                }
                if (rutin[numrutina].rondas[rondaActual].descanso) {
                    $("#time").attr("disabled", true);
                    c4.circleProgress({ fill: { gradient: ['#ff6600', '#ff0000'] } });
                }
                else{
                    $("#time").attr("disabled", false);
                    if (desafio == "rutinabasica") {
                        var asaltos = getParameterURL("asaltos");
                        resul = ((parseInt(rondaActual)/2) / parseInt(asaltos));
                        c1.circleProgress('value',resul);
                    }
                    c4.circleProgress({ fill: { gradient: ['#66fe70', '#00ADB5'] } });
                    rondasReales = rondasReales+1;
                }
                
                rondaActual = rondaActual + 1;
                rondaMostrar = rondaMostrar + 1;
                TotalDeAsaltos = rutin[numrutina].rondas.length;
                $("#numronda").html('<span style="font-size: 1.1em;">' + (Math.round(rondaActual / 2)) + '/</span>' + '<span style="font-size: 0.8em;color:darkgray;">' + parseInt(TotalDeAsaltos) / 2 + '</span>');
                on = true; 
                startTime();
                document.getElementById("time").innerHTML = on ? '<i id="timeIcoStop" class="material-icons left">pause</i>' : '<i id="timeIcoPlay" class="material-icons left">play_arrow</i>';
            }
            else{//se termino la sesión
                finalizaSesion();
            }
        }
    }
}

function finalizaSesion(){
    $("#entrenamiento").css("margin-left", "-99999px");
    if (tieneLogro()) {
        window.location = "logro.html?cinturon=" + cinturon + "&valor="+valor+"&golpes=" + golpesTotales + "&calorias=" + Math.round(calorias * 100) + "&fuerza=" + Math.round(fuerzaRecordTotal);
        hayLogro = true;
    }
    else {
        hayLogro = false;
        //$("#titulo100").html("¡Enhorabuena!");
        //$("#txt100").html("Has conseguido tu objetivo");
        //$(".objetivo-100").css("margin-left", "0px");
        window.location = "logro.html?cinturon=" + cinturon + "&golpes=" + golpesTotales + "&calorias=" + Math.round(calorias * 100) + "&fuerza=" + Math.round(fuerzaRecordTotal);
    }
}


function tieneLogro() {
    var data=JSON.parse(localStorage.getItem('BoxingLab-606608'));

    if (desafio == "nivel") {
        var nivel = getParameterURL("nivel");
        if (parseFloat(c1.circleProgress('value')) >= 1) {
            for (item in data.logros) {
                if (data.logros[item].logro == "nivel" + nivel) {
                    cinturon = "nivel" + nivel;
                    data.logros[item].valor = parseInt(data.logros[item].valor) + 1;
                }
            }
        }
    }
    else{
        if (Math.round(calorias * 100) > parseInt(data.logros[6].valor)) {
            for (item in data.logros) {
                if (data.logros[item].logro == "recordcalorie") {
                    cinturon = "recordcalorie";
                    valor = Math.round(calorias * 100)
                    data.logros[item].valor = valor;
                }
            }
        }
        if (parseInt(fuerzaRecordTotal) > parseInt(data.logros[7].valor)) {
            for (item in data.logros) {
                if (data.logros[item].logro == "recordforce") {
                    cinturon = "recordforce";
                    valor = parseInt(fuerzaRecordTotal)
                    data.logros[item].valor = valor;
                }
            }
        }
        if (golpesTotales > parseInt(data.logros[8].valor)) {
            for (item in data.logros) {
                if (data.logros[item].logro == "recordhits") {
                    cinturon = "recordhits";
                    valor = golpesTotales
                    data.logros[item].valor = valor;
                }
            }
        }
        if (golpesTotales >= 500) {
            for (item in data.logros) {
                if (data.logros[item].logro == "cin500") {
                    cinturon = "cinto500";
                    data.logros[item].valor = parseInt(data.logros[item].valor) + 1;
                }
            }
        }
        if (golpesTotales >= 1500) {
            for (item in data.logros) {
                if (data.logros[item].logro == "cin1500") {
                    cinturon = "cinto1500";
                    data.logros[item].valor = parseInt(data.logros[item].valor) + 1;
                }
            }
        }
        if (golpesTotales >= 2000) {
            for (item in data.logros) {
                if (data.logros[item].logro == "cin2000") {
                    cinturon = "cinto2000";
                    data.logros[item].valor = parseInt(data.logros[item].valor) + 1;
                }
            }
        }
        if (golpesTotales >= 3000) {
            for (item in data.logros) {
                if (data.logros[item].logro == "cin3000") {
                    cinturon = "cinto3000";
                    data.logros[item].valor = parseInt(data.logros[item].valor) + 1;
                }
            }
        }
        if (golpesTotales >= 5000) {
            for(item in data.logros){
                if(data.logros[item].logro=="cin5000"){
                    cinturon = "cinto5000";
                    data.logros[item].valor = parseInt(data.logros[item].valor)+1;
                }
            }
        }
        
    }

    localStorage.setItem('BoxingLab-606608', JSON.stringify(data));
    
    return (cinturon!="");
}

function speak(txt){
    /*TTS.speak({
        text: txt,
        locale: 'es-ES',
        //rate: 0.75
    }, function () {
        console.log('success');
    }, function (reason) {
        console.log(reason);
    });*/
}
    
var stopStart = function () {

    if (!on) {
        on = true; 
        nuloon = true;
        ini = true;
        $("#golpea").css("display", "block");
        $("#golpesEntrena").css("display", "none");
    } else {
        on = false; 
        clearTimeout(time);
        Enhorabuena = true;
    }
    document.getElementById("time").innerHTML = on ? '<i id="timeIcoStop" class="material-icons left">pause</i>' : '<i id="timeIcoPlay" class="material-icons left">play_arrow</i>';
}

var resetTime = function(){
    on = false; 
    clearTimeout(time);
    seconds = 0;
    minutes = 0;
    min = Math.trunc(totalSeg / 60);
    seg = "00";
    setTimeout(function () { c4.circleProgress('value', 0.0); }, 5);
    rondaActual = 1;
    totalSeg = rutin[numrutina].rondas[rondaActual-1].tiempo;
    $("#numronda").html('<span style="font-size: 1.1em;">' + rondaMostrar + '/</span>' );
    min = Math.trunc(totalSeg / 60);
    seg = "00";
    
}


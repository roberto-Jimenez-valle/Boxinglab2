var timeout = null,
    idx = 0,
    myLiveChart = null,
    datos = []

$(function () {

    window.addEventListener("orientationchange", function () {
        $("#mascara").css("margin-left", "-1500px");
    });

    cambiarIdioma(lang);

    if (!screen.orientation.type.includes("portrait")) {
        var tam = ((screen.height - ($(".nav-extended").height()) - 30)) / 2;
        $("div.chartAreaWrapper2").css("height", (tam) + "px");
        $("div.panelinfo").css("height", (tam + 30) + "px");
        $("div.chart-container").css("height", 300 + "px");
        $("div#cubreChart").css("height", 300 + "px");
    }
    else {
        var tam = ((screen.height - ($(".nav-extended").height()) - 30)) / 3;
        $("div.chartAreaWrapper2").css("height", (tam) + "px");
        $("div.panelinfo").css("height", (tam) + "px");
        $("div.chart-container").css("height", (tam) + "px");
        $("div#cubreChart").css("height", (tam) + "px");
    }

    window.addEventListener("orientationchange", function () {
        if (!screen.orientation.type.includes("portrait")) {
            var tam = ((screen.height - ($(".nav-extended").height()) - 30)) / 2;
            $("div.chartAreaWrapper2").css("height", (tam) + "px");
            $("div.panelinfo").css("height", (tam + 30) + "px");
            $("div.chart-container").css("height", 300 + "px");
            $("div#cubreChart").css("height", 300 + "px");
        }
        else {
            var tam = ((screen.height - ($(".nav-extended").height()) - 30)) / 3;
            $("div.chartAreaWrapper2").css("height", (tam) + "px");
            $("div.panelinfo").css("height", (tam) + "px");
            $("div.chart-container").css("height", (tam) + "px");
            $("div#cubreChart").css("height", (tam) + "px");
        }
    });

    
});

var data = JSON.parse(localStorage.getItem('BoxingLab-606608'));
var canvas = document.getElementById("myChart"),
    ctx = canvas.getContext("2d"),
    datosv = [],
    golpes = [],
    datosEntrenos = [],
    fechasEntrenos = [],
    numGolpes = [],
    datosOld = 0

if (data.entrenamientos == null) {
    $("#nodata").show();
}
else {
    $("#nodata").hide();
}


for (var item in data.entrenamientos) {

    fechasEntrenos.push(data.entrenamientos[item].fecha);
    var golpesTotal = 0,
        intensidadTotal = 0,
        caloriasTotal = 0,
        fuerzarecord = 0,
        objetivo = 0,
        tiempot = 0,
        DatosTotales = data.entrenamientos[item].asaltos

    for (var i in DatosTotales) {
        golpesTotal = golpesTotal + DatosTotales[i].golpesTotales;
        intensidadTotal = intensidadTotal + DatosTotales[i].intensidad;
        caloriasTotal = caloriasTotal + DatosTotales[i].calorias;
        
        if (data.entrenamientos[item].tipo=="rutinabasica"){
            objetivo = DatosTotales[i].objetivo;
        }
        else{
            objetivo = objetivo + DatosTotales[i].objetivo;
        }
        tiempot = tiempot + DatosTotales[i].totalTiempo;
        if (DatosTotales[i].fuerzarecord > fuerzarecord) {
            fuerzarecord = DatosTotales[i].fuerzarecord;
        }
    }
    intensidadTotal = intensidadTotal / DatosTotales.length;
    caloriasTotal = caloriasTotal / DatosTotales.length;
    
    if (!(data.entrenamientos[item].tipo == "rutinabasica")) {
        objetivo = objetivo / DatosTotales.length;
    }
    datosEntrenos.push(golpesTotal);
    numGolpes.push(golpesTotal);
    datos.push({
        fecha: data.entrenamientos[item].fecha,
        golpes: golpesTotal,
        numgolpes: golpesTotal,
        intensidad: intensidadTotal,
        calorias: caloriasTotal,
        asaltosTotales: DatosTotales.length,
        fuerzarecord: fuerzarecord,
        objetivo: objetivo,
        tiempot: tiempot,
        DatosTotales: DatosTotales
    });
}

var golpesLang = (lang == "es") ? "Golpes" : "Hits";
var gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, '#00ADB5');
gradient.addColorStop(1, '#66fe70');
var chart = {
    options: {
        legend: {
            display: false
        },
        scaleShowLabels: false,
        responsive: true,
        maintainAspectRatio: false,
        scales:
        {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                display: false
            }]
        }
    },
    type: 'bar',
    data: {
        labels: fechasEntrenos,
        datasets: [
            {
                label: golpesLang,
                fillColor: gradient,
                backgroundColor: gradient,
                hoverBackgroundColor: "#00ADB5",
                data: numGolpes
            }
        ]
    }
};

myLiveChart = new Chart(ctx, chart);
var newWidth = (datosEntrenos.length) * 60;
if (newWidth < screen.width) { newWidth = screen.width }
$('.chartAreaWrapper2').width(newWidth);
$('.chartAreaWrapper').animate({ scrollLeft: newWidth });
pintarNumeros();

canvas.ontouchend = function() {
    canvas.click();
},

canvas.onclick = function (evt) {

    var tamResto = $("#myChart").width() / datos.length;
    var resto = window.screen.width - tamResto;
    
    $("#mascara").css("width", tamResto);
    $("#mascara").css("height", $("#myChart").height());
    $("#mascara").css("margin-left", window.screen.width-tamResto);

    var t = (evt.layerX + resto) / tamResto;
    console.log(Math.round(t))

    if (evt.clientX == 0 && evt.clientY == 0) {
        var chartData = myLiveChart.config.data;
        chartClick(chartData, Math.round(t),datos);//chartData.datasets[0].data.length - 1, datos);
    }
    var activePoints = myLiveChart.getElementsAtEvent(evt);

    if (activePoints[0]) {
        if (ia != null) {
            clearInterval(ia);
        }
        $("#mascara").css("margin-left", "-1500px");
        var chartData = activePoints[0]['_chart'].config.data;

        idx = activePoints[0]['_index'];
        chartClick(chartData, idx, datos);
    }
};

$("#test3").on("click", function () {
    chartClick(myLiveChart, idx, datos);
});



function chartClick(chartData, idx, datos) {

    var datosv = [];
    datodv = datos;

    var label = chartData.labels[idx],
        value = chartData.datasets[0].data[idx],
        mgolpe = 0,
        fmedia = 0,
        fuerzarecord = 0,
        sumaValores = 0,
        intensidad = datodv[idx].intensidad,
        calorias = datodv[idx].calorias,
        asaltosTotales = datodv[idx].asaltosTotales,
        objetivo = datodv[idx].objetivo,
        tiempot = datodv[idx].tiempot / 60,
        DatosTotales = datodv[idx].DatosTotales,
        labelsMychart = [],
        golpesAsalto = [],
        mediaMychart = [],
        tempo = 800

    if (myChart != null) {
        /*myChart.data.labels = [];
        myChart.data.datasets.forEach((dataset) => {
            dataset.data = (parseInt(0));
        });*/
        //myChart.update();
        myChart.destroy();
    }
    

    var Asalto = (lang == "es") ? "Asalto" : "Round";

    for (var j in DatosTotales) {
        labelsMychart.push(Asalto + " " + (j + 1));
        mediaMychart.push(parseInt(DatosTotales[j].intensidad));
        golpesAsalto.push(parseInt(DatosTotales[j].golpesTotales));

        if (DatosTotales[j].fuerzarecord > fuerzarecord) {
            fuerzarecord = parseInt(DatosTotales[j].fuerzarecord);
        }
    }

    var mayorGolpe = (lang == "es") ? "Mayor golpe" : "Higher hit";
    var intensidadlb = (lang == "es") ? "Intensidad" : "Intensity";
    var config = {
        type: 'bar',
        data: {
            labels: labelsMychart,
            datasets: [
                {
                    data: golpesAsalto,
                    backgroundColor: "#00ADB5",
                }]
        },
        options: {
            legend: {
                display: false
            },
            /*responsive: true,
            scaleShowLabels: false,
            maintainAspectRatio: false,*/
            scales:
            {
                xAxes: [{
                    display: false
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    display: false
                }]
            }
        }
    };

    pintarNumeros();

    var ctx2 = document.getElementById("chart"),
        myChart = new Chart(ctx2, config);

    //Práctica moderada: 0,052 x(su peso x 2, 2) X total de minutos de práctica = calorías
    //Práctica vigorosa: 0,078 x(su peso x 2, 2) X total de minutos de práctica = calorías
    //var calorias=0.065*(80*2.2)*30;

    var caloriasv = $('span#caloriasr'),
        mediav = $('span#fmediar'),
        golpesv = $('span#rgolpes'),
        asaltosv = $('span#asaltosr'),
        objetivov = $('span#objetivor'),
        tiempov = $('span#tiempot'),
        mgolper = $('span#mgolper')

    if (parseInt(intensidad)<10){
        intensidad=100;
    }

    caloriasv.prop('number', parseInt(caloriasv.html())).animateNumber({ number: Math.round(calorias * 100) }, tempo);
    mediav.prop('number', parseInt(mediav.html())).animateNumber({ number: parseInt(intensidad) }, tempo);
    golpesv.prop('number', parseInt(golpesv.html())).animateNumber({ number: value }, tempo);
    asaltosv.prop('number', parseInt(asaltosv.html())).animateNumber({ number: parseInt(asaltosTotales) }, tempo);
    objetivov.prop('number', parseInt(objetivov.html())).animateNumber({ number: parseInt(objetivo) }, tempo);
    tiempov.prop('number', parseInt(tiempov.html())).animateNumber({ number: parseInt(tiempot) }, tempo);
    mgolper.prop('number', parseInt(mgolper.html())).animateNumber({ number: parseInt(fuerzarecord) }, tempo);
    $("div#rfecha").html(label);
}

function stopTimeout() {
    clearTimeout(timeout);
}

function pintarNumeros() {

    // Define a plugin to provide data labels
    Chart.plugins.register({
        afterDatasetsDraw: function (chart) {
            var ctx = chart.ctx;

            chart.data.datasets.forEach(function (dataset, i) {
                var meta = chart.getDatasetMeta(i);
                if (!meta.hidden) {
                    meta.data.forEach(function (element, index) {
                        // Draw the text in black, with the specified font
                        ctx.fillStyle = '#666666';

                        var fontSize = 16;
                        var fontWeight = 'normal';
                        var fontFamily = 'Roboto';
                        ctx.font = Chart.helpers.fontString(fontSize, fontWeight, fontFamily);

                        // Just naively convert to string for now
                        var dataString = dataset.data[index].toString();

                        // Make sure alignment settings are correct
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';

                        var padding = -23;
                        var position = element.tooltipPosition();
                        ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
                    });
                }
            });
        }
    });
}

setTimeout(function () {
    $(".loader-page").css({ visibility: "hidden", opacity: "0.5" })
    var canvas = document.getElementById("myChart");
    canvas.click();

}, 500);

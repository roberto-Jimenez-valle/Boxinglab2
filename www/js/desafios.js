
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, options);
});

$(document).ready(function () {
    $('.modal').modal();
    $("#asaltos").bubbleSlider();
    $("#tiempo").bubbleSlider();
    $("#tdescanso").bubbleSlider();
    // $("#tiempoc").bubbleSlider();
    // $("#tdescansoc").bubbleSlider();
    // $("#asaltosc").bubbleSlider();
    // $("#calorias").bubbleSlider();
    $("#golpes").bubbleSlider();
    $("#tiempog").bubbleSlider();
    $("#asaltosg").bubbleSlider();
    $("#tdescansog").bubbleSlider();
    $("#nivel").bubbleSlider();
    $("#tiempos").bubbleSlider();
    $("#asaltoss").bubbleSlider();
    $("#tdescansos").bubbleSlider();
});
var usu = null;
var data=JSON.parse(localStorage.getItem('BoxingLab-606608'));
usu = data;
cambiarIdioma(data.perfil.idioma);

function guardaRutinas(desafio) {

    var arrDatos = [];
    var numrutina = 0;
    var url = null;
    if (desafio == "rutinabasica") {
        numrutina = 0;
        var datos = "";
        for (var i = 1; i <= parseInt($("#asaltos").val()); i++) {
            datos = `
                {"descanso":false,
                "nombre":"Ronda `+ i + `",
                "texto":"Ronda `+ i + `",
                "tiempo":` + parseInt($("#tiempo").val()) * 60 + `,
                "voz":true}
            `;
            arrDatos.push(datos);
            datos = `
                {"descanso":true,
                "nombre":"Descanso `+ i + `",
                "texto":"Descanso `+ i + `",
                "tiempo":` + parseInt($("#tdescanso").val()) + `,
                "voz":true}
            `;
            arrDatos.push(datos);
        }
        url = "entrenamiento.html?desafio=" + desafio + "&asaltos=" + parseInt($("#asaltos").val());
    }
    if (desafio == "rutinaavanzada") {
        numrutina = 1;

        url = "entrenamiento.html?desafio=" + desafio + "&asaltos=" + parseInt($("#asaltos").val());
    }
    if (desafio == "calorias") {
        numrutina = 2;
        for (var i = 1; i <= parseInt($("#asaltosc").val()); i++) {
            datos = `
                    {"descanso":false,
                    "nombre":"Ronda de Golpes ` + i + `",
                    "texto":"Objetivo quemar `+ $("#calorias").val() + ` calorías, Empieza el asalto ` + i + `",
                    "tiempo":` + parseInt($("#tiempoc").val()) + `,
                    "voz":true}
                `;
            arrDatos.push(datos);
            datos = `
                    {"descanso":true,
                    "nombre":"Descanso `+ i + `",
                    "texto":"Descanso `+ i + `",
                    "tiempo":` + parseInt($("#tdescansoc").val()) + `,
                    "voz":true}
                `;
            arrDatos.push(datos);
        }
        url = "entrenamiento.html?desafio=" + desafio + "&calorias=" + $("#calorias").val();
    }
    if (desafio == "golpes") {
        numrutina = 3;
        for (var i = 1; i <= parseInt($("#asaltosg").val()); i++) {
            datos = `
                    {"descanso":false,
                    "nombre":"Ronda de Golpes ` + i + `",
                    "texto":"Objetivo `+ $("#golpes").val() + ` golpes por asalto Empieza el asalto ` + i + `",
                    "tiempo":` + parseInt($("#tiempog").val()) + `,
                    "voz":true}
                `;
            arrDatos.push(datos);
            datos = `
                    {"descanso":true,
                    "nombre":"Descanso `+ i + `",
                    "texto":"Descanso `+ i + `",
                    "tiempo":` + parseInt($("#tdescansog").val()) + `,
                    "voz":true}
                `;
            arrDatos.push(datos);
        }

        url = "entrenamiento.html?desafio=" + desafio + "&golpes=" + $("#golpes").val();
    }
    if (desafio == "nivel") {
        numrutina = 4;
        var nivel = $("#nivel").val();

        for (var i = 1; i <= 12; i++) {
            datos = `
                    {"descanso":false,
                    "nombre":"Ronda de Golpes ` + i + `",
                    "texto":"Ronda ` + i + `",
                    "tiempo":` + (3 * 60) + `,
                    "voz":true}
                `;
            arrDatos.push(datos);
            datos = `
                    {"descanso":true,
                    "nombre":"Descanso `+ i + `",
                    "texto":"Descanso `+ i + `",
                    "tiempo":` + 60 + `,
                    "voz":true}
                `;
            arrDatos.push(datos);
        }
        url = "entrenamiento.html?desafio=" + desafio + "&nivel=" + $("#nivel").val();
    }
    if (desafio == "superate") {
        numrutina = 5;
        for (var i = 1; i <= parseInt($("#asaltoss").val()); i++) {
            datos = `
                    {"descanso":false,
                    "nombre":"Ronda de Golpes ` + i + `",
                    "texto":"Objetivo superate a ti mismo golpeando más fuerte en cada asalto, Empieza el asalto ` + i + `",
                    "tiempo":` + parseInt($("#tiempos").val()) + `,
                    "voz":true}
                `;
            arrDatos.push(datos);
            datos = `
                    {"descanso":true,
                    "nombre":"Descanso `+ i + `",
                    "texto":"Descanso `+ i + `",
                    "tiempo":` + parseInt($("#tdescansos").val()) + `,
                    "voz":true}
                `;
            arrDatos.push(datos);
        }
        url = "entrenamiento.html?desafio=" + desafio;
    }

    var rondas = JSON.parse("[" + arrDatos + "]");
    var rutin=[];
    rutin.push({ "nombre": desafio, rondas });

    window.localStorage.setItem("boxinglab-rutinas", JSON.stringify(rutin));
    window.localStorage.setItem("boxinglab-rutinas-url", url);

    window.location = "calibra.html";

    $(".modal-trigger").click(function () {
        cambiarIdioma(lang);
    });
}
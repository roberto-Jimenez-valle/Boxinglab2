var i = 0;
var min = 0;
var max = 10;
var num = 0;
var topp = 0;
var left = 0;
var bottom = 0;
var right = 0;
var tipoHerida = "moraton";
var style = "";
var selector = "";

console.log("NOOOOOOO funciona")

function recortarImg() {
    var element = document.getElementById('myImage');
    
    
    var options = {
        "container": {
            "width": "100%",
            "height": 210
        },
        "viewport": {
            "width": 200,
            "height": 200,
            "type": "circle",
            "border": {
                "width": 2,
                "enable": true,
                "color": "#fff"
            }
        },
        "zoom": {
            "enable": true,
            "mouseWheel": true,
            "slider": true
        },
        "rotation": {
            "slider": false,
            "enable": true,
            "position": "left"
        },
        "transformOrigin": "imagen"
    }

    var cc = $('#myImage').cropme(options);
    $("#cortar").on("click", function () {
        $(".demo-container").css("margin", "0px 0px")
        $("#modalRecortarImg").css("margin", "99px 999999px")
        cc.cropme("crop").then(function (output) {
            // here you can use the base64 output
            $("#img").attr("src", output);
             
            $(".rect").remove();
            setTimeout(function () {
                
                reconocimientoFacial();
            }, 1000)
        });

    })

    $("#fichero").on("change", function () {
        readURL(this);
    })
}

function reconocimientoFacial() {
    
    i = 0;
    $(".rect").remove();
    var img = document.getElementById('img');
    var partes = ['eye', 'mouth'];//'face'
    partes.forEach(function (valor, indice, array) {

        var cara = new tracking.ObjectTracker([valor]);//'face',
        cara.setStepSize(1.10);
        tracking.track('#img', cara);

        cara.on('track', function (event) {
            event.data.forEach(function (rect) {
                window.plot(rect.x, rect.y, rect.width, rect.height, valor);
            });
        });
    });

    window.plot = function (x, y, w, h, parte) {
        var rect = document.createElement('div');
        document.querySelector('.demo-container').appendChild(rect);
        rect.classList.add('rect');
        rect.classList.add(parte);
        rect.style.width = w + 'px';
        rect.style.height = h + 'px';
        if (parte == "eye") {
            rect.style.border = "1px solid red";
        }
        rect.style.left = (img.offsetLeft + x) + 'px';
        rect.style.top = (img.offsetTop + y) + 'px';
    };
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('.cropme-container img').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}


//ojos
function ojos(numuero, pos) {
    //num = 2;
    selector = ".eye:" + pos;
    tipoHerida = "ojos";
    var wa = $(selector).width();
    var ha = $(selector).height() + $(selector).height() * 3;
    var w = $(selector).width() + $(selector).width() * 23 / 100;
    var h = $(selector).height() - $(selector).height() * 50 / 100;

    topp = 10;
    left = - ($(selector).width() * 4 / 100);
    var image = 'url("img/ojos/ojo' + numuero + '.png")';
    style = "background:" + image + ";background-repeat: no-repeat;background-size: contain;width:" + (w + (w / 3)) + "px;height:" + ha + "px;top:" + topp + "px;left:" + left + "px";
}




function moraton1() {
    num = 2;
    selector = ".eye:last";
    tipoHerida = "moraton1";
    var wa = $(selector).width();
    var ha = $(selector).height() - $(selector).height() * 18 / 100;
    var w = $(selector).width() + $(selector).width() * 23 / 100;
    var h = $(selector).height() - $(selector).height() * 50 / 100;
    topp = ha - ($(selector).height() * 30 / 100);
    left = - ($(selector).width() * 2 / 100);
    style = "width:" + w + "px;height:" + ha + "px;top:" + topp + "px;left:" + left + "px";
}

function moraton2() {
    num = 2;
    selector = ".eye:last";
    tipoHerida = "moraton2";
    var wa = $(selector).width();
    var ha = $(selector).height() - $(selector).height() * 18 / 100;
    var w = $(selector).width() + $(selector).width() * 23 / 100;
    var h = $(selector).height() - $(selector).height() * 50 / 100;

    topp = 5;
    left = - ($(selector).width() * 4 / 100);
    style = "width:" + (w + (w / 3)) + "px;height:" + ha + "px;top:" + topp + "px;left:" + left + "px";
}

function moraton3() {
    num = 2;
    selector = ".eye:first";
    tipoHerida = "moraton3";
    var wa = $(selector).width();
    var ha = $(selector).height() - $(selector).height() * 18 / 100;
    var w = $(selector).width() + $(selector).width() * 23 / 100;
    var h = $(selector).height() - $(selector).height() * 50 / 100;

    topp = ha - ($(selector).height() * 30 / 100);
    left = - ($(selector).width() * 2 / 100);
    style = "width:" + w + "px;height:" + ha + "px;top:" + topp + "px;left:" + left + "px";
}

/*function herida1() {
    num = 2;
    selector = ".eye:first";
    tipoHerida = "herida1";//moraton3

    var wa = $(selector).width();
    var ha = $(selector).height() - $(selector).height() * 18 / 100;
    var w = $(selector).width() + $(selector).width() * 23 / 100;
    var h = $(selector).height() - $(selector).height() * 50 / 100;

    topp = ha - ($(selector).height() * 3 / 100);
    left = -($(selector).width() * 1 / 100);
    style = "width:" + w + "px;height:" + ha + "px;top:-" + topp + "px;left:" + left+"px";
  }*/


function heridas(numero, pos) {
    selector = ".eye:" + pos;
    tipoHerida = "heridas";
    var wa = $(selector).width();
    var ha = $(selector).height() + $(selector).height() * 2 / 100;
    var w = $(selector).width();
    var h = $(selector).height();

    topp = -ha - ($(selector).height() * 4 / 100);
    left = -($(selector).width() / 2);
    if (numero == 4) {
        topp = ha - ($(selector).height() * 4 / 100);
        left = ($(selector).width() / 2);
    }

    var image = 'url("img/heridas/herida' + numero + '.png")';
    style = "background:" + image + ";background-repeat: no-repeat;background-size: contain;width:" + (w) + "px;height:" + ha + "px;top:" + topp + "px;left:" + left + "px";

}

function labios1() {
    num = 2;
    selector = ".mouth:last";
    tipoHerida = "labios1";
    var wa = $(selector).width();
    var ha = $(selector).height() - $(selector).height() * 18 / 100;
    var w = $(selector).width();
    var h = $(selector).height() - $(selector).height() * 50 / 100;

    topp = 0;
    left = - ($(selector).width() * 4 / 100);
    style = "width:" + (w + (w / 3)) + "px;height:" + ha + "px;top:" + topp + "px;left:" + left + "px";
}

function golpe() {
    var random = Math.random() * (+max - +min) + +min;
    num = Math.round(random)

    var random2 = Math.random() * (+20 - +1) + +1;
    ojosAle = Math.round(random2)

    selector = ".rect:nth-child(" + num + ")";
    var mini = $(selector).width()
    var maxi = $(selector).width()
    tipoHerida = "moraton";
    style = "";
    topp = Math.round(Math.random() * (+mini - -maxi) + -maxi);
    left = Math.round(Math.random() * (+mini - -maxi) + -maxi);
    bottom = Math.round(Math.random() * (-mini - +maxi) + +maxi);
    right = Math.round(Math.random() * (-mini - +maxi) + +maxi);

    if (num < 4) {
        style = style + ";top:" + topp + "px;left:" + left + "px";
    }
    else {
        style = style + ";right:" + right + "px;bottom:" + bottom + "px";
    }

    if (i == 20) {
        //moraton1()
    }

    if (i == 5) {
        ojos(ojosAle, "first")
    }
    if (i == 6) {
        //heridas(2, "last")
    }

    if (i == 15) {
        heridas(1, "first")
    }

    if (i == 10) {
        ojos(ojosAle, "last")

    }

    if (i == 8) {
        heridas(4, "last")
    }

    if (i == 11) {
        heridas(3, "last")
    }

    $(selector).append("<div class='" + tipoHerida + "' style='" + style + "' ></div>")

}


    recortarImg();

    function refreshSwatch() {
        reconocimientoFacial();
    }

    var inter = null;

    $("#bucle").on("click", function () {
        inter = setInterval(function () {
            golpe();
            i++;
            $("#numGolpes").html(i)
        }, 500)
    })

    $("#stop").on("click", function () {
        clearInterval(inter);
    })

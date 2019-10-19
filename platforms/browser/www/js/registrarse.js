$(document).ready(function () {
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

    var json=JSON.parse(localStorage.getItem('BoxingLab-606608'));

    if (json!=null && json != undefined) {
        $("#nombre").val(json.perfil.nombre);
        $("#fechanacimiento").val(json.perfil.fechanacimiento);
        $("#"+json.perfil.sexo).prop("checked",true);
        $("#example-2").bubbleSlider().setValue(json.perfil.peso);
        $("#example-3").bubbleSlider().setValue(json.perfil.altura);
        cambiarIdioma(json.perfil.idioma);
    }
    else{
        $("#example-2").bubbleSlider().setValue(70);
        $("#example-3").bubbleSlider().setValue(175);
    }

    setTimeout(function(){
      $("#sidenav-overlay").click();
      $("#fechanacimiento").focus();
      $("#nombre").focus();
      $("#idiomas-nav a:first").focus();
      $(".loader-page").css({ visibility: "hidden", opacity: "0.5" });
    },500);
});

function guardar() {

    if ($('#nombre').val()!=""){
        var data=JSON.parse(localStorage.getItem('BoxingLab-606608'));
        if(data!=null){
            data.perfil.nombre=$('#nombre').val();
            data.perfil.fechanacimiento= $("#fechanacimiento").val();
            data.perfil.sexo= $("input[name=sexo]:checked").attr("id");
            data.perfil.peso= $(".peso").val();
            data.perfil.altura= $(".altura").val();
            data.perfil.idioma=lang;
            var f = new Date();
            var fechaActual = f.getTime();
            data.fechaMod = fechaActual;
        }
        localStorage.setItem('BoxingLab-606608', JSON.stringify(data));
        window.location = "inicio.html";  
    }
    else{
        $('#nombre').css("border","1px solid red");
    } 
}

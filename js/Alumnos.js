function editarAlumno(id){
    for (var i = 0; i < localStorage.length; i++) {
        var clave = localStorage.key(i);
        if(clave == id){
            var alumno = $.parseJSON(localStorage.getItem(clave));

            $("#id").val(alumno.id);
            $("#nombre").val(alumno.nombre);
            $("#nota").val(alumno.nota);
        }
    }
}


function listarAlumnos() {
    var tabla="";
    tabla+='<table id="mytable" class="table table-bordred table-striped">';
    tabla+='<thead>';
    tabla+='<th>Codigo</th>';
    tabla+='<th>Nombre</th>';
    tabla+='<th>Nota</th>';
    tabla+='<th>Editar</th>';
    tabla+='<th>Eliminar</th>';
    tabla+='</thead>';
    tabla+='<tbody>';

    for(var i=0;i<localStorage.length;i++){
        var clave=localStorage.key(i);
        var alumno=$.parseJSON(localStorage.getItem(clave));

        tabla+='<tr>';
        tabla += '<td>' + alumno.id + '</td>';
        tabla += '<td>' + alumno.nombre + '</td>';
        tabla += '<td>' + alumno.nota + '</td>';
        tabla+='<td>';
        tabla+='<p data-placement="top" data-toggle="tooltip" title="Editar">';
        tabla+='<button class="btn btn-primary btn-xs" onclick="editarAlumno(\''+alumno.id+'\')">';
        tabla+='<span class="glyphicon glyphicon-pencil"></span></button>';
        tabla+='</p>';
        tabla+='</td>';
        tabla+='<td>';
        tabla+='<p data-placement="top" data-toggle="tooltip" title="Eliminar">';
        tabla+='<button class="btn btn-primary btn-xs" onclick="eliminarAlumno(\''+alumno.id+'\')">';
        tabla+='<span class="glyphicon glyphicon-trash"></span></button>';
        tabla+='</p>';
        tabla+='</td>';
        tabla+='</tr>';
    };
    tabla+='</tbody>';
    tabla+='</table>';

    $("#p1").html(tabla);
};


function eliminarAlumno(id){
    localStorage.removeItem(id);
    listarAlumnos();
}

$(document).ready(function(){
    var contador;
    if(localStorage.length>0){
        contador = localStorage.length+1;
    }else{
        contador = 1;
    }

    $("#id").val(contador);

    $("#boton1").click(function(){
        var id = $("#id").val();
        var nombre = $("#nombre").val();
        var nota = $("#nota").val();

        var alumno = {
            id:id,
            nombre:nombre,
            nota:nota
        };

        localStorage.setItem(id,JSON.stringify(alumno));
        contador = localStorage.length + 1;

        listarAlumnos();
        restablecer();
    });

    $("#boton2").click(function(){
        restablecer(9);
    });


    $("#boton3").click(function() {
        calcularPromedio();
    });


    $("#boton4").click(function() {
        calcularNotaMayor();
    });


    $("#boton5").click(function() {
        calcularNotaMenor();
    });


    function restablecer(){
        $("#id").val(contador);
        $("#nombre").val("");
        $("#nota").val("");
    }

    listarAlumnos();
    $("nota").val();

});


function calcularPromedio(json) {
      var acumulador = 0.0;

    for (var i = 0; i < localStorage.length; i++) {
        var clave = localStorage.key(i);
        var alumno = $.parseJSON(localStorage.getItem(clave));
        acumulador += parseFloat(alumno.nota);
    }

    var promedio = acumulador / localStorage.length;

    alert("La nota promedio es: " + promedio);

}


function calcularNotaMayor(json) {
  var notaMayor = $.parseJSON(localStorage.getItem(localStorage.key(0))).nota;
  var pos = 0;
  var clave;
  var alumno;

  for (var i = 0; i < localStorage.length; i++) {

    clave = localStorage.key(i);
alumno = $.parseJSON(localStorage.getItem(clave));

if (alumno.nota > notaMayor) {
notaMayor = alumno.nota;
pos = i;
}

}
clave = localStorage.key(pos);
alumno = $.parseJSON(localStorage.getItem(clave))

alert("La nota mayor la tiene el Alumno  " + alumno.nombre + " con " +notaMayor);
}





function calcularNotaMenor(json) {

 var notaMenor =  $.parseJSON(localStorage.getItem(localStorage.key(0))).nota;
    var pos = 0;
    var clave;
    var alumno;
           for (var i = 0; i < localStorage.length; i++) {
                 clave = localStorage.key(i);
         alumno = $.parseJSON(localStorage.getItem(clave));

              if (alumno.nota < notaMenor) {
            notaMenor = alumno.nota;
            pos = i;
        }



 }

         clave = localStorage.key(pos);
         alumno = $.parseJSON(localStorage.getItem(clave))

    alert("La nota menor la tiene el alumno  " + alumno.nombre + " con " + notaMenor);

}

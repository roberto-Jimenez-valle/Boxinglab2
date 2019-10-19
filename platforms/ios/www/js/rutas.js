(function (window, document) {
    libreria.getID('vista').enrutar()
    .ruta('/','index.html',null,null)
    .ruta('/crearUsuario', 'crearUsuario.html', 'user',
        function () {
            _.getID('crearUsuario').noSubmit();
        }
    )
    .ruta('/restablecerContrasena', 'restablecerContrasena.html', 'user', 
        function(){
            _.getID('restablecerContrasena').noSubmit();
        }
    )
    .ruta('/eliminarCuenta', 'eliminarCuenta.html', 'user', 
        function(){
            _.getID('eliminarCuenta').noSubmit();
        }
    )
    .ruta('/inicio', 'inicio.html', 'user', null)
   
})(window, document); 

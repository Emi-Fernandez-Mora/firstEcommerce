const btnConfirmarDatos = document.querySelector('#btnConfirmarDatos');
const formularioDatos = document.querySelector('#formularioDatos')


//Funcion para validar que los inputs tengan contenido

function confirmarDatos () {
   btnConfirmarDatos.addEventListener('click', (e)=>{
        //Anulo submit
        e.preventDefault(e);
        
        //valido inputs (seguramente haya una manera mas facil, busque mucho y no encontre algo practico, escucho sugerencias)

        if(formularioDatos.calle.value==0 ||
             formularioDatos.altura.value == 0 ||
             formularioDatos.piso.value==0 ||
             formularioDatos.depto.value==0 ||
             formularioDatos.cp.value==0 ||
             formularioDatos.provincia.value==0 ||
             formularioDatos.localidad.value==0 ||
             formularioDatos.celu.value==0 ||
             formularioDatos.mail.value==0 
             ){
                 //toastify para avisar que hay un dato vacio

                Toastify({
                    text: "Por favor completa todos los campos",
                    className: "info",
                    position:"left",
                    gravity:"bottom",
                    style: {
                      background: "red",
                    }
                  }).showToast();
        }else{
          
            //desplazo al siguiente formulario

            btnConfirmarDatos.onclick = location.href='#divSegundoPaso';
            document.querySelector('#divSegundoPaso').classList.toggle('animate__backInUp');
            document.querySelector('#divSegundoPaso').classList.toggle('visible');
            
        }
    })

}

confirmarDatos()


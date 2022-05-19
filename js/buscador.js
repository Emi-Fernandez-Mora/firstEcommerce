const inputBuscador = document.querySelector('#inputBuscador');
const barraBuscador = document.querySelector('#barraBuscador');
const botonLupa = document.querySelector('#boton-buscar');
const botonBuscar = document.querySelector('#botonBuscar');

//Animacion para que despliegue la barra de busqueda

botonLupa.addEventListener('click', ()=>{
    barraBuscador.classList.toggle('active')
    
})

//Muestra los productos simepre que no los busquen
if(inputBuscador.value == ""){
    mostrarProductos();
}else{
    filtroBusqueda();
}

//Funcion para buscar

const filtroBusqueda = ()=>{
    containerProductos.innerHTML = ``;

    const valorInput = inputBuscador.value.toLowerCase();

   //fetch al archivo json con el stock

   fetch('js/stockProductos.json')
   .then((resp) => resp.json ())
   .then((data) => {

       //imprimo en el DOM los productos del array del JSON

       data.forEach(item => {
       
       let nombre = item.nombre.toLowerCase(); 

       //condicion para que busque coincidencias en el stockProductos y lo muestre en el DOM segun la busqueda
       if(nombre.indexOf(valorInput) !== -1){
            containerProductos.innerHTML += `
            <div class="card mt-5 cardProducto" ">
                <img src="${item.img}" class="card-img-top" alt="Import Giper" />
                <div class="card-body">
                    <h4 class="nombreProducto">${item.nombre}</h4>
                    <span class="card-text">$${item.precio}</span>
                </div>    
                <button id="agregar${item.id}"class="btn btn-primary btnAgregar">Agregar al carrito</button>
            </div>`;
                //Enviar ID a funcion para agregar al carrito
                let btnAgregar = document.getElementById(`agregar${item.id}`)
                btnAgregar.addEventListener('click',()=>{
                    agregarAlCarrito(item.id);
                    Toastify({
                        text: "Producto Agregado",
                        className: "info",
                        position:"left",
                        gravity:"bottom",
                        style: {
                          background: "linear-gradient(to right, #00b09b, #96c93d)",
                        }
                      }).showToast();
                })
            
        }else{
            // Esta linea de código me rompe el buscador, hay veces que me toma la busqueda y veces que muestra la
            //el h1 

            /* containerProductos.innerHTML =`
            <h1 class= "text-center mb-5 pt-5">Producto no encontrado</h1>`
             */
        
            
            
        }

    })

    

})}

//Eventos para buscar los productos, uno para el click del button, otro para busqueda en el momento
botonBuscar.addEventListener('click', filtroBusqueda);
inputBuscador.addEventListener('keyup', filtroBusqueda);


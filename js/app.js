let carritoDeCompras = [];


const containerProductos = document.getElementById('containerProductos');
const contenedorCarrito = document.getElementById('contenedorCarrito');

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');
const btnFinalizar = document.getElementById('btnFinalizar');
const btnEliminarCarrito = document.querySelector('#btnEliminarCarrito');



//Mostrar los productos por la funcion, recorriendo el array stockProductos

let stockProductos =[];

fetch('js/stockProductos.json')
        .then((resp) => resp.json ())
        .then((data) => data.forEach(e=>{
            stockProductos.push(e)
        }));


        



//funcion para mostrar los productos

function mostrarProductos (){
    //fetch al archivo json con el stock
    fetch('js/stockProductos.json')
        .then((resp) => resp.json ())
        .then((data) => {
            //imprimo en el DOM los productos del array del JSON
            data.forEach(item => {
            const div = document.createElement('div');
            div.className ='producto';
            div.innerHTML = `
            <div class="card mt-5 cardProducto" ">
                <img src="${item.img}" class="card-img-top" alt="Import Giper" />
                <div class="card-body">
                    <h4 class="nombreProducto">${item.nombre}</h4>
                    <span class="card-text">$${item.precio}</span>
                </div>    
                <button id="agregar${item.id}"class="btn btn-primary btnAgregar">Agregar al carrito</button>
            </div>`
    
            containerProductos.appendChild(div);
            
            
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
        });})

}

//Funcion para agregar al carrito

function agregarAlCarrito(id){

    let yaEsta = carritoDeCompras.find(item => item.id == id);
    //sumar cantidades
    if(yaEsta){
        yaEsta.cantidad++;
        document.getElementById(`und${yaEsta.id}`).innerHTML = `<div id="und${yaEsta.id}" class="productoCarrito unidades">${yaEsta.cantidad}</div>`;
        actualizarCarrito();
    }else{

        
        let productoAgregar = stockProductos.find(el => el.id == id);

        productoAgregar.cantidad = 1;

        carritoDeCompras.push(productoAgregar);

        actualizarCarrito();

        mostrarCarrito(productoAgregar);
    }

    localStorage.setItem('carrito', JSON.stringify(carritoDeCompras));
    
   
    

}

//Agregar al DOM del carrito los productos

function mostrarCarrito(productoAgregar){
    
    let div = document.createElement('div');
    div.className = 'productoCarrito';
    div.innerHTML = `
        <div class="modal-footer modalProductos">
            <div class="productoCarrito">${productoAgregar.nombre}</div>
            <div id="und${productoAgregar.id}" class="productoCarrito unidades">${productoAgregar.cantidad}</div>
            <div class="productoCarrito precioCarrito">$${productoAgregar.precio}</div>
            <button id="eliminar${productoAgregar.id}" class="productoCarrito btnEliminar"><ion-icon name="trash-outline"></ion-icon></button>
            
        </div>
        `
        

    contenedorCarrito.appendChild(div);
    
    
    let btnEliminar = document.getElementById(`eliminar${productoAgregar.id}`)

    
    //Eliminar productos
    
    btnEliminar.addEventListener('click',()=>{


        if(productoAgregar.cantidad == 1){

        btnEliminar.parentElement.remove();
        carritoDeCompras = carritoDeCompras.filter(item=>item.id != productoAgregar.id);
        actualizarCarrito();
        localStorage.setItem('carrito', JSON.stringify(carritoDeCompras));

        Toastify({
            text: "Producto Eliminado",
            className: "info",
            position:"left",
            gravity:"bottom",
            style: {
              background: "red",
            }
          }).showToast();

        }else{
            productoAgregar.cantidad--;
        document.getElementById(`und${productoAgregar.id}`).innerHTML = `<div id="und${productoAgregar.id}" class="productoCarrito unidades">${productoAgregar.cantidad}</div>`;
        actualizarCarrito();
        localStorage.setItem('carrito', JSON.stringify(carritoDeCompras));

        Toastify({
            text: "Producto eliminado",
            className: "info",
            position:"left",
            gravity:"bottom",
            style: {
              background: "red",
            }
          }).showToast();
        }


    });
    

    
}

//Actualizar carrito

function actualizarCarrito(){
    contadorCarrito.innerText = carritoDeCompras.reduce((acc,el) => acc + el.cantidad, 0);
    precioTotal.innerText = "Precio total: $" + carritoDeCompras.reduce((acc,el) => acc + (el.precio * el.cantidad), 0);
    
    
}

//Recuperar carrito del local storage

function recuperar() {
 let recuperarLS = JSON.parse(localStorage.getItem('carrito'))
 
 if(recuperarLS){
     recuperarLS.forEach( el=> {
         mostrarCarrito(el)
         carritoDeCompras.push(el)
         actualizarCarrito();
         
     })
 }


}

recuperar()


btnFinalizar.addEventListener('click',()=>{
    if(carritoDeCompras.length >= 1){
        btnFinalizar.onclick = location.href='formulario.html'
    }else{
        Toastify({
            text: "Carrito vacio",
            className: "info",
            position:"left",
            gravity:"bottom",
            style: {
              background: "red",
            }
          }).showToast();
    }
})


//Boton para eliminar todo el carrito
btnEliminarCarrito.addEventListener('click', ()=>{


    
    if(carritoDeCompras.length == 0){
        Toastify({
            text: "Carrito vacio",
            className: "info",
            position:"left",
            gravity:"bottom",
            style: {
              background: "red",
            }
          }).showToast();
    }else{
        Swal.fire({
            title: '¿Deseas vaciar tu carrito?',
            text: 'Se eliminaran todos los productos agregados',
            icon:'question',
            }).then(()=>{
                for(let i = carritoDeCompras.length; i > 0; i--){
                    carritoDeCompras.pop();
                    actualizarCarrito();
                    localStorage.clear();
                    btnEliminarCarrito.onclick = location.href='index.html'
                
                }
                
            })
        
    }
})


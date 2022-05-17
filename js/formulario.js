const tarjeta = document.querySelector('#tarjeta');

const btnAbrirFormulario = document.querySelector('#btn-abrir-formulario');
const formulario = document.querySelector('#formulario-tarjeta');
const selectYear = document.querySelector('#selectYear');
const selectMes = document.querySelector('#selectMes');
const inputNumero = document.querySelector('#inputNumero');
const nroTC = document.querySelector('.numero');
const logoMarca = document.querySelector('#logoMarca');
const nombreTC = document.querySelector('.nombre');
const inputNombre = document.querySelector('#inputNombre');
const firma = document.querySelector('.nombreFirma');
const mes = document.querySelector('#mes');
const inputMes = document.querySelector('#selectMes');
const year = document.querySelector('#year');
const inputYear = document.querySelector('#selectYear')
const cvv = document.querySelector('.cvv');
const inputCVV = document.querySelector('#inputCVV');
const btnFinalizarCompra = document.querySelector('#btnFinalizarCompra');

/*Roto la tarjeta*/
tarjeta.addEventListener('click', ()=>{
    tarjeta.classList.toggle('active');

})

/*Mostrar frente de la tarjeta*/

const frenteTarjeta = ()=> {
    if(tarjeta.classList.contains('active')){
        tarjeta.classList.remove('active')
    }
}

/*Mostrar dorso de la tarjeta*/

const dorsoTarjeta = () =>{
    if(tarjeta.classList.contains('active')){
        tarjeta.classList.remove('active')
    }else{
        tarjeta.classList.toggle('active')
    }
}


/*Giro boton de apertura del formulario*/
btnAbrirFormulario.addEventListener('click', () => {
	btnAbrirFormulario.classList.toggle('active');
});
/*Despliego el formulario*/
btnAbrirFormulario.addEventListener('click', ()=>{
    formulario.classList.toggle('active')
});

/*Agrego dinamicamente todas las opciones de los options*/

function agregarOpciones (){
    let anioVencimiento = new Date().getFullYear();;
    for (i = 1; i <= 8; i++){
        anioVencimiento++;
        let option = document.createElement('option');
        option.innerHTML = `<option>${anioVencimiento}</option>
        `;
        selectYear.appendChild(option);
    }

}
agregarOpciones()

function agregarMeses(){
    let meses = 0
    for(i = 0;  i < 12; i++){
        meses++;
        let option = document.createElement('option');
        option.innerHTML = `<option>${meses}</option>
        `;
        selectMes.appendChild(option);
    }
}
agregarMeses()

/*Values a los imputs y validaciones*/

inputNumero.addEventListener('keyup', (e) =>{
    let valorInput = e.target.value;

	inputNumero.value = valorInput
    

    // Eliminamos espacios en blanco
	.replace(/\s/g, '')
	// Eliminar las letras
	.replace(/\D/g, '')
	// Ponemos espacio cada cuatro numeros
	.replace(/([0-9]{4})/g, '$1 ')
	// Elimina el ultimo espaciado
	.trim();
    
	nroTC.textContent = valorInput;

	if(valorInput == ''){
		nroTC.textContent = '#### #### #### ####';

		logoMarca.innerHTML = '';
	}
    /*Detectar nro de la tarjeta para poner la marca*/

    if( valorInput[0] == 4){
        logoMarca.innerHTML ='';
        let img = document.createElement('img');
        img.src = "/images/visa.png";
        
        logoMarca.appendChild(img);
    }else if(valorInput[0] == 5){
        logoMarca.innerHTML ='';
        let img = document.createElement('img');
        img.src = "/images/mastercard.png";
        logoMarca.appendChild(img);
    }else if (valorInput[0] == 3){
        logoMarca.innerHTML ='';
        let img = document.createElement('img');
        img.src = "/images/amex.png";
        img.className = "imgAmex";
        logoMarca.appendChild(img);
    }
    
    //dar vuelta la tarjeta para que se vea el frente
    frenteTarjeta()
    
})






nombreTC.innerText = "Lionel Messi"

inputNombre.addEventListener('keyup', (e) =>{
    let valorInput = e.target.value;

	inputNombre.value = valorInput
    .replace(/[0-9]/g, '');
	nombreTC.textContent = valorInput;
	firma.textContent = valorInput;

	if(valorInput == '') {
		nombreTC.textContent = 'Lionel Messi';
	}


    frenteTarjeta();

})

/*Mes del vencimiento*/

inputMes.addEventListener('change', (e) =>{
    let valorInput = e.target.value;
    
    inputMes.value = valorInput;

    if(valorInput < 10){
    mes.textContent = `0${valorInput}`}
    else{mes.textContent = valorInput}

    frenteTarjeta()
})

inputYear.addEventListener('change',(e)=>{
    let valorInput = e.target.value;

    inputYear.value = valorInput;

    year.textContent = valorInput - 2000;
    
    frenteTarjeta()

})

/*Codigo de seguridad*/

inputCVV.addEventListener('keyup',()=>{

    /**/
    if(!tarjeta.classList.contains('active')){
        tarjeta.classList.toggle('active')
    }

    inputCVV.value = inputCVV.value
    .replace(/\s/g, '')
	// Eliminar las letras
	.replace(/\D/g, '')
	// Ponemos espacio cada cuatro numeros
	.replace(/([0-9]{4})/g, '$1 ')
	// Elimina el ultimo espaciado
	.trim();

    cvv.textContent = inputCVV.value

})

//Boton finalizar compra lanza alerta que ya se realizó el pedido. 

function finalizarCompra (){
    btnFinalizarCompra.addEventListener('click',(e)=>{
        e.preventDefault(e);
        numero
        nombre
        mes
        year
        cvv
        //Validacion de los inputs
        if(inputNumero.value == 0 ||
            formulario.nombre.value == 0 ||
            formulario.mes.value == 0 ||
            formulario.year.value == 0 ||
            formulario.cvv.value == 0 ){
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
                //Alerta para confirmar la compra
                Swal.fire({
                title: 'Compra confirmada',
                text: 'En 5 días te va a llegar tu producto',
                imageUrl: 'https://c.tenor.com/9eFnSCwAiXQAAAAC/gracias-vuelvan-prontos.gif',
                imageWidth:600,
                imageHeight: 300,
                imageAlt: 'Gracias vuelvas prontos',
                }).then(()=>{
                    location.href='index.html'
                })
                //Bucle para vaciar el carrito y local storage
                for(let i = carritoDeCompras.length; i > 0; i--){
                    carritoDeCompras.pop();
                    actualizarCarrito();
                    localStorage.clear();
                }
                

                
            
            };
        
        

    })
}
finalizarCompra();

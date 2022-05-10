const tarjeta = document.querySelector('#tarjeta');

const btnAbrirFormulario = document.querySelector('#btn-abrir-formulario');
const formulario = document.querySelector('#formulario-tarjeta');
const selectYear = document.querySelector('#selectYear');
const selectMes = document.querySelector('#selectMes');
const inputNumero = document.querySelector('#inputNumero');
const nroTC = document.querySelector('.numero');
const logoMarca = document.querySelector('#logoMarca');

/*Roto la tarj2eta*/
tarjeta.addEventListener('click', ()=>{
    tarjeta.classList.toggle('active');

})

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
    let anioVencimiento = 2021;
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
    let meses = new Date().getFullYear();
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
        let img = document.createElement('img');
        img.src = "/images/visa.png";
        
        logoMarca.appendChild(img);
    }else if(valorInput[0] == 5){
        let img = document.createElement('img');
        img.src = "/images/mastercard.png";
        logoMarca.appendChild(img);
    }else if (valorInput[0] == 3){
        let img = document.createElement('img');
        img.src = "/images/amex.png";
        logoMarca.appendChild(img);
    }
    
})






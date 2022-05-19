function mayorMenor (){

    stockProductos.sort((a,b) =>{
        if(a.precio < b.precio){
            return -1
        } else if(a.precio > b.precio){
            return 1;
        }else{
            return 0;
        }
    })
    console.log(stockProductos)


}
mayorMenor();
window.onload = function (){
    canv = document.getElementById("mapa")  //Tomamos el canvas del html
    puntaje = document.getElementById("puntaje");
    ctx = canv.getContext("2d");    
    document.addEventListener("keydown", keyPush);  //Agregando evento al docmumento, funcion de teclas para moverse
    setInterval(juego, 1000/15);    //Llamar la funcion juego 15 mseg
}

//velocidad en X y Y
xv = 0;
yv = 0;
//Posiciones serpiente X y Y
px = 10;
py = 10;
//tamaño de la cuadricula de la serpiente
gs = 20;
//Tamaño mundo para desplazar 
tc = 25;
//Posicion comida
ax = 15;
ay = 15;
//Longitud 
trail = [];
//Tamaño con el que inicia la serpiente
tail = 2; 
//Puntuacion
var score = 0;
function juego(){
    px += xv;
    py += yv;
    //Variable para el puntaje del juego
    var text = "Score: " + score;
    //Impresion del punja (actualizar marcador)
    puntaje.innerHTML = text;
    //Los if permiten recorer en circulos en mundo
    if(px < 0){
        px = tc - 1;
    }
    if(px > tc - 1){
        px = 0;
    }
    if(py < 0){
        py = tc - 1;
    }
    if(py > tc - 1){
        py = 0;
    }
    //Color del canvas 
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);  //Dibuja el canvas

    ctx.fillStyle = "lime";
    for(var i = 0; i < trail.length; i++){
        ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2.5, gs - 2.5);
        //Condicion para reiniciar la serpiente
        if(trail[i].x == px && trail[i].y == py && score > 0){
            window.alert('Perdiste! \nPuntaje de: ' + score + ' manzanas');
            location.reload();
            tail = 2;
        } 
    }
    //Inserta los elementos
    trail.push({x:px, y:py});
    while(trail.length > tail){
        trail.shift(); //Elimina un elemento 
    }

    //Este if es para la comida 
    if(ax == px && ay == py){
        tail++;   //Aumenta el tamaño de la serpiente 
        score++;  //Aumenta el puntaje 
        //Posicion el x, y para generar la comida 
        ax = Math.floor(Math.random() * tc);
        ay = Math.floor(Math.random() * tc);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(ax * gs, ay * gs, gs - 2.5, gs - 2.5);
}



//Esta funcion detecta el pulsado de teclas y controla la serpiente
var direccion;
function keyPush(event){
    if(event.keyCode == 65 && direccion != "dere"){
        direccion = "izqui";
        xv = -1;
        yv = 0;
    }
    if(event.keyCode == 87 && direccion != "abajo"){
        direccion = "arriba";
        xv = 0;
        yv = -1;
    }
    if(event.keyCode == 68 && direccion != "izqui"){
        direccion = "dere";
        xv = 1;
        yv = 0;
    }
    if(event.keyCode == 83 && direccion != "arriba"){
        direccion = "abajo";
        xv = 0;
        yv = 1;
    }
}

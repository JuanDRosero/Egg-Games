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
tc = 35;
//Posicion comida
ax = 15;
ay = 15;
//Longitud 
trail = [];
//Tamaño con el que inicia la serpiente
tail = 3; 
//Puntuacion
var score = 0;
function juego(){
    px += xv;
    py += yv;
    var text = "Score: " + score;
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
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canv.width, canv.height);

    ctx.fillStyle = "lime";
    for(var i = 0; i < trail.length; i++){
        ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 4, gs - 4);
        //Condicion para reiniciar la serpiente 
        if(trail[i].x == px && trail[i].y == py){
            tail = 3;
        }
    }

    trail.push({x:px, y:py});
    while(trail.length > tail){
        trail.shift();
    }

    //Este if es para la comida 
    if(ax == px && ay == py){
        tail++;
        score++;
        ax = Math.floor(Math.random() * tc);
        ay = Math.floor(Math.random() * tc);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(ax * gs, ay * gs, gs - 4, gs - 4);
}
//Esta funcion detecta el pulsado de teclas y controla la serpiente
function keyPush(evt){
    switch(evt.keyCode){
        case 37:
            xv = -1;
            yv = 0;
            break;
        case 38:
            xv = 0;
            yv = -1;
            break;
        case 39:
            xv = 1;
            yv = 0;
            break;
        case 40: 
            xv = 0;
            yv = 1;
            break;
    }
}
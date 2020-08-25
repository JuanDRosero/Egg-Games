//adicion de eventos para lectura de tecla de inicio, reinicio y  juego
document.addEventListener('keydown',function(evento){
	if(evento.keyCode==38){		//Flecha hacia arriba
		jumpout();
	}if(evento.keyCode==13){	//Enter
		console.log("enter");
		if(level.dead==true){
			tbarrier.x=ancho+100;
				level.speed=9;
			level.dead=false;
			level.score=0;	
		}
		if(level.score>=1000){
			level.speed=9;
			level.score=0;	
		}
		if(level.ft==true){
			level.ft=false;
		}
	}
})
//definición de variables auxiliares y objetos para jugador, nivel, obstaculo y decoracion de fondo
var ancho=800;
var alto=400;
var canvas,ctx;
var floorg={x:0,y:310};
var imgbarrier,imgturbine,imgpark,imgswing,imgsuelo,imfrun,imgup,imgfail,imgwin,imgft;
var floor=250;
var tpaolo={y: floor,vy: 0,gravity:2,jump:28, vymax:9,jumping: false};
var level={ speed:9, score:0,dead:false, ft:true};
var tbarrier={x:ancho+100 , y:floor};
var decorate={x:0 , y:floor-130};
//asignación de rutas a las imagenes
function loadImage() {
	imgft = document.getElementById('yolo');
	imgwin = document.getElementById('win');
	imgrun = document.getElementById('run');
	imgbarrier = document.getElementById('trash');
	imgt1 = document.getElementById('t1');
	imgsuelo = document.getElementById('fail');
	imgfail = document.getElementById('floor');
}
//Función que inicializa el canvas,el contexto y las imagenes al cargar
function inicializa(){
	canvas=document.getElementById('canvas');
	ctx=canvas.getContext('2d');
	loadImage();
}
//Funcion que borra el contenido del canvas redimensionandolo
function cleanCanvas(){
	canvas.width=ancho;
	canvas.height=alto;
}
//Dibuja al jugador
function drawPaolo(){
	ctx.drawImage(imgrun,0,0,512,512,50,tpaolo.y,70,70);
}
//Dibuja el obstaculo
function drawBarrier(){
	ctx.drawImage(imgbarrier,0,0,512,512,tbarrier.x,tbarrier.y,70,70);
}
//Dibuja el fondo
function drawDecorate(){
	ctx.drawImage(imgt1,decorate.x,0,11776,512,0,decorate.y,4710,205);
}
//Dibulla el suelo
function drawFloor(){
	ctx.drawImage(imgfail,floorg.x,0,830,151,0,floorg.y,850,90);
}
//imagen cuando se pierde
function drawFail(){
	ctx.drawImage(imgsuelo,0,0,1118,523,0,0,800,400);
}
//Dibuja imagen de victoria
function drawWin(){
	ctx.drawImage(imgwin,0,0,1118,523,0,0,800,400);
}
//Dibuja imagen con las instrucciones
function drawinst(){
	ctx.drawImage(imgft,0,0,948,535,0,0,800,400);
}

//condiciona el movimiento del obstaculo
function moveBarrier(){
	if(tbarrier.x<-100){
		tbarrier.x=ancho+100;
	}else{
		tbarrier.x-=level.speed;
	}
}	
//Condiciona el movimiento de la decoracion del fondo
function moveDecorate(){
	if(decorate.x>=9800){
		decorate.x=0;
	}else{
		decorate.x+=level.speed;
	}
}
//Condiciona el movimiento del suelo
function moveFloor(){
	if(floorg.x>55){
	floorg.x=0;
	}else{
		floorg .x+=level.speed;
	}
}
//indica que el jugador esta saltando
function jumpout(){
	tpaolo.jumping=true;
	tpaolo.vy=tpaolo.jump;
}
//detecta si el jugador esta saltando y de ser asi, cambia su imagen y condiciones de desplazamiento 
function gravity(){
	if(tpaolo.jumping==true){
		imgrun = document.getElementById('up');
		if(tpaolo.y-tpaolo.vy-tpaolo.gravity>floor){
			tpaolo.jumping=false;
			imgrun = document.getElementById('run');
			tpaolo.vy=0;
			tpaolo.y=floor;
		}else{
			tpaolo.vy-=tpaolo.gravity;
			tpaolo.y-=tpaolo.vy;
		}
	}
}
//Detiene el juego cuando el jugador choca con el obstaculo
function coalition(){
	if(tbarrier.x>=50 && tbarrier.x<=120 ){		
		if(tpaolo.y>=floor-70){
				level.dead=true;
				tbarrier.x=200;
				level.speed=0;
			}
		}
	}
//Detiene el juego cuando el jugador obtiene suficiente recorrido para ganar
function winner(){
		if(level.score>=1000){
			tbarrier.x=200;
			level.speed=0;
		}
}
//Cuenta el puntaje durante el juego
function countScore(){
	level.score+=1;
	}

//funcion que ejecuta corre el juego y ejecuta las funciones necesarias dependiendo de si el personaje esta en movimiento y si ha ganado o perdido.
function principal(){
	cleanCanvas();
	console.log(level.dead);
	if(level.ft==true){
		drawinst();	
	}else if(level.dead==false){
		if(level.score>=1000){
			console.log(level.score);
			drawWin();			
		}else{
			coalition();
			winner();
			gravity();
			drawFloor();
			moveFloor();	
			moveDecorate();
			drawDecorate();
			moveBarrier();
			drawBarrier();
			drawPaolo();
			countScore();
		}	
	} else{
		drawFail();
		}		
}

//funcion que determina la velocidad con la que se visualiza el juego
setInterval(function(){
	principal();
	},1000/70);

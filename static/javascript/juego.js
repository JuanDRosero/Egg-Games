
document.addEventListener('keydown',function(evento){
	if(evento.keyCode==38){
		jumpout();
	}if(evento.keyCode==13){
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

var ancho=800;
var alto=400;
var canvas,ctx;
var floorg={x:0,y:310}
var imgbarrier,imgturbine,imgpark,imgswing,imgsuelo,imfrun,imgup,imgfail,imgwin,imgft;
var floor=250;
var tpaolo={y: floor,vy: 0,gravity:2,jump:28, vymax:9,jumping: false};
var level={ speed:9, score:0,dead:false, ft:true};
var tbarrier={x:ancho+100 , y:floor};
var decorate={x:0 , y:floor-130};

function loadImage() {
	imgft = documente.getElementById("ft");
	imgwin = documente.getElementById("win");
	imgrun = documente.getElementById("run");
	imgbarrie = documente.getElementById("trash");
	imgt1 = documente.getElementById("t1");
	imgsuelo = documente.getElementById("fail");
	imgfail = documente.getElementById("floor");
}

function inicializa(){
	canvas=document.getElementById('canvas');
	ctx=canvas.getContext('2d');
	loadImage();
}

function cleanCanvas(){
	canvas.width=ancho;
	canvas.height=alto;
}

function drawPaolo(){
	ctx.drawImage(imgrun,0,0,512,512,50,tpaolo.y,70,70);
}
function drawBarrier(){
	ctx.drawImage(imgbarrier,0,0,512,512,tbarrier.x,tbarrier.y,70,70)
}
function drawDecorate(){
	ctx.drawImage(imgt1,decorate.x,0,11776,512,0,decorate.y,4710,205)
}
function drawFloor(){
	ctx.drawImage(imgfail,floorg.x,0,830,151,0,floorg.y,850,90)
}
/*function drawFail(){
	ctx.drawImage(imgfail,0,0,1118,523,0,400,800,400)
}*/
function drawFail(){
	ctx.drawImage(imgsuelo,0,0,1118,523,0,0,800,400)
}
function drawWin(){
	ctx.drawImage(imgwin,0,0,1118,523,0,0,800,400)
}
function drawinst(){
	ctx.drawImage(imgft,0,0,948,535,0,0,800,400)
}

function moveBarrier(){
	if(tbarrier.x<-100){
		tbarrier.x=ancho+100;
	}else{
		tbarrier.x-=level.speed;
	}
}	
function moveDecorate(){
	if(decorate.x>=9800){
		decorate.x=0;
	}else{
		decorate.x+=level.speed;
	}
}
function moveFloor(){
	if(floorg.x>55){
	floorg.x=0;
	}else{
		floorg .x+=level.speed;
	}
}

function jumpout(){
	tpaolo.jumping=true;
	tpaolo.vy=tpaolo.jump;
}

function gravity(){
	if(tpaolo.jumping==true){
		imgrun.src='img/up.png';
		if(tpaolo.y-tpaolo.vy-tpaolo.gravity>floor){
			tpaolo.jumping=false;
			imgrun.src='img/run.png';
			tpaolo.vy=0;
			tpaolo.y=floor;
		}else{
			tpaolo.vy-=tpaolo.gravity;
			tpaolo.y-=tpaolo.vy;
		}
	}
}

function coalition(){
	if(tbarrier.x>=50 && tbarrier.x<=120 ){		
		if(tpaolo.y>=floor-70){
				level.dead=true;
				tbarrier.x=200;
				level.speed=0;
			}
		}
	}
function winner(){
		if(level.score>=1000){
			tbarrier.x=200;
			level.speed=0;
		}
}
function countScore(){
	level.score+=1;
	
}


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


setInterval(function(){
	principal();
	},1000/70);









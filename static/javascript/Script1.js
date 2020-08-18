// JavaScript source code
var ancho = 800;
var alto = 400;
var altutaJ = 100;
var rbola=40;
var tamJ = 80;
var imgJugador, imgOponente, imgBola,imgfondo;
var canvas, ctx;
var score = [0, 0];
var jugando = false;
function cargaImagenes() {
    imgJugador = document.getElementById("jugador");
    imgOponente = document.getElementById("oponente");
    imgBola = document.getElementById("bola");
    imgfondo = document.getElementById("fondo");
}
function dibujarMarcador() {
    ctx.font = "50px Georgia";
    ctx.fillText(score[0] + " - " + score[1], 355, 50);
}
var Ball = {
    pos: [380, 100],
    vel: [0, 0],
    velM: 2,
    estadoH: true,   //True derecha, False izquierda
    estadoV: true,  //True arriba, False abajo
    mover: function () {
        if ((this.pos[0] <= 0 || this.pos[0] + rbola >= ancho) && jugando==true) {
            if (this.pos[0] <= 0) {
                score[1]++;
            } else {
                score[0]++;
            }
            jugando = false;
        } else {
            if (this.pos[1] == 0 && this.estadoV == true) {
                this.estadoV = false
            } else if (this.pos[1] + rbola == alto && this.estadoV == false) {
                this.estadoV = true;
            }
            if (this.pos[0] <= tamJ && this.pos[1] >= Jugador.posy && this.pos[1] <= Jugador.posy + altutaJ && this.estadoH == false) {
                this.estadoH = true;
            } else if (this.pos[0] == ancho - tamJ && this.pos[1] <= Oponente.posy && this.pos[1] <= Oponente.posy + altutaJ && this.estadoH == true) {
                this.estadoH = false;
            }
            /////////////////Movimiento Horizontal/////////////////////////////////////
            if (this.estadoH == true) {
                this.vel[0] = this.velM;
                this.pos[0] += this.vel[0]
            } else {
                this.vel[0] = -this.velM;
                this.pos[0] += this.vel[0];
            }
            /////////////////Movimiento Vertical////////////////////////////////////////
            if (this.estadoV == true) {
                this.vel[1] = -this.velM;
                this.pos[1] += this.vel[1];
            } else {
                this.vel[1] = this.velM;
                this.pos[1] += this.vel[1];
            }
        }
    },
    aumentarVel: function () {
        this.velM+=2;
    },
    inicio: function (direccionH, direccionV) {
        this.pos = [380, 100];
        switch (direccionH) {
            case 1: //Derecha
                this.estadoH = true;
                break;
            case 2: //Izquierda
                this.estadoH = false;
                break;
        }
        switch (direccionV) {
            case 1: //Arriba
                this.estadoV = true;
                break;
            case 2://Abajo
                this.estadoV = false;
                break;
        }
    }
};
var Jugador =  {
     posy:0,
     vy : 8,
    mover: function (direccion) {
        //1 arriba y -1 abajo
        if (jugando == true) {
            switch (direccion) {
                case 1:
                    if (this.posy - this.vy > 0) {
                        this.posy -= this.vy;
                    } 
                    break;
                case -1:
                    if (this.posy + this.vy < alto - altutaJ) {
                        this.posy += this.vy;
                    }
                    break;
                default:
                    console.log("Entro en el default")
            }
        }
    }

}

var Oponente =  {
    posy:0,
    vy : 5,
    mover: function(direccion) {
        //1 arriba y -1 abajo
        if (jugando == true) {
            switch (direccion) {
                case 1:
                    console.log("Entro arriba");
                    if (this.posy - this.vy > 0) {
                        this.posy -= this.vy;
                        console.log("Entro arriba");
                    }
                    break;
                case -1:
                    
                    if (this.posy + this.vy < alto - altutaJ) {
                        this.posy += this.vy;
                        console.log("Entro a abajo");
                    }
                    break;
            }
        }
    },
    seguir: function () {
        if (Ball.pos[1] <= this.posy) {
            this.mover(1);
        } else if (Ball.pos[1] >= this.posy + tamJ) {
            this.mover(-1);
        }
    }
};


function inicializa() {
    canvas = document.getElementById('cv');
    ctx = canvas.getContext('2d');
    cargaImagenes();
    dibujarMarcador();
}
function borraCanvas() {
    canvas.width = ancho;
    canvas.height = alto;
}
function dibujarFondo() {
    ctx.drawImage(imgfondo, 0, 0, ancho, alto);
}
function dibujaJugador() {
    ctx.drawImage(imgJugador, 0, Jugador.posy, tamJ, altutaJ);
}
function dibujaOponente() {
    ctx.drawImage(imgOponente, ancho - tamJ, Oponente.posy, tamJ, altutaJ);
}
function dibujarBalon() {
    ctx.drawImage(imgBola,Ball.pos[0], Ball.pos[1], rbola, rbola);
}
inicializa();
//Bucle principal
var FPS = 60;
var contador = 0;
setInterval(function () { //cada cuanto se debe ejecutar una funcion en un intervalo de tiempo.
    principal();
}, 1000 / FPS);

function principal() {
    if (jugando == false) {
        setTimeout(function () {
            jugando = true;
            dibujarMarcador();
            var num1 = Math.floor(Math.random() * (3 - 1)) + 1;
            var num2 = Math.floor(Math.random() * (3 - 1)) + 1;
            Ball.inicio(num1,num2);
            jugando = true;
        }, 1500);
    }
    /* para aumentar la velocidad
    if (contador % 10000 == 0) {
        Ball.aumentarVel();
        console.log("Se aumento la velocidad");
    }
    */
    borraCanvas();
    dibujarFondo();
    dibujarMarcador();
    Ball.mover();
    dibujarBalon();
    dibujaJugador();
    Oponente.seguir();
    dibujaOponente();
}
document.addEventListener("keydown", function (evento) {
    switch (evento.keyCode) {
        case 65:
            Jugador.mover(1);
            break;
        case 90:
            Jugador.mover(-1);
            break;
    }
});

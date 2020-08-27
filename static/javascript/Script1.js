//Programacion imperativa orientada a objetos
// JavaScript source code
var ancho = 800;
var alto = 400;
var altutaJ = 100;
var rbola=40;
var tamJ = 80;
var canvas;
var ctx;
//Objeto de Juego
var juego = {   
    imgJugador: document.getElementById("jugador"),
    imgOponente: document.getElementById("oponente"),
    imgBola: document.getElementById("bola"),
    imgfondo: document.getElementById("fondo"),
    score: [0, 0],
    jugando: false,
    iniciar: function () {      //Funcion para inicializar el tablero
        canvas = document.getElementById('cv');
        ctx = canvas.getContext('2d');
        this.dibujarMarcador();
    },
    aumentaScore: function (jp) {   //1 si es el jugador y 2 si es el oponente
        if (jp == 1) {
            this.score[0]++;
        } else {
            this.score[1]++;
        }
    },
    //Funciones de dibujo
    borrarCanvas: function () {
        canvas.width = ancho;
        canvas.height = alto;
    },
    dibujarFondo: function () {
        ctx.drawImage(this.imgfondo, 0, 0, ancho, alto);
    },
    dibujaJugador: function () {
        ctx.drawImage(this.imgJugador, 0, Jugador.posy, tamJ, altutaJ);
    },
    dibujaOponente: function () {
        ctx.drawImage(this.imgOponente, ancho - tamJ, Oponente.posy, tamJ, altutaJ);
    },
    dibujarBalon: function () {
        ctx.drawImage(this.imgBola, Ball.pos[0], Ball.pos[1], rbola, rbola);
    },
    dibujarMarcador: function () {
        ctx.font = "50px Georgia";
        ctx.fillText(this.score[0] + " - " + this.score[1], 355, 50);
    }
};
//Objeto Ball
var Ball = {
    pos: [380, 100],
    vel: [0, 0],
    velM: 2,        //pixeles de deplazamiento
    estadoH: true,   //True derecha, False izquierda
    estadoV: true,  //True arriba, False abajo
    //Función encargada de mocer el balon
    mover: function () {
        if ((this.pos[0] <= 0 || this.pos[0] + rbola >= ancho) && juego.jugando==true) {
            if (this.pos[0] <= 0) {
                juego.aumentaScore(2);
            } else {
                juego.aumentaScore(1)
                Oponente.aumentarVel(); //Aumenta la dificultad del oponente
            }
            juego.jugando = false;
        } else {
            //Valida rebote en techo y suelo
            if (this.pos[1] <= 0 && this.estadoV == true) {
                this.estadoV = false
            } else if (this.pos[1] + rbola >= alto && this.estadoV == false) {
                this.estadoV = true;
            }
            //Valida rebote en jugador o oponente
            if (this.pos[0] <= tamJ && this.pos[1] >= Jugador.posy && this.pos[1] <= Jugador.posy + altutaJ && this.estadoH == false) {
                this.estadoH = true;
            } else if (this.pos[0] >= ancho - tamJ && this.pos[1] >= Oponente.posy && this.pos[1] <= Oponente.posy + altutaJ+3 && this.estadoH == true) {
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
    //Funcion de aumentar la velocidad
    aumentarVel: function () {
        this.velM+=2;
    },
    //Función para reiniciar la pelota
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
//Objeto Jugador
var Jugador =  {
     posy:0,
     vy : 8,
    mover: function (direccion) {
        //1 arriba y -1 abajo
        if (juego.jugando == true) {
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
//Objeto Oponente
var Oponente =  {
    posy:0,
    vy : 3,
    mover: function(direccion) {
        //1 arriba y -1 abajo
        if (juego.jugando == true) {
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
            }
        }
    },
    //Función encargada de mover el oponente
    seguir: function () {
        if (Ball.pos[1] < this.posy) {
            this.mover(1);
        } else if (Ball.pos[1] > this.posy + tamJ) {
            this.mover(-1);
        }
    },
    aumentarVel: function () {
        this.vy += 2;
    }
};

juego.iniciar();
//Bucle principal
var FPS = 60;
var contador = 1;   //determina cuando subir la dificultad del juego 
setInterval(function () { //cada cuanto se debe ejecutar una funcion en un intervalo de tiempo.
    principal();
}, 1000 / FPS);

function principal() {
    if (juego.jugando == false) {
        setTimeout(function () {
            juego.jugando = true;
            juego.dibujarMarcador();
            var num1 = Math.floor(Math.random() * (3 - 1)) + 1;
            var num2 = Math.floor(Math.random() * (3 - 1)) + 1;
            Ball.inicio(num1,num2);
        }, 1500);
    }
    if (contador % 1000 == 0) {
        Ball.aumentarVel();
        console.log("Se aumento la velocidad");
    }
    juego.borrarCanvas;
    juego.dibujarFondo();
    juego.dibujarMarcador();
    Ball.mover();
    juego.dibujarBalon();
    juego.dibujaJugador();
    Oponente.seguir();
    juego.dibujaOponente();
    contador++;
}
//Lector de teclas
document.addEventListener("keydown", function (evento) {
    switch (evento.keyCode) {
        case 65:        //A
            Jugador.mover(1);
            break;
        case 90:        //Z
            Jugador.mover(-1);
            break;
    }
});

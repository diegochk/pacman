
import Movil from "./movil.class.js";
import constantes from "../constantes.js";
import Tablero from "./tablero.class.js";

export default class Juego {

    fantasmas = [];
    pacman;
    tablero;

    constructor(){
        this.crearObjetos();
        this.posicionesIniciales();
    }

    // 4 Fantasmas, por defecto ubicados en la fila 13 entre columnas 11 y 14
    crearObjetos(){
        // Crear los fantasmas
        for(let index = 0; index < 4; index += 1){
            this.fantasmas.push(new Movil(13, 11 + index, constantes.FANTASMA));
        }

        this.pacman = new Movil(22, 12, constantes.PACMAN);
        this.tablero = new Tablero();
    }

    posicionesIniciales(){
        this.fantasmas.forEach( fantasma => {
            const {fila, columna} = fantasma.posicion;
            this.tablero.ubicarElemento(fila, columna, fantasma);
            fantasma.direccion = constantes.ARRIBA;
        })

        this.tablero.ubicarElemento(
            this.pacman.posicion.fila, 
            this.pacman.posicion.columna, 
            this.pacman);
    
        this.tablero.dibujarTablero();
    }


    leerTeclas(event){

        let direccionPacman;
        switch(event.code){
            case 'ArrowUp':
                direccionPacman= constantes.ARRIBA;
                break;
            case 'ArrowDown':
                direccionPacman= constantes.ABAJO;
                break;
            case 'ArrowLeft':
                direccionPacman= constantes.IZQUIERDA;
                break;
            case 'ArrowRight':
                direccionPacman= constantes.DERECHA;
                break;
            case 'Escape':
                exit; // End the game;
            default:
                direccionPacman= constantes.NO_MOVIMIENTO;
        }

        if(!direccionPacman) return;
        this.pacman.direccion = direccionPacman;
        const nuevaPosicion = this.pacman.moverse();
        // El dibujo del pacman y el campo vacio donde estuvo en este momento
        const evento = this.tablero.ubicarElemento(nuevaPosicion.fila, nuevaPosicion.columna, this.pacman);

        //No se puede mover a esta posición
        if(evento === constantes.NO_MOVIMIENTO) return;
        
        this.tablero.ubicarElemento(this.pacman.fila, this.pacman.columna, { tipo: constantes.VACIO, fila: this.pacman.fila, columna: this.pacman.columna });
        this.tablero.dibujarTablero(); // Esta función no será necesaria cuando haya clases css

        this.pacman.fila = nuevaPosicion.fila;
        this.pacman.columna = nuevaPosicion.columna;
    }

    jugar(){
        this.fantasmas.forEach( fantasma => {
            const nuevaPos = fantasma.moverse();
            let resultado = this.tablero.ubicarElemento(nuevaPos.fila, nuevaPos.columna, fantasma);
            // Cuando el tablero regresa un array es porque el fantasma se encontró con un bloque y debe cabmiar de direccipon
            // El resultado contiene las direcciones posibles y se selecciona al azar
            if(resultado && resultado.length){
                console.log(resultado)
                const index = Math.round(Math.random() * (resultado.length - 1))
                fantasma.direccion = resultado[index];
                const nuevaPos = fantasma.moverse();
                resultado = this.tablero.ubicarElemento(nuevaPos.fila, nuevaPos.columna, fantasma);
            }
            // TODO: Deberpia poner el valor que estaba anteriormente
            this.tablero.ubicarElemento(fantasma.fila, fantasma.columna, {tipo: constantes.VACIO, fila: fantasma.fila, columna: fantasma.columna});
            fantasma.fila = nuevaPos.fila;
            fantasma.columna = nuevaPos.columna;
        })

        this.tablero.dibujarTablero();
    }
}
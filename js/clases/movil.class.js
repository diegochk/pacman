import Objeto from "./objeto.class.js";
import constantes from "../constantes.js";

const {ARRIBA, ABAJO, IZQUIERDA, DERECHA} = constantes; 

export default class Movil extends Objeto {

    #direccion;

    constructor(fila, columna, tipo){
        super(fila, columna, tipo); 
    }

    // Dirección en la que se mueve hasta que encuentre un obstáculo
    set direccion(direccion) {
        this.#direccion = direccion;
    }

    // Retorna la nueva posibile posición a mover
    // La posición será actualizada cuando el movimiento sea confirmado como posible. 
    moverse = () => {
        if(this.#direccion === IZQUIERDA){
            return {fila: this.fila, columna: this.columna - 1};
        }

        if(this.#direccion === DERECHA){
            return {fila: this.fila, columna: this.columna + 1};
        }

        if(this.#direccion === ARRIBA){
            return {fila: this.fila - 1, columna: this.columna};
        }

        if(this.#direccion === ABAJO){
            return {fila: this.fila + 1, columna: this.columna};
        }

        return {fila: 0, columna: 0};
    }

    // Solo para fantasmas
    cambiarTipo = (tipo) => {
        const tipoFantasma = [FANTASMA, FANTASMA_DEBIL];
        if(tipoFantasma.includes(tipo) && tipoFantasma.includes(this.tipo)){
            this.tipo = tipo;
        }

        return;
    }
}
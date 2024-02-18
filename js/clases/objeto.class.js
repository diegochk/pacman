export default class Objeto {

    #fila;
    #columna;
    #tipo; // Pacman, fantasma, premio....etc

    constructor(fila_inicial, columna_inicial, tipoObjeto) {
        this.#fila = fila_inicial;
        this.#columna = columna_inicial +1;
        this.#tipo = tipoObjeto;
    }

    get tipo(){
        return this.#tipo;
    }

    get posicion() {
        return {fila: this.#fila, columna: this.#columna}; 
    }

    set fila(fila) {
        this.#fila = fila;
    }

    set columna(columna){
        this.#columna = columna;
    }
}
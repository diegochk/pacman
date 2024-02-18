import constantes from "../constantes.js";

const {PACMAN, GANA_GALLETA,
    GANA_PREMIO, PREMIO, GALLETA, FANTASMA,
   BLOQUE, INVISIBLE, OK,
   PIERDE_FANTASMA, FANTASMA_DEBIL,
   NO_MOVIMIENTO} = constantes;

   const MAX_COLUMNAS = 26;
    const MAX_FILAS = 29;

export default class Tablero {

    // Matriz que contiene las posiciones de los objetos en el juego
    board = [];

    constructor() {
        this.inicializarTablero();
        this.construirTablero();
        this.dibujarTablero();
    }

    inicializarTablero = () => {
        // Número por defecto


        for(let index=0; index<MAX_FILAS; index+=1){
            const row = new Array(MAX_COLUMNAS).fill('.');
            this.board.push(row);
        }
    }

    // Ubica uno de los elementos dentro del tablero
    ubicarElemento = (fila, columna, objeto) => {

        // 1. Detectar colisiones con los objetos que ya tienen esa posición.
        const evento = this.detectarColision(this.board[fila][columna], objeto.tipo);

        // Si no se permite el movimiento entonces se regresa ese evento. TODO: La nueva posición.
        if(evento === NO_MOVIMIENTO) return objeto.tipo === FANTASMA ? this.getDireccionesPosibles(objeto.fila, objeto.columna) : evento;
        if(evento === PIERDE_FANTASMA) return evento;

        this.board[fila][columna] = objeto.tipo;
        return evento;
    }

    detectarColision = (objetoActual, nuevoObjeto) => {

        // Eventos pacman o superpacman
        if(nuevoObjeto === PACMAN){
            if(objetoActual === GALLETA) return GANA_GALLETA;
            if(objetoActual === PREMIO) return GANA_PREMIO;
            if(objetoActual === FANTASMA) return PIERDE_FANTASMA;
            if(objetoActual === FANTASMA_DEBIL) return GANA_FANTASMA;
       }
       // Eventos para fantasma
        if(nuevoObjeto == FANTASMA){
            if(objetoActual === PACMAN) return PIERDE_FANTASMA; // Fin del juego
        }

        if(nuevoObjeto == FANTASMA_DEBIL){
            if(objetoActual === PACMAN) return GANA_FANTASMA; // Fin del juego
        }

        // TODO: El juego debería enviar alguna sugerencia de hacia donde moverse, especialmente para los movimientos automáticos
        if([BLOQUE, INVISIBLE].includes(objetoActual)){
            return NO_MOVIMIENTO;
        }

        // Sin eventos;
        return OK;
    }

    // Esta función retorna las direcciones de movimiento  cuando un objeto se trata de mover a un espacio que no puede
    // como los bordes de la pantalla. Retorna un array
    getDireccionesPosibles(fila, columna){
        const direccionesPosibles = [];
        console.log(fila, columna);
        console.log(fila > 0 && ![BLOQUE, INVISIBLE].includes(this.board[fila -1][columna]))
        console.log(fila < constantes.MAX_FILAS && ![BLOQUE, INVISIBLE].includes(this.board[fila+1][columna]), "abajo", this.board[fila+1][columna])
        console.log(columna < constantes.MAX_COLUMNAS && ![BLOQUE, INVISIBLE].includes(this.board[fila][columna + 1]))
        console.log(columna > 0  && ![BLOQUE, INVISIBLE].includes(this.board[fila][columna - 1]))
            // Arriba
        if(fila > 0 && ![BLOQUE, INVISIBLE].includes(this.board[fila -1][columna])){
            console.log("Entra aquí arriba");;
            direccionesPosibles.push(constantes.ARRIBA);
        }

        // Abajo
        if(fila < MAX_FILAS && ![BLOQUE, INVISIBLE].includes(this.board[fila+1][columna]))
            direccionesPosibles.push(constantes.ABAJO);

        // Derecha
        if(columna < MAX_COLUMNAS && ![BLOQUE, INVISIBLE].includes(this.board[fila][columna + 1]))
            direccionesPosibles.push(constantes.DERECHA);

        //Izquierda
        if(columna > 0  && ![BLOQUE, INVISIBLE].includes(this.board[fila][columna - 1]))
            direccionesPosibles.push(constantes.IZQUIERDA);

        console.log(direccionesPosibles);
        return direccionesPosibles;
    }

    crearBloque = (posFila, posColumna, noFilas, noColumnas) => {

        this.ubicarObjeto(posFila, posColumna, noFilas, noColumnas, BLOQUE);
        //INVISIBLE Y
        this.ubicarObjeto(posFila, (posColumna+noColumnas), noFilas+1, 1, INVISIBLE);
        //INVISIBLE X
        this.ubicarObjeto((posFila+noFilas), posColumna, 1, noColumnas+1, INVISIBLE);
    }

    ubicarObjeto = (posFila, posColumna, noFilas, noColumnas, tipo) => {
        for(let fila=posFila; fila<=(posFila+noFilas); fila += 1){

            if(fila < posFila || fila >= (posFila + noFilas)) continue;
            for(let columna = posColumna; columna <= (posColumna + noColumnas); columna += 1){
                if(columna < posColumna || columna >= (posColumna + noColumnas)) continue;
                this.board[fila][columna] = tipo;
            }
        }
    }

    dibujarTablero = () => {
        let string = '    0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5\n';
        this.board.forEach( (fila, indexFila) => {
            string += `${indexFila < 10 ? '0'+indexFila : indexFila}  `;
            fila.forEach( columna => {
                string += `${columna} `;
            })
            string += `\n`;
        })

        document.getElementById('tablero-string').textContent = string
    }

    construirTablero = () => {
        //Primer bloque
        this.crearBloque(1,1, 2, 3);
        this.crearBloque(1, 6, 2, 4);
        this.crearBloque(0, 12, 3, 1);
        this.crearBloque(1, 15, 2, 4);
        this.crearBloque(1, 21, 2, 3);

        // E2
        this.crearBloque(5, 1, 1, 3);

        this.crearBloque(5, 6, 7, 1);
        this.crearBloque(8, 7, 1, 3);

        this.crearBloque(5, 9, 1, 7);
        this.crearBloque(6, 12, 3, 1);

        this.crearBloque(8, 16, 1, 3);
        this.crearBloque(5, 18, 7, 1);

        this.crearBloque(5, 21, 1, 3);

        // Tunel izquierdo
        this.crearBloque(8, 0, 4, 4);
        this.crearBloque(14, 0, 4, 4);

        // E3
        this.crearBloque(14, 6, 4, 1);
        this.crearBloque(20, 1, 1, 3);
        this.crearBloque(20, 3, 4, 1);
        this.crearBloque(23, 0, 1, 1);

        this.crearBloque(23, 6, 4, 1);
        this.crearBloque(26, 1, 1, 9);

        this.crearBloque(20, 6, 1, 4);

        this.crearBloque(23, 9, 1, 7);
        this.crearBloque(24, 12, 3, 1);

        // Tunel derecho
        this.crearBloque(8, 21, 4, 4);
        this.crearBloque(14, 21, 4, 4);

        //E4
        this.crearBloque(14, 18, 4, 1);

        this.crearBloque(20, 21, 4, 1);
        this.crearBloque(20, 22, 1, 2);

        this.crearBloque(23, 12, 1, 1);

        this.crearBloque(20, 15, 1, 4);

        this.crearBloque(26, 15, 1, 9)
        this.crearBloque(23, 18, 4, 1);

        this.crearBloque(17, 9, 1, 7);
        this.crearBloque(18, 12, 3, 1);

        this.crearBloque(23, 24, 1, 1);

        // Carcel
        // this.crearBloque(11, 9, 1, 7);
        this.crearBloque(14, 9, 1, 7);
        this.crearBloque(11, 9, 4, 1);
        this.crearBloque(11, 15, 4, 1);
    }
}
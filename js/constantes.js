const constantes = {}

// Tipo de objetos en el tablero
constantes.BLOQUE = 'B';
constantes.INVISIBLE = 'I';

// Objetos que se mueven
constantes.FANTASMA_DEBIL = 'FD';
constantes.FANTASMA = 'F'; // Cuando se come un premio y puede encarcelar a los fantasmas
constantes.PACMAN = 'C'

constantes.GALLETA = 'G';
constantes.PREMIO = 'P';
constantes.VACIO = ' ';

// Eventos y su puntaje
constantes.GANA_GALLETA = 5;
constantes.GANA_PERMIO = 25;
constantes.GANA_FANTASMA = 50;

constantes.PIERDE_FANTASMA = -100; // Fin del juego

constantes.NO_MOVIMIENTO = 0;
constantes.OK = 1;


// direcciones
constantes.IZQUIERDA = 'IZQUIERDA'
constantes.DERECHA = 'DERECHA'
constantes.ABAJO = 'ABAJO'
constantes.ARRIBA = 'ARRIBA'

export default constantes;
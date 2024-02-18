import Juego from "./clases/juego.class.js";
console.log("Timpo"); 
const juego = new Juego(); 
const sleep = (timeMillis) => new Promise(resolve => setTimeout(resolve, timeMillis));


async function main(){
    for(let index = 0; index < 50; index += 1){
        juego.jugar();
        await sleep(1000);
     }
    
}

main()


document.addEventListener('keydown', juego.leerTeclas.bind(juego)); 

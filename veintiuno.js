const sc = require("prompt-sync")({ sigint: true })

const mazo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10,
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10]

mazo.sort(function () { return Math.random() - 0.5 });

console.log("La baraja se ha barajado: ", mazo)

const montonJugador = []
const montonCasa = []
let plantarse = false

repartirCartas(2, montonCasa, mazo)
repartirCartas(2, montonJugador, mazo)

while (siguesVivo(montonJugador) && !plantarse) {
    seguirJugando(montonCasa)
}

resolverJuego(montonJugador, montonCasa)

function resolverJuego(montonJugador, montonCasa) {
    console.log('Tu mano es ' + montonJugador)
    console.log('La casa tiene ' + montonCasa)
    let puntosJugador = 0
    let puntosCasa = 0

    for (let i = 0; i < montonJugador.length; i++) {
        puntosJugador += montonJugador[i]
    }

    for (let i = 0; i < montonCasa.length; i++) {
        puntosCasa += montonCasa[i]
    }

    if (puntosJugador > 21 || puntosCasa > puntosJugador) {
        console.log('La casa siempre gana');
    } else if (puntosJugador > puntosCasa) {
        console.log("Hemos ganado.")
    } else {
        console.log("Cuidado")
    }
}

function seguirJugando(casa) {
    const cartasBocarriba = [...casa]
    cartasBocarriba.pop()
    console.log("Las cartas visibles de la casa son: " + cartasBocarriba)

    let salir = false
    let recibir = ""
    while(!salir) {
        console.log('Tu mano es ' + montonJugador);
        recibir = sc("¿Quieres otra carta? (si/no) => ")
        if (recibir == "si") {
            repartirCartas(1, montonJugador, mazo)
            salir = true
        } else if (recibir == "no") {
            salir = true
            plantarse = true
        } else {
            console.log("Responde si o no")
        }
    }
}

function siguesVivo(monton) {
    let suma = 0
    for (let i = 0; i < monton.length; i++) {
        suma += monton[i]        
    }

    if (suma < 21) {
        return true
    } else {
        return false
    }
}

function repartirCartas(numCartas, monton, baraja) {
    if (Number(numCartas) && numCartas <= baraja.length) {
        for (let i = 0; i < numCartas; i++) {
            monton.push(baraja.pop())
        }
    } else {
        console.log("Algo ha salido mal en la llamada a la función")
    }
}

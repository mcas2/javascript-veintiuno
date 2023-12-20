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

turnoDeLaCasa(montonCasa)
resolverJuego(montonJugador, montonCasa)


function turnoDeLaCasa(montonCasa) {
    while (sumarCartas(montonCasa) < 17) {
        repartirCartas(1, montonCasa, mazo)
    }
}

function resolverJuego(montonJugador, montonCasa) {
    console.log('Tu mano es ' + montonJugador)
    console.log('La casa tiene ' + montonCasa)
    let puntosJugador = sumarCartas(montonJugador)
    let puntosCasa = sumarCartas(montonCasa)

    if (puntosCasa > 21 || puntosJugador > puntosCasa && puntosJugador < 21) {
        console.log("Hemos ganado, por poco tiempo.")
    } else if (puntosCasa == puntosJugador){
        console.log("Empate técnico")
    } else {
        console.log("La casa siempre gana")
    }
}

function sumarCartas(monton) {
    let total = 0
    for (let i = 0; i < monton.length; i++) {
        total += monton[i]
    }
    return total
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
    if (sumarCartas(monton) < 21) {
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

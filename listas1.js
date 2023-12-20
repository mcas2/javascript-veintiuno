const input = require("prompt-sync")({ sigint: true })
/**
 * Introduce 100 valores en una lista
 */

const lista = []

for (let i = 0; i < 100; i++) {
    lista.push(i)
}

console.log(lista)
let nombre = prompt('Ingrese el nombre del estudiante');
let cant_notas = Number(prompt('Ingrese la cantidad de notas a promediar'));

let suma_notas = 0;

for (let i = 1; i <= cant_notas; i++) {
    let nota = Number(prompt('Ingrese la nota ' + i));
    
    while (isNaN(nota) || nota <= 0 || nota >= 11 || nota === '') {
        nota = Number(prompt('Ingrese la nota ' + i + ' correctamente (entre 1 y 10):'));
    }
    
    suma_notas += nota;
}

let promedio = suma_notas / cant_notas;

function saludar() {
    console.log('Hola ' + nombre);
}

saludar();

console.log('El promedio es de', promedio);

if (promedio > 6) {
    console.log('Aprueba');
} else {
    console.log('No aprueba');
}

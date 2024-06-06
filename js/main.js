let nombre = prompt('Ingrese el nombre del estudiante').toLowerCase();
let nombres = ['Maria', 'Juan', 'Jose', 'Ana'].map(n => n.toLowerCase());

if (!nombres.includes(nombre)) {
    console.log('Nombre no encontrado en la lista.');
} else {
    let materias_original = {
        español: [],
        ingles: [],
        matematicas: [],
        estudios_sociales: [],
        ciencias: []
    };

    for (let materia in materias_original) {
        let suma_notas = 0;
        let num_notas = 1;
        
        for (let i = 1; i <= num_notas; i++) {
            let nota = Number(prompt(`Ingrese la nota ${i} para ${materia}`));
            
            while (isNaN(nota) || nota <= 0 || nota >= 11 || nota === '') {
                nota = Number(prompt(`Ingrese la nota ${i} para ${materia} correctamente (entre 1 y 10):`));
            }
            
            materias_original[materia].push(nota);
            suma_notas += nota;
        }

        materias_original[materia].promedio = suma_notas / num_notas;
    }

    function calcularPromedioGeneral(materias) {
        let suma_promedios = 0;
        let num_materias = 0;

        for (let materia in materias) {
            if (materias[materia].promedio !== undefined) {
                suma_promedios += materias[materia].promedio;
                num_materias++;
            }
        }

        return suma_promedios / num_materias;
    }

    function saludar() {
        console.log('Hola ' + nombre.charAt(0).toUpperCase() + nombre.slice(1));
    }

    saludar();

    let promedio_general = calcularPromedioGeneral(materias_original);

    console.log('El promedio general es de', promedio_general);

    let materias_reprobadas = [];

    for (let materia in materias_original) {
        if (materias_original[materia].promedio < 6) {
            materias_reprobadas.push(materia);
        }
    }

    if (materias_reprobadas.length === 0) {
        alert('Felicidades aprobaste todas las materias');
    } else {
        alert('Has reprobado algunas materias');
        console.log('Materias reprobadas:', materias_reprobadas.join(', '));
    }

    if (promedio_general > 6) {
        console.log('Aprueba');
    } else {
        console.log('No aprueba');
    }
}

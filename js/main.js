document.getElementById('ingresarNombre').addEventListener('click', function () {
    let nombre = document.getElementById('nombre').value.toLowerCase();
    let nombres = ['maria', 'juan', 'jose', 'ana'];

    if (!nombres.includes(nombre)) {
        alert('Nombre no encontrado en la lista.');
    } else {

        let notas_guardadas = localStorage.getItem('notas_' + nombre);
        let materias = ['español', 'ingles', 'matematicas', 'estudios_sociales', 'ciencias'];
        let contenido = `<h2>Ingrese las notas finales de ${nombre.charAt(0).toUpperCase() + nombre.slice(1)} </h2>`;
        contenido += '<form id="formNotas">';

        if (notas_guardadas) {
            let materias_original = JSON.parse(notas_guardadas);

            for (let materia in materias_original) {
                contenido += `<label for="${materia}">${materia.charAt(0).toUpperCase() + materia.slice(1)}:</label>
                            <input type="number" id="${materia}" name="${materia}" value="${materias_original[materia][0]}" min="1" max="10"><br>`;
            }
        } else {
            materias.forEach(materia => {
                contenido += `<label for="${materia}">${materia.charAt(0).toUpperCase() + materia.slice(1)}:</label>
                            <input type="number" id="${materia}" name="${materia}" min="1" max="10"><br>`;
            });
        }

        contenido += '<button type="button" id="calcularNotas">Calcular Promedio</button></form>';
        document.getElementById('contenido').innerHTML = contenido;
        let form = document.querySelector('form')

        document.getElementById('calcularNotas').addEventListener('click', function () {
            let materias_original = notas_guardadas ? JSON.parse(notas_guardadas) : {};
            let suma_promedios = 0;
            let num_materias = materias.length;

            materias.forEach(materia => {
                let nota = Number(document.getElementById(materia).value);
                materias_original[materia] = [nota];
                suma_promedios += nota;
            });

            let promedio_general = suma_promedios / num_materias;

            localStorage.setItem('notas_' + nombre, JSON.stringify(materias_original));

            let materias_reprobadas = [];
            for (let materia in materias_original) {
                if (materias_original[materia][0] < 6) {
                    materias_reprobadas.push(materia);
                }
            }

            if (materias_reprobadas.length === 0) {

            } else {
                console.log('Materias reprobadas:', materias_reprobadas.join(', '));
            }

            let mensajeResultado = document.getElementById('mensajeResultado');
            if (promedio_general > 6) {
                mensajeResultado.textContent = `Aprueba con un promedio de ${promedio_general.toFixed(2)}`;
            } else {
                mensajeResultado.textContent = `No aprueba, su promedio es de ${promedio_general.toFixed(2)}`;
            }
        });
    }
});

document.getElementById('ingresarNombre').addEventListener('click', async function () {
    let nombre = document.getElementById('nombre').value.toLowerCase();
    let nombres = ['maria', 'juan', 'jose', 'ana'];

    if (!nombres.includes(nombre)) {
        alert('Nombre no encontrado en la lista.');
    } else {
        try {
            await procesarNombre(nombre);
        } catch (error) {
            console.error('Error procesando el nombre:', error);
            alert('Hubo un error procesando el nombre.');
        }
    }
});

async function procesarNombre(nombre) {
    let notas_guardadas = await fetchNotas(nombre);
    let materias = ['español', 'ingles', 'matematicas', 'estudios_sociales', 'ciencias'];
    let contenido = `<h2>Ingrese las notas finales de ${nombre.charAt(0).toUpperCase() + nombre.slice(1)} </h2>`;
    contenido += '<form id="formNotas">';

    if (notas_guardadas) {
        Object.keys(notas_guardadas).forEach(materia => {
            contenido += generarCampoNota(materia, notas_guardadas[materia][0]);
        });
    } else {
        materias.forEach(materia => {
            contenido += generarCampoNota(materia);
        });
    }

    contenido += '<button type="button" id="calcularNotas">Calcular Promedio</button></form>';
    document.getElementById('contenido').innerHTML = contenido;

    document.getElementById('calcularNotas').addEventListener('click', async function () {
        await calcularYGuardarNotas(nombre, materias, notas_guardadas);
    });
}

function generarCampoNota(materia, valor = '') {
    return `<label for="${materia}">${materia.charAt(0).toUpperCase() + materia.slice(1)}:</label>
            <input type="number" id="${materia}" name="${materia}" value="${valor}" min="1" max="10"><br>`;
}

async function calcularYGuardarNotas(nombre, materias, notas_guardadas) {
    let materias_original = notas_guardadas || {};
    let suma_promedios = 0;

    materias.forEach(materia => {
        let nota = Number(document.getElementById(materia).value);
        materias_original[materia] = [nota];
        suma_promedios += nota;
    });

    let promedio_general = suma_promedios / materias.length;

    await guardarNotas(nombre, materias_original);

    localStorage.setItem(`notas_${nombre}`, JSON.stringify(materias_original));

    let materias_reprobadas = _.filter(materias_original, (nota) => nota[0] < 6).map((nota, materia) => materia);

    console.log('Materias reprobadas:', materias_reprobadas.length === 0 ? 'Ninguna' : materias_reprobadas.join(', '));

    let mensajeResultado = document.getElementById('mensajeResultado');
    mensajeResultado.textContent = promedio_general > 6 
        ? `Aprueba con un promedio de ${promedio_general.toFixed(2)}` 
        : `No aprueba, su promedio es de ${promedio_general.toFixed(2)}`;
}

async function fetchNotas(nombre) {
    try {
        let response = await fetch(`/api/notas/${nombre}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.status === 404) {
            console.log('Notas no encontradas para', nombre);
            return null;
        }
        return response.ok ? await response.json() : null;
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        return null;
    }
}

async function guardarNotas(nombre, notas) {
    try {
        let response = await fetch(`/api/notas/${nombre}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(notas)
        });
        if (!response.ok) {
            console.error('Error al guardar las notas:', response.statusText);
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }
}

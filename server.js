const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));

const notas = {
    ana: {
        español: [8],
        ingles: [7],
        matematicas: [9],
        estudios_sociales: [6],
        ciencias: [7]
    },
    maria: {
        español: [6],
        ingles: [8],
        matematicas: [7],
        estudios_sociales: [5],
        ciencias: [6]
    },
    jose: {
        español: [5],
        ingles: [6],
        matematicas: [7],
        estudios_sociales: [8],
        ciencias: [9]
    },
    juan: {
        español: [7],
        ingles: [6],
        matematicas: [8],
        estudios_sociales: [5],
        ciencias: [6]
    }
};

app.get('/api/notas/:nombre', (req, res) => {
    const nombre = req.params.nombre.toLowerCase();
    console.log(`Solicitud GET recibida para: ${nombre}`);
    if (notas[nombre]) {
        res.json(notas[nombre]);
    } else {
        res.status(404).send('Notas no encontradas');
    }
});

app.post('/api/notas/:nombre', (req, res) => {
    const nombre = req.params.nombre.toLowerCase();
    console.log(`Solicitud POST recibida para: ${nombre}`);
    notas[nombre] = req.body;
    res.status(200).send('Notas guardadas');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

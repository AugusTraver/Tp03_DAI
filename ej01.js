import express from "express";
import { dividir, multiplicar, restar, sumar } from "./matematica.js";
import { OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID } from "./omdb-wrapper.js"
import Alumno from "./alumno.js"
import ValidacionesHelper from "./validaciones-helper.js";
import DateTimeHelper from "./datetime-helper.js";
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
})
app.get('/saludar/:nombre', (req, res) => {
    const nombre = ValidacionesHelper.getStringOrDefault(req.params.nombre, 'Anónimo');
    res.send('Hola ' + nombre);
});

app.get('/validarfecha', (req, res) => {
    const anio = ValidacionesHelper.getIntegerOrDefault(req.query.Anio, 0);
    const mes = ValidacionesHelper.getIntegerOrDefault(req.query.Mes, 0);
    const dia = ValidacionesHelper.getIntegerOrDefault(req.query.Dia, 0);

    if (anio === 0 || mes === 0 || dia === 0) {
        return res.status(400).send('fecha invalida');
    }

    const fechaString = `${anio}-${mes}-${dia}`;
    const fecha = new Date(fechaString);

    if (isNaN(fecha.getTime())) {
        return res.status(400).send('fecha invalida');
    }

    res.status(200).send(fechaString);
});
app.get('/matematica/sumar', (req, res) => {
    const n1 = ValidacionesHelper.getIntegerOrDefault(req.query.n1, null);
    const n2 = ValidacionesHelper.getIntegerOrDefault(req.query.n2, null);

    if (n1 === null || n2 === null) {
        return res.status(400).send('n1 y n2 deben ser números');
    }

    res.send(sumar(n1, n2));
});
app.get('/matematica/restar', (req, res) => {
    const n1 = ValidacionesHelper.getIntegerOrDefault(req.query.n1, null);
    const n2 = ValidacionesHelper.getIntegerOrDefault(req.query.n2, null);

    if (n1 === null || n2 === null) {
        return res.status(400).send('n1 y n2 deben ser números');
    }

    res.send(restar(n1, n2));
});
app.get('/matematica/multiplicar', (req, res) => {
    const n1 = ValidacionesHelper.getIntegerOrDefault(req.query.n1, null);
    const n2 = ValidacionesHelper.getIntegerOrDefault(req.query.n2, null);

    if (n1 === null || n2 === null) {
        return res.status(400).send('números inválidos');
    }

    res.send(multiplicar(n1, n2));
});
app.get('/matematica/dividir', (req, res) => {
    const n1 = ValidacionesHelper.getIntegerOrDefault(req.query.n1, null);
    const n2 = ValidacionesHelper.getIntegerOrDefault(req.query.n2, null);

    if (n1 === null || n2 === null) {
        return res.status(400).send('números inválidos');
    }

    if (n2 === 0) {
        return res.status(400).send('No se puede dividir por 0');
    }

    res.send(dividir(n1, n2));
});
app.get('/omdb/searchbypage', async (req, res) => {
    const search = ValidacionesHelper.getStringOrDefault(req.query.search, '');
    const p = ValidacionesHelper.getIntegerOrDefault(req.query.p, 1);

    try {
        const resultado = await OMDBSearchByPage(search, p);
        res.status(200).send(resultado);
    } catch {
        res.status(500).send({ respuesta: false, cantidadTotal: 0, datos: [] });
    }
});
app.get('/omdb/searchcomplete', async (req, res) => {
    const search = ValidacionesHelper.getStringOrDefault(req.query.search, '');

    if (search === '') {
        return res.status(400).send('search requerido');
    }

    try {
        const resultado = await OMDBSearchComplete(search);
        res.status(200).send(resultado);
    } catch {
        res.status(500).send({ respuesta: false, cantidadTotal: 0, datos: [] });
    }
});

app.get('/omdb/getbyid', async (req, res) => {
    const search = ValidacionesHelper.getStringOrDefault(req.query.search, '');

    if (search === '') {
        return res.status(400).send('id requerido');
    }

    try {
        const resultado = await OMDBGetByImdbID(search);
        res.status(200).send(resultado);
    } catch {
        res.status(500).send({ respuesta: false, cantidadTotal: 0, datos: [] });
    }
});

app.get('/alumnos/:dni', (req, res) => {
    const dni = ValidacionesHelper.getStringOrDefault(req.params.dni, '');

    const alumno = alumnosArray.find(a => a.dni === dni);

    if (!alumno) return res.status(404).send('Alumno Not Found');

    res.send(alumno);
});
app.post('/alumnos/agregar', (req, res) => {
    const nombre = ValidacionesHelper.getStringOrDefault(req.query.nom, '');
    const dni = ValidacionesHelper.getStringOrDefault(req.query.dni, '');
    const edad = ValidacionesHelper.getIntegerOrDefault(req.query.edad, 0);

    if (nombre === '' || dni === '' || edad === 0) {
        return res.status(400).send('datos invalidos');
    }

    alumnosArray.push(new Alumno(nombre, dni, edad));
    res.status(201).send('Alumno agregado');
});
app.delete('/alumnos', (req, res) => {
    const dni = ValidacionesHelper.getStringOrDefault(req.query.dni, '');

    const indice = alumnosArray.findIndex(a => a.dni === dni);

    if (indice < 0) {
        return res.status(404).send('Alumno no encontrado');
    }

    alumnosArray.splice(indice, 1);

    res.send('Alumno borrado');
});

app.get('/fechas/isDate', (req, res) => {
    const fecha = ValidacionesHelper.getDateOrDefault(req.query.fecha, null);

    if (!DateTimeHelper.isDate(fecha)) {
        return res.status(400).send({ valido: false });
    }

    res.send({ valido: true });
});
app.get('/fechas/getEdadActual', (req, res) => {
    const fechaNac = ValidacionesHelper.getDateOrDefault(req.query.fechaNacimiento, null);

    if (!DateTimeHelper.isDate(fechaNac)) {
        return res.status(400).send('Fecha inválida');
    }

    res.send({ edad: DateTimeHelper.getEdadActual(fechaNac) });
});
app.get('/fechas/getDiasHastaMiCumple', (req, res) => {
    const fechaNac = ValidacionesHelper.getDateOrDefault(req.query.fechaNacimiento, null);

    if (!DateTimeHelper.isDate(fechaNac)) {
        return res.status(400).send('Fecha inválida');
    }

    res.send({ diasRestantes: DateTimeHelper.getDiasHastaMiCumple(fechaNac) });
});
app.get('/fechas/getDiaTexto', (req, res) => {
    const fecha = ValidacionesHelper.getDateOrDefault(req.query.fecha, null);
    const abr = ValidacionesHelper.getBooleanOrDefault(req.query.abr, false);

    if (!DateTimeHelper.isDate(fecha)) {
        return res.status(400).send('Fecha inválida');
    }

    res.send({ dia: DateTimeHelper.getDiaTexto(fecha, abr) });
});
app.get('/fechas/getMesTexto', (req, res) => {
    const fecha = ValidacionesHelper.getDateOrDefault(req.query.fecha, null);
    const abr = ValidacionesHelper.getBooleanOrDefault(req.query.abr, false);

    if (!DateTimeHelper.isDate(fecha)) {
        return res.status(400).send('Fecha inválida');
    }

    res.send({ mes: DateTimeHelper.getMesTexto(fecha, abr) });
});
app.listen(port, () => { // Inicio el servidor WEB (escucha
    console.log(`Listening on http://localhost: ${port}`)
})

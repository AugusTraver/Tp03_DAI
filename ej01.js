import express from "express";
import { dividir, multiplicar, restar, sumar } from "./matematica.js";
import { OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID } from "./omdb-wrapper.js"
import Alumno from "./alumno.js"
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/saludar/:nombre ', (req, res) => {
    console.log(req.params.nombre)
    res.send('Hola ' + req.params.nombre);
})

app.get('/validarfecha', (req, res) => {
    let anio = req.query.Anio
    let mes = req.query.Mes
    let dia = req.query.Dia
    let fechaString = `${anio}-${mes}-${dia}`;
    let timestamp = Date.parse(fechaString);
    console.log(fechaString);
    if (isNaN(timestamp)) {
        res.status(400).send('fecha invalida')
    }
    else {
        res.status(200).send(fechaString)
    }
})
app.get('/matematica/sumar', (req, res) => {
    let num1 = Number(req.query.n1)
    let num2 = Number(req.query.n2)
    let x = sumar(num1, num2);
    res.send(x)
})

app.get('/matematica/restar', (req, res) => {
    let num1 = Number(req.query.n1)
    let num2 = Number(req.query.n2)
    let x = restar(num1, num2);
    res.send(x)
})
app.get('/matematica/multiplicar', (req, res) => {
    let num1 = Number(req.query.n1)
    let num2 = Number(req.query.n2)
    let x = multiplicar(num1, num2);
    res.send(x)
})
app.get('/matematica/dividir', (req, res) => {
    let num1 = Number(req.query.n1)
    let num2 = Number(req.query.n2)
    let x = dividir(num1, num2);
    res.send(x)
})
app.get('/omdb/searchbypage', async (req, res) => {
    const search = req.query.search;
    const p = req.query.p;
    try {
        const resultado = await OMDBSearchByPage(search, p);
        res.status(200).send(resultado);
    } catch (ex) {
        console.log(ex.message);
        res.status(500).send({ respuesta: false, cantidadTotal: 0, datos: [] });
    }
});
app.get('/omdb/searchcomplete', async (req, res) => {
    const search = req.query.search;
    try {
        const resultado = await OMDBSearchComplete(search);
        res.status(200).send(resultado);
    } catch (ex) {
        console.log(ex.message);
        res.status(500).send({ respuesta: false, cantidadTotal: 0, datos: [] });
    }
});

app.get('/omdb/getbyid', async (req, res) => {
    const search = req.query.search;
    try {
        const resultado = await OMDBGetByImdbID(search);
        res.status(200).send(resultado);
    } catch (ex) {
        console.log(ex.message);
        res.status(500).send({ respuesta: false, cantidadTotal: 0, datos: [] });
    }
});
const alumnosArray = [];
alumnosArray.push(new Alumno("Esteban Dido", "22888444", 20));
alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));
alumnosArray.push(new Alumno("Elba Calao", "32623391", 18));

app.get('/alumnos', async (req, res) => {

    res.status(200).send(alumnosArray);
});

app.get('/alumnos/:dni', async (req, res) => {
    let dniBuscado = req.params.dni
    const indice = alumnosArray.findIndex(item => item.dni === dniBuscado);
    if (indice < 0) return res.status(404).send('Alumno Not Found');
    else return res.status(200).send(alumnosArray[indice]);
});

app.post('/alumnos/agregar', async (req, res) => {
    Nombre = req.query.nom
    Dni = req.query.dni
    Edad = req.query.edad
    try {
        alumnosArray.push(new Alumno(Nombre, Dni, Edad))
        res.status(201).send('Agregadiño')
    }
    catch {
        res.status(400).send('fallo')
    }
});


app.listen(port, () => { // Inicio el servidor WEB (escucha
    console.log(`Listening on http://localhost: ${port}`)
})

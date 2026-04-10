import express from "express";
import {dividir, multiplicar, restar, sumar} from "./matematica.js";

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.get('/saludar/:nombre/:apellid', (req, res) => {
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
    let x = sumar(num1,num2);
    res.send(x)
})

app.get('/matematica/restar', (req, res) => {
     let num1 = Number(req.query.n1)
    let num2 = Number(req.query.n2)
    let x = restar(num1,num2);
    res.send(x)
})
app.get('/matematica/multiplicar', (req, res) => {
    let num1 = Number(req.query.n1)
    let num2 = Number(req.query.n2)
    let x = multiplicar(num1,num2);
    res.send(x)
})
app.get('/matematica/dividir', (req, res) => {
    let num1 = Number(req.query.n1)
    let num2 = Number(req.query.n2)
    let x = dividir(num1,num2);
    res.send(x)
})

app.listen(port, () => { // Inicio el servidor WEB (escucha
    console.log(`Listening on http://localhost: ${port}`)
})
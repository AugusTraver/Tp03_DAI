import express from "express";
// Hacer npm i express
const app = express();
const port = 3000;
app.get('/', (req, res) => {
res.send('Hello World!');
// EndPoint "/", verbo GE
})
app.listen(port, () => { // Inicio el servidor WEB (escucha
console.log(`Listening on http://localhost: ${port}`)
})
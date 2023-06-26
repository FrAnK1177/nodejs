const express = require("express");
const bodyParse = require("body-parser");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

app.use(bodyParse.urlencoded({extended: true}));
app.use(bodyParse.json());

app.get("/", (req, res) => {
  // Envía la respuesta HTTP después de imprimir los resultados en la consola
  res.status(200).send({ msg: "Hola siuuu" });
});

app.get("/books", (req,res)=>{
  res.status(200).send({ msg: "Pagina books" });
})

app.post("/books", (req,res)=>{
  const {username} = req.body;
  res.status(200).send({msg: `Hola, ${username}`});
});

app.listen(3977, () =>{
  console.log(`Tu servidor esta listo en el puerto ${3977}`);
});
const express = require("express");
const bodyParse = require("body-parser");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

const HOST = process.env.MYSQLHOST || "localhost";
const USER = process.env.MYSQLUSER || "root";
const PASS = process.env.MYSQLPASSWORD || "root";
const DB = process.env.MYSQLDATABASE || "railway";
const PORT = process.env.PORT || 8889;

app.use(bodyParse.urlencoded({extended: true}));
app.use(bodyParse.json());

const db = mysql.createConnection({
  host:HOST,
  user:USER,
  password:PASS,
  database:DB,
  port: PORT
});

app.get("/", (req, res) => {
  // Envía la respuesta HTTP después de imprimir los resultados en la consola
  res.status(200).send({ msg: "Hola siuuu" });
});

app.get("/books", (req,res)=>{
  const q = "select * from books";
  db.query(q,(err,data)=>{
      if(err) return res.json(err)
      return res.json(data)
  })
})

app.post("/books", (req,res)=>{
  const {username} = req.body;
  res.status(200).send({msg: `Hola, ${username}`});
});

app.listen(3977, () =>{
  console.log(`Tu servidor esta listo en el puerto ${3977}`);
});
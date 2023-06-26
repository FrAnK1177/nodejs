const express = require("express");
const bodyParse = require("body-parser");
const mysql = require("mysql2");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3977;

app.use(bodyParse.urlencoded({extended: true}));
app.use(bodyParse.json());

const db = mysql.createConnection({
  host: process.env.MYSQLHOST || "localhost" ,
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD || "root",
  database: process.env.MYSQLDATABASE || "railway",
  port: process.env.MYSQLPORT || 8889
});

app.get("/", (req,res)=>{
  res.status(200).send({msg: "Hola siuuu"});
});

app.get("/books", (req,res)=>{
  const q = "select * from books";
  db.query(q,(err,data)=>{
      if(err) return res.json(err)
      console.log('Query result:');
      console.log(data);
      return res.json(data)
  });
});

app.post("/books", (req,res)=>{
  const {username} = req.body;
  res.status(200).send({msg: `Hola, ${username}`});
});

app.listen(PORT, () =>{
  console.log(`Tu servidor esta listo en el puerto ${PORT}  env port : db ? :${process.env.MYSQLPORT} `);
});
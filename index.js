const express = require("express");
const bodyParse = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
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
      //console.log('Query result:');
      //console.log(data);
      return res.json(data)
  });
});

app.post("/books", (req,res)=>{
  const q = "insert into books (`title`, `descr`, `price`, `cover`) values (?)";
  const values = [
      req.body.title,
      req.body.descr,
      req.body.price,
      req.body.cover,
  ];

  db.query(q,[values],(err,data)=>{
      if(err) return res.json(err)
      return res.json("Book has been added successfully.")
  })
});

app.delete("/books/:id", (req,res)=>{
  const bookId = req.params.id;
  const q = "delete from books where id = ?";

  db.query(q,[bookId],(err,data)=>{
      if(err) return res.json(err)
      return res.json("Book has ben deleted successfully.")
  });
});

app.get("/books/:id", (req,res)=>{
  const bookId = req.params.id;
  const q = "select * from books where id = ?";
  db.query(q,[bookId],(err,data)=>{
      if(err) return res.json(err)
      return res.json(data)
  })
})

app.put("/books/:id", (req,res)=>{
  const bookId = req.params.id;
  const q = "update books set `title` = ?, `descr` = ?, `cover` = ?, `price` = ? where id = ?";

  const values = [
      req.body.title,
      req.body.descr,
      req.body.cover,
      req.body.price,
  ];

  db.query(q,[...values, bookId],(err,data)=>{
      if(err) return res.json(err)
      return res.json("Book has ben updated successfully.")
  });
});

app.listen(PORT, () =>{
  console.log(`Tu servidor esta listo en el puerto ${PORT}  env port : db ? :${process.env.MYSQLPORT} `);
});
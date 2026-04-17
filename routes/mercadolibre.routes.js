
// Se importa la librería Express, que permite crear servidores
// y definir rutas HTTP en Node.js.
const express = require("express");


const router = express.Router();


router.get("/", (req, res) => {


  res.send("MercadoLibre OK ");
});


module.exports = router;

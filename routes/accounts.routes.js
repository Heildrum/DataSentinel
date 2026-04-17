
const express = require("express");
const router = express.Router();
console.log("✅ accounts.routes.js cargado");
const cuentasService = require("../services/Cuentas");

// ✅ Listar cuentas desde Cuentas.js
router.get("/", (req, res) => {
  const accounts = cuentasService.getAccounts();

  res.json({
    ok: true,
    accounts
  });
});

module.exports = router;
``






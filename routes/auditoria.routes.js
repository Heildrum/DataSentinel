


const express = require("express");

const router = express.Router();

// Ruta base de auditorías
router.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "Auditorías funcionando"
  });
});

module.exports = router;
``

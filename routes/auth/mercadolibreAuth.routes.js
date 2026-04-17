

const express = require("express");
const router = express.Router();

// 👉 Servicio de cuentas (el que creaste)
const cuentasService = require("../../services/Cuentas");

// ✅ Callback OAuth de MercadoLibre
router.get("/mercadolibre/callback", async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({
      ok: false,
      message: "No se recibió el code de MercadoLibre"
    });
  }

  try {
    // 1️⃣ Intercambiar code por tokens
    const tokenResponse = await fetch(
      "https://api.mercadolibre.com/oauth/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          code,
          redirect_uri: process.env.REDIRECT_URI
        })
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      return res.status(400).json({
        ok: false,
        message: "No se pudo obtener access token",
        data: tokenData
      });
    }

    // 2️⃣ Obtener datos básicos del usuario ML
    const userResponse = await fetch(
      `https://api.mercadolibre.com/users/me`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`
        }
      }
    );

    const userData = await userResponse.json();

    // 3️⃣ Guardar cuenta autorizada
    cuentasService.saveAccount({
      account_id: userData.id.toString(),
      ml_user_id: userData.id.toString(),
      nickname: userData.nickname,
      access_token: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
      expires_in: tokenData.expires_in
    });

    // 4️⃣ Responder OK
    res.json({
      ok: true,
      message: "Cuenta Mercado Libre conectada correctamente",
      account: {
        id: userData.id,
        nickname: userData.nickname
      }
    });

  } catch (error) {
    console.error("Error OAuth:", error);

    res.status(500).json({
      ok: false,
      message: "Error procesando autorización de Mercado Libre"
    });
  }
});

module.exports = router;
``

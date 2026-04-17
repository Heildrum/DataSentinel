
// Node 18+ / Render → fetch nativo disponible

const { mapMercadoLibreError } = require("../errors/ml.errors");

/**
 * Obtiene un producto desde la API de MercadoLibre
 * @param {string} id - ID del producto (ej: MLA123456)
 * @param {string} accessToken - Access token del usuario (cliente)
 */
async function obtenerProducto(id, accessToken) {

  const response = await fetch(
    `https://api.mercadolibre.com/items/${id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );

  const data = await response.json();

  // 🔴 Error devuelto por MercadoLibre
  if (!response.ok) {
    const mapped = mapMercadoLibreError(data.error);

    throw {
      source: "mercadolibre",
      status: mapped.status,
      message: mapped.message,
      action: mapped.action,
      raw: data
    };
  }

  // ✅ Respuesta limpia y controlada
  return {
    price: data.price,
    sku: data.seller_custom_field || null,
    description: data.title // luego se puede mejorar
  };
}

module.exports = {
  obtenerProducto
};


const ML_ERRORS = {
  invalid_grant: {
    status: 401,
    message: "Sesión expirada. Reautorización requerida.",
    action: "REAUTHORIZE"
  },
  invalid_client: {
    status: 401,
    message: "Credenciales inválidas de la aplicación.",
    action: "CONFIG_ERROR"
  },
  invalid_scope: {
    status: 403,
    message: "Permisos insuficientes.",
    action: "SCOPE_ERROR"
  },
  unauthorized_client: {
    status: 403,
    message: "La aplicación no está autorizada para este usuario.",
    action: "REAUTHORIZE"
  },
  forbidden: {
    status: 403,
    message: "Acceso denegado por Mercado Libre.",
    action: "BLOCKED"
  },
  default: {
    status: 500,
    message: "Error desconocido de Mercado Libre.",
    action: "RETRY"
  }
};

function mapMercadoLibreError(error) {
  return ML_ERRORS[error] || ML_ERRORS.default;
}

module.exports = { mapMercadoLibreError };

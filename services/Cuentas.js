
// services/Cuentas.js

// Almacenamiento en memoria (temporal)

const accounts = [];

// Guardar cuenta (OAuth luego)
function saveAccount(account) {
  const exists = accounts.find(a => a.account_id === account.account_id);
  if (!exists) {
    accounts.push(account);
  }
}

//  CUENTA DE PRUEBA (SOLO PARA DESARROLLO)
saveAccount({
  account_id: "test-ml-001",
  ml_user_id: "test-ml-001",
  nickname: "Cuenta Prueba MercadoLibre",
  access_token: "TOKEN_FAKE",
  refresh_token: "REFRESH_FAKE"
});

// Listar cuentas (para el index)
function getAccounts() {
  return accounts.map(a => ({
    account_id: a.account_id,
    nickname: a.nickname
  }));
}

// Obtener cuenta por ID (para auditoría)
function getAccountById(accountId) {
  return accounts.find(a => a.account_id === accountId);
}

module.exports = {
  saveAccount,
  getAccounts,
  getAccountById
};


// Se importa la librería "xlsx", que permite leer y manipular archivos Excel
// (.xlsx, .xls) desde una aplicación Node.js.
const XLSX = require("xlsx");


exports.leerExcel = (filePath) => {


  const workbook = XLSX.readFile(filePath);

 
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

 
  return XLSX.utils.sheet_to_json(sheet);
};

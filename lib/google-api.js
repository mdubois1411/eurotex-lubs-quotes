// lib/google-api.js
// Utilidades para interactuar con Google Sheets y Google Drive

const { google } = require('googleapis');

function getAuthClient() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets.readonly',
      'https://www.googleapis.com/auth/drive.readonly',
    ],
  });
}

/**
 * Lee clientes desde Google Sheets
 */
async function getClients() {
  try {
    const auth = getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Clientes!A2:D',  // Desde fila 2 para skip header
    });

    const rows = response.data.values || [];

    return rows.map((row, index) => ({
      id: index + 1,
      name: row[0] || '',
      attention: row[1] || '',
      email: row[2] || '',
      address: row[3] || '',
    }));
  } catch (error) {
    console.error('Error al leer clientes:', error);
    throw new Error('No se pudieron cargar los clientes');
  }
}

/**
 * Lee destinatarios desde Google Sheets
 */
async function getRecipients() {
  try {
    const auth = getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Destinatarios!A2:C',
    });

    const rows = response.data.values || [];

    return rows.map((row, index) => ({
      id: index + 1,
      name: row[0] || '',
      email: row[1] || '',
      role: row[2] || '',
    }));
  } catch (error) {
    console.error('Error al leer destinatarios:', error);
    throw new Error('No se pudieron cargar los destinatarios');
  }
}

/**
 * Lee productos desde Google Sheets
 */
async function getProducts() {
  try {
    const auth = getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Productos!A2:E',
    });

    const rows = response.data.values || [];

    return rows.map((row, index) => ({
      id: index + 1,
      code: row[0] || '',
      description: row[1] || '',
      presentation: row[2] || '',
      unit_price: parseFloat(row[3]) || 0,
      datasheet_filename: row[4] || '',
      currency: 'USD',
    }));
  } catch (error) {
    console.error('Error al leer productos:', error);
    throw new Error('No se pudieron cargar los productos');
  }
}

/**
 * Busca una hoja técnica en Google Drive por código de producto
 * @param {string} productCode - Código del producto (ej: "M0739")
 * @returns {Promise<{fileId: string, name: string, webViewLink: string}|null>}
 */
async function findDatasheet(productCode) {
  try {
    const auth = getAuthClient();
    const drive = google.drive({ version: 'v3', auth });

    // Buscar archivo con nombre exacto "{productCode}.pdf" en la carpeta
    const response = await drive.files.list({
      q: `name='${productCode}.pdf' and '${process.env.GOOGLE_DRIVE_FOLDER_ID}' in parents and trashed=false`,
      fields: 'files(id, name, webViewLink, webContentLink)',
      spaces: 'drive',
    });

    const files = response.data.files || [];

    if (files.length > 0) {
      return {
        fileId: files[0].id,
        name: files[0].name,
        webViewLink: files[0].webViewLink,
        webContentLink: files[0].webContentLink,
      };
    }

    return null;
  } catch (error) {
    console.error(`Error al buscar hoja técnica para ${productCode}:`, error);
    return null;
  }
}

/**
 * Obtiene el contenido de un archivo de Drive como Buffer (para adjuntar en emails)
 * @param {string} fileId - ID del archivo en Google Drive
 * @returns {Promise<Buffer>}
 */
async function getFileContent(fileId) {
  try {
    const auth = getAuthClient();
    const drive = google.drive({ version: 'v3', auth });

    const response = await drive.files.get(
      { fileId, alt: 'media' },
      { responseType: 'arraybuffer' }
    );

    return Buffer.from(response.data);
  } catch (error) {
    console.error(`Error al descargar archivo ${fileId}:`, error);
    throw new Error('No se pudo descargar el archivo');
  }
}

module.exports = {
  getClients,
  getRecipients,
  getProducts,
  findDatasheet,
  getFileContent,
};

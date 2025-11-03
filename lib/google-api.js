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
      'https://www.googleapis.com/auth/spreadsheets',
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
 * Lee cuentas bancarias desde Google Sheets
 */
async function getBankAccounts() {
  try {
    const auth = getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'CuentasBancarias!A2:E',
    });

    const rows = response.data.values || [];

    // Filtrar filas vacías y encabezados, luego mapear
    return rows
      .filter(row => {
        // Verificar que al menos el banco y número de cuenta tengan contenido
        if (!row || !row[0] || !row[0].trim() || !row[2] || !row[2].trim()) {
          return false;
        }

        // Excluir filas que parecen ser encabezados
        const firstCell = row[0].trim().toLowerCase();
        const isHeader = firstCell === 'banco' ||
                        firstCell === 'bank' ||
                        firstCell === 'nombre' ||
                        firstCell === 'name';

        return !isHeader;
      })
      .map((row, index) => ({
        id: index + 1,
        bankName: row[0]?.trim() || '',
        currency: row[1]?.trim() || '',
        accountNumber: row[2]?.trim() || '',
        cci: row[3]?.trim() || '',
        accountType: row[4]?.trim() || 'Corriente',
      }));
  } catch (error) {
    console.error('Error al leer cuentas bancarias:', error);
    throw new Error('No se pudieron cargar las cuentas bancarias');
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

/**
 * Guarda una cotización en Google Sheets
 * @param {Object} quote - Datos de la cotización
 * @returns {Promise<{id: string, savedAt: string}>}
 */
async function saveQuote(quote) {
  try {
    const auth = getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });

    const timestamp = new Date().toISOString();
    const quoteId = `${quote.meta.number}_${Date.now()}`;

    // Preparar datos para guardar
    const row = [
      quoteId,
      quote.meta.number,
      quote.meta.date,
      quote.client.name,
      quote.client.email,
      JSON.stringify(quote.items),
      quote.meta.currency,
      quote.meta.discount,
      calculateTotal(quote).total,
      timestamp,
      'Guardada'
    ];

    // Agregar a la hoja "Cotizaciones"
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Cotizaciones!A2:K2', // Comenzar desde la fila 2 (después de encabezados)
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS', // Insertar nueva fila, no sobrescribir
      resource: {
        values: [row],
      },
    });

    return { id: quoteId, savedAt: timestamp };
  } catch (error) {
    console.error('Error al guardar cotización:', error);
    throw new Error('No se pudo guardar la cotización');
  }
}

/**
 * Lee todas las cotizaciones desde Google Sheets
 * @returns {Promise<Array>}
 */
async function getQuotes() {
  try {
    const auth = getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Cotizaciones!A2:K1000', // Leer hasta 1000 filas
    });

    const rows = response.data.values || [];

    console.log(`[getQuotes] Total de filas leídas: ${rows.length}`);

    // Filtrar filas vacías y mapear
    const quotes = rows
      .filter(row => {
        // Verificar que al menos el ID y número de cotización tengan contenido
        const isValid = row && row[0] && row[0].trim() && row[1] && row[1].trim();
        if (!isValid && row && row.length > 0) {
          console.log('[getQuotes] Fila filtrada (vacía o inválida):', row[0], row[1]);
        }
        return isValid;
      })
      .map(row => {
        try {
          const quote = {
            id: row[0]?.trim() || '',
            number: row[1]?.trim() || '',
            date: row[2]?.trim() || '',
            clientName: row[3]?.trim() || '',
            clientEmail: row[4]?.trim() || '',
            items: JSON.parse(row[5] || '[]'),
            currency: row[6]?.trim() || 'USD',
            discount: parseFloat(row[7]) || 0,
            total: parseFloat(row[8]) || 0,
            savedAt: row[9]?.trim() || '',
            status: row[10]?.trim() || 'Guardada',
          };
          return quote;
        } catch (parseError) {
          console.error('[getQuotes] Error parsing quote row:', parseError, 'Row:', row);
          return null;
        }
      })
      .filter(quote => quote !== null); // Eliminar filas que fallaron al parsear

    console.log(`[getQuotes] Cotizaciones válidas después de filtrar: ${quotes.length}`);

    return quotes.reverse(); // Más recientes primero
  } catch (error) {
    console.error('[getQuotes] Error al leer cotizaciones:', error);
    throw new Error('No se pudieron cargar las cotizaciones');
  }
}

/**
 * Lee una cotización específica por ID
 * @param {string} quoteId
 * @returns {Promise<Object|null>}
 */
async function getQuoteById(quoteId) {
  try {
    const quotes = await getQuotes();
    return quotes.find(q => q.id === quoteId) || null;
  } catch (error) {
    console.error(`Error al buscar cotización ${quoteId}:`, error);
    throw new Error('No se pudo obtener la cotización');
  }
}

/**
 * Calcula totales de una cotización
 */
function calculateTotal(quote) {
  const subtotal = quote.items.reduce((acc, item) => {
    const lineTotal = item.unit_price * item.qty;
    const lineDiscount = lineTotal * ((item.discount || 0) / 100);
    return acc + (lineTotal - lineDiscount);
  }, 0);

  const globalDiscount = subtotal * ((quote.meta.discount || 0) / 100);
  const subtotalAfterDiscount = subtotal - globalDiscount;
  const tax = subtotalAfterDiscount * (quote.meta.tax_rate || 0.18);
  const total = subtotalAfterDiscount + tax;

  return { subtotal, globalDiscount, tax, total };
}

module.exports = {
  getClients,
  getRecipients,
  getProducts,
  getBankAccounts,
  findDatasheet,
  getFileContent,
  saveQuote,
  getQuotes,
  getQuoteById,
};

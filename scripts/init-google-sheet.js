// scripts/init-google-sheet.js
// Script para inicializar la estructura de Google Sheets con datos de ejemplo

const { google } = require('googleapis');
require('dotenv').config({ path: '.env.local' });

async function initializeSheets() {
  try {
    // Configurar autenticación
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    console.log('🚀 Inicializando Google Sheets...\n');

    // 1. Crear hojas (tabs)
    console.log('📋 Creando estructura de hojas...');

    const sheetNames = ['Clientes', 'Destinatarios', 'Productos'];

    // Primero, obtener las hojas existentes
    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
    const existingSheets = spreadsheet.data.sheets.map(s => s.properties.title);

    // Crear solo las hojas que no existen
    for (const sheetName of sheetNames) {
      if (!existingSheets.includes(sheetName)) {
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId,
          resource: {
            requests: [{
              addSheet: {
                properties: { title: sheetName }
              }
            }]
          }
        });
        console.log(`  ✅ Hoja "${sheetName}" creada`);
      } else {
        console.log(`  ⏭️  Hoja "${sheetName}" ya existe`);
      }
    }

    // 2. Poblar hoja "Clientes" con datos de ejemplo
    console.log('\n👥 Poblando hoja de Clientes...');
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Clientes!A1:D10',
      valueInputOption: 'RAW',
      resource: {
        values: [
          ['Razón Social', 'Contacto', 'Email', 'Dirección'],
          ['ACEROS INDUSTRIALES SAC', 'Juan Pérez', 'jperez@acerosindustriales.com', 'Av. Argentina 1234, Callao'],
          ['TEXTILES UNIDOS SA', 'María González', 'mgonzalez@textilesunidos.com', 'Jr. Gamarra 567, Lima'],
          ['MINERA DEL SUR EIRL', 'Carlos Rodríguez', 'crodriguez@mineradelsur.com', 'Av. Arequipa 890, Arequipa'],
          ['ALIMENTOS PROCESADOS SA', 'Ana Martínez', 'amartinez@alimentosprocesados.com', 'Av. Colonial 234, Lima'],
          ['CONSTRUCCIONES MODERNAS SAC', 'Luis Torres', 'ltorres@construccionesmodernas.com', 'Jr. Las Begonias 456, San Isidro'],
          ['PLÁSTICOS INDUSTRIALES SA', 'Rosa Díaz', 'rdiaz@plasticosindustriales.com', 'Av. Venezuela 789, Lima'],
          ['EMPAQUES DEL PERÚ EIRL', 'Jorge Ramírez', 'jramirez@empaquesperu.com', 'Calle Los Pinos 123, Surco'],
          ['QUÍMICA INDUSTRIAL SAC', 'Patricia Flores', 'pflores@quimicaindustrial.com', 'Av. Industrial 567, Callao'],
          ['MANUFACTURA NACIONAL SA', 'Roberto Sánchez', 'rsanchez@manufacturanacional.com', 'Jr. Comercio 890, Lima'],
        ]
      }
    });
    console.log('  ✅ 9 clientes de ejemplo agregados');

    // 3. Poblar hoja "Destinatarios" con datos de ejemplo
    console.log('\n📧 Poblando hoja de Destinatarios...');
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Destinatarios!A1:C10',
      valueInputOption: 'RAW',
      resource: {
        values: [
          ['Nombre', 'Email', 'Cargo'],
          ['Miguel Ventura', 'mventura@eurotexlubs.com', 'Gerente de Ventas'],
          ['Administración', 'admin@eurotexlubs.com', 'Departamento Administrativo'],
          ['Ventas', 'ventas@eurotexlubs.com', 'Departamento de Ventas'],
          ['Logística', 'logistica@eurotexlubs.com', 'Departamento de Logística'],
          ['Soporte Técnico', 'soporte@eurotexlubs.com', 'Soporte Técnico'],
          ['Contabilidad', 'contabilidad@eurotexlubs.com', 'Departamento de Contabilidad'],
        ]
      }
    });
    console.log('  ✅ 6 destinatarios de ejemplo agregados');

    // 4. Poblar hoja "Productos" con el catálogo actual
    console.log('\n📦 Poblando hoja de Productos...');
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Productos!A1:E10',
      valueInputOption: 'RAW',
      resource: {
        values: [
          ['Código', 'Descripción', 'Presentación', 'Precio USD', 'Hoja Técnica'],
          ['M0739', 'MOLYguard SED LUBE', '400 ml', 42.00, 'M0739.pdf'],
          ['M0752', 'MOLYguard GS ROLLER DR', '1 kg', 89.25, 'M0752.pdf'],
          ['M0777', 'MOLYguard GS COMPLEX 2', '1 kg', 84.00, 'M0777.pdf'],
          ['M0796', 'MOLYguard MOLY CHAIN 320', '5 lt', 262.50, 'M0796.pdf'],
          ['M0832', 'MOLYguard WB 2', '1 kg', 78.75, 'M0832.pdf'],
          ['M0879', 'MOLYguard DLF', '400 ml', 47.25, 'M0879.pdf'],
          ['M0949', 'MOLYguard GS 5110-A', '1 kg', 682.50, 'M0949.pdf'],
        ]
      }
    });
    console.log('  ✅ 7 productos agregados con referencia a hojas técnicas');

    // 5. Formatear encabezados (negrita, fondo azul)
    console.log('\n🎨 Formateando encabezados...');
    const requests = [];

    // Obtener el sheetId de cada hoja
    const updatedSpreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetIds = {};
    updatedSpreadsheet.data.sheets.forEach(sheet => {
      sheetIds[sheet.properties.title] = sheet.properties.sheetId;
    });

    // Formatear cada hoja
    ['Clientes', 'Destinatarios', 'Productos'].forEach(sheetName => {
      requests.push({
        repeatCell: {
          range: {
            sheetId: sheetIds[sheetName],
            startRowIndex: 0,
            endRowIndex: 1
          },
          cell: {
            userEnteredFormat: {
              backgroundColor: { red: 0.0, green: 0.4, blue: 0.8 },
              textFormat: {
                bold: true,
                foregroundColor: { red: 1.0, green: 1.0, blue: 1.0 }
              }
            }
          },
          fields: 'userEnteredFormat(backgroundColor,textFormat)'
        }
      });
    });

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      resource: { requests }
    });
    console.log('  ✅ Encabezados formateados');

    console.log('\n✨ ¡Google Sheets inicializado correctamente!');
    console.log(`\n🔗 Ver en: https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit\n`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Detalles:', error.response.data);
    }
  }
}

initializeSheets();

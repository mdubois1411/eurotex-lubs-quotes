// scripts/generate-datasheets.js
// Genera hojas técnicas sintéticas en PDF y las sube a Google Drive

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
require('dotenv').config({ path: '.env.local' });

const PRODUCTS = [
  { code: "M0739", description: "MOLYguard SED LUBE", presentation: "400 ml" },
  { code: "M0752", description: "MOLYguard GS ROLLER DR", presentation: "1 kg" },
  { code: "M0777", description: "MOLYguard GS COMPLEX 2", presentation: "1 kg" },
  { code: "M0796", description: "MOLYguard MOLY CHAIN 320", presentation: "5 lt" },
  { code: "M0832", description: "MOLYguard WB 2", presentation: "1 kg" },
  { code: "M0879", description: "MOLYguard DLF", presentation: "400 ml" },
  { code: "M0949", description: "MOLYguard GS 5110-A", presentation: "1 kg" }
];

async function generatePDF(product) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const { width, height } = page.getSize();
  let yPosition = height - 80;

  // Header
  page.drawText('EUROTEX LUBS', {
    x: 50,
    y: yPosition,
    size: 24,
    font: fontBold,
    color: rgb(0, 0.4, 0.8),
  });

  yPosition -= 40;
  page.drawText('FICHA TÉCNICA DEL PRODUCTO', {
    x: 50,
    y: yPosition,
    size: 14,
    font: fontBold,
    color: rgb(0.2, 0.2, 0.2),
  });

  // Línea separadora
  yPosition -= 20;
  page.drawLine({
    start: { x: 50, y: yPosition },
    end: { x: width - 50, y: yPosition },
    thickness: 2,
    color: rgb(0, 0.4, 0.8),
  });

  // Información del producto
  yPosition -= 40;
  page.drawText('Código:', {
    x: 50,
    y: yPosition,
    size: 12,
    font: fontBold,
  });
  page.drawText(product.code, {
    x: 150,
    y: yPosition,
    size: 12,
    font: font,
  });

  yPosition -= 25;
  page.drawText('Descripción:', {
    x: 50,
    y: yPosition,
    size: 12,
    font: fontBold,
  });
  page.drawText(product.description, {
    x: 150,
    y: yPosition,
    size: 12,
    font: font,
  });

  yPosition -= 25;
  page.drawText('Presentación:', {
    x: 50,
    y: yPosition,
    size: 12,
    font: fontBold,
  });
  page.drawText(product.presentation, {
    x: 150,
    y: yPosition,
    size: 12,
    font: font,
  });

  // Sección de características
  yPosition -= 50;
  page.drawText('CARACTERÍSTICAS PRINCIPALES', {
    x: 50,
    y: yPosition,
    size: 14,
    font: fontBold,
    color: rgb(0, 0.4, 0.8),
  });

  yPosition -= 30;
  const features = [
    '• Lubricante de alta calidad para aplicaciones industriales',
    '• Excelente resistencia a altas temperaturas',
    '• Reduce fricción y desgaste en componentes mecánicos',
    '• Prolonga la vida útil de equipos y maquinaria',
    '• Cumple con estándares internacionales de calidad',
  ];

  features.forEach(feature => {
    page.drawText(feature, {
      x: 50,
      y: yPosition,
      size: 11,
      font: font,
    });
    yPosition -= 20;
  });

  // Aplicaciones
  yPosition -= 30;
  page.drawText('APLICACIONES', {
    x: 50,
    y: yPosition,
    size: 14,
    font: fontBold,
    color: rgb(0, 0.4, 0.8),
  });

  yPosition -= 30;
  const applications = [
    '• Rodamientos y cojinetes',
    '• Cadenas industriales',
    '• Engranajes y transmisiones',
    '• Sistemas hidráulicos',
    '• Equipos de manufactura',
  ];

  applications.forEach(app => {
    page.drawText(app, {
      x: 50,
      y: yPosition,
      size: 11,
      font: font,
    });
    yPosition -= 20;
  });

  // Nota al pie
  yPosition = 80;
  page.drawText('Este es un documento temporal. Reemplace con la ficha técnica oficial.', {
    x: 50,
    y: yPosition,
    size: 9,
    font: font,
    color: rgb(0.5, 0.5, 0.5),
  });

  yPosition -= 15;
  page.drawText('EUROTEX INDUSTRIAL SAC – DIV. EUROTEX LUBS', {
    x: 50,
    y: yPosition,
    size: 9,
    font: fontBold,
    color: rgb(0.3, 0.3, 0.3),
  });

  yPosition -= 12;
  page.drawText('Jr. Hawaii 226 – La Molina – Lima – Perú', {
    x: 50,
    y: yPosition,
    size: 8,
    font: font,
    color: rgb(0.4, 0.4, 0.4),
  });

  return await pdfDoc.save();
}

async function uploadToDrive(fileName, fileContent) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/drive'],
  });

  const drive = google.drive({ version: 'v3', auth });

  const fileMetadata = {
    name: fileName,
    parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
  };

  const media = {
    mimeType: 'application/pdf',
    body: require('stream').Readable.from(Buffer.from(fileContent)),
  };

  const response = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id, name, webViewLink',
    supportsAllDrives: true,
  });

  return response.data;
}

async function main() {
  console.log('📄 Generando hojas técnicas sintéticas...\n');

  for (const product of PRODUCTS) {
    try {
      console.log(`🔨 Generando ${product.code}.pdf...`);

      // Generar PDF
      const pdfBytes = await generatePDF(product);

      // Subir a Drive
      console.log(`☁️  Subiendo a Google Drive...`);
      const file = await uploadToDrive(`${product.code}.pdf`, pdfBytes);

      console.log(`✅ ${product.code}.pdf subido correctamente`);
      console.log(`   ID: ${file.id}`);
      console.log(`   Link: ${file.webViewLink}\n`);

    } catch (error) {
      console.error(`❌ Error con ${product.code}:`, error.message);
    }
  }

  console.log('\n✨ ¡Proceso completado!');
  console.log(`\n📁 Ver carpeta: https://drive.google.com/drive/folders/${process.env.GOOGLE_DRIVE_FOLDER_ID}\n`);
}

main();

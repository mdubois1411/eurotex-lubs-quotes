// scripts/generate-sample-datasheets-simple.js
// Script simple para generar fichas técnicas de prueba en formato PDF

const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

// Productos de ejemplo
const products = [
  { code: "M0739", description: "MOLYguard SED LUBE", presentation: "400 ml" },
  { code: "M0752", description: "MOLYguard GS ROLLER DR", presentation: "1 kg" },
  { code: "M0777", description: "MOLYguard GS COMPLEX 2", presentation: "1 kg" },
  { code: "M0796", description: "MOLYguard MOLY CHAIN 320", presentation: "5 lt" },
  { code: "M0832", description: "MOLYguard WB 2", presentation: "1 kg" },
  { code: "M0879", description: "MOLYguard DLF", presentation: "400 ml" },
  { code: "M0949", description: "MOLYguard GS 5110-A", presentation: "1 kg" }
];

// Generar datos técnicos aleatorios pero realistas
function generateTechnicalData() {
  const viscosities = ['ISO VG 32', 'ISO VG 46', 'ISO VG 68', 'ISO VG 100', 'ISO VG 150', 'ISO VG 220', 'ISO VG 320'];
  const densities = ['0.85', '0.87', '0.89', '0.91', '0.93'];
  const flashPoints = ['180', '200', '220', '240', '260'];
  const pourPoints = ['-15', '-18', '-21', '-24', '-27'];

  return {
    viscosity: viscosities[Math.floor(Math.random() * viscosities.length)],
    density: densities[Math.floor(Math.random() * densities.length)],
    flashPoint: flashPoints[Math.floor(Math.random() * flashPoints.length)],
    pourPoint: pourPoints[Math.floor(Math.random() * pourPoints.length)],
  };
}

// Generar un PDF para un producto
function generateDatasheet(product, outputPath) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const stream = fs.createWriteStream(outputPath);

      doc.pipe(stream);

      const technicalData = generateTechnicalData();

      // Header con línea azul
      doc.fontSize(24)
         .fillColor('#0066cc')
         .text('FICHA TÉCNICA', { align: 'center' });

      doc.moveDown(0.5);

      doc.fontSize(16)
         .fillColor('#333333')
         .text(product.code, { align: 'center' });

      doc.fontSize(14)
         .fillColor('#666666')
         .text(product.description, { align: 'center' });

      doc.moveDown(1);
      doc.strokeColor('#0066cc')
         .lineWidth(2)
         .moveTo(50, doc.y)
         .lineTo(550, doc.y)
         .stroke();

      doc.moveDown(1.5);

      // Descripción
      doc.fontSize(12)
         .fillColor('#0066cc')
         .text('DESCRIPCIÓN', { underline: true });

      doc.moveDown(0.5);

      doc.fontSize(10)
         .fillColor('#333333')
         .text(
           `${product.description} es un lubricante de alta calidad diseñado para aplicaciones ` +
           `industriales exigentes. Ofrece excelente protección contra el desgaste y prolonga la ` +
           `vida útil de los equipos.`,
           { align: 'justify' }
         );

      doc.moveDown(1.5);

      // Aplicaciones
      doc.fontSize(12)
         .fillColor('#0066cc')
         .text('APLICACIONES');

      doc.moveDown(0.5);

      doc.fontSize(10)
         .fillColor('#333333')
         .list([
           'Maquinaria industrial general',
           'Sistemas hidráulicos',
           'Reductores y engranajes',
           'Rodamientos de alta velocidad',
           'Cadenas industriales'
         ], { bulletRadius: 2 });

      doc.moveDown(1.5);

      // Propiedades Técnicas
      doc.fontSize(12)
         .fillColor('#0066cc')
         .text('PROPIEDADES TÉCNICAS');

      doc.moveDown(0.5);

      const tableTop = doc.y;
      const col1X = 70;
      const col2X = 300;
      let rowY = tableTop;

      // Función para agregar fila a la tabla
      function addTableRow(label, value) {
        doc.fontSize(10)
           .fillColor('#333333')
           .font('Helvetica-Bold')
           .text(label, col1X, rowY);

        doc.font('Helvetica')
           .fillColor('#666666')
           .text(value, col2X, rowY);

        rowY += 25;

        // Línea divisoria
        doc.strokeColor('#e0e0e0')
           .lineWidth(0.5)
           .moveTo(col1X, rowY - 5)
           .lineTo(520, rowY - 5)
           .stroke();
      }

      addTableRow('Viscosidad @ 40°C:', technicalData.viscosity);
      addTableRow('Densidad @ 15°C:', `${technicalData.density} g/cm³`);
      addTableRow('Punto de Inflamación:', `${technicalData.flashPoint}°C`);
      addTableRow('Punto de Fluidez:', `${technicalData.pourPoint}°C`);
      addTableRow('Presentación:', product.presentation);

      doc.y = rowY;
      doc.moveDown(1.5);

      // Beneficios
      doc.fontSize(12)
         .fillColor('#0066cc')
         .text('BENEFICIOS');

      doc.moveDown(0.5);

      doc.fontSize(10)
         .fillColor('#333333')
         .text('✓ Excelente protección contra el desgaste')
         .text('✓ Alta estabilidad térmica y oxidativa')
         .text('✓ Reducción de costos de mantenimiento')
         .text('✓ Compatibilidad con sellos y elastómeros')
         .text('✓ Prolongada vida útil del equipo');

      doc.moveDown(1.5);

      // Almacenamiento
      doc.fontSize(12)
         .fillColor('#0066cc')
         .text('ALMACENAMIENTO Y MANEJO');

      doc.moveDown(0.5);

      doc.fontSize(10)
         .fillColor('#333333')
         .text(
           'Almacenar en lugar fresco y seco, alejado de fuentes de calor y luz solar directa. ' +
           'Mantener los envases cerrados cuando no estén en uso. Vida útil: 24 meses desde la ' +
           'fecha de fabricación.',
           { align: 'justify' }
         );

      // Footer
      doc.fontSize(8)
         .fillColor('#999999')
         .text(
           '\n\nEUROTEX INDUSTRIAL SAC – DIV. EUROTEX LUBS\n' +
           'Jr. Hawaii 226 – La Molina – Lima – Perú\n' +
           'Esta es una ficha técnica de prueba generada automáticamente',
           50,
           700,
           { align: 'center', width: 500 }
         );

      // Finalizar documento
      doc.end();

      stream.on('finish', () => resolve());
      stream.on('error', reject);
    } catch (error) {
      reject(error);
    }
  });
}

// Generar todos los PDFs
async function generateAllDatasheets() {
  const outputDir = path.join(__dirname, '..', 'temp-datasheets');

  // Crear directorio si no existe
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('🔧 Generando fichas técnicas sintéticas...\n');

  for (const product of products) {
    try {
      const fileName = `${product.code}.pdf`;
      const filePath = path.join(outputDir, fileName);

      await generateDatasheet(product, filePath);

      console.log(`✅ ${fileName} - ${product.description}`);
    } catch (error) {
      console.error(`❌ Error generando ${product.code}:`, error.message);
    }
  }

  console.log(`\n✨ Completado! ${products.length} fichas técnicas generadas en:\n   ${outputDir}`);
  console.log('\n📋 Próximos pasos:');
  console.log('1. Sube estos PDFs a Google Drive en la carpeta configurada');
  console.log('2. Asegúrate de que los nombres de los archivos coincidan con los códigos de productos');
  console.log('3. Las fichas se adjuntarán automáticamente en las cotizaciones cuando envíes emails\n');
}

// Ejecutar
generateAllDatasheets().catch(console.error);

// scripts/generate-sample-datasheets.js
// Script para generar fichas técnicas de prueba en formato PDF

const fs = require('fs');
const path = require('path');
const { Document, Page, Text, View, StyleSheet, pdf } = require('@react-pdf/renderer');
const React = require('react');

// Estilos para las fichas técnicas
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff'
  },
  header: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 3,
    borderBottomColor: '#0066cc'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0066cc',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3
  },
  section: {
    marginTop: 15,
    marginBottom: 10
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#0066cc',
    marginBottom: 8,
    textTransform: 'uppercase'
  },
  text: {
    fontSize: 11,
    marginBottom: 5,
    lineHeight: 1.5
  },
  table: {
    marginTop: 10
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingTop: 5,
    paddingBottom: 5
  },
  tableLabel: {
    width: '40%',
    fontWeight: 'bold',
    fontSize: 10,
    color: '#333'
  },
  tableValue: {
    width: '60%',
    fontSize: 10,
    color: '#666'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 9,
    color: '#999',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10
  }
});

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
function generateTechnicalData(product) {
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

// Componente PDF para ficha técnica
function DatasheetPDF({ product, technicalData }) {
  return React.createElement(Document, null,
    React.createElement(Page, { size: "A4", style: styles.page },
      // Header
      React.createElement(View, { style: styles.header },
        React.createElement(Text, { style: styles.title }, "FICHA TÉCNICA"),
        React.createElement(Text, { style: styles.subtitle }, product.code),
        React.createElement(Text, { style: styles.subtitle }, product.description)
      ),

      // Descripción
      React.createElement(View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, "DESCRIPCIÓN"),
        React.createElement(Text, { style: styles.text },
          `${product.description} es un lubricante de alta calidad diseñado para aplicaciones industriales exigentes. ` +
          `Ofrece excelente protección contra el desgaste y prolonga la vida útil de los equipos.`
        )
      ),

      // Aplicaciones
      React.createElement(View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, "APLICACIONES"),
        React.createElement(Text, { style: styles.text }, "• Maquinaria industrial general"),
        React.createElement(Text, { style: styles.text }, "• Sistemas hidráulicos"),
        React.createElement(Text, { style: styles.text }, "• Reductores y engranajes"),
        React.createElement(Text, { style: styles.text }, "• Rodamientos de alta velocidad")
      ),

      // Propiedades Técnicas
      React.createElement(View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, "PROPIEDADES TÉCNICAS"),
        React.createElement(View, { style: styles.table },
          React.createElement(View, { style: styles.tableRow },
            React.createElement(Text, { style: styles.tableLabel }, "Viscosidad @ 40°C:"),
            React.createElement(Text, { style: styles.tableValue }, technicalData.viscosity)
          ),
          React.createElement(View, { style: styles.tableRow },
            React.createElement(Text, { style: styles.tableLabel }, "Densidad @ 15°C:"),
            React.createElement(Text, { style: styles.tableValue }, `${technicalData.density} g/cm³`)
          ),
          React.createElement(View, { style: styles.tableRow },
            React.createElement(Text, { style: styles.tableLabel }, "Punto de Inflamación:"),
            React.createElement(Text, { style: styles.tableValue }, `${technicalData.flashPoint}°C`)
          ),
          React.createElement(View, { style: styles.tableRow },
            React.createElement(Text, { style: styles.tableLabel }, "Punto de Fluidez:"),
            React.createElement(Text, { style: styles.tableValue }, `${technicalData.pourPoint}°C`)
          ),
          React.createElement(View, { style: styles.tableRow },
            React.createElement(Text, { style: styles.tableLabel }, "Presentación:"),
            React.createElement(Text, { style: styles.tableValue }, product.presentation)
          )
        )
      ),

      // Beneficios
      React.createElement(View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, "BENEFICIOS"),
        React.createElement(Text, { style: styles.text }, "✓ Excelente protección contra el desgaste"),
        React.createElement(Text, { style: styles.text }, "✓ Alta estabilidad térmica y oxidativa"),
        React.createElement(Text, { style: styles.text }, "✓ Reducción de costos de mantenimiento"),
        React.createElement(Text, { style: styles.text }, "✓ Compatibilidad con sellos y elastómeros")
      ),

      // Almacenamiento
      React.createElement(View, { style: styles.section },
        React.createElement(Text, { style: styles.sectionTitle }, "ALMACENAMIENTO Y MANEJO"),
        React.createElement(Text, { style: styles.text },
          "Almacenar en lugar fresco y seco, alejado de fuentes de calor y luz solar directa. " +
          "Mantener los envases cerrados cuando no estén en uso. Vida útil: 24 meses desde la fecha de fabricación."
        )
      ),

      // Footer
      React.createElement(View, { style: styles.footer },
        React.createElement(Text, null, "EUROTEX INDUSTRIAL SAC – DIV. EUROTEX LUBS"),
        React.createElement(Text, null, "Jr. Hawaii 226 – La Molina – Lima – Perú"),
        React.createElement(Text, null, "Esta es una ficha técnica de prueba generada automáticamente")
      )
    )
  );
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
      const technicalData = generateTechnicalData(product);
      const fileName = `${product.code}.pdf`;
      const filePath = path.join(outputDir, fileName);

      // Generar PDF
      const doc = DatasheetPDF({ product, technicalData });
      const buffer = await pdf(doc).toBuffer();

      // Guardar archivo
      fs.writeFileSync(filePath, buffer);

      console.log(`✅ ${fileName} - ${product.description}`);
    } catch (error) {
      console.error(`❌ Error generando ${product.code}:`, error.message);
    }
  }

  console.log(`\n✨ Completado! ${products.length} fichas técnicas generadas en: ${outputDir}`);
  console.log('\n📋 Próximos pasos:');
  console.log('1. Sube estos PDFs a Google Drive en la carpeta configurada');
  console.log('2. Asegúrate de que los nombres de los archivos coincidan con los códigos de productos');
  console.log('3. Las fichas se adjuntarán automáticamente en las cotizaciones\n');
}

// Ejecutar
generateAllDatasheets().catch(console.error);

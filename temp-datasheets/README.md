# 📄 Fichas Técnicas de Prueba

## ✅ PDFs Generados

Se han generado **7 fichas técnicas sintéticas** para pruebas:

- ✓ M0739.pdf - MOLYguard SED LUBE
- ✓ M0752.pdf - MOLYguard GS ROLLER DR
- ✓ M0777.pdf - MOLYguard GS COMPLEX 2
- ✓ M0796.pdf - MOLYguard MOLY CHAIN 320
- ✓ M0832.pdf - MOLYguard WB 2
- ✓ M0879.pdf - MOLYguard DLF
- ✓ M0949.pdf - MOLYguard GS 5110-A

## 📋 Cómo usar estos archivos

### Opción 1: Subir a Google Drive (Recomendado para producción)

1. **Sube los PDFs a Google Drive:**
   - Ve a Google Drive
   - Navega a la carpeta configurada en `GOOGLE_DRIVE_FOLDER_ID`
   - Sube todos los archivos PDF
   - Asegúrate de que los nombres sean exactamente: `M0739.pdf`, `M0752.pdf`, etc.

2. **Verifica los permisos:**
   - La cuenta de servicio debe tener acceso de "Viewer" a la carpeta
   - Los archivos deben ser accesibles por la cuenta de servicio

3. **Prueba el sistema:**
   - Crea una cotización con alguno de estos productos
   - Envía el email
   - El sistema buscará automáticamente `{CODIGO_PRODUCTO}.pdf` en Drive
   - Si existe, se adjuntará al email

### Opción 2: Probar localmente

Estos PDFs son solo para pruebas. En producción, debes:
- Reemplazarlos con las fichas técnicas reales de tus productos
- Subirlos a Google Drive
- Mantener la nomenclatura: `{CODIGO}.pdf`

## 🔄 Regenerar PDFs

Si necesitas regenerar estos archivos:

```bash
node scripts/generate-sample-datasheets-simple.js
```

## 📝 Contenido de las Fichas

Cada ficha técnica incluye:
- **Header**: Código y nombre del producto
- **Descripción**: Descripción general del lubricante
- **Aplicaciones**: Lista de usos recomendados
- **Propiedades Técnicas**: Datos técnicos (viscosidad, densidad, etc.)
- **Beneficios**: Ventajas del producto
- **Almacenamiento**: Instrucciones de almacenamiento y manejo
- **Footer**: Información de contacto de EUROTEX LUBS

⚠️ **Nota**: Estos son datos sintéticos generados aleatoriamente para pruebas. Reemplaza con información real antes de usar en producción.

## 🎨 Personalización

Para personalizar las fichas técnicas, edita el archivo:
```
scripts/generate-sample-datasheets-simple.js
```

Puedes modificar:
- Diseño y estilo del PDF
- Secciones incluidas
- Datos técnicos
- Logo y branding

## 📊 Verificación

Para verificar que un PDF es válido:
1. Abre el archivo con un lector de PDF
2. Verifica que tenga todas las secciones
3. Confirma que el tamaño sea ~3.6 KB
4. Asegúrate de que el texto sea legible y profesional

## 🚀 Siguiente Paso

Una vez que hayas subido estos PDFs a Google Drive:

1. Configura `GOOGLE_DRIVE_FOLDER_ID` en `.env.local` con el ID de la carpeta
2. Asegúrate de que la cuenta de servicio tenga acceso
3. Crea una cotización de prueba con productos M0739, M0752, etc.
4. Envía el email y verifica que las fichas se adjunten correctamente

---

**Generado automáticamente por**: `scripts/generate-sample-datasheets-simple.js`

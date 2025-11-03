# Configuración del Sistema de Cotizaciones y Cuentas Bancarias

## 📋 Resumen

El sistema ahora permite:
- ✅ Guardar y consultar cotizaciones
- ✅ Configurar múltiples cuentas bancarias
- ✅ Seleccionar qué cuentas mostrar en cada cotización
- ✅ Todas las cotizaciones se almacenan en Google Sheets

## 🔧 Configuración de Google Sheets

### Paso 1: Crear la Hoja "Cotizaciones"

1. Abre tu Google Sheet (el mismo que tienes configurado en `GOOGLE_SHEET_ID`)
2. Crea una nueva hoja llamada **"Cotizaciones"**
3. En la primera fila (encabezados), agrega las siguientes columnas:

| A | B | C | D | E | F | G | H | I | J | K |
|---|---|---|---|---|---|---|---|---|---|---|
| ID | Número | Fecha | Cliente | Email | Items (JSON) | Moneda | Descuento | Total | Fecha Guardado | Estado |

### Paso 2: Crear la Hoja "CuentasBancarias"

1. En el mismo Google Sheet, crea una nueva hoja llamada **"CuentasBancarias"**
2. En la primera fila (encabezados), agrega las siguientes columnas:

| A | B | C | D | E |
|---|---|---|---|---|
| Banco | Moneda | Número de Cuenta | CCI | Tipo de Cuenta |

3. **Ejemplo de datos** (reemplaza con tus cuentas reales):

| Banco | Moneda | Número de Cuenta | CCI | Tipo de Cuenta |
|---|---|---|---|---|
| Banco de Crédito del Perú (BCP) | USD | 194-2345678-1-00 | 002-194-002345678100-12 | Corriente |
| Banco de Crédito del Perú (BCP) | PEN | 194-2345679-1-01 | 002-194-002345679101-13 | Corriente |
| Interbank | USD | 200-3001234567 | 003-200-003001234567-45 | Ahorros |
| BBVA Continental | PEN | 0011-0567-0123456789 | 011-567-000123456789-01 | Corriente |

**📌 Nota Importante**:
- Agrega todas las cuentas bancarias que tu empresa utiliza
- En cada cotización podrás seleccionar cuáles mostrar
- Por defecto, todas las cuentas están seleccionadas
- Puedes tener cuentas en diferentes monedas (USD, PEN, EUR, etc.)

### Paso 3: Dar Permisos de Escritura

1. Ve a Google Cloud Console
2. Busca tu proyecto
3. Ve a "APIs y Servicios" → "Credenciales"
4. Encuentra tu cuenta de servicio
5. **IMPORTANTE**: Asegúrate de que la cuenta de servicio tenga permisos de **Editor** en el Google Sheet (no solo "Viewer")
6. Comparte el Google Sheet con el email de la cuenta de servicio con permisos de edición

### Paso 4: Actualizar Scopes (si es necesario)

El código ya ha sido actualizado para usar el scope de escritura:
```javascript
'https://www.googleapis.com/auth/spreadsheets' // Permite lectura y escritura
```

## 🚀 Características Implementadas

### 1. Guardar Cotizaciones
- Botón **"💾 Guardar Cotización"** en la sección de configuración de envío
- Guarda toda la información de la cotización en Google Sheets
- Genera un ID único para cada cotización
- Valida que haya productos y nombre de cliente antes de guardar

### 2. Ver Historial
- Botón **"📋 Ver Historial"** en el header principal
- Muestra todas las cotizaciones guardadas
- Buscador en tiempo real por número, cliente o email
- Estadísticas: total de cotizaciones, monto total y promedio

### 3. Ver Detalles
- Click en **"👁 Ver"** para ver los detalles completos de una cotización
- Modal con información del cliente y lista de productos
- Cálculo de totales con descuentos e IGV

### 4. Múltiples Cuentas Bancarias ✨ NUEVO
- Configura todas tus cuentas bancarias en Google Sheets
- Selecciona qué cuentas mostrar en cada cotización
- Soporte para múltiples monedas (USD, PEN, EUR, etc.)
- Las cuentas seleccionadas aparecen en el PDF de la cotización
- Información detallada: Banco, Moneda, Número de Cuenta, CCI, Tipo

## 📁 Estructura de Archivos Creados

```
app/api/
  ├── quotes/
  │   ├── route.js              # GET /api/quotes - Lista todas las cotizaciones
  │   ├── save/
  │   │   └── route.js          # POST /api/quotes/save - Guarda una cotización
  │   └── [id]/
  │       └── route.js          # GET /api/quotes/:id - Obtiene una cotización específica
  └── bank-accounts/
      └── route.js              # GET /api/bank-accounts - Lista cuentas bancarias

components/
  ├── QuoteHistory.js           # Componente para visualizar historial
  └── QuoteBuilderV2.js         # Actualizado con selección de cuentas bancarias

lib/
  ├── google-api.js             # Funciones actualizadas con getBankAccounts, saveQuote, getQuotes
  └── pdf.js                    # Actualizado para mostrar múltiples cuentas bancarias
```

## 🧪 Pruebas

### Probar Cuentas Bancarias
1. Configura la hoja "CuentasBancarias" en Google Sheets
2. Recarga la página de cotizaciones
3. Crea una cotización con productos
4. En "Configuración de Envío", verás la sección "Cuentas Bancarias a Incluir"
5. Selecciona las cuentas que quieres mostrar (por defecto todas están marcadas)
6. Genera un PDF y verifica que aparezcan las cuentas seleccionadas

### Probar Guardado
1. Crea una cotización con al menos un producto
2. Selecciona las cuentas bancarias que deseas incluir
3. Ingresa nombre del cliente
4. Click en "💾 Guardar Cotización"
5. Deberías ver: "✅ Cotización guardada correctamente"
6. Verifica en Google Sheets que se agregó la fila

### Probar Historial
1. Click en "📋 Ver Historial"
2. Deberías ver la lista de cotizaciones guardadas
3. Prueba el buscador
4. Click en "👁 Ver" para ver detalles

## ⚠️ Solución de Problemas

### Error: "No hay cuentas bancarias configuradas"
- Verifica que la hoja "CuentasBancarias" existe en Google Sheets
- Verifica que los encabezados están en la fila 1
- Verifica que hay datos desde la fila 2 en adelante
- Los campos Banco, Moneda, Número de Cuenta y CCI son obligatorios

### Error: "No se pudo guardar la cotización"
- Verifica que la hoja "Cotizaciones" existe en Google Sheets
- Verifica que la cuenta de servicio tenga permisos de **Editor**
- Revisa los logs del servidor para más detalles

### Error: "Permission denied"
```bash
# Verifica los scopes en .env.local
GOOGLE_SERVICE_ACCOUNT_EMAIL=tu-cuenta@tu-proyecto.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
GOOGLE_SHEET_ID=tu-sheet-id
```

### Las cuentas bancarias no aparecen en la interfaz
- Verifica que hay datos en la hoja "CuentasBancarias" (fila 2 en adelante)
- Verifica en la consola del navegador si hay errores
- Recarga la página (F5)

### Las cuentas no aparecen en el PDF
- Verifica que has seleccionado al menos una cuenta antes de generar el PDF
- Las cuentas deben tener todos los campos completos (Banco, Moneda, Cuenta, CCI)

## 💡 Uso en Producción

Para Vercel:
1. Las variables de entorno ya deberían estar configuradas
2. No necesitas cambios adicionales si ya funciona el resto del sistema
3. Las cotizaciones y cuentas se cargarán automáticamente desde Google Sheets

## 📊 Datos Guardados

### Cada cotización guarda:
- **ID único**: Número de cotización + timestamp
- **Número**: El número de cotización (ej: 2025.1234a)
- **Fecha**: Fecha de la cotización
- **Cliente**: Nombre del cliente
- **Email**: Email del cliente
- **Items**: Productos en formato JSON (código, descripción, cantidad, precio, descuento)
- **Moneda**: USD (o la configurada)
- **Descuento**: Descuento global aplicado (%)
- **Total**: Total final con IGV
- **Fecha Guardado**: Timestamp de cuándo se guardó
- **Estado**: Estado de la cotización (Guardada, Enviada, etc.)

### Cada cuenta bancaria contiene:
- **Banco**: Nombre del banco (ej: "Banco de Crédito del Perú (BCP)")
- **Moneda**: USD, PEN, EUR, etc.
- **Número de Cuenta**: El número de cuenta bancaria
- **CCI**: Código de Cuenta Interbancario
- **Tipo de Cuenta**: Corriente, Ahorros, etc.

## 🎨 Formato del PDF

Las cuentas bancarias aparecen al final del PDF en la sección "Datos Bancarios", con el siguiente formato:

```
Datos Bancarios:

• Banco de Crédito del Perú (BCP) (USD)
  Cuenta Corriente: 194-2345678-1-00
  CCI: 002-194-002345678100-12

• Interbank (PEN)
  Cuenta Ahorros: 200-3001234567
  CCI: 003-200-003001234567-45
```

## 🔄 Próximas Mejoras (Opcionales)

- Exportar cotizaciones a Excel
- Filtros por fecha, cliente o estado
- Editar cotizaciones guardadas
- Eliminar cotizaciones
- Enviar email directamente desde el historial
- Estadísticas y gráficos de ventas
- Cambiar estado de cotizaciones (Guardada → Enviada → Aceptada/Rechazada)
- Agregar/editar cuentas bancarias desde la interfaz (sin necesidad de ir a Google Sheets)
- Histórico de qué cuentas se incluyeron en cada cotización enviada

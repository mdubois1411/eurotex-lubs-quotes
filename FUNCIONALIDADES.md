# 📋 Sistema de Cotizaciones EUROTEX LUBS

## ✨ Funcionalidades Implementadas

### 🏢 **Información de la Empresa**
- ✅ Logo en header del PDF y de la interfaz
- ✅ Datos bancarios (Cuenta Corriente y CCI) en el footer del PDF
- ✅ RUC y dirección de la empresa

---

### 👥 **Gestión de Clientes**
- ✅ **Base de datos en Google Sheets** - Almacena clientes con:
  - Razón Social
  - Persona de Contacto
  - Email
  - Dirección
- ✅ **Selector de clientes** - Autocompletado desde la base de datos
- ✅ **Entrada manual** - Opción de escribir datos de cliente nuevo

**Ubicación:** [Google Sheets - Hoja "Clientes"](https://docs.google.com/spreadsheets/d/1mVX5zx6kcyLM6Q5g0EjyACrtdhKlCHMWULtDNM-nPgo/edit)

---

### 📦 **Catálogo de Productos**
- ✅ **Base de datos dinámica** - Productos desde Google Sheets
- ✅ **Vista de tabla compacta** - Ideal para catálogos grandes con:
  - Scroll vertical (máx 400px)
  - Headers fijos
  - Botón "Agregar" en cada fila
- ✅ **Vista de tarjetas** - Visual para catálogos pequeños
- ✅ **Toggle entre vistas** - Cambio rápido entre Lista/Tarjetas
- ✅ **Buscador en tiempo real** - Filtra por código o descripción
- ✅ **Paginación inteligente**:
  - Selector de items por página (5, 10, 25, 50, 100)
  - Navegación con botones « ‹ 1 2 3 › »
  - Contador "Mostrando 1-10 de 150"
  - Auto-reset al filtrar

**Ubicación:** [Google Sheets - Hoja "Productos"](https://docs.google.com/spreadsheets/d/1mVX5zx6kcyLM6Q5g0EjyACrtdhKlCHMWULtDNM-nPgo/edit)

---

### 🔢 **Numeración y Versiones**
- ✅ **Número de cotización** - Formato: 2025.XXXX (editable)
- ✅ **Sistema de versiones** - Agregar sufijos a, b, c, etc.
  - Ejemplo: 2025.1234a, 2025.1234b, 2025.1234c
  - Permite múltiples versiones sin cambiar el número base

---

### 📅 **Fecha Flexible**
- ✅ **Fecha automática** - Se genera al crear la cotización
- ✅ **Fecha editable** - Selector de fecha manual
- ✅ **Formato** - Día/Mes/Año (formato peruano)

---

### 💰 **Sistema de Descuentos**
- ✅ **Descuento por producto** - Campo de porcentaje individual (0-100%)
- ✅ **Descuento global** - Aplica sobre el subtotal total
- ✅ **Cálculo automático**:
  1. Subtotal = Σ(Precio × Cantidad - Descuento por línea)
  2. Descuento Global = Subtotal × % descuento
  3. IGV = (Subtotal - Descuento Global) × 18%
  4. Total = Subtotal - Descuento Global + IGV
- ✅ **Visualización en PDF** - Muestra descuentos aplicados

---

### 📄 **Generación de PDF**
- ✅ **Header profesional** con logo y datos de empresa
- ✅ **Información del cliente** completa
- ✅ **Tabla de productos** con:
  - Cantidad
  - Código y Descripción
  - Presentación
  - Precio Unitario
  - Descuento %
  - Total por línea
- ✅ **Totales detallados**:
  - Subtotal
  - Descuento Global (si aplica)
  - IGV (18%)
  - Total Final
- ✅ **Footer con**:
  - Condiciones comerciales
  - Datos bancarios (Cuenta y CCI)
- ✅ **Nombre de archivo** - `cotizacion_2025.1234a.pdf`

---

### 📧 **Sistema de Email Avanzado**
- ✅ **Destinatarios múltiples**:
  - Email del cliente
  - Destinatarios predefinidos (selección múltiple)
  - Base de datos en Google Sheets
- ✅ **Cuerpo de email editable**:
  - Plantilla predeterminada
  - Editable antes de enviar
  - Formato HTML automático
- ✅ **Adjuntos automáticos**:
  - ✅ PDF de la cotización
  - ✅ Hojas técnicas de productos cotizados (desde Google Drive)
  - Búsqueda automática por código de producto (ej: M0739.pdf)
- ✅ **Logging** - Muestra qué hojas técnicas se encontraron/adjuntaron

**Ubicación Destinatarios:** [Google Sheets - Hoja "Destinatarios"](https://docs.google.com/spreadsheets/d/1mVX5zx6kcyLM6Q5g0EjyACrtdhKlCHMWULtDNM-nPgo/edit)

**Ubicación Hojas Técnicas:** [Google Drive - Carpeta](https://drive.google.com/drive/folders/12tj_AkRg8lfujIFe_9OS88YdfsOnpIng)

---

### 📑 **Hojas Técnicas**
- ✅ **Almacenamiento** - Google Drive
- ✅ **Nomenclatura** - Archivo nombrado con código de producto (ej: M0739.pdf)
- ✅ **Adjuntos automáticos** - Se adjuntan al enviar email
- ✅ **PDFs sintéticos generados** - Para pruebas (reemplazar con reales)
- ✅ **Búsqueda inteligente** - Si no existe, continúa sin error

---

### 🎨 **Interfaz de Usuario**
- ✅ **Diseño limpio** - Colores corporativos (azul #0066cc)
- ✅ **Responsive** - Se adapta a diferentes tamaños de pantalla
- ✅ **Secciones organizadas**:
  1. Header con logo
  2. Información del Cliente
  3. Catálogo de Productos
  4. Productos Seleccionados
  5. Configuración de Envío
- ✅ **Feedback visual**:
  - Estados de carga
  - Hover effects
  - Mensajes de éxito/error

---

## 🔧 **Arquitectura Técnica**

### **Frontend**
- Next.js 14.2.5
- React 18
- CSS-in-JS (inline styles)

### **Backend APIs**
- `/api/clients` - Lee clientes desde Google Sheets
- `/api/recipients` - Lee destinatarios desde Google Sheets
- `/api/products` - Lee productos desde Google Sheets
- `/api/pdf` - Genera PDF de cotización
- `/api/send` - Envía email con adjuntos

### **Integraciones**
- **Google Sheets API** - Base de datos de clientes, productos, destinatarios
- **Google Drive API** - Almacenamiento y descarga de hojas técnicas
- **Resend API** - Envío de emails transaccionales
- **@react-pdf/renderer** - Generación de PDFs

### **Autenticación**
- Google Service Account para acceso a APIs sin interacción del usuario

---

## 📊 **Datos de Ejemplo Incluidos**

### Clientes (9 ejemplos)
- ACEROS INDUSTRIALES SAC
- TEXTILES UNIDOS SA
- MINERA DEL SUR EIRL
- ALIMENTOS PROCESADOS SA
- CONSTRUCCIONES MODERNAS SAC
- PLÁSTICOS INDUSTRIALES SA
- EMPAQUES DEL PERÚ EIRL
- QUÍMICA INDUSTRIAL SAC
- MANUFACTURA NACIONAL SA

### Destinatarios (6 ejemplos)
- Miguel Ventura (Gerente de Ventas)
- Administración
- Ventas
- Logística
- Soporte Técnico
- Contabilidad

### Productos (7 ejemplos)
- M0739 - MOLYguard SED LUBE
- M0752 - MOLYguard GS ROLLER DR
- M0777 - MOLYguard GS COMPLEX 2
- M0796 - MOLYguard MOLY CHAIN 320
- M0832 - MOLYguard WB 2
- M0879 - MOLYguard DLF
- M0949 - MOLYguard GS 5110-A

---

## 🚀 **Cómo Usar**

### 1. **Crear Cotización**
1. Selecciona un cliente existente o ingresa datos manualmente
2. Define número y versión de cotización
3. Ajusta fecha si es necesario
4. Busca y agrega productos del catálogo
5. Ajusta cantidades y descuentos por producto
6. Define descuento global si aplica

### 2. **Generar PDF**
- Click en "📄 Descargar PDF"
- Se descarga automáticamente con nombre `cotizacion_NUMERO.pdf`

### 3. **Enviar por Email**
1. Selecciona destinatarios adicionales (opcional)
2. Edita el cuerpo del email si es necesario
3. Click en "📧 Enviar por Correo"
4. El sistema:
   - Genera el PDF
   - Busca hojas técnicas de productos cotizados
   - Adjunta todo
   - Envía a destinatarios seleccionados

---

## 📝 **Mantenimiento de Datos**

### Agregar Clientes
1. Abre [Google Sheets](https://docs.google.com/spreadsheets/d/1mVX5zx6kcyLM6Q5g0EjyACrtdhKlCHMWULtDNM-nPgo/edit)
2. Ve a hoja "Clientes"
3. Agrega nueva fila con: Razón Social | Contacto | Email | Dirección

### Agregar Productos
1. Ve a hoja "Productos"
2. Agrega: Código | Descripción | Presentación | Precio | Nombre_Hoja_Técnica

### Agregar Destinatarios
1. Ve a hoja "Destinatarios"
2. Agrega: Nombre | Email | Cargo

### Agregar/Actualizar Hojas Técnicas
1. Nombra el PDF con el código del producto (ej: M0739.pdf)
2. Sube a [carpeta de Drive](https://drive.google.com/drive/folders/12tj_AkRg8lfujIFe_9OS88YdfsOnpIng)
3. ¡Listo! Se adjuntará automáticamente en cotizaciones

---

## 🎯 **Próximas Mejoras Sugeridas**

- [ ] Historial de cotizaciones enviadas
- [ ] Dashboard con estadísticas
- [ ] Exportar/Importar productos desde Excel
- [ ] Múltiples monedas (USD, PEN)
- [ ] Plantillas de email personalizables
- [ ] Notificaciones cuando cliente abre el PDF
- [ ] Firma digital en PDF
- [ ] Integración con sistema de facturación

---

## 📞 **Soporte**

Para preguntas o problemas:
- Revisa el archivo `DEPLOY-VERCEL.md` para instrucciones de deployment
- Consulta logs en Vercel para debugging
- Verifica que todas las variables de entorno estén configuradas

---

**Desarrollado para EUROTEX LUBS - Sistema de Cotizaciones v2.0**

# ✅ Checklist de Deployment a Vercel

## 📋 Antes de Desplegar

### 1. Google Sheets - Configuración ✅

- [ ] **Hoja "Clientes"** configurada con columnas: Nombre, Atención, Email, Dirección
- [ ] **Hoja "Destinatarios"** configurada con columnas: Nombre, Email, Rol
- [ ] **Hoja "Productos"** configurada con columnas: Código, Descripción, Presentación, Precio, Hoja Técnica
- [ ] **Hoja "Cotizaciones"** creada con columnas: ID, Número, Fecha, Cliente, Email, Items (JSON), Moneda, Descuento, Total, Fecha Guardado, Estado
- [ ] **Hoja "CuentasBancarias"** creada con columnas: Banco, Moneda, Número de Cuenta, CCI, Tipo de Cuenta
- [ ] Todas las hojas tienen datos de prueba (al menos 1 fila)

### 2. Google Drive - Fichas Técnicas 📄

- [ ] Carpeta de Drive creada y compartida con el Service Account
- [ ] PDFs de fichas técnicas subidos con nombres: `{CODIGO}.pdf` (ej: M0739.pdf)
- [ ] GOOGLE_DRIVE_FOLDER_ID obtenido de la URL de la carpeta

### 3. Service Account - Permisos 🔐

- [ ] Service Account creado en Google Cloud Console
- [ ] API de Google Sheets habilitada
- [ ] API de Google Drive habilitada
- [ ] Google Sheet compartido con el email del Service Account con permisos de **Editor**
- [ ] Carpeta de Drive compartida con el email del Service Account con permisos de **Viewer**
- [ ] Private Key descargado en formato JSON

### 4. Variables de Entorno 🔑

Verifica que tengas todos estos valores listos:

**Google API:**
- [ ] `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- [ ] `GOOGLE_PRIVATE_KEY` (incluye `-----BEGIN PRIVATE KEY-----` y `-----END PRIVATE KEY-----`)
- [ ] `GOOGLE_SHEET_ID`
- [ ] `GOOGLE_DRIVE_FOLDER_ID`

**Información de Empresa (Públicas):**
- [ ] `NEXT_PUBLIC_COMPANY_NAME`
- [ ] `NEXT_PUBLIC_COMPANY_RUC`
- [ ] `NEXT_PUBLIC_COMPANY_ADDRESS`

**Email (Gmail SMTP - Recomendado):**
- [ ] `GMAIL_USER` (tu email de Gmail)
- [ ] `GMAIL_APP_PASSWORD` (App Password de 16 caracteres)
- [ ] Ver [CONFIGURAR-GMAIL.md](./CONFIGURAR-GMAIL.md) para obtener el App Password

**O Email alternativo (Resend):**
- [ ] `RESEND_API_KEY` (obtener en resend.com)

### 5. Código - Verificación Local 💻

- [ ] `npm install` ejecutado sin errores
- [ ] `npm run build` ejecutado exitosamente
- [ ] `.env.local` configurado localmente para pruebas
- [ ] App funciona localmente con `npm run dev`
- [ ] Probar crear cotización localmente
- [ ] Probar guardar cotización localmente
- [ ] Probar enviar email localmente (opcional)
- [ ] Probar ver historial localmente

### 6. Git - Control de Versiones 📦

- [ ] `.gitignore` incluye `.env.local`, `.env`, `node_modules/`, `.next/`
- [ ] `.env.local` NO está en el repositorio (verificar con `git status`)
- [ ] Todos los archivos importantes están commiteados
- [ ] No hay secretos o keys en el código

```bash
# Verificar que .env.local no esté trackeado
git status

# Si aparece .env.local, eliminarlo del tracking
git rm --cached .env.local
git commit -m "fix: remove .env.local from git"
```

---

## 🚀 Durante el Deployment

### Opción A: Deploy desde GitHub (Recomendado)

1. **Push del código:**
   ```bash
   git add .
   git commit -m "feat: sistema completo con cotizaciones y cuentas bancarias"
   git push origin main
   ```

2. **Importar en Vercel:**
   - Ve a https://vercel.com/new
   - Conecta tu cuenta de GitHub
   - Selecciona el repositorio
   - Vercel detecta Next.js automáticamente
   - NO hagas click en Deploy todavía

3. **Configurar Variables de Entorno:**
   - Antes de Deploy, click en "Environment Variables"
   - Agrega TODAS las variables una por una
   - **IMPORTANTE**: Para `GOOGLE_PRIVATE_KEY`:
     - Copia TODO el contenido incluyendo `-----BEGIN PRIVATE KEY-----`
     - Mantén los saltos de línea (usa `\n` o pega directamente)
     - NO olvides `-----END PRIVATE KEY-----`

4. **Deploy:**
   - Click en "Deploy"
   - Espera 2-3 minutos

### Opción B: Deploy desde CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Seguir las instrucciones
# Cuando pregunte por variables de entorno, di "no"
# Las configurarás en el dashboard
```

---

## ✅ Después del Deployment

### 1. Verificar Deployment Exitoso

- [ ] La URL de Vercel abre correctamente
- [ ] No hay errores 500 en la página principal
- [ ] El logo de EUROTEX aparece
- [ ] El formulario de cotización se muestra

### 2. Agregar Variables de Entorno (si no lo hiciste antes)

Si deployaste sin variables de entorno:

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega todas las variables listadas arriba
4. **IMPORTANTE**: Después de agregar variables, haz un redeploy:
   - Ve a Deployments
   - Click en los 3 puntos del último deployment
   - "Redeploy"

### 3. Pruebas Funcionales

**Prueba cada endpoint:**

```bash
# Reemplaza YOUR-APP con tu URL de Vercel

# 1. API de Clientes
curl https://YOUR-APP.vercel.app/api/clients

# 2. API de Productos
curl https://YOUR-APP.vercel.app/api/products

# 3. API de Destinatarios
curl https://YOUR-APP.vercel.app/api/recipients

# 4. API de Cuentas Bancarias
curl https://YOUR-APP.vercel.app/api/bank-accounts

# 5. API de Cotizaciones
curl https://YOUR-APP.vercel.app/api/quotes
```

**Pruebas en la interfaz:**

- [ ] **Cargar clientes**: El dropdown de clientes se llena
- [ ] **Cargar productos**: El catálogo de productos aparece
- [ ] **Seleccionar cliente**: Al seleccionar, los datos se llenan
- [ ] **Agregar productos**: Click en "Agregar" funciona
- [ ] **Ver cuentas bancarias**: En "Configuración de Envío" aparecen las cuentas
- [ ] **Guardar cotización**: Click en "💾 Guardar Cotización" funciona
- [ ] **Ver historial**: Click en "📋 Ver Historial" muestra cotizaciones guardadas
- [ ] **Generar PDF**: Click en "📄 Descargar PDF" descarga el PDF
- [ ] **Enviar email**: Click en "📧 Enviar por Correo" envía el email (verifica inbox)
- [ ] **Fichas técnicas**: El email incluye los PDFs adjuntos de Drive

### 4. Verificar en Google Sheets

- [ ] Abre tu Google Sheet
- [ ] Ve a la hoja "Cotizaciones"
- [ ] Verifica que la cotización guardada aparezca como nueva fila
- [ ] Verifica que los datos sean correctos

### 5. Verificar Email Recibido

- [ ] Email llegó al destinatario
- [ ] Subject es correcto
- [ ] Cuerpo del email se muestra bien
- [ ] PDF de cotización está adjunto
- [ ] Fichas técnicas de productos están adjuntas
- [ ] PDFs se abren correctamente

---

## 🐛 Troubleshooting

### Error: "Failed to load API"

**Causa**: Variables de entorno no configuradas

**Solución**:
1. Ve a Settings → Environment Variables en Vercel
2. Verifica que TODAS las variables estén agregadas
3. Haz un Redeploy

### Error: "Permission denied" en Google Sheets

**Causa**: Service Account no tiene permisos

**Solución**:
1. Abre tu Google Sheet
2. Click en "Share"
3. Agrega el email del Service Account
4. Dale permisos de **Editor**
5. Click en "Send"

### Las fichas técnicas no se adjuntan

**Causa**: PDFs no están en Drive o no hay permisos

**Solución**:
1. Verifica que los PDFs estén en la carpeta de Drive
2. Comparte la carpeta con el Service Account (permisos de Viewer)
3. Verifica que los nombres sean exactos: `M0739.pdf`, no `m0739.pdf`

### Error: "Invalid GOOGLE_PRIVATE_KEY"

**Causa**: La key no tiene el formato correcto

**Solución**:
1. Elimina la variable en Vercel
2. Vuelve a agregar asegurándote de incluir:
   ```
   -----BEGIN PRIVATE KEY-----
   [contenido de la key]
   -----END PRIVATE KEY-----
   ```
3. Mantén los saltos de línea (usa `\n` o pega todo junto)

### Los emails no se envían

**Causa**: Gmail App Password incorrecto o no configurado

**Solución**:
1. Verifica que `GMAIL_USER` sea tu email completo
2. Verifica que `GMAIL_APP_PASSWORD` tenga 16 caracteres sin espacios
3. Ver [CONFIGURAR-GMAIL.md](./CONFIGURAR-GMAIL.md) para regenerar el App Password
4. Asegúrate de tener 2-Step Verification activado en Google

### Ver logs de error en Vercel

1. Ve a tu proyecto en Vercel
2. Click en "Deployments"
3. Click en el último deployment
4. Click en "Functions"
5. Busca errores en los logs

---

## 📊 Métricas de Éxito

Tu deployment es exitoso cuando:

✅ Página carga en menos de 3 segundos
✅ Todos los endpoints API responden correctamente
✅ Puedes crear y guardar cotizaciones
✅ El historial muestra todas las cotizaciones
✅ Los PDFs se generan correctamente
✅ Los emails se envían con adjuntos
✅ Las cuentas bancarias se muestran en los PDFs

---

## 📚 Documentación de Referencia

- [DEPLOY-VERCEL.md](./DEPLOY-VERCEL.md) - Guía detallada de deployment
- [CONFIGURAR-GMAIL.md](./CONFIGURAR-GMAIL.md) - Configurar email con Gmail
- [CONFIGURAR-COTIZACIONES.md](./CONFIGURAR-COTIZACIONES.md) - Sistema de cotizaciones
- [CUENTAS-BANCARIAS-SETUP.md](./CUENTAS-BANCARIAS-SETUP.md) - Configurar cuentas bancarias
- [README.md](./README.md) - Documentación general del proyecto

---

## 🎉 ¡Deployment Completado!

Si todos los checkboxes están marcados, ¡felicidades! Tu aplicación está en producción.

**URL de tu app**: https://[tu-proyecto].vercel.app

**Próximos pasos:**
1. Comparte la URL con tu equipo
2. Configura un dominio personalizado (opcional)
3. Monitorea el uso y logs en Vercel Dashboard
4. Actualiza las fichas técnicas en Drive según necesites

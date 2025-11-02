# 📧 Configurar Gmail para Enviar Cotizaciones

## 🎯 ¿Por qué usar Gmail?

- ✅ **Familiar** - Los clientes confían más en emails de Gmail
- ✅ **Gratis** - Hasta 500 emails/día
- ✅ **Fácil configuración** - Solo 5 minutos
- ✅ **Profesional** - Puedes usar tu email de empresa si es Gmail/Google Workspace

---

## 📋 Paso 1: Crear/Usar cuenta de Gmail

### Opción A: Usar cuenta existente
Si ya tienes un email de Gmail para la empresa (ej: `ventas.eurotex@gmail.com`), úsalo.

### Opción B: Crear nueva cuenta
1. Ve a https://accounts.google.com/signup
2. Crea una cuenta como: `ventas.eurotex@gmail.com`
3. Completa el proceso de registro

---

## 🔐 Paso 2: Generar "Contraseña de Aplicación"

Google requiere una **contraseña especial** para aplicaciones (no tu contraseña normal).

### 2.1. Habilitar Verificación en 2 pasos

1. Ve a https://myaccount.google.com/security
2. Busca **"Verificación en dos pasos"**
3. Click en **"Empezar"**
4. Sigue los pasos (necesitarás tu teléfono)
5. **Importante:** Debe estar ACTIVADA

### 2.2. Crear Contraseña de Aplicación

1. Ve a https://myaccount.google.com/apppasswords
   - O: Cuenta de Google → Seguridad → Verificación en 2 pasos → Contraseñas de aplicaciones

2. En "Selecciona la app", elige **"Correo"**

3. En "Selecciona el dispositivo", elige **"Otro (nombre personalizado)"**
   - Escribe: `EUROTEX Cotizaciones`

4. Click **"Generar"**

5. Google te mostrará una contraseña de 16 caracteres como:
   ```
   abcd efgh ijkl mnop
   ```

6. **¡CÓPIALA!** (sin espacios): `abcdefghijklmnop`

---

## ⚙️ Paso 3: Configurar en tu Aplicación

### En Desarrollo Local (.env.local)

Edita el archivo `.env.local`:

```env
GMAIL_USER=ventas.eurotex@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
```

**⚠️ IMPORTANTE:**
- Reemplaza con TU email de Gmail
- Reemplaza con la contraseña de 16 caracteres (sin espacios)
- **NO uses tu contraseña normal de Gmail**

### En Vercel (Producción)

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega:
   - **Name:** `GMAIL_USER`
   - **Value:** `ventas.eurotex@gmail.com`
   - Click "Add"

4. Agrega:
   - **Name:** `GMAIL_APP_PASSWORD`
   - **Value:** `abcdefghijklmnop`
   - Click "Add"

5. Haz un **Redeploy** del proyecto

---

## ✅ Paso 4: Probar

### En Local:

1. Reinicia el servidor:
   ```bash
   # Detén el servidor (Ctrl+C)
   npm run dev
   ```

2. Abre http://localhost:3000

3. Crea una cotización de prueba

4. **Envía a tu propio email** para probar

5. Verifica:
   - ✅ Email llega a la bandeja de entrada
   - ✅ Se adjunta el PDF de la cotización
   - ✅ Se adjuntan las hojas técnicas (si existen en Drive)
   - ✅ El email viene desde tu cuenta de Gmail

---

## 🎨 Características del Email

El email que se envía incluye:

### Header Profesional
- Logo de EUROTEX LUBS
- Diseño con colores corporativos

### Cuerpo Personalizable
- El texto que edites en la interfaz
- Formato HTML automático

### Footer con Información
- Nombre de la empresa
- Dirección
- Email de contacto
- Datos bancarios (Cuenta y CCI)

### Adjuntos Automáticos
- PDF de la cotización
- Hojas técnicas de los productos cotizados

---

## 🐛 Solución de Problemas

### Error: "Gmail credentials not configured"
- ✅ Verifica que `GMAIL_USER` y `GMAIL_APP_PASSWORD` estén en `.env.local`
- ✅ Reinicia el servidor después de agregar las variables

### Error: "Invalid login"
- ❌ Estás usando tu contraseña normal (no funciona)
- ✅ Debes usar la **Contraseña de Aplicación** de 16 caracteres
- ✅ Verifica que la Verificación en 2 pasos esté activa

### Error: "Less secure app access"
- ✅ **NO habilites** "Acceso de apps menos seguras"
- ✅ Usa **Contraseñas de Aplicación** (más seguro)

### Email cae en SPAM
- ✅ Pide al cliente que marque como "No es spam"
- ✅ Agrega tu email a sus contactos
- ✅ Considera usar un dominio propio (ej: @eurotexlubs.com)

### Límite de 500 emails/día
- Si necesitas más, considera:
  - Gmail Workspace (Google Workspace)
  - Servicio de email transaccional (SendGrid, Mailgun, etc.)

---

## 📊 Límites de Gmail

| Plan | Emails/Día | Destinatarios/Email |
|------|------------|---------------------|
| Gmail Gratis | 500 | 100 |
| Google Workspace | 2,000 | 500 |

---

## 🔄 Alternativa: Usar Resend

Si prefieres NO usar Gmail, puedes usar Resend:

1. Crea cuenta en https://resend.com
2. Verifica tu dominio
3. Obtén API Key
4. Cambia en el código:
   - `'/api/send-gmail'` → `'/api/send'`
   - Configura `RESEND_API_KEY` en lugar de Gmail

---

## ✨ Ventajas de Gmail vs Resend

### Gmail SMTP
- ✅ Gratis
- ✅ Configuración simple
- ✅ Familiar para clientes
- ❌ Límite de 500/día
- ❌ Puede ir a spam si no se configura bien

### Resend
- ✅ Mejor deliverability
- ✅ Dominio personalizado (@tuempresa.com)
- ✅ Analytics de emails
- ❌ Requiere configurar DNS
- ❌ Gratis solo 100 emails/mes

---

## 📝 Resumen Rápido

1. ✅ Activa Verificación en 2 pasos en Gmail
2. ✅ Genera Contraseña de Aplicación
3. ✅ Agrega `GMAIL_USER` y `GMAIL_APP_PASSWORD` a `.env.local`
4. ✅ Reinicia el servidor
5. ✅ Prueba enviando una cotización

**¡Listo! Los emails se enviarán desde tu cuenta de Gmail** 📧

---

## 🆘 ¿Necesitas Ayuda?

Si tienes problemas:
1. Verifica que la Verificación en 2 pasos esté activa
2. Usa una Contraseña de Aplicación (NO tu contraseña normal)
3. Revisa los logs en la terminal para ver errores específicos
4. Prueba con un email diferente para descartar problemas de configuración

---

**Configurado para: EUROTEX LUBS**

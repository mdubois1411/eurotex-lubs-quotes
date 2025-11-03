# 🚀 Desplegar a Vercel AHORA

## ⚡ Deployment Rápido (5 minutos)

### Paso 1: Commit de cambios (30 segundos)

```bash
git add .
git commit -m "feat: sistema completo con cotizaciones, cuentas bancarias e historial"
git push origin main
```

### Paso 2: Ir a Vercel (1 minuto)

1. Ve a https://vercel.com/new
2. Login con tu cuenta (GitHub, GitLab, o Bitbucket)
3. Click en "Import Git Repository"
4. Selecciona este repositorio: **eurotex-lubs-quotes**

### Paso 3: Configurar Variables de Entorno (3 minutos)

**ANTES de hacer click en Deploy**, agrega estas variables:

#### Variables de Google (REQUERIDAS) ⚠️

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=tu-cuenta@tu-proyecto.iam.gserviceaccount.com
GOOGLE_SHEET_ID=tu-sheet-id-aqui
GOOGLE_DRIVE_FOLDER_ID=tu-folder-id-aqui
```

**GOOGLE_PRIVATE_KEY** (pegar TODO esto, incluye BEGIN y END):
```
-----BEGIN PRIVATE KEY-----
[tu private key de muchas líneas aquí]
-----END PRIVATE KEY-----
```

#### Variables de Empresa (Opcionales - pero recomendadas)

```env
NEXT_PUBLIC_COMPANY_NAME=EUROTEX INDUSTRIAL SAC – DIV. EUROTEX LUBS
NEXT_PUBLIC_COMPANY_RUC=20611105909
NEXT_PUBLIC_COMPANY_ADDRESS=Jr. Hawaii 226 – La Molina – Lima – Perú
```

#### Variables de Email (Elige UNA opción)

**Opción A: Gmail (Recomendado)**
```env
GMAIL_USER=tu-email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
```
📖 Ver [CONFIGURAR-GMAIL.md](./CONFIGURAR-GMAIL.md) para obtener el App Password

**Opción B: Resend**
```env
RESEND_API_KEY=re_xxxxxxxxxxxx
```
📖 Obtener en https://resend.com

### Paso 4: Deploy! (1 minuto)

1. Click en **"Deploy"**
2. Espera 2-3 minutos
3. ✅ ¡Listo!

---

## ✅ Verificación Rápida

Después del deploy, abre tu URL de Vercel y verifica:

- [ ] ✅ Página carga sin errores
- [ ] ✅ Se ven productos en el catálogo
- [ ] ✅ Puedes crear una cotización
- [ ] ✅ Puedes guardar una cotización
- [ ] ✅ Puedes ver el historial

---

## 🆘 Si algo falla

### "No puedo ver los productos"

**Causa**: Variables de Google no configuradas

**Fix rápido**:
1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega las variables de Google
4. Deployments → Redeploy

### "Error al guardar cotización"

**Causa**: Service Account no tiene permisos de Editor

**Fix rápido**:
1. Abre tu Google Sheet
2. Click en "Share"
3. Agrega el email de `GOOGLE_SERVICE_ACCOUNT_EMAIL`
4. Dale permisos de **Editor** (no Viewer)

### "No se envían emails"

**Causa**: Variables de email no configuradas

**Fix rápido**:
1. Agrega `GMAIL_USER` y `GMAIL_APP_PASSWORD`
2. O agrega `RESEND_API_KEY`
3. Redeploy

---

## 📋 Checklist Completo

¿Quieres hacer una verificación más exhaustiva? Ver:
- [DEPLOYMENT-CHECKLIST.md](./DEPLOYMENT-CHECKLIST.md) - Checklist detallado

---

## 🎉 ¡Felicidades!

Tu app está en producción en: `https://tu-proyecto.vercel.app`

### Próximos pasos opcionales:

1. **Dominio personalizado**: Settings → Domains en Vercel
2. **Subir fichas técnicas**: Sube los PDFs de `temp-datasheets/` a Google Drive
3. **Configurar hojas de Google Sheets**:
   - Hoja "Cotizaciones"
   - Hoja "CuentasBancarias"

   Ver: [CONFIGURAR-COTIZACIONES.md](./CONFIGURAR-COTIZACIONES.md)

---

## 📞 Soporte

¿Problemas? Revisa:
1. [DEPLOYMENT-CHECKLIST.md](./DEPLOYMENT-CHECKLIST.md) - Troubleshooting detallado
2. [DEPLOY-VERCEL.md](./DEPLOY-VERCEL.md) - Guía completa
3. Logs en Vercel → Deployments → [último deploy] → Functions

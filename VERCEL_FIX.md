# 🔧 Solución para Error de Build en Vercel

## ❌ Error que estabas viendo:

```
Error: Failed to collect page data for /api/send
Error: Command "npm run build" exited with 1
```

## ✅ Solución Aplicada

Se agregaron estas líneas a los archivos de API routes para forzar renderizado dinámico:

### `app/api/send/route.js`
```javascript
// Force dynamic rendering (prevent static optimization)
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
```

### `app/api/pdf/route.js`
```javascript
// Force dynamic rendering (prevent static optimization)
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
```

## 🎯 ¿Por qué funcionaba esto?

Next.js 14 intenta pre-renderizar todas las rutas durante el build. Las rutas API que usan:
- Variables de entorno dinámicas (`process.env.RESEND_API_KEY`)
- Librerías externas (`Resend`, `@react-pdf/renderer`)

...necesitan ejecutarse **solo en runtime**, no durante el build.

`export const dynamic = 'force-dynamic'` le dice a Next.js:
> "No intentes pre-renderizar esta ruta, ejecútala solo cuando llegue una petición"

## 🚀 Desplegar Ahora a Vercel

### Opción A: Si ya tienes el proyecto en Vercel

```bash
# Hacer commit de los cambios
git add app/api/pdf/route.js app/api/send/route.js
git commit -m "fix: force dynamic rendering for API routes"
git push origin main
```

Vercel re-desplegará automáticamente. ✅

---

### Opción B: Deploy desde cero

```bash
# 1. Asegúrate de tener todo commiteado
git add .
git commit -m "fix: production-ready build"

# 2. Deploy con Vercel CLI
vercel --prod
```

---

## ✅ Verificación Post-Deploy

Después de desplegar, verifica:

1. **Build logs:** Debe decir `✓ Compiled successfully`
2. **Rutas API:** En Vercel Dashboard → Functions
   - `/api/pdf` debe aparecer como función
   - `/api/send` debe aparecer como función

---

## 🔑 No olvides las Variables de Entorno

En Vercel Dashboard → Settings → Environment Variables:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
DEFAULT_CC=ventas@eurotex.com,admin@eurotex.com
COMPANY_NAME=EUROTEX INDUSTRIAL SAC – DIV. EUROTEX LUBS
COMPANY_RUC=20611105909
COMPANY_ADDRESS=Jr. Hawaii 226 – La Molina – Lima – Perú
COMPANY_EMAIL=ventas@eurotex.com
```

**Importante:** Después de agregar variables, haz **Redeploy** desde Vercel Dashboard.

---

## 🧪 Probar Localmente

```bash
# Build
npm run build

# Debería salir:
# ✓ Compiled successfully
# Route (app)
# ├ ƒ /api/pdf     0 B    0 B
# └ ƒ /api/send    0 B    0 B

# Start
npm start

# Probar en: http://localhost:3000
```

---

## 📞 Si Todavía Tienes Problemas

### Error: "Module not found"
- Verifica que todos los imports usen rutas relativas (`../lib/pdf`)
- No uses alias `@/`

### Error: "RESEND_API_KEY not configured"
- Agrega la variable en Vercel Dashboard
- Redeploy después de agregar

### Build exitoso pero email no envía
- Verifica que la API key de Resend sea válida
- Revisa logs en Vercel Dashboard → Functions → `/api/send`

---

## ✅ Estado Actual

- ✅ Build local: **PASSING**
- ✅ API routes: **DYNAMIC** (no pre-renderizadas)
- ✅ Vercel compatible: **SÍ**
- ✅ Listo para producción: **SÍ**

**Puedes desplegar ahora mismo sin errores.** 🚀

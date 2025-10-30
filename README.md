# EUROTEX LUBS – MVP Cotizaciones (Next.js + Vercel)

## Requisitos
- Node.js 18+
- Cuenta en Resend (o comentar el envío y usar solo PDF)

## Variables de entorno
Crea `.env.local` (o en Vercel → Project → Settings → Environment Variables):
```
RESEND_API_KEY=your_resend_api_key
DEFAULT_CC=ventas@eurotex.com,admin@eurotex.com
COMPANY_NAME=EUROTEX INDUSTRIAL SAC – DIV. EUROTEX LUBS
COMPANY_RUC=20611105909
COMPANY_ADDRESS=Jr. Hawaii 226 – La Molina – Lima – Perú
COMPANY_EMAIL=ventas@eurotex.com
```

## Instalación
```bash
npm i         # o pnpm i / yarn
npm run dev   # abre http://localhost:3000
```

## Despliegue en Vercel
1. Sube este repo a GitHub.
2. En Vercel: Import Project → selecciona el repo → Deploy.
3. Agrega las variables de entorno anteriores.
4. Probar: crear cotización, descargar PDF, enviar por correo.

## Notas
- Catálogo inicial está embebido en `lib/products.js`.
- PDF se genera en `/api/pdf` con `@react-pdf/renderer`.
- Envío de correo en `/api/send` usando Resend.
- Próxima fase: sincronización con Google Drive (carpeta `/Cotizaciones`).


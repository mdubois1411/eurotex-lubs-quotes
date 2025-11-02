# 🚀 Guía de Deployment a Vercel

## 📋 Pasos previos

### 1. Subir hojas técnicas a Google Drive

Los PDFs generados están en `C:\eurotex-lubs-quotes\temp-datasheets\`

**Sube estos 7 archivos a tu carpeta de Google Drive:**
- M0739.pdf
- M0752.pdf
- M0777.pdf
- M0796.pdf
- M0832.pdf
- M0879.pdf
- M0949.pdf

🔗 **Carpeta Drive:** https://drive.google.com/drive/folders/12tj_AkRg8lfujIFe_9OS88YdfsOnpIng

---

## ⚙️ Configurar Variables de Entorno en Vercel

Ve a tu proyecto en Vercel → **Settings** → **Environment Variables**

Agrega las siguientes variables:

### Google API Configuration
```
GOOGLE_SERVICE_ACCOUNT_EMAIL=eurotex-app-service@eurotex-lubs-system.iam.gserviceaccount.com

GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCrCEaGQU/Hp45x
l4qOBTTj67E60MKCT2oLGuF7P/JXEUNxnOZ2wXqYawjWUzt01QNXHswSgsq/uYSe
OkPtn3kicyk+cLF990KKGFQACBS6U405puhMbO2PJ/dr9+/1nbjxQ8xGK74z1B30
q6A1tEZDAYMQghW+so65eqPCgi5ZMF5Qb3FCg69DDRzdIF2Eg9HNKg/tzwIltHJm
KwY0Z6t1lxK+D0IYXZ0jRCNTuH/uH/Q1nQk/pwE45RDvUMjlSvfrA+IC87ZsenZj
1iOewk2d3VBv8QaNIuRGOdEY2Ijz6/+BF5zpvems0FHavBYr+7AuAVGC1HruvviM
wpPwHETFAgMBAAECggEAF4VWVD1O0El3RKDkwZ5EBU+TD+Bzd4HzYUlA7CHBsqlM
SfzGvFs5qxTBN4m6b1lMvHee9LFpr6SURpcDDilJz+vgJqxPLzXIv/6+LUOZ53v5
ETjRJpLZDWsffYjbRmnP7CzOPseM60ocaoW1zTJDHWZA/41cRIhVf3rhuCy4sglu
mPmjeYEKoCBEweaLU5mvi8OnjQjZJ6MKdqbqZkme7NnCyXKycI8ZwYi7ReZTQTiJ
c2HyCwruq+6Sn1Bltr3vsWFzqQQXFy9lYtOP5KakioJYBfNatW1lXj/Xvi89GYfr
/rOIg93aZtV24oZQKSl0jteUH1cI6f3GatKLaGOpKwKBgQDi6LQWqHIVujzXn0/g
1W+QV5X2PtD6r1l3jL81m9Y8xh5ERa79DJXFBBeXedS29xmQ06p1OPzJ6Prny36W
sPBib0kUWxlen8iawHVQ4T+Lwfp+9QtE+wpKebFgqraKpdpfLKx4/MYkI1Hwow2U
T/r0tujRVdTXRpTu2Z6DfaM8IwKBgQDA9aoUvQAanboChAtG2X7N4Cdk65Sto9fu
QsjGVOZdE2foMYq0ItMWhXsKlMB12B9l0ql/Ot4IcKcbXzj+cZ8iSqX3x5ZSbGV0
PdSzSBZ9fH/WzpHLVp/utCRmlS3kK5+sdaBsulFiGCRe9HjpyQ8R7YbcSFjc8THh
RgEp2M419wKBgQCHT28857wIeuOXTVhL4dtCfwhdLH5gTzqR0OuhI0nxOc+ItOkx
21RghR0wZiVT6ixjseU/O/l6yiT9HtthLyhZ+rTgn6aUR8JPjh8nWPsU81rWZHgQ
7YbofIMq+wIZ0edTxAchqtLZb/qH/iO14q/rSDuzwXRH374mZL1i+gPicwKBgQCz
0PtzogGDzDJ4f7bGio6JqnbrrEH8YrAqH+BcOugGGrx8/BYG8mEGHtPfs2l7KDFy
QROlNiWNdfW0I1PIgffLDAeIVV13Z/5PigM6I1aaEDhN5GinNg2KdCNr2V9Pv3to
SqF6UVLf+CGEv4wiSTSa/1/qzhzJoJdcGFGjPqBEVwKBgQCM8+GrXXPic+HrvSaI
4pxv+3qGq2taBw1Jw0LLnpaukEQ8wLkXrBYZNGO+9OxosszYLBmzzrB6FX7QNaTp
cjK63PAslt4IoweTvT538jmjp/kh859X9Vim2MlvPsyanhJnknvuVrhpbFByCBME
Y+/wtxf/odVwXTDJhxlCYsTmzg==
-----END PRIVATE KEY-----

GOOGLE_SHEET_ID=1mVX5zx6kcyLM6Q5g0EjyACrtdhKlCHMWULtDNM-nPgo

GOOGLE_DRIVE_FOLDER_ID=12tj_AkRg8lfujIFe_9OS88YdfsOnpIng
```

### Company Information (Public)
```
NEXT_PUBLIC_COMPANY_NAME=EUROTEX INDUSTRIAL SAC – DIV. EUROTEX LUBS
NEXT_PUBLIC_COMPANY_RUC=20611105909
NEXT_PUBLIC_COMPANY_ADDRESS=Jr. Hawaii 226 – La Molina – Lima – Perú
NEXT_PUBLIC_BANK_ACCOUNT=Cuenta Corriente BCP: 194-2345678-0-90
NEXT_PUBLIC_CCI=002-194-002345678090-15
```

### Resend API (para envío de emails)
```
RESEND_API_KEY=tu_api_key_de_resend
```

**⚠️ IMPORTANTE:**
- Para obtener tu RESEND_API_KEY, crea una cuenta en [resend.com](https://resend.com)
- En Vercel, cada variable debe agregarse una por una
- Para `GOOGLE_PRIVATE_KEY`, asegúrate de pegar todo el contenido incluyendo las líneas `-----BEGIN PRIVATE KEY-----` y `-----END PRIVATE KEY-----`

---

## 🌐 Deploy a Vercel

### Opción A: Desde GitHub (Recomendado)

1. **Sube tu código a GitHub:**
   ```bash
   git add .
   git commit -m "feat: sistema completo de cotizaciones con Google Sheets"
   git push origin main
   ```

2. **En Vercel:**
   - Ve a https://vercel.com/new
   - Importa tu repositorio de GitHub
   - Vercel detectará automáticamente que es un proyecto Next.js
   - Click en **"Deploy"**

### Opción B: Desde CLI

```bash
npm install -g vercel
vercel login
vercel
```

---

## ✅ Verificación Post-Deploy

Después del deploy, verifica que todo funcione:

1. ✅ **Página principal** se carga correctamente
2. ✅ **API de clientes** funciona: `https://tu-app.vercel.app/api/clients`
3. ✅ **API de productos** funciona: `https://tu-app.vercel.app/api/products`
4. ✅ **API de destinatarios** funciona: `https://tu-app.vercel.app/api/recipients`
5. ✅ **Generación de PDF** funciona
6. ✅ **Envío de email con adjuntos** funciona (requiere configurar Resend)

---

## 🐛 Troubleshooting

### Error: "GOOGLE_SERVICE_ACCOUNT_EMAIL not configured"
- Verifica que todas las variables de entorno estén configuradas en Vercel
- Haz un redeploy después de agregar las variables

### Error: "Cannot find module 'googleapis'"
- Las dependencias se instalan automáticamente, pero si hay error:
  ```bash
  npm install
  git add package-lock.json
  git commit -m "fix: update dependencies"
  git push
  ```

### Hojas técnicas no se adjuntan
- Verifica que los PDFs estén subidos a Google Drive
- Verifica que la carpeta esté compartida con el service account
- Revisa los logs en Vercel → tu proyecto → Deployments → [último deploy] → Functions

---

## 📚 Recursos

- [Documentación de Vercel](https://vercel.com/docs)
- [Google Sheets API](https://docs.google.com/spreadsheets/d/1mVX5zx6kcyLM6Q5g0EjyACrtdhKlCHMWULtDNM-nPgo/edit)
- [Carpeta Google Drive](https://drive.google.com/drive/folders/12tj_AkRg8lfujIFe_9OS88YdfsOnpIng)
- [Resend Docs](https://resend.com/docs)

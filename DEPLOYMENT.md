# 🚀 Deployment Guide - EUROTEX LUBS Quotation System

Complete guide for deploying the Eurotex Lubs quotation management system to Vercel.

---

## 📋 Prerequisites

1. **Node.js 18+** installed locally
2. **Vercel Account** (free tier works)
3. **Resend API Key** - Get one at [resend.com](https://resend.com)
4. **Logo file** - Place `logo-eurotex.png` in `/public/` folder

---

## 🔧 Local Development Setup

### 1. Clone & Install

```bash
cd eurotex-lubs-quotes
npm install
```

### 2. Environment Variables

Create `.env.local` from the template:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your **Resend API key**:

```env
RESEND_API_KEY=re_your_actual_api_key_here
DEFAULT_CC=ventas@eurotex.com,admin@eurotex.com
COMPANY_NAME=EUROTEX INDUSTRIAL SAC – DIV. EUROTEX LUBS
COMPANY_RUC=20611105909
COMPANY_ADDRESS=Jr. Hawaii 226 – La Molina – Lima – Perú
COMPANY_EMAIL=ventas@eurotex.com
```

### 3. Add Company Logo

Place your company logo at:
```
/public/logo-eurotex.png
```

**Requirements:**
- Format: PNG (transparent background recommended)
- Recommended size: 600x200px
- Max file size: 500KB

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Test Build Locally

```bash
npm run build
npm start
```

---

## ☁️ Vercel Deployment

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

Follow prompts:
- **Set up and deploy?** Yes
- **Which scope?** Select your account
- **Link to existing project?** No
- **Project name?** eurotex-lubs-quotes
- **Directory?** ./
- **Override settings?** No

4. **Add Environment Variables**
```bash
vercel env add RESEND_API_KEY
```

Paste your API key when prompted. Repeat for other variables:
```bash
vercel env add DEFAULT_CC
vercel env add COMPANY_NAME
vercel env add COMPANY_RUC
vercel env add COMPANY_ADDRESS
vercel env add COMPANY_EMAIL
```

5. **Deploy to Production**
```bash
vercel --prod
```

---

### Option 2: Deploy via Vercel Dashboard

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit: EUROTEX LUBS quotation system"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/eurotex-lubs-quotes.git
git push -u origin main
```

2. **Import on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your GitHub repo
   - Click "Import"

3. **Configure Project**
   - **Framework Preset:** Next.js
   - **Root Directory:** ./
   - **Build Command:** `next build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)

4. **Add Environment Variables**

Go to **Settings → Environment Variables** and add:

| Key | Value | Environment |
|-----|-------|-------------|
| `RESEND_API_KEY` | `re_xxxxx` | Production |
| `DEFAULT_CC` | `ventas@eurotex.com,admin@eurotex.com` | Production |
| `COMPANY_NAME` | `EUROTEX INDUSTRIAL SAC – DIV. EUROTEX LUBS` | Production |
| `COMPANY_RUC` | `20611105909` | Production |
| `COMPANY_ADDRESS` | `Jr. Hawaii 226 – La Molina – Lima – Perú` | Production |
| `COMPANY_EMAIL` | `ventas@eurotex.com` | Production |

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~2 minutes)
   - Visit your production URL

---

## 🔐 Resend API Setup

### 1. Create Resend Account
- Go to [resend.com](https://resend.com)
- Sign up for free (100 emails/day)

### 2. Generate API Key
- Dashboard → API Keys
- Click "Create API Key"
- Name: `eurotex-lubs-production`
- Permission: **Sending access**
- Copy the key (starts with `re_`)

### 3. Verify Domain (Optional but Recommended)

**Free tier limitation:** Emails sent from `onboarding@resend.dev` to verified recipients only.

**To send to any email:**
1. Add your domain in Resend Dashboard
2. Add DNS records (MX, TXT, CNAME)
3. Update `/app/api/send/route.js`:
```javascript
from: `${companyName} <noreply@eurotex.com>`
```

---

## 📁 Project Structure

```
eurotex-lubs-quotes/
├── app/
│   ├── layout.js              # Root layout (HTML wrapper)
│   ├── page.js                # Home page (renders QuoteBuilder)
│   └── api/
│       ├── pdf/
│       │   └── route.js       # PDF generation endpoint
│       └── send/
│           └── route.js       # Email sending endpoint (Resend)
├── components/
│   └── QuoteBuilder.js        # Main quote builder UI (client component)
├── lib/
│   ├── products.js            # Product catalog (static data)
│   └── pdf.js                 # PDF template (@react-pdf/renderer)
├── public/
│   └── logo-eurotex.png       # Company logo (REQUIRED)
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
├── next.config.js             # Next.js configuration
├── jsconfig.json              # JavaScript path aliases
├── package.json               # Dependencies
└── DEPLOYMENT.md              # This file
```

---

## ✅ Post-Deployment Checklist

- [ ] Logo displays correctly in PDF
- [ ] PDF downloads successfully
- [ ] Email sends successfully (check spam folder)
- [ ] Test on mobile device
- [ ] Verify all environment variables are set
- [ ] Check Vercel function logs for errors

---

## 🔄 Updating Products

Edit [lib/products.js](lib/products.js):

```javascript
export const PRODUCTS = [
  {
    code: "M0739",
    description: "MOLYguard SED LUBE",
    presentation: "400 ml",
    unit_price: 42.00,
    currency: "USD"
  },
  // Add more products...
];
```

Push changes:
```bash
git add lib/products.js
git commit -m "Update product catalog"
git push origin main
```

Vercel auto-deploys on push to `main` branch.

---

## 🐛 Troubleshooting

### PDF Generation Fails

**Error:** "Failed to generate PDF"

**Solution:**
- Ensure `logo-eurotex.png` exists in `/public/`
- Check logo file size (< 500KB)
- Verify logo path in `lib/pdf.js` is `/logo-eurotex.png`

---

### Email Not Sending

**Error:** "RESEND_API_KEY not configured"

**Solution:**
- Verify environment variable is set in Vercel Dashboard
- Redeploy after adding env vars: `vercel --prod`

**Error:** "Invalid recipient email"

**Solution:**
- On free tier, verify recipient email in Resend Dashboard
- Or upgrade to paid plan / verify custom domain

---

### Build Fails on Vercel

**Error:** "Module not found: Can't resolve '@/...'"

**Solution:**
- All imports use **relative paths** (not `@/` aliases)
- Verify all imports start with `../` or `./`

**Error:** "serverActions is not a supported option"

**Solution:**
- Remove `experimental.serverActions` from `next.config.js`
- Next.js 14 doesn't need this flag

---

### Mobile Layout Issues

**Problem:** UI not responsive on phone

**Solution:**
- QuoteBuilder uses CSS Grid with `auto-fill` and `minmax(280px, 1fr)`
- Add viewport meta tag in `app/layout.js` (already included)
- Test with Chrome DevTools mobile emulator

---

## 🔮 Future Enhancements

### Phase 2: Google Drive Sync

**Goal:** Auto-sync product catalog from Excel file

1. **Setup Service Account** (Google Cloud Console)
2. **Install googleapis:**
   ```bash
   npm install googleapis
   ```
3. **Create `/lib/google-drive.js`:**
   ```javascript
   import { google } from 'googleapis';

   export async function syncProducts() {
     // Read from /Cotizaciones/Datos/Tabla de datos lubricantes.xlsx
   }
   ```
4. **Schedule sync:** Use Vercel Cron Jobs

### Phase 3: Product Datasheets

**Goal:** Attach technical PDFs from Google Drive

- Read from `/Cotizaciones/pdf/`
- Match by product code (e.g., `M0739.pdf`)
- Attach to email alongside quotation

---

## 📞 Support

For issues or questions:
- Email: desarrollo@eurotex.com
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)

---

## 📄 License

Internal use only - EUROTEX INDUSTRIAL SAC

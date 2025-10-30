# 💼 EUROTEX LUBS - Quotation Management System

Production-ready MVP for generating and sending lubricant product quotations. Built for sales teams to create instant quotes from mobile devices or tablets while visiting customers.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)](https://vercel.com)
[![License](https://img.shields.io/badge/License-Internal-red)]()

---

## ✨ Features

- 📱 **Mobile-First UI** - Optimized for tablets and phones
- 📄 **PDF Generation** - Professional quotations with company branding
- 📧 **Email Integration** - Send quotes instantly via Resend API
- 🔍 **Product Search** - Fast filtering by code or description
- 💰 **Auto-Calculations** - Subtotal, IGV (18%), and total in USD
- 🎨 **Professional Design** - Clean, modern interface
- ⚡ **Serverless** - Fully compatible with Vercel's edge runtime
- 🔒 **Production-Ready** - Error handling, validation, loading states

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
RESEND_API_KEY=re_your_api_key_here
DEFAULT_CC=ventas@eurotex.com,admin@eurotex.com
```

### 3. Add Logo

Place your company logo at:
```
/public/logo-eurotex.png
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📦 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with App Router |
| **React 18** | UI library with hooks |
| **@react-pdf/renderer** | PDF generation |
| **Resend** | Transactional email API |
| **Vercel** | Serverless deployment platform |

---

## 📁 Project Structure

```
eurotex-lubs-quotes/
├── app/
│   ├── layout.js              # Root layout with metadata
│   ├── page.js                # Home page (QuoteBuilder)
│   └── api/
│       ├── pdf/route.js       # PDF generation endpoint
│       └── send/route.js      # Email sending endpoint
├── components/
│   └── QuoteBuilder.js        # Main quotation UI
├── lib/
│   ├── products.js            # Product catalog (static)
│   └── pdf.js                 # PDF template component
├── public/
│   └── logo-eurotex.png       # Company logo
├── .env.example               # Environment template
├── DEPLOYMENT.md              # Deployment guide
└── README.md                  # This file
```

---

## 🎯 Usage

### Creating a Quote

1. **Enter Client Information**
   - Company name
   - Contact person
   - Email address
   - Delivery address

2. **Select Products**
   - Search by code or description
   - Click product cards to add to quote
   - Adjust quantities in the items table

3. **Generate & Send**
   - **Download PDF**: Get quotation as PDF file
   - **Send Email**: Email quote directly to client (with CC to sales team)

---

## 🔧 Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | ✅ Yes | Resend API key for emails |
| `DEFAULT_CC` | No | Default CC recipients (comma-separated) |
| `COMPANY_NAME` | No | Company legal name |
| `COMPANY_RUC` | No | Tax ID (RUC) |
| `COMPANY_ADDRESS` | No | Company address |
| `COMPANY_EMAIL` | No | Contact email |

### Product Catalog

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

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Add environment variables in Vercel Dashboard:**
- Settings → Environment Variables
- Add `RESEND_API_KEY` and other vars
- Redeploy for changes to take effect

📖 **Full deployment guide:** [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 📧 Email Setup

### Resend API

1. Create account at [resend.com](https://resend.com)
2. Generate API key (Dashboard → API Keys)
3. Add to `.env.local`:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxxxx
   ```

**Free tier limits:**
- 100 emails/day
- Emails only to verified recipients
- Sent from `onboarding@resend.dev`

**Production setup:**
- Verify your domain (eurotex.com)
- Update `from` address in [app/api/send/route.js](app/api/send/route.js:46)
- Send unlimited emails to any recipient

---

## 🧪 Testing

### Local Testing

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

### Test Checklist

- [ ] PDF downloads correctly
- [ ] PDF displays logo and company info
- [ ] Email sends successfully
- [ ] Email includes PDF attachment
- [ ] CC recipients receive copy
- [ ] Mobile UI is responsive
- [ ] Product search works
- [ ] Calculations are accurate (IGV 18%)

---

## 🐛 Common Issues

### Build Errors

**"Module not found"**
- ✅ All imports use relative paths (`../lib/pdf`)
- ❌ No `@/` aliases (Vercel compatibility)

**"experimental.serverActions not supported"**
- ✅ Removed from `next.config.js` (not needed in Next.js 14)

### Email Issues

**"RESEND_API_KEY not configured"**
- Add environment variable in Vercel Dashboard
- Redeploy after adding

**"Email not received"**
- Check spam folder
- Verify recipient email in Resend Dashboard (free tier)
- Upgrade plan or verify custom domain

### PDF Issues

**"Logo not displaying"**
- Ensure file exists at `/public/logo-eurotex.png`
- Check file size (< 500KB)
- Use PNG format

---

## 🔮 Roadmap

### Phase 2: Google Drive Integration
- [x] Static product catalog
- [ ] Auto-sync from Excel (`/Cotizaciones/Datos/Tabla de datos lubricantes.xlsx`)
- [ ] Attach product datasheets from `/Cotizaciones/pdf/`

### Phase 3: Advanced Features
- [ ] Quote history and tracking
- [ ] Client database
- [ ] Multi-currency support (USD, PEN)
- [ ] Custom tax rates per region
- [ ] Quote versioning and revisions
- [ ] Analytics dashboard

---

## 🤝 Contributing

This is an internal project for EUROTEX INDUSTRIAL SAC. For updates or issues:

1. Create a branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add feature'`
3. Push: `git push origin feature/your-feature`
4. Open Pull Request

---

## 📄 License

**Internal Use Only** - EUROTEX INDUSTRIAL SAC – DIV. EUROTEX LUBS

© 2025 EUROTEX INDUSTRIAL SAC. All rights reserved.

---

## 📞 Support

- **Technical Issues:** desarrollo@eurotex.com
- **Sales Questions:** ventas@eurotex.com
- **Documentation:** [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 🙏 Credits

Built with:
- [Next.js](https://nextjs.org/) - The React Framework
- [React PDF](https://react-pdf.org/) - PDF Generation
- [Resend](https://resend.com/) - Email API
- [Vercel](https://vercel.com/) - Deployment Platform

---

**Made with ❤️ for EUROTEX LUBS sales team**

export const metadata = { title: 'EUROTEX LUBS – Cotizaciones' };

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body style={{ minHeight: '100vh', background: '#fafafa', color: '#111', fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial' }}>
        {children}
      </body>
    </html>
  );
}

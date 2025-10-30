'use client';
import { useMemo, useState } from 'react';
import { PRODUCTS } from '../lib/products';

const styles = {
  container: { maxWidth: 960, margin: '0 auto', padding: 16 },
  h1: { fontSize: 20, fontWeight: 600 },
  section: { marginTop: 16 },
  label: { display: 'block', fontSize: 13, marginBottom: 4, color: '#333' },
  input: { border: '1px solid #ccc', borderRadius: 6, padding: '8px 10px', width: '100%', boxSizing: 'border-box', marginBottom: 8 },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  button: { padding: '10px 12px', borderRadius: 8, background: '#111', color: '#fff', border: 'none', cursor: 'pointer' },
  buttonGhost: { padding: '10px 12px', borderRadius: 8, background: '#fff', color: '#111', border: '1px solid #ccc', cursor: 'pointer' },
  productCard: { textAlign: 'left', background: '#fff', border: '1px solid #ddd', borderRadius: 8, padding: 10, cursor: 'pointer' },
  small: { fontSize: 12, color: '#666' },
  table: { width: '100%', fontSize: 13, borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: 8, background: '#eee', borderBottom: '1px solid #ddd' },
  td: { padding: 8, borderBottom: '1px solid #eee' },
  right: { textAlign: 'right' }
};

export default function QuoteBuilder() {
  const [client, setClient] = useState({ name: '', attention: '', email: '', address: '' });
  const [rows, setRows] = useState([]); // { code, description, presentation, unit_price, qty }
  const [filter, setFilter] = useState('');
  const [number, setNumber] = useState(() => `2025.${Math.floor(Math.random()*9000+1000)}`);
  const taxRate = 0.18;
  const currency = 'USD';

  const results = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return PRODUCTS;
    return PRODUCTS.filter(p => `${p.code} ${p.description}`.toLowerCase().includes(q));
  }, [filter]);

  const addItem = (p) => setRows(prev => {
    const exists = prev.find(r => r.code === p.code);
    if (exists) return prev.map(r => r.code === p.code ? { ...r, qty: r.qty + 1 } : r);
    return [...prev, { ...p, qty: 1 }];
  });

  const subtotal = rows.reduce((a, r) => a + r.unit_price * r.qty, 0);
  const tax = +(subtotal * taxRate).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  const payload = {
    company: {
      name: process.env.NEXT_PUBLIC_COMPANY_NAME || 'EUROTEX INDUSTRIAL SAC – DIV. EUROTEX LUBS',
      ruc: process.env.NEXT_PUBLIC_COMPANY_RUC || '20611105909',
      address: process.env.NEXT_PUBLIC_COMPANY_ADDRESS || 'Jr. Hawaii 226 – La Molina – Lima – Perú'
    },
    client,
    items: rows,
    meta: { number, date: new Date().toLocaleDateString('es-PE'), currency, tax_rate: taxRate }
  };

  const generatePDF = async () => {
    const res = await fetch('/api/pdf', { method: 'POST', body: JSON.stringify(payload) });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `cotizacion_${number}.pdf`; a.click();
    URL.revokeObjectURL(url);
  };

  const sendEmail = async () => {
    if (!client.email) { alert('Ingresa el email del cliente'); return; }
    const res = await fetch('/api/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...payload, to: client.email }) });
    const data = await res.json();
    if (data.ok) alert('Correo enviado'); else alert('Error: ' + data.error);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.h1}>Nueva cotización</h1>

      <section style={{...styles.section}}>
        <div style={styles.row}>
          <div>
            <label style={styles.label}>Cliente</label>
            <input style={styles.input} placeholder="Razón social" value={client.name} onChange={e => setClient({ ...client, name: e.target.value })} />
            <input style={styles.input} placeholder="Atención (nombre)" value={client.attention} onChange={e => setClient({ ...client, attention: e.target.value })} />
            <input style={styles.input} placeholder="E-mail" value={client.email} onChange={e => setClient({ ...client, email: e.target.value })} />
            <input style={styles.input} placeholder="Dirección" value={client.address} onChange={e => setClient({ ...client, address: e.target.value })} />
          </div>
          <div>
            <label style={styles.label}>Cotización</label>
            <input style={styles.input} placeholder="Número" value={number} onChange={e => setNumber(e.target.value)} />
            <div style={styles.small}>IGV 18% · Moneda {currency}</div>
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <div style={{ display: 'flex', gap: 8 }}>
          <input style={{...styles.input, flex: 1}} placeholder="Buscar (código o descripción)" value={filter} onChange={e => setFilter(e.target.value)} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
          {results.map(p => (
            <button key={p.code} style={styles.productCard} onClick={() => addItem(p)}>
              <div style={{ fontWeight: 600 }}>{p.code} · {p.description}</div>
              <div style={styles.small}>{p.presentation} · {currency} {p.unit_price.toFixed(2)}</div>
            </button>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={{ fontWeight: 600, marginBottom: 8 }}>Ítems</h2>
        <div style={{ overflow: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>QTY</th>
                <th style={styles.th}>DESCRIPTION</th>
                <th style={styles.th}>PRESENT.</th>
                <th style={{...styles.th, ...styles.right}}>P.U. {currency}</th>
                <th style={{...styles.th, ...styles.right}}>P.TOTAL {currency}</th>
                <th style={styles.th}></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.code}>
                  <td style={styles.td}><input type="number" min={1} value={r.qty} onChange={e => setRows(rows.map((x, idx) => idx===i ? { ...x, qty: +e.target.value } : x))} style={{...styles.input, width: 70}}/></td>
                  <td style={styles.td}>{r.code}, {r.description}</td>
                  <td style={styles.td}>{r.presentation}</td>
                  <td style={{...styles.td, ...styles.right}}>{r.unit_price.toFixed(2)}</td>
                  <td style={{...styles.td, ...styles.right}}>{(r.unit_price * r.qty).toFixed(2)}</td>
                  <td style={styles.td}><button style={styles.buttonGhost} onClick={() => setRows(rows.filter((_, idx) => idx!==i))}>Quitar</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 12, marginLeft: 'auto', maxWidth: 320 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Subtotal</span><span>{subtotal.toFixed(2)}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>IGV 18%</span><span>{tax.toFixed(2)}</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #000', marginTop: 4, paddingTop: 4, fontWeight: 600 }}><span>TOTAL {currency}</span><span>{total.toFixed(2)}</span></div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button style={styles.button} onClick={generatePDF}>Descargar PDF</button>
          <button style={styles.button} onClick={sendEmail}>Enviar por correo</button>
        </div>
      </section>
    </div>
  );
}

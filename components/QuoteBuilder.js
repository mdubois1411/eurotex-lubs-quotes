// components/QuoteBuilder.js
'use client';
import { useMemo, useState } from 'react';
import { PRODUCTS } from '../lib/products';

const styles = {
  container: {
    maxWidth: 1100,
    margin: '0 auto',
    padding: '16px',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  header: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottom: '3px solid #0066cc'
  },
  h1: {
    fontSize: 24,
    fontWeight: 700,
    color: '#0066cc',
    margin: 0
  },
  section: {
    marginTop: 24,
    background: '#fff',
    borderRadius: 8,
    padding: 16,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 12,
    color: '#333'
  },
  label: {
    display: 'block',
    fontSize: 13,
    fontWeight: 500,
    marginBottom: 6,
    color: '#333'
  },
  input: {
    border: '1px solid #ccc',
    borderRadius: 6,
    padding: '10px 12px',
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: 10,
    fontSize: 14,
    transition: 'border-color 0.2s'
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16
  },
  button: {
    padding: '12px 20px',
    borderRadius: 8,
    background: '#0066cc',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 14,
    transition: 'background 0.2s',
    flex: 1
  },
  buttonSecondary: {
    padding: '12px 20px',
    borderRadius: 8,
    background: '#28a745',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 14,
    flex: 1
  },
  buttonGhost: {
    padding: '8px 12px',
    borderRadius: 6,
    background: '#fff',
    color: '#dc3545',
    border: '1px solid #dc3545',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 500
  },
  buttonGroup: {
    display: 'flex',
    gap: 12,
    marginTop: 16,
    flexWrap: 'wrap'
  },
  productCard: {
    textAlign: 'left',
    background: '#fff',
    border: '2px solid #e0e0e0',
    borderRadius: 8,
    padding: 12,
    cursor: 'pointer',
    transition: 'all 0.2s',
    minHeight: 60
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 12,
    marginTop: 12
  },
  productCode: {
    fontWeight: 700,
    fontSize: 14,
    color: '#0066cc',
    marginBottom: 4
  },
  productDesc: {
    fontSize: 13,
    color: '#333',
    marginBottom: 6
  },
  small: {
    fontSize: 12,
    color: '#666',
    marginTop: 4
  },
  badge: {
    display: 'inline-block',
    background: '#f0f0f0',
    padding: '2px 8px',
    borderRadius: 4,
    fontSize: 11,
    fontWeight: 500,
    color: '#666'
  },
  table: {
    width: '100%',
    fontSize: 13,
    borderCollapse: 'collapse',
    marginTop: 12
  },
  th: {
    textAlign: 'left',
    padding: 10,
    background: '#0066cc',
    color: '#fff',
    fontWeight: 600,
    borderBottom: '2px solid #0052a3'
  },
  td: {
    padding: 10,
    borderBottom: '1px solid #e0e0e0'
  },
  right: {
    textAlign: 'right'
  },
  totalsBox: {
    marginTop: 16,
    marginLeft: 'auto',
    maxWidth: 350,
    background: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    border: '1px solid #e0e0e0'
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 8,
    fontSize: 14
  },
  totalRowFinal: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '2px solid #0066cc',
    marginTop: 8,
    paddingTop: 10,
    fontWeight: 700,
    fontSize: 18,
    color: '#0066cc'
  },
  emptyState: {
    textAlign: 'center',
    padding: 40,
    color: '#999',
    fontSize: 14
  }
};

export default function QuoteBuilder() {
  const [client, setClient] = useState({ name: '', attention: '', email: '', address: '' });
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState('');
  const [number, setNumber] = useState(() => `2025.${Math.floor(Math.random() * 9000 + 1000)}`);
  const [loading, setLoading] = useState(false);
  const taxRate = 0.18;
  const currency = 'USD';

  const results = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return PRODUCTS;
    return PRODUCTS.filter(p =>
      `${p.code} ${p.description}`.toLowerCase().includes(q)
    );
  }, [filter]);

  const addItem = (p) => setRows(prev => {
    const exists = prev.find(r => r.code === p.code);
    if (exists) return prev.map(r => r.code === p.code ? { ...r, qty: r.qty + 1 } : r);
    return [...prev, { ...p, qty: 1 }];
  });

  const updateQty = (index, qty) => {
    const newQty = Math.max(1, parseInt(qty) || 1);
    setRows(rows.map((x, idx) => idx === index ? { ...x, qty: newQty } : x));
  };

  const removeItem = (index) => {
    setRows(rows.filter((_, idx) => idx !== index));
  };

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
    meta: {
      number,
      date: new Date().toLocaleDateString('es-PE'),
      currency,
      tax_rate: taxRate
    }
  };

  const generatePDF = async () => {
    if (rows.length === 0) {
      alert('Agrega al menos un producto');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/pdf', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cotizacion_${number}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert('Error al generar PDF: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const sendEmail = async () => {
    if (!client.email) {
      alert('Ingresa el email del cliente');
      return;
    }
    if (rows.length === 0) {
      alert('Agrega al menos un producto');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, to: client.email })
      });
      const data = await res.json();
      if (data.ok) {
        alert('✅ Correo enviado correctamente');
      } else {
        alert('❌ Error: ' + data.error);
      }
    } catch (e) {
      alert('❌ Error al enviar: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.h1}>💼 Nueva Cotización - EUROTEX LUBS</h1>
      </div>

      {/* Client & Quote Info */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Información del Cliente</h2>
        <div style={styles.row}>
          <div>
            <label style={styles.label}>Razón Social</label>
            <input
              style={styles.input}
              placeholder="Ej: Empresa XYZ S.A.C."
              value={client.name}
              onChange={e => setClient({ ...client, name: e.target.value })}
            />
            <label style={styles.label}>Persona de Contacto</label>
            <input
              style={styles.input}
              placeholder="Ej: Juan Pérez"
              value={client.attention}
              onChange={e => setClient({ ...client, attention: e.target.value })}
            />
            <label style={styles.label}>Email</label>
            <input
              type="email"
              style={styles.input}
              placeholder="cliente@empresa.com"
              value={client.email}
              onChange={e => setClient({ ...client, email: e.target.value })}
            />
            <label style={styles.label}>Dirección</label>
            <input
              style={styles.input}
              placeholder="Ej: Av. Principal 123, Lima"
              value={client.address}
              onChange={e => setClient({ ...client, address: e.target.value })}
            />
          </div>
          <div>
            <label style={styles.label}>Número de Cotización</label>
            <input
              style={styles.input}
              placeholder="2025.XXXX"
              value={number}
              onChange={e => setNumber(e.target.value)}
            />
            <div style={{
              marginTop: 16,
              padding: 12,
              background: '#f0f8ff',
              borderRadius: 6,
              border: '1px solid #b3d9ff'
            }}>
              <div style={{ fontSize: 13, marginBottom: 8, color: '#0066cc', fontWeight: 600 }}>
                📋 Detalles
              </div>
              <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
                • Moneda: {currency}
              </div>
              <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
                • IGV: 18%
              </div>
              <div style={{ fontSize: 12, color: '#666' }}>
                • Fecha: {new Date().toLocaleDateString('es-PE')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Catálogo de Productos</h2>
        <input
          style={{ ...styles.input, marginBottom: 0 }}
          placeholder="🔍 Buscar por código o descripción..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
        <div style={styles.productGrid}>
          {results.length > 0 ? (
            results.map(p => (
              <button
                key={p.code}
                style={styles.productCard}
                onClick={() => addItem(p)}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#0066cc'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#e0e0e0'}
              >
                <div style={styles.productCode}>{p.code}</div>
                <div style={styles.productDesc}>{p.description}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={styles.badge}>{p.presentation}</span>
                  <span style={{ fontWeight: 700, color: '#28a745' }}>
                    ${p.unit_price.toFixed(2)}
                  </span>
                </div>
              </button>
            ))
          ) : (
            <div style={styles.emptyState}>No se encontraron productos</div>
          )}
        </div>
      </section>

      {/* Selected Items */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Productos Seleccionados</h2>
        {rows.length > 0 ? (
          <>
            <div style={{ overflowX: 'auto' }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>CANT.</th>
                    <th style={styles.th}>CÓDIGO</th>
                    <th style={styles.th}>DESCRIPCIÓN</th>
                    <th style={styles.th}>PRESENT.</th>
                    <th style={{ ...styles.th, ...styles.right }}>P.U. {currency}</th>
                    <th style={{ ...styles.th, ...styles.right }}>TOTAL {currency}</th>
                    <th style={styles.th}></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={`${r.code}-${i}`}>
                      <td style={styles.td}>
                        <input
                          type="number"
                          min={1}
                          value={r.qty}
                          onChange={e => updateQty(i, e.target.value)}
                          style={{
                            ...styles.input,
                            width: 70,
                            marginBottom: 0,
                            textAlign: 'center'
                          }}
                        />
                      </td>
                      <td style={styles.td}><strong>{r.code}</strong></td>
                      <td style={styles.td}>{r.description}</td>
                      <td style={styles.td}>{r.presentation}</td>
                      <td style={{ ...styles.td, ...styles.right }}>
                        {r.unit_price.toFixed(2)}
                      </td>
                      <td style={{ ...styles.td, ...styles.right, fontWeight: 600 }}>
                        {(r.unit_price * r.qty).toFixed(2)}
                      </td>
                      <td style={styles.td}>
                        <button
                          style={styles.buttonGhost}
                          onClick={() => removeItem(i)}
                        >
                          ✕ Quitar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div style={styles.totalsBox}>
              <div style={styles.totalRow}>
                <span>Subtotal:</span>
                <span>{currency} {subtotal.toFixed(2)}</span>
              </div>
              <div style={styles.totalRow}>
                <span>IGV (18%):</span>
                <span>{currency} {tax.toFixed(2)}</span>
              </div>
              <div style={styles.totalRowFinal}>
                <span>TOTAL:</span>
                <span>{currency} {total.toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={styles.buttonGroup}>
              <button
                style={styles.button}
                onClick={generatePDF}
                disabled={loading}
                onMouseEnter={e => e.currentTarget.style.background = '#0052a3'}
                onMouseLeave={e => e.currentTarget.style.background = '#0066cc'}
              >
                {loading ? '⏳ Generando...' : '📄 Descargar PDF'}
              </button>
              <button
                style={styles.buttonSecondary}
                onClick={sendEmail}
                disabled={loading}
                onMouseEnter={e => e.currentTarget.style.background = '#218838'}
                onMouseLeave={e => e.currentTarget.style.background = '#28a745'}
              >
                {loading ? '⏳ Enviando...' : '📧 Enviar por Correo'}
              </button>
            </div>
          </>
        ) : (
          <div style={styles.emptyState}>
            Selecciona productos del catálogo para comenzar
          </div>
        )}
      </section>
    </div>
  );
}

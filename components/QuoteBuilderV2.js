// components/QuoteBuilderV2.js
'use client';
import { useMemo, useState, useEffect } from 'react';

const styles = {
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '16px',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
    paddingBottom: 16,
    borderBottom: '3px solid #0066cc'
  },
  logo: {
    height: 60
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
  },
  select: {
    border: '1px solid #ccc',
    borderRadius: 6,
    padding: '10px 12px',
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: 10,
    fontSize: 14,
    background: '#fff',
    cursor: 'pointer',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16
  },
  row3: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr',
    gap: 12
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
  productTableContainer: {
    maxHeight: 400,
    overflowY: 'auto',
    marginTop: 12,
    border: '1px solid #e0e0e0',
    borderRadius: 6,
  },
  productTable: {
    width: '100%',
    fontSize: 13,
    borderCollapse: 'collapse',
  },
  productRow: {
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  viewToggle: {
    display: 'inline-flex',
    gap: 8,
    marginBottom: 12,
    background: '#f0f0f0',
    padding: 4,
    borderRadius: 6,
  },
  viewButton: {
    padding: '6px 12px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    borderRadius: 4,
    fontSize: 13,
    fontWeight: 500,
  },
  viewButtonActive: {
    background: '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    padding: '12px 16px',
    background: '#f8f9fa',
    borderRadius: 6,
    fontSize: 13,
  },
  paginationButtons: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
  },
  pageButton: {
    padding: '6px 12px',
    border: '1px solid #ccc',
    borderRadius: 4,
    background: '#fff',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 500,
  },
  pageButtonActive: {
    background: '#0066cc',
    color: '#fff',
    border: '1px solid #0066cc',
  },
  pageButtonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
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
  checkbox: {
    marginRight: 8,
    cursor: 'pointer',
  },
  recipientItem: {
    padding: 8,
    border: '1px solid #e0e0e0',
    borderRadius: 6,
    marginBottom: 8,
    display: 'flex',
    alignItems: 'center',
    background: '#f8f9fa'
  },
  textarea: {
    border: '1px solid #ccc',
    borderRadius: 6,
    padding: '10px 12px',
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: 10,
    fontSize: 14,
    fontFamily: 'inherit',
    minHeight: 120,
    resize: 'vertical'
  }
};

export default function QuoteBuilderV2() {
  const [client, setClient] = useState({ name: '', attention: '', email: '', address: '' });
  const [clients, setClients] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [products, setProducts] = useState([]);
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState('');
  const [number, setNumber] = useState(() => `2025.${Math.floor(Math.random() * 9000 + 1000)}`);
  const [version, setVersion] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [discount, setDiscount] = useState(0);
  const [emailBody, setEmailBody] = useState(`Estimado cliente,\n\nAdjunto encontrará la cotización solicitada junto con las fichas técnicas de los productos.\n\nQuedamos atentos a cualquier consulta.\n\nSaludos cordiales,\nEUROTEX LUBS`);
  const [loading, setLoading] = useState(false);
  const [catalogView, setCatalogView] = useState('table'); // 'table' o 'grid'
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const taxRate = 0.18;
  const currency = 'USD';

  // Cargar datos desde APIs
  useEffect(() => {
    async function loadData() {
      try {
        const [clientsRes, recipientsRes, productsRes] = await Promise.all([
          fetch('/api/clients').then(r => r.json()),
          fetch('/api/recipients').then(r => r.json()),
          fetch('/api/products').then(r => r.json()),
        ]);

        if (clientsRes.ok) setClients(clientsRes.clients);
        if (recipientsRes.ok) setRecipients(recipientsRes.recipients);
        if (productsRes.ok) setProducts(productsRes.products);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    }
    loadData();
  }, []);

  // Filtrar productos
  const filteredProducts = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return products;
    return products.filter(p =>
      `${p.code} ${p.description}`.toLowerCase().includes(q)
    );
  }, [filter, products]);

  // Resetear a página 1 cuando cambia el filtro
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  // Calcular paginación
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const addItem = (p) => setRows(prev => {
    const exists = prev.find(r => r.code === p.code);
    if (exists) return prev.map(r => r.code === p.code ? { ...r, qty: r.qty + 1 } : r);
    return [...prev, { ...p, qty: 1, discount: 0 }];
  });

  const updateQty = (index, qty) => {
    const newQty = Math.max(1, parseInt(qty) || 1);
    setRows(rows.map((x, idx) => idx === index ? { ...x, qty: newQty } : x));
  };

  const updateRowDiscount = (index, disc) => {
    const newDisc = Math.max(0, Math.min(100, parseFloat(disc) || 0));
    setRows(rows.map((x, idx) => idx === index ? { ...x, discount: newDisc } : x));
  };

  const removeItem = (index) => {
    setRows(rows.filter((_, idx) => idx !== index));
  };

  const selectClient = (clientId) => {
    if (!clientId) {
      setClient({ name: '', attention: '', email: '', address: '' });
      return;
    }
    const selectedClient = clients.find(c => c.id === parseInt(clientId));
    if (selectedClient) {
      setClient({
        name: selectedClient.name,
        attention: selectedClient.attention,
        email: selectedClient.email,
        address: selectedClient.address,
      });
    }
  };

  const toggleRecipient = (recipientId) => {
    setSelectedRecipients(prev =>
      prev.includes(recipientId)
        ? prev.filter(id => id !== recipientId)
        : [...prev, recipientId]
    );
  };

  const subtotal = rows.reduce((a, r) => {
    const lineTotal = r.unit_price * r.qty;
    const lineDiscount = lineTotal * (r.discount / 100);
    return a + (lineTotal - lineDiscount);
  }, 0);

  const globalDiscount = subtotal * (discount / 100);
  const subtotalAfterDiscount = subtotal - globalDiscount;
  const tax = subtotalAfterDiscount * taxRate;
  const total = subtotalAfterDiscount + tax;

  const quoteNumber = version ? `${number}${version}` : number;

  const payload = {
    company: {
      name: process.env.NEXT_PUBLIC_COMPANY_NAME || 'EUROTEX INDUSTRIAL SAC – DIV. EUROTEX LUBS',
      ruc: process.env.NEXT_PUBLIC_COMPANY_RUC || '20611105909',
      address: process.env.NEXT_PUBLIC_COMPANY_ADDRESS || 'Jr. Hawaii 226 – La Molina – Lima – Perú',
      bankAccount: process.env.NEXT_PUBLIC_BANK_ACCOUNT || '',
      cci: process.env.NEXT_PUBLIC_CCI || '',
    },
    client,
    items: rows,
    meta: {
      number: quoteNumber,
      date: new Date(date).toLocaleDateString('es-PE'),
      currency,
      tax_rate: taxRate,
      discount: discount,
      globalDiscount: globalDiscount,
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
      a.download = `cotizacion_${quoteNumber}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert('Error al generar PDF: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const sendEmail = async () => {
    const emailsToSend = selectedRecipients.length > 0
      ? selectedRecipients.map(id => recipients.find(r => r.id === id)?.email).filter(Boolean)
      : [client.email];

    if (emailsToSend.length === 0) {
      alert('Selecciona al menos un destinatario o ingresa el email del cliente');
      return;
    }
    if (rows.length === 0) {
      alert('Agrega al menos un producto');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/send-gmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          to: emailsToSend,
          emailBody,
          productCodes: rows.map(r => r.code),
        })
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
        <img src="/logo-eurotex.png" alt="EUROTEX LUBS" style={styles.logo} />
        <h1 style={styles.h1}>Nueva Cotización - EUROTEX LUBS</h1>
      </div>

      {/* Client Info */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Información del Cliente</h2>

        <label style={styles.label}>Seleccionar Cliente Existente</label>
        <select style={styles.select} onChange={e => selectClient(e.target.value)}>
          <option value="">-- Nuevo cliente (escribir manualmente) --</option>
          {clients.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

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
            <div style={styles.row3}>
              <div>
                <label style={styles.label}>Número</label>
                <input
                  style={styles.input}
                  placeholder="2025.XXXX"
                  value={number}
                  onChange={e => setNumber(e.target.value)}
                />
              </div>
              <div>
                <label style={styles.label}>Versión</label>
                <input
                  style={styles.input}
                  placeholder="a, b, c..."
                  value={version}
                  maxLength={1}
                  onChange={e => setVersion(e.target.value.toLowerCase())}
                />
              </div>
              <div>
                <label style={styles.label}>Fecha</label>
                <input
                  type="date"
                  style={styles.input}
                  value={date}
                  onChange={e => setDate(e.target.value)}
                />
              </div>
            </div>
            <label style={styles.label}>Cotización Final: <strong>{quoteNumber}</strong></label>

            <label style={styles.label}>Descuento Global (%)</label>
            <input
              type="number"
              style={styles.input}
              min="0"
              max="100"
              step="0.1"
              value={discount}
              onChange={e => setDiscount(parseFloat(e.target.value) || 0)}
            />

            <div style={{
              marginTop: 16,
              padding: 12,
              background: '#f0f8ff',
              borderRadius: 6,
              border: '1px solid #b3d9ff',
              fontSize: 12
            }}>
              <div><strong>Moneda:</strong> {currency}</div>
              <div><strong>IGV:</strong> 18%</div>
              <div><strong>Fecha:</strong> {new Date(date).toLocaleDateString('es-PE')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section style={styles.section}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={styles.sectionTitle}>Catálogo de Productos ({products.length})</h2>
          <div style={styles.viewToggle}>
            <button
              style={{...styles.viewButton, ...(catalogView === 'table' ? styles.viewButtonActive : {})}}
              onClick={() => setCatalogView('table')}
            >
              📋 Lista
            </button>
            <button
              style={{...styles.viewButton, ...(catalogView === 'grid' ? styles.viewButtonActive : {})}}
              onClick={() => setCatalogView('grid')}
            >
              ⊞ Tarjetas
            </button>
          </div>
        </div>

        <input
          style={styles.input}
          placeholder="🔍 Buscar por código o descripción..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />

        {catalogView === 'table' ? (
          /* Vista de Tabla - Compacta y eficiente para muchos productos */
          <div style={styles.productTableContainer}>
            <table style={styles.productTable}>
              <thead>
                <tr>
                  <th style={{...styles.th, position: 'sticky', top: 0}}>Código</th>
                  <th style={{...styles.th, position: 'sticky', top: 0}}>Descripción</th>
                  <th style={{...styles.th, position: 'sticky', top: 0}}>Presentación</th>
                  <th style={{...styles.th, position: 'sticky', top: 0, textAlign: 'right'}}>Precio {currency}</th>
                  <th style={{...styles.th, position: 'sticky', top: 0, width: 100}}></th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map(p => (
                  <tr
                    key={p.code}
                    style={styles.productRow}
                    onMouseEnter={e => e.currentTarget.style.background = '#f8f9fa'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={styles.td}><strong style={{ color: '#0066cc' }}>{p.code}</strong></td>
                    <td style={styles.td}>{p.description}</td>
                    <td style={styles.td}>
                      <span style={{ fontSize: 11, background: '#f0f0f0', padding: '2px 8px', borderRadius: 4 }}>
                        {p.presentation}
                      </span>
                    </td>
                    <td style={{...styles.td, textAlign: 'right'}}>
                      <strong style={{ color: '#28a745' }}>${p.unit_price.toFixed(2)}</strong>
                    </td>
                    <td style={styles.td}>
                      <button
                        style={{...styles.button, padding: '6px 12px', fontSize: 12}}
                        onClick={() => addItem(p)}
                      >
                        + Agregar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* Vista de Tarjetas - Visual para catálogos pequeños */
          <div style={styles.productGrid}>
            {paginatedProducts.map(p => (
              <button
                key={p.code}
                style={styles.productCard}
                onClick={() => addItem(p)}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#0066cc'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#e0e0e0'}
              >
                <div style={{ fontWeight: 700, color: '#0066cc' }}>{p.code}</div>
                <div style={{ fontSize: 13, marginTop: 4 }}>{p.description}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                  <span style={{ fontSize: 11, background: '#f0f0f0', padding: '2px 8px', borderRadius: 4 }}>
                    {p.presentation}
                  </span>
                  <span style={{ fontWeight: 700, color: '#28a745' }}>${p.unit_price.toFixed(2)}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Paginación */}
        {filteredProducts.length > 0 && (
          <div style={styles.pagination}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span>Mostrar:</span>
              <select
                style={{...styles.select, width: 'auto', marginBottom: 0, padding: '4px 8px'}}
                value={itemsPerPage}
                onChange={e => {
                  setItemsPerPage(parseInt(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span>
                Mostrando {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} de {filteredProducts.length}
              </span>
            </div>

            <div style={styles.paginationButtons}>
              <button
                style={{
                  ...styles.pageButton,
                  ...(currentPage === 1 ? styles.pageButtonDisabled : {})
                }}
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                ««
              </button>
              <button
                style={{
                  ...styles.pageButton,
                  ...(currentPage === 1 ? styles.pageButtonDisabled : {})
                }}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                ‹
              </button>

              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                // Mostrar solo páginas cercanas a la actual
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNum}
                      style={{
                        ...styles.pageButton,
                        ...(currentPage === pageNum ? styles.pageButtonActive : {})
                      }}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                  return <span key={pageNum}>...</span>;
                }
                return null;
              })}

              <button
                style={{
                  ...styles.pageButton,
                  ...(currentPage === totalPages ? styles.pageButtonDisabled : {})
                }}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                ›
              </button>
              <button
                style={{
                  ...styles.pageButton,
                  ...(currentPage === totalPages ? styles.pageButtonDisabled : {})
                }}
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                »»
              </button>
            </div>
          </div>
        )}
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
                    <th style={styles.th}>P.U.</th>
                    <th style={styles.th}>DESC %</th>
                    <th style={{ ...styles.th, ...styles.right }}>TOTAL</th>
                    <th style={styles.th}></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => {
                    const lineTotal = r.unit_price * r.qty;
                    const lineDiscount = lineTotal * (r.discount / 100);
                    const finalLineTotal = lineTotal - lineDiscount;
                    return (
                      <tr key={`${r.code}-${i}`}>
                        <td style={styles.td}>
                          <input
                            type="number"
                            min={1}
                            value={r.qty}
                            onChange={e => updateQty(i, e.target.value)}
                            style={{ ...styles.input, width: 70, marginBottom: 0, textAlign: 'center' }}
                          />
                        </td>
                        <td style={styles.td}><strong>{r.code}</strong></td>
                        <td style={styles.td}>{r.description}</td>
                        <td style={styles.td}>${r.unit_price.toFixed(2)}</td>
                        <td style={styles.td}>
                          <input
                            type="number"
                            min={0}
                            max={100}
                            step="0.1"
                            value={r.discount}
                            onChange={e => updateRowDiscount(i, e.target.value)}
                            style={{ ...styles.input, width: 70, marginBottom: 0, textAlign: 'center' }}
                          />
                        </td>
                        <td style={{ ...styles.td, ...styles.right, fontWeight: 600 }}>
                          ${finalLineTotal.toFixed(2)}
                        </td>
                        <td style={styles.td}>
                          <button style={styles.buttonGhost} onClick={() => removeItem(i)}>✕</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div style={styles.totalsBox}>
              <div style={styles.totalRow}>
                <span>Subtotal:</span>
                <span>{currency} {subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div style={styles.totalRow}>
                  <span>Descuento Global ({discount}%):</span>
                  <span>-{currency} {globalDiscount.toFixed(2)}</span>
                </div>
              )}
              <div style={styles.totalRow}>
                <span>IGV (18%):</span>
                <span>{currency} {tax.toFixed(2)}</span>
              </div>
              <div style={styles.totalRowFinal}>
                <span>TOTAL:</span>
                <span>{currency} {total.toFixed(2)}</span>
              </div>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: 40, color: '#999' }}>
            Selecciona productos del catálogo
          </div>
        )}
      </section>

      {/* Email Configuration */}
      {rows.length > 0 && (
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Configuración de Envío</h2>

          <label style={styles.label}>Destinatarios Adicionales</label>
          {recipients.map(r => (
            <div key={r.id} style={styles.recipientItem}>
              <input
                type="checkbox"
                style={styles.checkbox}
                checked={selectedRecipients.includes(r.id)}
                onChange={() => toggleRecipient(r.id)}
              />
              <span><strong>{r.name}</strong> ({r.email}) - {r.role}</span>
            </div>
          ))}

          <label style={styles.label}>Cuerpo del Email</label>
          <textarea
            style={styles.textarea}
            value={emailBody}
            onChange={e => setEmailBody(e.target.value)}
          />

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
        </section>
      )}
    </div>
  );
}

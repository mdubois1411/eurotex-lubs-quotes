// components/QuoteHistory.js
'use client';
import { useState, useEffect } from 'react';

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
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 24,
    paddingBottom: 16,
    borderBottom: '3px solid #0066cc'
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    color: '#0066cc',
    margin: 0
  },
  backButton: {
    padding: '10px 20px',
    borderRadius: 8,
    background: '#6c757d',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 14,
  },
  section: {
    marginTop: 24,
    background: '#fff',
    borderRadius: 8,
    padding: 16,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  searchBox: {
    border: '1px solid #ccc',
    borderRadius: 6,
    padding: '10px 12px',
    width: '100%',
    boxSizing: 'border-box',
    marginBottom: 16,
    fontSize: 14,
  },
  filterRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr auto',
    gap: 12,
    marginBottom: 16,
  },
  input: {
    border: '1px solid #ccc',
    borderRadius: 6,
    padding: '10px 12px',
    fontSize: 14,
    width: '100%',
    boxSizing: 'border-box',
  },
  clearButton: {
    padding: '10px 16px',
    borderRadius: 6,
    background: '#dc3545',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 500,
    whiteSpace: 'nowrap',
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
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
  select: {
    border: '1px solid #ccc',
    borderRadius: 6,
    padding: '6px 8px',
    fontSize: 13,
    background: '#fff',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    fontSize: 13,
    borderCollapse: 'collapse',
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
  viewButton: {
    padding: '6px 12px',
    borderRadius: 6,
    background: '#0066cc',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: 12,
    fontWeight: 500,
    marginRight: 8,
  },
  deleteButton: {
    padding: '6px 12px',
    borderRadius: 6,
    background: '#dc3545',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: 12,
    fontWeight: 500,
  },
  loading: {
    textAlign: 'center',
    padding: 40,
    color: '#999',
    fontSize: 16,
  },
  emptyState: {
    textAlign: 'center',
    padding: 40,
    color: '#999',
    fontSize: 14,
  },
  badge: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: 4,
    fontSize: 11,
    fontWeight: 600,
    background: '#28a745',
    color: '#fff',
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    background: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    border: '1px solid #e0e0e0',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 700,
    color: '#0066cc',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    background: '#fff',
    borderRadius: 12,
    padding: 24,
    maxWidth: 800,
    maxHeight: '80vh',
    overflow: 'auto',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 12,
    borderBottom: '2px solid #0066cc',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: 24,
    cursor: 'pointer',
    color: '#666',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #f0f0f0',
  },
  detailLabel: {
    fontWeight: 600,
    color: '#333',
  },
  detailValue: {
    color: '#666',
  },
};

// Función helper para formatear fecha/hora
function formatDateTime(dateString) {
  if (!dateString) return 'N/A';

  try {
    // Si viene en formato ISO o similar
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Si no es válida, devolver el string original

    // Formatear en zona horaria de Perú
    return date.toLocaleString('es-PE', {
      timeZone: 'America/Lima',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } catch (error) {
    return dateString;
  }
}

export default function QuoteHistory({ onBack }) {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedQuote, setSelectedQuote] = useState(null);

  // Filtros
  const [filterClient, setFilterClient] = useState('');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/quotes');
      const data = await res.json();
      if (data.ok) {
        setQuotes(data.quotes);
      }
    } catch (error) {
      console.error('Error al cargar cotizaciones:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrado avanzado
  const filteredQuotes = quotes.filter(q => {
    // Filtro de búsqueda general
    const matchesSearch = search === '' ||
      q.number.toLowerCase().includes(search.toLowerCase()) ||
      q.clientName.toLowerCase().includes(search.toLowerCase()) ||
      q.clientEmail.toLowerCase().includes(search.toLowerCase());

    // Filtro por cliente
    const matchesClient = filterClient === '' ||
      q.clientName.toLowerCase().includes(filterClient.toLowerCase());

    // Filtro por rango de fechas
    let matchesDateRange = true;
    if (filterDateFrom || filterDateTo) {
      const quoteDate = new Date(q.date);
      if (filterDateFrom) {
        const fromDate = new Date(filterDateFrom);
        matchesDateRange = matchesDateRange && quoteDate >= fromDate;
      }
      if (filterDateTo) {
        const toDate = new Date(filterDateTo);
        toDate.setHours(23, 59, 59, 999); // Incluir todo el día
        matchesDateRange = matchesDateRange && quoteDate <= toDate;
      }
    }

    return matchesSearch && matchesClient && matchesDateRange;
  });

  // Resetear a página 1 cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterClient, filterDateFrom, filterDateTo]);

  // Paginación
  const totalPages = Math.ceil(filteredQuotes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedQuotes = filteredQuotes.slice(startIndex, endIndex);

  const totalQuotes = quotes.length;
  const totalAmount = quotes.reduce((sum, q) => sum + q.total, 0);

  // Limpiar filtros
  const clearFilters = () => {
    setSearch('');
    setFilterClient('');
    setFilterDateFrom('');
    setFilterDateTo('');
  };

  const viewQuoteDetails = async (quoteId) => {
    try {
      const res = await fetch(`/api/quotes/${quoteId}`);
      const data = await res.json();
      if (data.ok) {
        setSelectedQuote(data.quote);
      }
    } catch (error) {
      console.error('Error al cargar detalles:', error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <img src="/logo-eurotex.png" alt="EUROTEX LUBS" style={{ height: 60 }} />
          <h1 style={styles.title}>Historial de Cotizaciones</h1>
        </div>
        <button
          style={styles.backButton}
          onClick={onBack}
          onMouseEnter={e => e.currentTarget.style.background = '#5a6268'}
          onMouseLeave={e => e.currentTarget.style.background = '#6c757d'}
        >
          ← Volver
        </button>
      </div>

      <div style={styles.stats}>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Total de Cotizaciones</div>
          <div style={styles.statValue}>{totalQuotes}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Monto Total (USD)</div>
          <div style={styles.statValue}>${totalAmount.toFixed(2)}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Promedio por Cotización</div>
          <div style={styles.statValue}>
            ${totalQuotes > 0 ? (totalAmount / totalQuotes).toFixed(2) : '0.00'}
          </div>
        </div>
      </div>

      <section style={styles.section}>
        <input
          type="text"
          style={styles.searchBox}
          placeholder="🔍 Búsqueda rápida: número, cliente o email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        {/* Filtros Avanzados */}
        <div style={styles.filterRow}>
          <input
            type="text"
            style={styles.input}
            placeholder="Filtrar por cliente..."
            value={filterClient}
            onChange={e => setFilterClient(e.target.value)}
          />
          <input
            type="date"
            style={styles.input}
            placeholder="Desde"
            value={filterDateFrom}
            onChange={e => setFilterDateFrom(e.target.value)}
            title="Fecha desde"
          />
          <input
            type="date"
            style={styles.input}
            placeholder="Hasta"
            value={filterDateTo}
            onChange={e => setFilterDateTo(e.target.value)}
            title="Fecha hasta"
          />
          <button
            style={styles.clearButton}
            onClick={clearFilters}
            onMouseEnter={e => e.currentTarget.style.background = '#c82333'}
            onMouseLeave={e => e.currentTarget.style.background = '#dc3545'}
          >
            ✕ Limpiar
          </button>
        </div>

        {/* Info de resultados */}
        <div style={{ marginBottom: 12, fontSize: 13, color: '#666' }}>
          Mostrando {paginatedQuotes.length} de {filteredQuotes.length} cotizaciones
          {filteredQuotes.length !== totalQuotes && ` (${totalQuotes} total)`}
        </div>

        {loading ? (
          <div style={styles.loading}>⏳ Cargando cotizaciones...</div>
        ) : filteredQuotes.length === 0 ? (
          <div style={styles.emptyState}>
            {search ? 'No se encontraron cotizaciones que coincidan con la búsqueda' : 'No hay cotizaciones guardadas'}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Número</th>
                  <th style={styles.th}>Fecha Cotiz.</th>
                  <th style={styles.th}>Guardada</th>
                  <th style={styles.th}>Cliente</th>
                  <th style={styles.th}>Total</th>
                  <th style={styles.th}>Estado</th>
                  <th style={styles.th}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paginatedQuotes.map(q => (
                  <tr key={q.id}>
                    <td style={styles.td}>
                      <strong style={{ color: '#0066cc' }}>{q.number}</strong>
                    </td>
                    <td style={styles.td}>{q.date}</td>
                    <td style={styles.td}>
                      <span style={{ fontSize: 11, color: '#666' }}>
                        {formatDateTime(q.savedAt)}
                      </span>
                    </td>
                    <td style={styles.td}>{q.clientName}</td>
                    <td style={styles.td}>
                      <strong style={{ color: '#28a745' }}>
                        {q.currency} {q.total.toFixed(2)}
                      </strong>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.badge}>{q.status}</span>
                    </td>
                    <td style={styles.td}>
                      <button
                        style={styles.viewButton}
                        onClick={() => viewQuoteDetails(q.id)}
                        onMouseEnter={e => e.currentTarget.style.background = '#0052a3'}
                        onMouseLeave={e => e.currentTarget.style.background = '#0066cc'}
                      >
                        👁 Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Paginación */}
            {filteredQuotes.length > 0 && (
              <div style={styles.pagination}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span>Mostrar:</span>
                  <select
                    style={styles.select}
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
                    Mostrando {startIndex + 1}-{Math.min(endIndex, filteredQuotes.length)} de {filteredQuotes.length}
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
          </div>
        )}
      </section>

      {/* Modal de Detalles */}
      {selectedQuote && (
        <div style={styles.modal} onClick={() => setSelectedQuote(null)}>
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={{ margin: 0, color: '#0066cc' }}>
                Cotización {selectedQuote.number}
              </h2>
              <button
                style={styles.closeButton}
                onClick={() => setSelectedQuote(null)}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, marginBottom: 12, color: '#333' }}>
                Información del Cliente
              </h3>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Cliente:</span>
                <span style={styles.detailValue}>{selectedQuote.clientName}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Email:</span>
                <span style={styles.detailValue}>{selectedQuote.clientEmail}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Fecha:</span>
                <span style={styles.detailValue}>{selectedQuote.date}</span>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: 16, marginBottom: 12, color: '#333' }}>
                Productos ({selectedQuote.items.length})
              </h3>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Cant.</th>
                    <th style={styles.th}>Código</th>
                    <th style={styles.th}>Descripción</th>
                    <th style={styles.th}>P.U.</th>
                    <th style={{ ...styles.th, textAlign: 'right' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedQuote.items.map((item, idx) => {
                    const lineTotal = item.unit_price * item.qty;
                    const lineDiscount = lineTotal * ((item.discount || 0) / 100);
                    return (
                      <tr key={idx}>
                        <td style={styles.td}>{item.qty}</td>
                        <td style={styles.td}><strong>{item.code}</strong></td>
                        <td style={styles.td}>{item.description}</td>
                        <td style={styles.td}>${item.unit_price.toFixed(2)}</td>
                        <td style={{ ...styles.td, textAlign: 'right', fontWeight: 600 }}>
                          ${(lineTotal - lineDiscount).toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div style={{ marginTop: 16, textAlign: 'right' }}>
                <div style={{ ...styles.detailRow, justifyContent: 'flex-end', gap: 40 }}>
                  <span style={styles.detailLabel}>Descuento:</span>
                  <span style={styles.detailValue}>{selectedQuote.discount}%</span>
                </div>
                <div style={{ ...styles.detailRow, justifyContent: 'flex-end', gap: 40, fontSize: 18, fontWeight: 700 }}>
                  <span style={styles.detailLabel}>TOTAL:</span>
                  <span style={{ color: '#0066cc' }}>
                    {selectedQuote.currency} {selectedQuote.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

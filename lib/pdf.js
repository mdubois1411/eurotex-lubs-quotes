import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#0066cc'
  },
  logo: {
    width: 180,
    height: 60,
    objectFit: 'contain'
  },
  companyInfo: {
    textAlign: 'right',
    fontSize: 9,
    color: '#333'
  },
  companyName: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 3
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0066cc',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 10,
    color: '#666',
    marginBottom: 15
  },
  section: {
    marginBottom: 15
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textTransform: 'uppercase'
  },
  clientInfo: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 4,
    marginBottom: 15
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 4
  },
  infoLabel: {
    fontWeight: 'bold',
    width: 80,
    fontSize: 9
  },
  infoValue: {
    flex: 1,
    fontSize: 9
  },
  table: {
    marginTop: 10,
    marginBottom: 15
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#0066cc',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 9,
    paddingTop: 8,
    paddingBottom: 8
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingTop: 6,
    paddingBottom: 6,
    fontSize: 9
  },
  tableRowAlt: {
    backgroundColor: '#f8f9fa'
  },
  cellQty: { width: '8%', paddingLeft: 5, paddingRight: 5 },
  cellDesc: { width: '50%', paddingLeft: 5, paddingRight: 5 },
  cellPres: { width: '15%', paddingLeft: 5, paddingRight: 5 },
  cellPrice: { width: '13%', paddingLeft: 5, paddingRight: 5, textAlign: 'right' },
  cellTotal: { width: '14%', paddingLeft: 5, paddingRight: 5, textAlign: 'right' },
  totalsContainer: {
    marginTop: 10,
    marginLeft: 'auto',
    width: '40%'
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    fontSize: 10
  },
  totalRowFinal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    marginTop: 5,
    borderTopWidth: 2,
    borderTopColor: '#0066cc',
    fontWeight: 'bold',
    fontSize: 12,
    color: '#0066cc'
  },
  footer: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0'
  },
  footerText: {
    fontSize: 9,
    color: '#666',
    marginBottom: 3
  },
  footerLabel: {
    fontWeight: 'bold',
    color: '#333'
  }
});

export function QuotePDF({ company, client, items, meta }) {
  const subtotal = items.reduce((acc, it) => acc + it.qty * it.unit_price, 0);
  const tax = +(subtotal * meta.tax_rate).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with logo and company info */}
        <View style={styles.header}>
          <Image src="/logo-eurotex.png" style={styles.logo} />
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{company.name}</Text>
            <Text>RUC: {company.ruc}</Text>
            <Text>{company.address}</Text>
          </View>
        </View>

        {/* Title and date */}
        <View style={styles.section}>
          <Text style={styles.title}>COTIZACIÓN {meta.number}</Text>
          <Text style={styles.subtitle}>Fecha: {meta.date}</Text>
        </View>

        {/* Client information */}
        <View style={styles.clientInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Cliente:</Text>
            <Text style={styles.infoValue}>{client.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Atención:</Text>
            <Text style={styles.infoValue}>{client.attention}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{client.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Dirección:</Text>
            <Text style={styles.infoValue}>{client.address}</Text>
          </View>
        </View>

        {/* Product table */}
        <View style={styles.table}>
          {/* Table header */}
          <View style={styles.tableHeader}>
            <Text style={styles.cellQty}>CANT.</Text>
            <Text style={styles.cellDesc}>DESCRIPCIÓN</Text>
            <Text style={styles.cellPres}>PRESENT.</Text>
            <Text style={styles.cellPrice}>P.U. {meta.currency}</Text>
            <Text style={styles.cellTotal}>TOTAL {meta.currency}</Text>
          </View>

          {/* Table rows */}
          {items.map((item, idx) => (
            <View
              key={idx}
              style={[styles.tableRow, idx % 2 === 1 && styles.tableRowAlt]}
            >
              <Text style={styles.cellQty}>{item.qty}</Text>
              <Text style={styles.cellDesc}>
                {item.code} - {item.description}
              </Text>
              <Text style={styles.cellPres}>{item.presentation}</Text>
              <Text style={styles.cellPrice}>{item.unit_price.toFixed(2)}</Text>
              <Text style={styles.cellTotal}>
                {(item.qty * item.unit_price).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalsContainer}>
          <View style={styles.totalRow}>
            <Text>Subtotal:</Text>
            <Text>{meta.currency} {subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>IGV ({(meta.tax_rate * 100).toFixed(0)}%):</Text>
            <Text>{meta.currency} {tax.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRowFinal}>
            <Text>TOTAL:</Text>
            <Text>{meta.currency} {total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Footer with terms */}
        <View style={styles.footer}>
          <View style={styles.infoRow}>
            <Text style={styles.footerLabel}>Validez: </Text>
            <Text style={styles.footerText}>15 días calendario</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.footerLabel}>Tiempo de entrega: </Text>
            <Text style={styles.footerText}>Inmediata según disponibilidad de stock</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.footerLabel}>Garantía: </Text>
            <Text style={styles.footerText}>Según especificaciones de hoja técnica del producto</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

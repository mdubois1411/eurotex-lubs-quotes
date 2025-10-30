import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logo: { width: 300, height: 70 },
  h1: { fontSize: 16, marginTop: 6, fontWeight: 700 },
  small: { fontSize: 10 },
  table: { marginTop: 12, borderWidth: 1, borderColor: '#ccc' },
  row: { flexDirection: 'row' },
  cell: { padding: 6, borderRightWidth: 1, borderRightColor: '#ccc' },
  th: { backgroundColor: '#eee', fontWeight: 700 },
  right: { textAlign: 'right' }
});

export function QuotePDF({ company, client, items, meta }) {
  const subtotal = items.reduce((acc, it) => acc + it.qty * it.unit_price, 0);
  const tax = +(subtotal * meta.tax_rate).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);

  const Cell = ({ children, w, right, th }) => (
    <View style={[{ width: w }, styles.cell, th && styles.th]}>
      <Text style={[styles.small, right && styles.right]}>{children}</Text>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image src="/logo-eurotex.png" style={styles.logo} />
          <View>
            <Text style={styles.small}>{company.name}</Text>
            <Text style={styles.small}>RUC {company.ruc}</Text>
            <Text style={styles.small}>{company.address}</Text>
          </View>
        </View>

        <Text style={styles.h1}>COTIZACIÓN {meta.number} · Fecha: {meta.date}</Text>

        <View style={{ marginTop: 8 }}>
          <Text style={styles.small}><Text style={{ fontWeight: 700 }}>Cliente:</Text> {client.name}</Text>
          <Text style={styles.small}><Text style={{ fontWeight: 700 }}>Atención:</Text> {client.attention}</Text>
          <Text style={styles.small}><Text style={{ fontWeight: 700 }}>Email:</Text> {client.email}</Text>
          <Text style={styles.small}><Text style={{ fontWeight: 700 }}>Dirección:</Text> {client.address}</Text>
        </View>

        <View style={[styles.table]}>
          <View style={[styles.row]}>
            <Cell w={40} th>QTY</Cell>
            <Cell w={250} th>DESCRIPTION</Cell>
            <Cell w={80} th>PRESENT.</Cell>
            <Cell w={80} th right>P.U. {meta.currency}</Cell>
            <Cell w={90} th right>P.TOTAL {meta.currency}</Cell>
          </View>

          {items.map((it, idx) => (
            <View key={idx} style={styles.row}>
              <Cell w={40}>{it.qty}</Cell>
              <Cell w={250}>{`${it.code}, ${it.description}`}</Cell>
              <Cell w={80}>{it.presentation}</Cell>
              <Cell w={80} right>{it.unit_price.toFixed(2)}</Cell>
              <Cell w={90} right>{(it.qty * it.unit_price).toFixed(2)}</Cell>
            </View>
          ))}
        </View>

        <View style={{ marginTop: 8, marginLeft: 250 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.small}>Subtotal</Text>
            <Text style={styles.small}>{subtotal.toFixed(2)}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.small}>IGV {(meta.tax_rate*100).toFixed(0)}%</Text>
            <Text style={styles.small}>{tax.toFixed(2)}</Text>
          </View>
          <View style={{ borderTopWidth: 1, borderTopColor: '#000', marginTop: 4, paddingTop: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={[styles.small, { fontWeight: 700 }]}>TOTAL {meta.currency}</Text>
            <Text style={[styles.small, { fontWeight: 700 }]}>{total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <Text style={styles.small}><Text style={{ fontWeight: 700 }}>Validez:</Text> 15 días · <Text style={{ fontWeight: 700 }}>Entrega:</Text> Inmediata según stock · <Text style={{ fontWeight: 700 }}>Garantía:</Text> Según hoja técnica</Text>
        </View>
      </Page>
    </Document>
  );
}

import React from 'react';
import { NextResponse } from 'next/server';
import { QuotePDF } from '../../../lib/pdf';
import { pdf } from '@react-pdf/renderer';

export async function POST(req) {
  const body = await req.json(); // { company, client, items, meta }
  const blob = await pdf(<QuotePDF {...body} />).toBuffer();
  return new NextResponse(blob, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=cotizacion_${body.meta?.number || 'tmp'}.pdf`
    }
  });
}

import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import React from 'react';
import { QuotePDF } from '@/lib/pdf';
import { pdf } from '@react-pdf/renderer';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json(); // { to, cc, company, client, items, meta }
    const { to, cc } = body;
    if (!to) throw new Error('Missing "to" email');

    const pdfBuffer = await pdf(<QuotePDF {...body} />).toBuffer();

    const ccList = (cc && cc.length) ? cc : (process.env.DEFAULT_CC || '').split(',').map(s => s.trim()).filter(Boolean);
    const subject = `EUROTEX LUBS – Cotización ${body?.meta?.number || ''}`.trim();

    const { data, error } = await resend.emails.send({
      from: `${process.env.COMPANY_NAME || 'EUROTEX LUBS'} <no-reply@resend.dev>`,
      to: Array.isArray(to) ? to : [to],
      cc: ccList,
      subject,
      html: `Hola ${body.client?.attention || ''},<br/>Adjuntamos la cotización <b>${body?.meta?.number || ''}</b>.<br/><br/>Saludos,<br/>${process.env.COMPANY_NAME || 'EUROTEX LUBS'}`,
      attachments: [{ filename: `cotizacion_${body?.meta?.number || 'tmp'}.pdf`, content: pdfBuffer }]
    });

    if (error) throw error;
    return NextResponse.json({ ok: true, id: data?.id });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

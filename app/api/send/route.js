// app/api/send/route.js
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import React from 'react';
import { QuotePDF } from '../../../lib/pdf';
import { pdf } from '@react-pdf/renderer';

// Force dynamic rendering (prevent static optimization)
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req) {
  try {
    // Serverless-safe: Initialize Resend inside the handler
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { ok: false, error: 'RESEND_API_KEY not configured' },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await req.json(); // { to, cc, company, client, items, meta }
    const { to, cc } = body;

    if (!to) {
      return NextResponse.json(
        { ok: false, error: 'Missing "to" email address' },
        { status: 400 }
      );
    }

    // Generate PDF buffer
    const pdfBuffer = await pdf(<QuotePDF {...body} />).toBuffer();

    // Parse CC list from env or request
    const ccList = (cc && cc.length)
      ? cc
      : (process.env.DEFAULT_CC || '')
          .split(',')
          .map(s => s.trim())
          .filter(Boolean);

    const subject = `EUROTEX LUBS – Cotización ${body?.meta?.number || ''}`.trim();
    const companyName = process.env.COMPANY_NAME || 'EUROTEX INDUSTRIAL SAC – DIV. EUROTEX LUBS';

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: `${companyName} <onboarding@resend.dev>`, // Use verified domain in production
      to: Array.isArray(to) ? to : [to],
      cc: ccList.length > 0 ? ccList : undefined,
      subject,
      html: `
        <p>Hola ${body.client?.attention || 'Cliente'},</p>
        <p>Adjuntamos la cotización <strong>${body?.meta?.number || ''}</strong>.</p>
        <br/>
        <p>Saludos cordiales,</p>
        <p><strong>${companyName}</strong></p>
        <p style="font-size: 12px; color: #666;">
          ${process.env.COMPANY_ADDRESS || 'Jr. Hawaii 226 – La Molina – Lima – Perú'}<br/>
          ${process.env.COMPANY_EMAIL || 'ventas@eurotex.com'}
        </p>
      `,
      attachments: [
        {
          filename: `cotizacion_${body?.meta?.number || 'tmp'}.pdf`,
          content: pdfBuffer
        }
      ]
    });

    if (error) {
      console.error('Resend API error:', error);
      throw error;
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (e) {
    console.error('Send email error:', e);
    return NextResponse.json(
      { ok: false, error: String(e) },
      { status: 500 }
    );
  }
}

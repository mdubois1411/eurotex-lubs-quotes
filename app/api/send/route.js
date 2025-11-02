// app/api/send/route.js
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import React from 'react';
import { QuotePDF } from '../../../lib/pdf';
import { pdf } from '@react-pdf/renderer';
import { findDatasheet, getFileContent } from '../../../lib/google-api';

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

    const body = await req.json(); // { to, cc, company, client, items, meta, emailBody, productCodes }
    const { to, cc, emailBody, productCodes } = body;

    if (!to) {
      return NextResponse.json(
        { ok: false, error: 'Missing "to" email address' },
        { status: 400 }
      );
    }

    // Generate PDF buffer
    const pdfBuffer = await pdf(<QuotePDF {...body} />).toBuffer();

    // Find and download datasheets for quoted products
    const datasheets = [];
    if (productCodes && productCodes.length > 0) {
      console.log('🔍 Buscando hojas técnicas para:', productCodes);
      for (const code of productCodes) {
        try {
          const datasheet = await findDatasheet(code);
          if (datasheet) {
            console.log(`✅ Encontrada hoja técnica: ${code}.pdf`);
            const fileBuffer = await getFileContent(datasheet.fileId);
            datasheets.push({
              filename: `${code}.pdf`,
              content: fileBuffer
            });
          } else {
            console.log(`⚠️  No se encontró hoja técnica para: ${code}`);
          }
        } catch (error) {
          console.error(`❌ Error al buscar hoja técnica para ${code}:`, error.message);
        }
      }
    }

    // Parse CC list from env or request
    const ccList = (cc && cc.length)
      ? cc
      : (process.env.DEFAULT_CC || '')
          .split(',')
          .map(s => s.trim())
          .filter(Boolean);

    const subject = `EUROTEX LUBS – Cotización ${body?.meta?.number || ''}`.trim();
    const companyName = process.env.COMPANY_NAME || 'EUROTEX INDUSTRIAL SAC – DIV. EUROTEX LUBS';

    // Prepare email body (use custom or default)
    const finalEmailBody = emailBody || `Estimado cliente,\n\nAdjunto encontrará la cotización solicitada junto con las fichas técnicas de los productos.\n\nQuedamos atentos a cualquier consulta.\n\nSaludos cordiales,\nEUROTEX LUBS`;

    // Convert plain text to HTML
    const htmlBody = finalEmailBody.split('\n').map(line =>
      line.trim() ? `<p>${line}</p>` : '<br/>'
    ).join('');

    // Prepare all attachments (quote PDF + datasheets)
    const allAttachments = [
      {
        filename: `cotizacion_${body?.meta?.number || 'tmp'}.pdf`,
        content: pdfBuffer
      },
      ...datasheets
    ];

    console.log(`📎 Total de adjuntos: ${allAttachments.length} (1 cotización + ${datasheets.length} hojas técnicas)`);

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: `${companyName} <onboarding@resend.dev>`, // Use verified domain in production
      to: Array.isArray(to) ? to : [to],
      cc: ccList.length > 0 ? ccList : undefined,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          ${htmlBody}
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e0e0e0;"/>
          <p style="font-size: 12px; color: #666; text-align: center;">
            <strong>${companyName}</strong><br/>
            ${process.env.COMPANY_ADDRESS || 'Jr. Hawaii 226 – La Molina – Lima – Perú'}
          </p>
        </div>
      `,
      attachments: allAttachments
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

// app/api/send-gmail/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import React from 'react';
import { QuotePDF } from '../../../lib/pdf';
import { pdf } from '@react-pdf/renderer';
import { findDatasheet, getFileContent } from '../../../lib/google-api';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req) {
  try {
    // Verificar credenciales de Gmail
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      return NextResponse.json(
        { ok: false, error: 'Gmail credentials not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { to, cc, emailBody, productCodes } = body;

    if (!to) {
      return NextResponse.json(
        { ok: false, error: 'Missing "to" email address' },
        { status: 400 }
      );
    }

    // Configurar transporter de Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Generar PDF de cotización
    console.log('📄 Generando PDF de cotización...');
    const pdfBuffer = await pdf(<QuotePDF {...body} />).toBuffer();

    // Buscar y descargar hojas técnicas
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

    // Preparar cuerpo del email
    const finalEmailBody = emailBody || `Estimado cliente,\n\nAdjunto encontrará la cotización solicitada junto con las fichas técnicas de los productos.\n\nQuedamos atentos a cualquier consulta.\n\nSaludos cordiales,\nEUROTEX LUBS`;

    // Convertir texto plano a HTML
    const htmlBody = finalEmailBody.split('\n').map(line =>
      line.trim() ? `<p style="margin: 8px 0;">${line}</p>` : '<br/>'
    ).join('');

    const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || 'EUROTEX INDUSTRIAL SAC – DIV. EUROTEX LUBS';
    const companyAddress = process.env.NEXT_PUBLIC_COMPANY_ADDRESS || 'Jr. Hawaii 226 – La Molina – Lima – Perú';

    // Preparar todos los adjuntos
    const allAttachments = [
      {
        filename: `cotizacion_${body?.meta?.number || 'tmp'}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf'
      },
      ...datasheets.map(ds => ({
        filename: ds.filename,
        content: ds.content,
        contentType: 'application/pdf'
      }))
    ];

    console.log(`📎 Total de adjuntos: ${allAttachments.length} (1 cotización + ${datasheets.length} hojas técnicas)`);

    // Preparar destinatarios
    const toAddresses = Array.isArray(to) ? to : [to];
    const ccAddresses = cc && Array.isArray(cc) && cc.length > 0 ? cc : undefined;

    // Configurar email
    const mailOptions = {
      from: {
        name: companyName,
        address: process.env.GMAIL_USER
      },
      to: toAddresses.join(', '),
      cc: ccAddresses ? ccAddresses.join(', ') : undefined,
      subject: `EUROTEX LUBS – Cotización ${body?.meta?.number || ''}`.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0066cc 0%, #0052a3 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">EUROTEX LUBS</h1>
            <p style="color: #e6f2ff; margin: 10px 0 0 0; font-size: 14px;">División Industrial</p>
          </div>

          <div style="background: #f8f9fa; padding: 30px; border: 1px solid #e0e0e0; border-top: none;">
            ${htmlBody}
          </div>

          <div style="background: white; padding: 20px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
            <hr style="margin: 0 0 20px 0; border: none; border-top: 2px solid #0066cc;"/>
            <table style="width: 100%; font-size: 12px; color: #666;">
              <tr>
                <td style="padding: 5px 0;">
                  <strong style="color: #333;">${companyName}</strong>
                </td>
              </tr>
              <tr>
                <td style="padding: 5px 0;">
                  📍 ${companyAddress}
                </td>
              </tr>
              <tr>
                <td style="padding: 5px 0;">
                  📧 ${process.env.GMAIL_USER}
                </td>
              </tr>
              ${body.company?.bankAccount ? `
              <tr>
                <td style="padding: 15px 0 5px 0;">
                  <strong style="color: #333;">Datos Bancarios:</strong>
                </td>
              </tr>
              <tr>
                <td style="padding: 2px 0;">
                  🏦 ${body.company.bankAccount}
                </td>
              </tr>
              ` : ''}
              ${body.company?.cci ? `
              <tr>
                <td style="padding: 2px 0;">
                  💳 CCI: ${body.company.cci}
                </td>
              </tr>
              ` : ''}
            </table>
          </div>

          <p style="text-align: center; font-size: 11px; color: #999; margin-top: 20px;">
            Este email fue generado automáticamente. Por favor no responda a este mensaje.
          </p>
        </div>
      `,
      attachments: allAttachments
    };

    // Enviar email
    console.log('📧 Enviando email...');
    const info = await transporter.sendMail(mailOptions);

    console.log('✅ Email enviado:', info.messageId);

    return NextResponse.json({
      ok: true,
      messageId: info.messageId,
      attachments: allAttachments.length,
      datasheets: datasheets.length
    });

  } catch (error) {
    console.error('❌ Error al enviar email:', error);
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }
}

// app/api/quotes/save/route.js
import { saveQuote } from '../../../../lib/google-api';

export async function POST(request) {
  try {
    const quoteData = await request.json();

    // Validar datos requeridos
    if (!quoteData.client?.name || !quoteData.items || quoteData.items.length === 0) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Datos de cotización incompletos' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const result = await saveQuote(quoteData);

    return new Response(
      JSON.stringify({
        ok: true,
        message: 'Cotización guardada exitosamente',
        quoteId: result.id,
        savedAt: result.savedAt
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error al guardar cotización:', error);
    return new Response(
      JSON.stringify({ ok: false, error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

// app/api/quotes/[id]/route.js
import { getQuoteById } from '../../../../lib/google-api';

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return new Response(
        JSON.stringify({ ok: false, error: 'ID de cotización requerido' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const quote = await getQuoteById(id);

    if (!quote) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Cotización no encontrada' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(JSON.stringify({ ok: true, quote }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al obtener cotización:', error);
    return new Response(
      JSON.stringify({ ok: false, error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

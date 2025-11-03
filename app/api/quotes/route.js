// app/api/quotes/route.js
import { getQuotes } from '../../../lib/google-api';

export async function GET() {
  try {
    const quotes = await getQuotes();

    return new Response(JSON.stringify({ ok: true, quotes }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al obtener cotizaciones:', error);
    return new Response(
      JSON.stringify({ ok: false, error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

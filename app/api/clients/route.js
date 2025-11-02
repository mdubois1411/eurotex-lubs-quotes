// app/api/clients/route.js
import { getClients } from '../../../lib/google-api';

export async function GET() {
  try {
    const clients = await getClients();

    return new Response(JSON.stringify({ ok: true, clients }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ ok: false, error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

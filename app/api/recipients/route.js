// app/api/recipients/route.js
import { getRecipients } from '../../../lib/google-api';

export async function GET() {
  try {
    const recipients = await getRecipients();

    return new Response(JSON.stringify({ ok: true, recipients }), {
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

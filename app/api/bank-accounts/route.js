// app/api/bank-accounts/route.js
import { getBankAccounts } from '../../../lib/google-api';

export async function GET() {
  try {
    const bankAccounts = await getBankAccounts();

    return new Response(JSON.stringify({ ok: true, bankAccounts }), {
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

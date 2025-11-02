// app/api/products/route.js
import { getProducts } from '../../../lib/google-api';

export async function GET() {
  try {
    const products = await getProducts();

    return new Response(JSON.stringify({ ok: true, products }), {
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

import { NextResponse } from 'next/server';
import { getProductByHandle, createCheckout } from '@/lib/shopify';

export async function POST(request: Request) {
  try {
    const { items } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Since our cart only supports 1 item (the AI Launch System) currently,
    // we'll fetch its variant ID from Shopify using its handle.
    const handle = items[0].id; // "ai-business-launch-system"
    const quantity = 1;

    const shopifyProduct = await getProductByHandle(handle);

    if (!shopifyProduct) {
      return NextResponse.json({ 
        error: `Product not found in Shopify. Make sure you created a product with handle "${handle}".` 
      }, { status: 404 });
    }

    const variantId = shopifyProduct.variants.edges[0].node.id;

    // Create the checkout
    const checkout = await createCheckout(variantId, quantity);

    if (!checkout || !checkout.webUrl) {
      return NextResponse.json({ error: 'Failed to create checkout' }, { status: 500 });
    }

    // Return the checkout URL
    return NextResponse.json({ url: checkout.webUrl });

  } catch (error: any) {
    console.error('Shopify Checkout Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

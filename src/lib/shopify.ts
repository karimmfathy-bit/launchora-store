export const shopifyFetch = async ({
  query,
  variables = {},
}: {
  query: string;
  variables?: any;
}) => {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !storefrontAccessToken) {
    throw new Error('Shopify domain or token is missing in environment variables.');
  }

  const endpoint = `https://${domain}/api/2024-01/graphql.json`;

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const body = await result.json();

    if (body.errors) {
      console.error('Shopify GraphQL Errors:', body.errors);
      throw body.errors[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (error) {
    console.error('Error fetching from Shopify API:', error);
    throw error;
  }
};

export const createCheckout = async (variantId: string, quantity: number = 1) => {
  const query = `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lineItems: [
        {
          variantId,
          quantity,
        },
      ],
    },
  };

  const response = await shopifyFetch({ query, variables });
  return response.body.data.checkoutCreate.checkout;
};

export const getProductByHandle = async (handle: string) => {
  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        variants(first: 1) {
          edges {
            node {
              id
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;
  const response = await shopifyFetch({ query, variables: { handle } });
  return response.body.data.product;
};

export const getAllProducts = async () => {
  const query = `
    {
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
            description
            variants(first: 1) {
              edges {
                node {
                  id
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const response = await shopifyFetch({ query });
  return response.body.data.products.edges.map((edge: any) => edge.node);
};

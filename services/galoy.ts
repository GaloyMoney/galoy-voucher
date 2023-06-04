import { ESCROW_TOKEN, NEXT_PUBLIC_GALOY_URL } from "@/config/variables";

export async function sendPaymentRequest(
  walletId: string,
  paymentRequest: string,
  memo: string
) {
  const sendPaymentResponse = await fetch(
    `https://${NEXT_PUBLIC_GALOY_URL}/graphql`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ESCROW_TOKEN}`,
      },
      body: JSON.stringify({
        query: `
          mutation lnInvoicePaymentSend($walletId: WalletId!, $paymentRequest: LnPaymentRequest!, $memo: Memo) {
            lnInvoicePaymentSend(input: { walletId: $walletId, paymentRequest: $paymentRequest, memo: $memo }) {
              status
              errors {
                message
                path
                code
              }
            }
          }
        `,
        variables: {
          walletId: walletId,
          paymentRequest: paymentRequest,
          memo: memo,
        },
      }),
    }
  );

  const { data: sendPaymentData, errors: sendPaymentErrors } =
    await sendPaymentResponse.json();

  return { data: sendPaymentData, errors: sendPaymentErrors };
}

export async function getRealtimePrice() {
  const response = await fetch(`https://${NEXT_PUBLIC_GALOY_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ESCROW_TOKEN}`,
    },
    body: JSON.stringify({
      query: `
        query RealtimePrice {
          realtimePrice {
            id
            timestamp
            denominatorCurrency
            usdCentPrice {
              base
              offset
              currencyUnit
            }
            btcSatPrice {
              base
              offset
              currencyUnit
            }
          }
        }
      `,
    }),
  });

  const { data, errors } = await response.json();
  return { data, errors };
}

import { gql } from "@apollo/client";
//GALOY APIS
export const LN_INVOICE_CREATE = gql`
  mutation LnInvoiceCreate($input: LnInvoiceCreateInput!) {
    lnInvoiceCreate(input: $input) {
      errors {
        message
        path
        code
      }
      invoice {
        paymentRequest
        paymentHash
        paymentSecret
        satoshis
      }
    }
  }
`;

export const LN_INVOCE_PAYMENT_STATUS = gql`
  subscription LnInvoicePaymentStatus($payment_request: LnPaymentRequest!) {
    lnInvoicePaymentStatus(input: { paymentRequest: $payment_request }) {
      status
      errors {
        message
        path
        code
      }
    }
  }
`;

//TODO need to convert this to useMutation
export async function sendPaymentRequest(
  walletId: string,
  paymentRequest: string,
  memo: string
) {
  const sendPaymentResponse = await fetch(
    `https://${process.env.NEXT_PUBLIC_GALOY_URL}/graphql`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
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

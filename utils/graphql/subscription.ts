import { gql } from "@apollo/client";

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

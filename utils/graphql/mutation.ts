import { gql } from "@apollo/client";

export const CREATE_WITHDRAW_LINK = gql`
  mutation CreateWithdrawLink($input: CreateWithdrawLinkInput!) {
    createWithdrawLink(input: $input) {
      id
      user_id
      payment_request
      payment_hash
      payment_secret
      amount
      account_type
      escrow_wallet
      status
      title
      min_withdrawable
      max_withdrawable
      unique_hash
      k1
      created_at
      updated_at
    }
  }
`;

export const UPDATE_WITHDRAW_LINK = gql`
  mutation UpdateWithdrawLink(
    $updateWithdrawLinkId: ID!
    $updateWithdrawLinkInput: UpdateWithdrawLinkInput!
  ) {
    updateWithdrawLink(
      id: $updateWithdrawLinkId
      input: $updateWithdrawLinkInput
    ) {
      account_type
      amount
      created_at
      escrow_wallet
      id
      k1
      max_withdrawable
      min_withdrawable
      payment_hash
      payment_request
      payment_secret
      status
      title
      unique_hash
      user_id
      updated_at
    }
  }
`;

export const LN_INVOICE_CREATE = gql`
  mutation LnInvoiceCreateOnBehalfOfRecipient(
    $input: LnInvoiceCreateOnBehalfOfRecipientInput!
  ) {
    lnInvoiceCreateOnBehalfOfRecipient(input: $input) {
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

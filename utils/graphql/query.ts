import { gql } from "@apollo/client";

export const GET_WITHDRAW_LINK = gql`
  query Query($getWithdrawLinkId: ID) {
    getWithdrawLink(id: $getWithdrawLinkId) {
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

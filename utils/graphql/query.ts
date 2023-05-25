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

export const GET_WITHDRAW_LINKS_BY_USER_ID = gql`
  query GetWithdrawLinksByUserId($user_id: ID!, $status: Status) {
    getWithdrawLinksByUserId(user_id: $user_id, status: $status) {
      title
      account_type
      min_withdrawable
      amount
      created_at
      id
      payment_hash
      status
      updated_at
      payment_request
      user_id
    }
  }
`;

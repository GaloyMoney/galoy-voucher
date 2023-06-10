import { gql } from "@apollo/client";

export const GET_WITHDRAW_LINK = gql`
  query GetWithdrawLink($getWithdrawLinkId: ID) {
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
      max_withdrawable
      unique_hash
      k1
      payment_secret
      escrow_wallet
    }
  }
`;

export const GET_CURRENCY_LIST = gql`
  query CurrencyList {
    currencyList {
      id
      symbol
      name
      flag
      fractionDigits
    }
  }
`;

export const GET_REAL_TIME_PRICE = gql`
  query realtimePriceInitial($currency: DisplayCurrency!) {
    realtimePrice(currency: $currency) {
      timestamp
      btcSatPrice {
        base
        offset
      }
      usdCentPrice {
        base
        offset
      }
      denominatorCurrency
    }
  }
`;

export const GET_ON_CHAIN_PAYMENT_FEES = gql`
  query GetOnChainPaymentFees(
    $getOnChainPaymentFeesId: ID!
    $btcWalletAddress: String!
  ) {
    getOnChainPaymentFees(
      id: $getOnChainPaymentFeesId
      btc_wallet_address: $btcWalletAddress
    ) {
      fees
    }
  }
`;
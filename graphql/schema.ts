//TODO need to add error fields
const typeDefs = `#graphql
type WithdrawLink {
  id: ID!
  user_id: ID!
  payment_request: String!
  payment_hash: String!
  payment_secret: String!
  amount: Float!
  account_type: String!
  escrow_wallet: String!
  status: Status!
  title: String!
  min_withdrawable: Float!
  max_withdrawable: Float!
  unique_hash: String!
  k1: String
  created_at: String!
  updated_at: String!
  commission_percentage: Float
}

type FeesResult {
  fees: Float!
}

type sendPaymentOnChainResult {
  status: String!
  amount: Float!
}

enum Status {
  FUNDED
  UNFUNDED
  PAID
}

type Query {
  getWithdrawLink(id: ID, unique_hash: String, k1: String, payment_hash: String): WithdrawLink
  getAllWithdrawLinks: [WithdrawLink!]!
  getWithdrawLinksByUserId(user_id: ID!, status: Status): [WithdrawLink!]!
  getOnChainPaymentFees(id: ID!, btc_wallet_address: String!): FeesResult!
}

type Mutation {
  createWithdrawLink(input: CreateWithdrawLinkInput!): WithdrawLink!
  updateWithdrawLink(id: ID!, input: UpdateWithdrawLinkInput!): WithdrawLink!
  deleteWithdrawLink(id: ID!): ID!
  sendPaymentOnChain(id: ID!, btc_wallet_address: String!): sendPaymentOnChainResult!
}

input CreateWithdrawLinkInput {
  user_id: ID!
  payment_request: String!
  payment_hash: String!
  payment_secret: String!
  amount: Float!
  account_type: String!
  escrow_wallet: String!
  status: Status
  title: String!
  min_withdrawable: Float!
  max_withdrawable: Float!
  unique_hash: String!
  k1: String
  commission_percentage: Float
}

input UpdateWithdrawLinkInput {
  user_id: ID
  payment_request: String
  payment_hash: String
  payment_secret: String
  amount: Float
  account_type: String
  escrow_wallet: String
  status: Status
  title: String
  min_withdrawable: Float
  max_withdrawable: Float
  unique_hash: String
  k1: String
  commission_percentage: Float
}
`;

export default typeDefs;

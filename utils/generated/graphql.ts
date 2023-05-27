import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** An Opaque Bearer token */
  AuthToken: { input: any; output: any; }
  /** (Positive) Cent amount (1/100 of a dollar) */
  CentAmount: { input: any; output: any; }
  /** An alias name that a user can set for a wallet (with which they have transactions) */
  ContactAlias: { input: any; output: any; }
  /** Display currency of an account */
  DisplayCurrency: { input: any; output: any; }
  /** Hex-encoded string of 32 bytes */
  Hex32Bytes: { input: any; output: any; }
  Language: { input: any; output: any; }
  LnPaymentPreImage: { input: any; output: any; }
  /** BOLT11 lightning invoice payment request with the amount included */
  LnPaymentRequest: { input: any; output: any; }
  LnPaymentSecret: { input: any; output: any; }
  /** Text field in a lightning payment transaction */
  Memo: { input: any; output: any; }
  /** An address for an on-chain bitcoin destination */
  OnChainAddress: { input: any; output: any; }
  OnChainTxHash: { input: any; output: any; }
  /** An authentication code valid for a single use */
  OneTimeAuthCode: { input: any; output: any; }
  PaymentHash: { input: any; output: any; }
  /** Phone number which includes country code */
  Phone: { input: any; output: any; }
  /** Non-fractional signed whole numeric value between -(2^53) + 1 and 2^53 - 1 */
  SafeInt: { input: any; output: any; }
  /** (Positive) Satoshi amount */
  SatAmount: { input: any; output: any; }
  /** (Positive) amount of seconds */
  Seconds: { input: any; output: any; }
  /** An amount (of a currency) that can be negative (e.g. in a transaction) */
  SignedAmount: { input: any; output: any; }
  /** A string amount (of a currency) that can be negative (e.g. in a transaction) */
  SignedDisplayMajorAmount: { input: any; output: any; }
  /** (Positive) Number of blocks in which the transaction is expected to be confirmed */
  TargetConfirmations: { input: any; output: any; }
  /** Timestamp field, serialized as Unix time (the number of seconds since the Unix epoch) */
  Timestamp: { input: any; output: any; }
  /** Unique identifier of a user */
  Username: { input: any; output: any; }
  /** Unique identifier of a wallet */
  WalletId: { input: any; output: any; }
};

export type Account = {
  csvTransactions: Scalars['String']['output'];
  defaultWalletId: Scalars['WalletId']['output'];
  displayCurrency: Scalars['DisplayCurrency']['output'];
  id: Scalars['ID']['output'];
  level: AccountLevel;
  limits: AccountLimits;
  realtimePrice: RealtimePrice;
  transactions?: Maybe<TransactionConnection>;
  wallets: Array<Wallet>;
};


export type AccountCsvTransactionsArgs = {
  walletIds: Array<Scalars['WalletId']['input']>;
};


export type AccountTransactionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  walletIds?: InputMaybe<Array<InputMaybe<Scalars['WalletId']['input']>>>;
};

export enum AccountLevel {
  One = 'ONE',
  Two = 'TWO'
}

export type AccountLimit = {
  /** The rolling time interval in seconds that the limits would apply for. */
  interval?: Maybe<Scalars['Seconds']['output']>;
  /** The amount of cents remaining below the limit for the current 24 hour period. */
  remainingLimit?: Maybe<Scalars['CentAmount']['output']>;
  /** The current maximum limit for a given 24 hour period. */
  totalLimit: Scalars['CentAmount']['output'];
};

export type AccountLimits = {
  __typename?: 'AccountLimits';
  /** Limits for converting between currencies among a account's own wallets. */
  convert: Array<AccountLimit>;
  /** Limits for sending to other internal accounts. */
  internalSend: Array<AccountLimit>;
  /** Limits for withdrawing to external onchain or lightning destinations. */
  withdrawal: Array<AccountLimit>;
};

export type AccountUpdateDefaultWalletIdInput = {
  walletId: Scalars['WalletId']['input'];
};

export type AccountUpdateDefaultWalletIdPayload = {
  __typename?: 'AccountUpdateDefaultWalletIdPayload';
  account?: Maybe<ConsumerAccount>;
  errors: Array<Error>;
};

export type AccountUpdateDisplayCurrencyInput = {
  currency: Scalars['DisplayCurrency']['input'];
};

export type AccountUpdateDisplayCurrencyPayload = {
  __typename?: 'AccountUpdateDisplayCurrencyPayload';
  account?: Maybe<ConsumerAccount>;
  errors: Array<Error>;
};

export type AuthTokenPayload = {
  __typename?: 'AuthTokenPayload';
  authToken?: Maybe<Scalars['AuthToken']['output']>;
  errors: Array<Error>;
};

/** A wallet belonging to an account which contains a BTC balance and a list of transactions. */
export type BtcWallet = Wallet & {
  __typename?: 'BTCWallet';
  accountId: Scalars['ID']['output'];
  /** A balance stored in BTC. */
  balance: Scalars['SignedAmount']['output'];
  id: Scalars['ID']['output'];
  /** An unconfirmed incoming onchain balance. */
  pendingIncomingBalance: Scalars['SignedAmount']['output'];
  /** A list of BTC transactions associated with this wallet. */
  transactions?: Maybe<TransactionConnection>;
  transactionsByAddress?: Maybe<TransactionConnection>;
  walletCurrency: WalletCurrency;
};


/** A wallet belonging to an account which contains a BTC balance and a list of transactions. */
export type BtcWalletTransactionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


/** A wallet belonging to an account which contains a BTC balance and a list of transactions. */
export type BtcWalletTransactionsByAddressArgs = {
  address: Scalars['OnChainAddress']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type BuildInformation = {
  __typename?: 'BuildInformation';
  buildTime?: Maybe<Scalars['Timestamp']['output']>;
  commitHash?: Maybe<Scalars['String']['output']>;
  helmRevision?: Maybe<Scalars['Int']['output']>;
};

export type CaptchaCreateChallengePayload = {
  __typename?: 'CaptchaCreateChallengePayload';
  errors: Array<Error>;
  result?: Maybe<CaptchaCreateChallengeResult>;
};

export type CaptchaCreateChallengeResult = {
  __typename?: 'CaptchaCreateChallengeResult';
  challengeCode: Scalars['String']['output'];
  failbackMode: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  newCaptcha: Scalars['Boolean']['output'];
};

export type CaptchaRequestAuthCodeInput = {
  challengeCode: Scalars['String']['input'];
  channel?: InputMaybe<PhoneCodeChannelType>;
  phone: Scalars['Phone']['input'];
  secCode: Scalars['String']['input'];
  validationCode: Scalars['String']['input'];
};

export type CentAmountPayload = {
  __typename?: 'CentAmountPayload';
  amount?: Maybe<Scalars['CentAmount']['output']>;
  errors: Array<Error>;
};

export type ConsumerAccount = Account & {
  __typename?: 'ConsumerAccount';
  /** return CSV stream, base64 encoded, of the list of transactions in the wallet */
  csvTransactions: Scalars['String']['output'];
  defaultWalletId: Scalars['WalletId']['output'];
  displayCurrency: Scalars['DisplayCurrency']['output'];
  id: Scalars['ID']['output'];
  level: AccountLevel;
  limits: AccountLimits;
  /** List the quiz questions of the consumer account */
  quiz: Array<Quiz>;
  realtimePrice: RealtimePrice;
  /** A list of all transactions associated with walletIds optionally passed. */
  transactions?: Maybe<TransactionConnection>;
  wallets: Array<Wallet>;
};


export type ConsumerAccountCsvTransactionsArgs = {
  walletIds: Array<Scalars['WalletId']['input']>;
};


export type ConsumerAccountTransactionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  walletIds?: InputMaybe<Array<InputMaybe<Scalars['WalletId']['input']>>>;
};

export type Coordinates = {
  __typename?: 'Coordinates';
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
};

export type CreateWithdrawLinkInput = {
  account_type: Scalars['String']['input'];
  amount: Scalars['Float']['input'];
  escrow_wallet: Scalars['String']['input'];
  k1?: InputMaybe<Scalars['String']['input']>;
  max_withdrawable: Scalars['Float']['input'];
  min_withdrawable: Scalars['Float']['input'];
  payment_hash: Scalars['String']['input'];
  payment_request: Scalars['String']['input'];
  payment_secret: Scalars['String']['input'];
  status?: InputMaybe<Status>;
  title: Scalars['String']['input'];
  unique_hash: Scalars['String']['input'];
  user_id: Scalars['ID']['input'];
};

export type Currency = {
  __typename?: 'Currency';
  flag: Scalars['String']['output'];
  fractionDigits: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
};

export type DeviceNotificationTokenCreateInput = {
  deviceToken: Scalars['String']['input'];
};

export type Error = {
  code?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  path?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export enum ExchangeCurrencyUnit {
  Btcsat = 'BTCSAT',
  Usdcent = 'USDCENT'
}

/** Provides global settings for the application which might have an impact for the user. */
export type Globals = {
  __typename?: 'Globals';
  buildInformation: BuildInformation;
  /** The domain name for lightning addresses accepted by this Galoy instance */
  lightningAddressDomain: Scalars['String']['output'];
  lightningAddressDomainAliases: Array<Scalars['String']['output']>;
  /** Which network (mainnet, testnet, regtest, signet) this instance is running on. */
  network: Network;
  /**
   * A list of public keys for the running lightning nodes.
   * This can be used to know if an invoice belongs to one of our nodes.
   */
  nodesIds: Array<Scalars['String']['output']>;
};

export type GraphQlApplicationError = Error & {
  __typename?: 'GraphQLApplicationError';
  code?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  path?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type InitiationVia = InitiationViaIntraLedger | InitiationViaLn | InitiationViaOnChain;

export type InitiationViaIntraLedger = {
  __typename?: 'InitiationViaIntraLedger';
  counterPartyUsername?: Maybe<Scalars['Username']['output']>;
  counterPartyWalletId?: Maybe<Scalars['WalletId']['output']>;
};

export type InitiationViaLn = {
  __typename?: 'InitiationViaLn';
  paymentHash: Scalars['PaymentHash']['output'];
};

export type InitiationViaOnChain = {
  __typename?: 'InitiationViaOnChain';
  address: Scalars['OnChainAddress']['output'];
};

export type IntraLedgerPaymentSendInput = {
  /** Amount in satoshis. */
  amount: Scalars['SatAmount']['input'];
  /** Optional memo to be attached to the payment. */
  memo?: InputMaybe<Scalars['Memo']['input']>;
  recipientWalletId: Scalars['WalletId']['input'];
  /** The wallet ID of the sender. */
  walletId: Scalars['WalletId']['input'];
};

export type IntraLedgerUpdate = {
  __typename?: 'IntraLedgerUpdate';
  amount: Scalars['SatAmount']['output'];
  displayCurrencyPerSat: Scalars['Float']['output'];
  txNotificationType: TxNotificationType;
  /** @deprecated updated over displayCurrencyPerSat */
  usdPerSat: Scalars['Float']['output'];
  walletId: Scalars['WalletId']['output'];
};

export type IntraLedgerUsdPaymentSendInput = {
  /** Amount in cents. */
  amount: Scalars['CentAmount']['input'];
  /** Optional memo to be attached to the payment. */
  memo?: InputMaybe<Scalars['Memo']['input']>;
  recipientWalletId: Scalars['WalletId']['input'];
  /** The wallet ID of the sender. */
  walletId: Scalars['WalletId']['input'];
};

export enum InvoicePaymentStatus {
  Expired = 'EXPIRED',
  Paid = 'PAID',
  Pending = 'PENDING'
}

export type LnInvoice = {
  __typename?: 'LnInvoice';
  paymentHash: Scalars['PaymentHash']['output'];
  paymentRequest: Scalars['LnPaymentRequest']['output'];
  paymentSecret: Scalars['LnPaymentSecret']['output'];
  satoshis?: Maybe<Scalars['SatAmount']['output']>;
};

export type LnInvoiceCreateInput = {
  /** Amount in satoshis. */
  amount: Scalars['SatAmount']['input'];
  /** Optional memo for the lightning invoice. */
  memo?: InputMaybe<Scalars['Memo']['input']>;
  /** Wallet ID for a BTC wallet belonging to the current account. */
  walletId: Scalars['WalletId']['input'];
};

export type LnInvoiceCreateOnBehalfOfRecipientInput = {
  /** Amount in satoshis. */
  amount: Scalars['SatAmount']['input'];
  descriptionHash?: InputMaybe<Scalars['Hex32Bytes']['input']>;
  /** Optional memo for the lightning invoice. */
  memo?: InputMaybe<Scalars['Memo']['input']>;
  /** Wallet ID for a BTC wallet which belongs to any account. */
  recipientWalletId: Scalars['WalletId']['input'];
};

export type LnInvoiceFeeProbeInput = {
  paymentRequest: Scalars['LnPaymentRequest']['input'];
  walletId: Scalars['WalletId']['input'];
};

export type LnInvoicePayload = {
  __typename?: 'LnInvoicePayload';
  errors: Array<Error>;
  invoice?: Maybe<LnInvoice>;
};

export type LnInvoicePaymentInput = {
  /** Optional memo to associate with the lightning invoice. */
  memo?: InputMaybe<Scalars['Memo']['input']>;
  /** Payment request representing the invoice which is being paid. */
  paymentRequest: Scalars['LnPaymentRequest']['input'];
  /** Wallet ID with sufficient balance to cover amount of invoice.  Must belong to the account of the current user. */
  walletId: Scalars['WalletId']['input'];
};

export type LnInvoicePaymentStatusInput = {
  paymentRequest: Scalars['LnPaymentRequest']['input'];
};

export type LnInvoicePaymentStatusPayload = {
  __typename?: 'LnInvoicePaymentStatusPayload';
  errors: Array<Error>;
  status?: Maybe<InvoicePaymentStatus>;
};

export type LnNoAmountInvoice = {
  __typename?: 'LnNoAmountInvoice';
  paymentHash: Scalars['PaymentHash']['output'];
  paymentRequest: Scalars['LnPaymentRequest']['output'];
  paymentSecret: Scalars['LnPaymentSecret']['output'];
};

export type LnNoAmountInvoiceCreateInput = {
  /** Optional memo for the lightning invoice. */
  memo?: InputMaybe<Scalars['Memo']['input']>;
  /** ID for either a USD or BTC wallet belonging to the account of the current user. */
  walletId: Scalars['WalletId']['input'];
};

export type LnNoAmountInvoiceCreateOnBehalfOfRecipientInput = {
  /** Optional memo for the lightning invoice. */
  memo?: InputMaybe<Scalars['Memo']['input']>;
  /** ID for either a USD or BTC wallet which belongs to the account of any user. */
  recipientWalletId: Scalars['WalletId']['input'];
};

export type LnNoAmountInvoiceFeeProbeInput = {
  amount: Scalars['SatAmount']['input'];
  paymentRequest: Scalars['LnPaymentRequest']['input'];
  walletId: Scalars['WalletId']['input'];
};

export type LnNoAmountInvoicePayload = {
  __typename?: 'LnNoAmountInvoicePayload';
  errors: Array<Error>;
  invoice?: Maybe<LnNoAmountInvoice>;
};

export type LnNoAmountInvoicePaymentInput = {
  /** Amount to pay in satoshis. */
  amount: Scalars['SatAmount']['input'];
  /** Optional memo to associate with the lightning invoice. */
  memo?: InputMaybe<Scalars['Memo']['input']>;
  /** Payment request representing the invoice which is being paid. */
  paymentRequest: Scalars['LnPaymentRequest']['input'];
  /** Wallet ID with sufficient balance to cover amount defined in mutation request.  Must belong to the account of the current user. */
  walletId: Scalars['WalletId']['input'];
};

export type LnNoAmountUsdInvoiceFeeProbeInput = {
  amount: Scalars['CentAmount']['input'];
  paymentRequest: Scalars['LnPaymentRequest']['input'];
  walletId: Scalars['WalletId']['input'];
};

export type LnNoAmountUsdInvoicePaymentInput = {
  /** Amount to pay in USD cents. */
  amount: Scalars['CentAmount']['input'];
  /** Optional memo to associate with the lightning invoice. */
  memo?: InputMaybe<Scalars['Memo']['input']>;
  /** Payment request representing the invoice which is being paid. */
  paymentRequest: Scalars['LnPaymentRequest']['input'];
  /** Wallet ID with sufficient balance to cover amount defined in mutation request.  Must belong to the account of the current user. */
  walletId: Scalars['WalletId']['input'];
};

export type LnUpdate = {
  __typename?: 'LnUpdate';
  paymentHash: Scalars['PaymentHash']['output'];
  status: InvoicePaymentStatus;
  walletId: Scalars['WalletId']['output'];
};

export type LnUsdInvoiceCreateInput = {
  /** Amount in USD cents. */
  amount: Scalars['CentAmount']['input'];
  /** Optional memo for the lightning invoice. */
  memo?: InputMaybe<Scalars['Memo']['input']>;
  /** Wallet ID for a USD wallet belonging to the current user. */
  walletId: Scalars['WalletId']['input'];
};

export type LnUsdInvoiceCreateOnBehalfOfRecipientInput = {
  /** Amount in USD cents. */
  amount: Scalars['CentAmount']['input'];
  descriptionHash?: InputMaybe<Scalars['Hex32Bytes']['input']>;
  /** Optional memo for the lightning invoice. Acts as a note to the recipient. */
  memo?: InputMaybe<Scalars['Memo']['input']>;
  /** Wallet ID for a USD wallet which belongs to the account of any user. */
  recipientWalletId: Scalars['WalletId']['input'];
};

export type LnUsdInvoiceFeeProbeInput = {
  paymentRequest: Scalars['LnPaymentRequest']['input'];
  walletId: Scalars['WalletId']['input'];
};

export type MapInfo = {
  __typename?: 'MapInfo';
  coordinates: Coordinates;
  title: Scalars['String']['output'];
};

export type MapMarker = {
  __typename?: 'MapMarker';
  mapInfo: MapInfo;
  username?: Maybe<Scalars['Username']['output']>;
};

export type MobileVersions = {
  __typename?: 'MobileVersions';
  currentSupported: Scalars['Int']['output'];
  minSupported: Scalars['Int']['output'];
  platform: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  accountUpdateDefaultWalletId: AccountUpdateDefaultWalletIdPayload;
  accountUpdateDisplayCurrency: AccountUpdateDisplayCurrencyPayload;
  captchaCreateChallenge: CaptchaCreateChallengePayload;
  captchaRequestAuthCode: SuccessPayload;
  createWithdrawLink: WithdrawLink;
  deleteWithdrawLink: Scalars['ID']['output'];
  deviceNotificationTokenCreate: SuccessPayload;
  /**
   * Actions a payment which is internal to the ledger e.g. it does
   * not use onchain/lightning. Returns payment status (success,
   * failed, pending, already_paid).
   */
  intraLedgerPaymentSend: PaymentSendPayload;
  /**
   * Actions a payment which is internal to the ledger e.g. it does
   * not use onchain/lightning. Returns payment status (success,
   * failed, pending, already_paid).
   */
  intraLedgerUsdPaymentSend: PaymentSendPayload;
  /**
   * Returns a lightning invoice for an associated wallet.
   * When invoice is paid the value will be credited to a BTC wallet.
   * Expires after 24 hours.
   */
  lnInvoiceCreate: LnInvoicePayload;
  /**
   * Returns a lightning invoice for an associated wallet.
   * When invoice is paid the value will be credited to a BTC wallet.
   * Expires after 24 hours.
   */
  lnInvoiceCreateOnBehalfOfRecipient: LnInvoicePayload;
  lnInvoiceFeeProbe: SatAmountPayload;
  /**
   * Pay a lightning invoice using a balance from a wallet which is owned by the account of the current user.
   * Provided wallet can be USD or BTC and must have sufficient balance to cover amount in lightning invoice.
   * Returns payment status (success, failed, pending, already_paid).
   */
  lnInvoicePaymentSend: PaymentSendPayload;
  /**
   * Returns a lightning invoice for an associated wallet.
   * Can be used to receive any supported currency value (currently USD or BTC).
   * Expires after 24 hours.
   */
  lnNoAmountInvoiceCreate: LnNoAmountInvoicePayload;
  /**
   * Returns a lightning invoice for an associated wallet.
   * Can be used to receive any supported currency value (currently USD or BTC).
   * Expires after 24 hours.
   */
  lnNoAmountInvoiceCreateOnBehalfOfRecipient: LnNoAmountInvoicePayload;
  lnNoAmountInvoiceFeeProbe: SatAmountPayload;
  /**
   * Pay a lightning invoice using a balance from a wallet which is owned by the account of the current user.
   * Provided wallet must be BTC and must have sufficient balance to cover amount specified in mutation request.
   * Returns payment status (success, failed, pending, already_paid).
   */
  lnNoAmountInvoicePaymentSend: PaymentSendPayload;
  lnNoAmountUsdInvoiceFeeProbe: CentAmountPayload;
  /**
   * Pay a lightning invoice using a balance from a wallet which is owned by the account of the current user.
   * Provided wallet must be USD and have sufficient balance to cover amount specified in mutation request.
   * Returns payment status (success, failed, pending, already_paid).
   */
  lnNoAmountUsdInvoicePaymentSend: PaymentSendPayload;
  /**
   * Returns a lightning invoice denominated in satoshis for an associated wallet.
   * When invoice is paid the equivalent value at invoice creation will be credited to a USD wallet.
   * Expires after 5 minutes (short expiry time because there is a USD/BTC exchange rate
   * associated with the amount).
   */
  lnUsdInvoiceCreate: LnInvoicePayload;
  /**
   * Returns a lightning invoice denominated in satoshis for an associated wallet.
   * When invoice is paid the equivalent value at invoice creation will be credited to a USD wallet.
   * Expires after 5 minutes (short expiry time because there is a USD/BTC exchange rate
   *   associated with the amount).
   */
  lnUsdInvoiceCreateOnBehalfOfRecipient: LnInvoicePayload;
  lnUsdInvoiceFeeProbe: SatAmountPayload;
  onChainAddressCreate: OnChainAddressPayload;
  onChainAddressCurrent: OnChainAddressPayload;
  onChainPaymentSend: PaymentSendPayload;
  onChainPaymentSendAll: PaymentSendPayload;
  onChainUsdPaymentSend: PaymentSendPayload;
  onChainUsdPaymentSendAsBtcDenominated: PaymentSendPayload;
  quizCompleted: QuizCompletedPayload;
  updateWithdrawLink: WithdrawLink;
  /** @deprecated will be moved to AccountContact */
  userContactUpdateAlias: UserContactUpdateAliasPayload;
  userLogin: AuthTokenPayload;
  userLogout: AuthTokenPayload;
  /** @deprecated Use QuizCompletedMutation instead */
  userQuizQuestionUpdateCompleted: UserQuizQuestionUpdateCompletedPayload;
  userRequestAuthCode: SuccessPayload;
  userUpdateLanguage: UserUpdateLanguagePayload;
  /** @deprecated Username will be moved to @Handle in Accounts. Also SetUsername naming should be used instead of UpdateUsername to reflect the idempotency of Handles */
  userUpdateUsername: UserUpdateUsernamePayload;
};


export type MutationAccountUpdateDefaultWalletIdArgs = {
  input: AccountUpdateDefaultWalletIdInput;
};


export type MutationAccountUpdateDisplayCurrencyArgs = {
  input: AccountUpdateDisplayCurrencyInput;
};


export type MutationCaptchaRequestAuthCodeArgs = {
  input: CaptchaRequestAuthCodeInput;
};


export type MutationCreateWithdrawLinkArgs = {
  input: CreateWithdrawLinkInput;
};


export type MutationDeleteWithdrawLinkArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeviceNotificationTokenCreateArgs = {
  input: DeviceNotificationTokenCreateInput;
};


export type MutationIntraLedgerPaymentSendArgs = {
  input: IntraLedgerPaymentSendInput;
};


export type MutationIntraLedgerUsdPaymentSendArgs = {
  input: IntraLedgerUsdPaymentSendInput;
};


export type MutationLnInvoiceCreateArgs = {
  input: LnInvoiceCreateInput;
};


export type MutationLnInvoiceCreateOnBehalfOfRecipientArgs = {
  input: LnInvoiceCreateOnBehalfOfRecipientInput;
};


export type MutationLnInvoiceFeeProbeArgs = {
  input: LnInvoiceFeeProbeInput;
};


export type MutationLnInvoicePaymentSendArgs = {
  input: LnInvoicePaymentInput;
};


export type MutationLnNoAmountInvoiceCreateArgs = {
  input: LnNoAmountInvoiceCreateInput;
};


export type MutationLnNoAmountInvoiceCreateOnBehalfOfRecipientArgs = {
  input: LnNoAmountInvoiceCreateOnBehalfOfRecipientInput;
};


export type MutationLnNoAmountInvoiceFeeProbeArgs = {
  input: LnNoAmountInvoiceFeeProbeInput;
};


export type MutationLnNoAmountInvoicePaymentSendArgs = {
  input: LnNoAmountInvoicePaymentInput;
};


export type MutationLnNoAmountUsdInvoiceFeeProbeArgs = {
  input: LnNoAmountUsdInvoiceFeeProbeInput;
};


export type MutationLnNoAmountUsdInvoicePaymentSendArgs = {
  input: LnNoAmountUsdInvoicePaymentInput;
};


export type MutationLnUsdInvoiceCreateArgs = {
  input: LnUsdInvoiceCreateInput;
};


export type MutationLnUsdInvoiceCreateOnBehalfOfRecipientArgs = {
  input: LnUsdInvoiceCreateOnBehalfOfRecipientInput;
};


export type MutationLnUsdInvoiceFeeProbeArgs = {
  input: LnUsdInvoiceFeeProbeInput;
};


export type MutationOnChainAddressCreateArgs = {
  input: OnChainAddressCreateInput;
};


export type MutationOnChainAddressCurrentArgs = {
  input: OnChainAddressCurrentInput;
};


export type MutationOnChainPaymentSendArgs = {
  input: OnChainPaymentSendInput;
};


export type MutationOnChainPaymentSendAllArgs = {
  input: OnChainPaymentSendAllInput;
};


export type MutationOnChainUsdPaymentSendArgs = {
  input: OnChainUsdPaymentSendInput;
};


export type MutationOnChainUsdPaymentSendAsBtcDenominatedArgs = {
  input: OnChainUsdPaymentSendAsBtcDenominatedInput;
};


export type MutationQuizCompletedArgs = {
  input: QuizCompletedInput;
};


export type MutationUpdateWithdrawLinkArgs = {
  id: Scalars['ID']['input'];
  input: UpdateWithdrawLinkInput;
};


export type MutationUserContactUpdateAliasArgs = {
  input: UserContactUpdateAliasInput;
};


export type MutationUserLoginArgs = {
  input: UserLoginInput;
};


export type MutationUserLogoutArgs = {
  input: UserLogoutInput;
};


export type MutationUserQuizQuestionUpdateCompletedArgs = {
  input: UserQuizQuestionUpdateCompletedInput;
};


export type MutationUserRequestAuthCodeArgs = {
  input: UserRequestAuthCodeInput;
};


export type MutationUserUpdateLanguageArgs = {
  input: UserUpdateLanguageInput;
};


export type MutationUserUpdateUsernameArgs = {
  input: UserUpdateUsernameInput;
};

export type MyUpdatesPayload = {
  __typename?: 'MyUpdatesPayload';
  errors: Array<Error>;
  me?: Maybe<User>;
  update?: Maybe<UserUpdate>;
};

export enum Network {
  Mainnet = 'mainnet',
  Regtest = 'regtest',
  Signet = 'signet',
  Testnet = 'testnet'
}

export type OnChainAddressCreateInput = {
  walletId: Scalars['WalletId']['input'];
};

export type OnChainAddressCurrentInput = {
  walletId: Scalars['WalletId']['input'];
};

export type OnChainAddressPayload = {
  __typename?: 'OnChainAddressPayload';
  address?: Maybe<Scalars['OnChainAddress']['output']>;
  errors: Array<Error>;
};

export type OnChainPaymentSendAllInput = {
  address: Scalars['OnChainAddress']['input'];
  memo?: InputMaybe<Scalars['Memo']['input']>;
  targetConfirmations?: InputMaybe<Scalars['TargetConfirmations']['input']>;
  walletId: Scalars['WalletId']['input'];
};

export type OnChainPaymentSendInput = {
  address: Scalars['OnChainAddress']['input'];
  amount: Scalars['SatAmount']['input'];
  memo?: InputMaybe<Scalars['Memo']['input']>;
  targetConfirmations?: InputMaybe<Scalars['TargetConfirmations']['input']>;
  walletId: Scalars['WalletId']['input'];
};

export type OnChainTxFee = {
  __typename?: 'OnChainTxFee';
  amount: Scalars['SatAmount']['output'];
  targetConfirmations: Scalars['TargetConfirmations']['output'];
};

export type OnChainUpdate = {
  __typename?: 'OnChainUpdate';
  amount: Scalars['SatAmount']['output'];
  displayCurrencyPerSat: Scalars['Float']['output'];
  txHash: Scalars['OnChainTxHash']['output'];
  txNotificationType: TxNotificationType;
  /** @deprecated updated over displayCurrencyPerSat */
  usdPerSat: Scalars['Float']['output'];
  walletId: Scalars['WalletId']['output'];
};

export type OnChainUsdPaymentSendAsBtcDenominatedInput = {
  address: Scalars['OnChainAddress']['input'];
  amount: Scalars['SatAmount']['input'];
  memo?: InputMaybe<Scalars['Memo']['input']>;
  targetConfirmations?: InputMaybe<Scalars['TargetConfirmations']['input']>;
  walletId: Scalars['WalletId']['input'];
};

export type OnChainUsdPaymentSendInput = {
  address: Scalars['OnChainAddress']['input'];
  amount: Scalars['CentAmount']['input'];
  memo?: InputMaybe<Scalars['Memo']['input']>;
  targetConfirmations?: InputMaybe<Scalars['TargetConfirmations']['input']>;
  walletId: Scalars['WalletId']['input'];
};

export type OnChainUsdTxFee = {
  __typename?: 'OnChainUsdTxFee';
  amount: Scalars['CentAmount']['output'];
  targetConfirmations: Scalars['TargetConfirmations']['output'];
};

export type OneDayAccountLimit = AccountLimit & {
  __typename?: 'OneDayAccountLimit';
  /** The rolling time interval value in seconds for the current 24 hour period. */
  interval?: Maybe<Scalars['Seconds']['output']>;
  /** The amount of cents remaining below the limit for the current 24 hour period. */
  remainingLimit?: Maybe<Scalars['CentAmount']['output']>;
  /** The current maximum limit for a given 24 hour period. */
  totalLimit: Scalars['CentAmount']['output'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type PaymentSendPayload = {
  __typename?: 'PaymentSendPayload';
  errors: Array<Error>;
  status?: Maybe<PaymentSendResult>;
};

export enum PaymentSendResult {
  AlreadyPaid = 'ALREADY_PAID',
  Failure = 'FAILURE',
  Pending = 'PENDING',
  Success = 'SUCCESS'
}

export enum PhoneCodeChannelType {
  Sms = 'SMS',
  Whatsapp = 'WHATSAPP'
}

/** Price amount expressed in base/offset. To calculate, use: `base / 10^offset` */
export type Price = {
  __typename?: 'Price';
  base: Scalars['SafeInt']['output'];
  currencyUnit: Scalars['String']['output'];
  formattedAmount: Scalars['String']['output'];
  offset: Scalars['Int']['output'];
};

/** The range for the X axis in the BTC price graph */
export enum PriceGraphRange {
  FiveYears = 'FIVE_YEARS',
  OneDay = 'ONE_DAY',
  OneMonth = 'ONE_MONTH',
  OneWeek = 'ONE_WEEK',
  OneYear = 'ONE_YEAR'
}

export type PriceInput = {
  amount: Scalars['SatAmount']['input'];
  amountCurrencyUnit: ExchangeCurrencyUnit;
  priceCurrencyUnit: ExchangeCurrencyUnit;
};

export type PriceInterface = {
  base: Scalars['SafeInt']['output'];
  /** @deprecated Deprecated due to type renaming */
  currencyUnit: Scalars['String']['output'];
  offset: Scalars['Int']['output'];
};

/** Price of 1 sat in base/offset. To calculate, use: `base / 10^offset` */
export type PriceOfOneSatInMinorUnit = PriceInterface & {
  __typename?: 'PriceOfOneSatInMinorUnit';
  base: Scalars['SafeInt']['output'];
  /** @deprecated Deprecated due to type renaming */
  currencyUnit: Scalars['String']['output'];
  offset: Scalars['Int']['output'];
};

/** Price of 1 sat or 1 usd cent in base/offset. To calculate, use: `base / 10^offset` */
export type PriceOfOneSettlementMinorUnitInDisplayMinorUnit = PriceInterface & {
  __typename?: 'PriceOfOneSettlementMinorUnitInDisplayMinorUnit';
  base: Scalars['SafeInt']['output'];
  /** @deprecated Deprecated due to type renaming */
  currencyUnit: Scalars['String']['output'];
  /** @deprecated Deprecated please use `base / 10^offset` */
  formattedAmount: Scalars['String']['output'];
  offset: Scalars['Int']['output'];
};

/** Price of 1 usd cent in base/offset. To calculate, use: `base / 10^offset` */
export type PriceOfOneUsdCentInMinorUnit = PriceInterface & {
  __typename?: 'PriceOfOneUsdCentInMinorUnit';
  base: Scalars['SafeInt']['output'];
  /** @deprecated Deprecated due to type renaming */
  currencyUnit: Scalars['String']['output'];
  offset: Scalars['Int']['output'];
};

export type PricePayload = {
  __typename?: 'PricePayload';
  errors: Array<Error>;
  price?: Maybe<Price>;
};

export type PricePoint = {
  __typename?: 'PricePoint';
  price: Price;
  /** Unix timestamp (number of seconds elapsed since January 1, 1970 00:00:00 UTC) */
  timestamp: Scalars['Timestamp']['output'];
};

/** A public view of a generic wallet which stores value in one of our supported currencies. */
export type PublicWallet = {
  __typename?: 'PublicWallet';
  id: Scalars['ID']['output'];
  walletCurrency: WalletCurrency;
};

export type Query = {
  __typename?: 'Query';
  accountDefaultWallet: PublicWallet;
  /** @deprecated Deprecated in favor of realtimePrice */
  btcPrice?: Maybe<Price>;
  btcPriceList?: Maybe<Array<Maybe<PricePoint>>>;
  businessMapMarkers?: Maybe<Array<Maybe<MapMarker>>>;
  currencyList: Array<Currency>;
  getAllWithdrawLinks: Array<WithdrawLink>;
  getWithdrawLink?: Maybe<WithdrawLink>;
  getWithdrawLinksByUserId: Array<WithdrawLink>;
  globals?: Maybe<Globals>;
  lnInvoicePaymentStatus: LnInvoicePaymentStatusPayload;
  me?: Maybe<User>;
  mobileVersions?: Maybe<Array<Maybe<MobileVersions>>>;
  onChainTxFee: OnChainTxFee;
  onChainUsdTxFee: OnChainUsdTxFee;
  onChainUsdTxFeeAsBtcDenominated: OnChainUsdTxFee;
  /** @deprecated TODO: remove. we don't need a non authenticated version of this query. the users can only do the query while authenticated */
  quizQuestions?: Maybe<Array<Maybe<QuizQuestion>>>;
  /** Returns 1 Sat and 1 Usd Cent price for the given currency */
  realtimePrice: RealtimePrice;
  /** @deprecated will be migrated to AccountDefaultWalletId */
  userDefaultWalletId: Scalars['WalletId']['output'];
  usernameAvailable?: Maybe<Scalars['Boolean']['output']>;
};


export type QueryAccountDefaultWalletArgs = {
  username: Scalars['Username']['input'];
  walletCurrency?: InputMaybe<WalletCurrency>;
};


export type QueryBtcPriceArgs = {
  currency?: Scalars['DisplayCurrency']['input'];
};


export type QueryBtcPriceListArgs = {
  range: PriceGraphRange;
};


export type QueryGetWithdrawLinkArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  k1?: InputMaybe<Scalars['String']['input']>;
  payment_hash?: InputMaybe<Scalars['String']['input']>;
  unique_hash?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetWithdrawLinksByUserIdArgs = {
  status?: InputMaybe<Status>;
  user_id: Scalars['ID']['input'];
};


export type QueryLnInvoicePaymentStatusArgs = {
  input: LnInvoicePaymentStatusInput;
};


export type QueryOnChainTxFeeArgs = {
  address: Scalars['OnChainAddress']['input'];
  amount: Scalars['SatAmount']['input'];
  targetConfirmations?: InputMaybe<Scalars['TargetConfirmations']['input']>;
  walletId: Scalars['WalletId']['input'];
};


export type QueryOnChainUsdTxFeeArgs = {
  address: Scalars['OnChainAddress']['input'];
  amount: Scalars['CentAmount']['input'];
  targetConfirmations?: InputMaybe<Scalars['TargetConfirmations']['input']>;
  walletId: Scalars['WalletId']['input'];
};


export type QueryOnChainUsdTxFeeAsBtcDenominatedArgs = {
  address: Scalars['OnChainAddress']['input'];
  amount: Scalars['SatAmount']['input'];
  targetConfirmations?: InputMaybe<Scalars['TargetConfirmations']['input']>;
  walletId: Scalars['WalletId']['input'];
};


export type QueryRealtimePriceArgs = {
  currency?: InputMaybe<Scalars['DisplayCurrency']['input']>;
};


export type QueryUserDefaultWalletIdArgs = {
  username: Scalars['Username']['input'];
};


export type QueryUsernameAvailableArgs = {
  username: Scalars['Username']['input'];
};

export type Quiz = {
  __typename?: 'Quiz';
  /** The reward in Satoshis for the quiz question */
  amount: Scalars['SatAmount']['output'];
  completed: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
};

export type QuizCompletedInput = {
  id: Scalars['ID']['input'];
};

export type QuizCompletedPayload = {
  __typename?: 'QuizCompletedPayload';
  errors: Array<Error>;
  quiz?: Maybe<Quiz>;
};

export type QuizQuestion = {
  __typename?: 'QuizQuestion';
  /** The earn reward in Satoshis for the quiz question */
  earnAmount: Scalars['SatAmount']['output'];
  id: Scalars['ID']['output'];
};

export type RealtimePrice = {
  __typename?: 'RealtimePrice';
  btcSatPrice: PriceOfOneSatInMinorUnit;
  denominatorCurrency: Scalars['DisplayCurrency']['output'];
  id: Scalars['ID']['output'];
  /** Unix timestamp (number of seconds elapsed since January 1, 1970 00:00:00 UTC) */
  timestamp: Scalars['Timestamp']['output'];
  usdCentPrice: PriceOfOneUsdCentInMinorUnit;
};

export type RealtimePriceInput = {
  currency?: InputMaybe<Scalars['DisplayCurrency']['input']>;
};

export type RealtimePricePayload = {
  __typename?: 'RealtimePricePayload';
  errors: Array<Error>;
  realtimePrice?: Maybe<RealtimePrice>;
};

export type SatAmountPayload = {
  __typename?: 'SatAmountPayload';
  amount?: Maybe<Scalars['SatAmount']['output']>;
  errors: Array<Error>;
};

export type SettlementVia = SettlementViaIntraLedger | SettlementViaLn | SettlementViaOnChain;

export type SettlementViaIntraLedger = {
  __typename?: 'SettlementViaIntraLedger';
  /** Settlement destination: Could be null if the payee does not have a username */
  counterPartyUsername?: Maybe<Scalars['Username']['output']>;
  counterPartyWalletId?: Maybe<Scalars['WalletId']['output']>;
};

export type SettlementViaLn = {
  __typename?: 'SettlementViaLn';
  /** @deprecated Shifting property to 'preImage' to improve granularity of the LnPaymentSecret type */
  paymentSecret?: Maybe<Scalars['LnPaymentSecret']['output']>;
  preImage?: Maybe<Scalars['LnPaymentPreImage']['output']>;
};

export type SettlementViaOnChain = {
  __typename?: 'SettlementViaOnChain';
  transactionHash: Scalars['OnChainTxHash']['output'];
  vout?: Maybe<Scalars['Int']['output']>;
};

export enum Status {
  Funded = 'FUNDED',
  Paid = 'PAID',
  Unfunded = 'UNFUNDED'
}

export type Subscription = {
  __typename?: 'Subscription';
  lnInvoicePaymentStatus: LnInvoicePaymentStatusPayload;
  myUpdates: MyUpdatesPayload;
  price: PricePayload;
  /** Returns the price of 1 satoshi */
  realtimePrice: RealtimePricePayload;
};


export type SubscriptionLnInvoicePaymentStatusArgs = {
  input: LnInvoicePaymentStatusInput;
};


export type SubscriptionPriceArgs = {
  input: PriceInput;
};


export type SubscriptionRealtimePriceArgs = {
  input: RealtimePriceInput;
};

export type SuccessPayload = {
  __typename?: 'SuccessPayload';
  errors: Array<Error>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

/**
 * Give details about an individual transaction.
 * Galoy have a smart routing system which is automatically
 * settling intraledger when both the payer and payee use the same wallet
 * therefore it's possible the transactions is being initiated onchain
 * or with lightning but settled intraledger.
 */
export type Transaction = {
  __typename?: 'Transaction';
  createdAt: Scalars['Timestamp']['output'];
  direction: TxDirection;
  id: Scalars['ID']['output'];
  /** From which protocol the payment has been initiated. */
  initiationVia: InitiationVia;
  memo?: Maybe<Scalars['Memo']['output']>;
  /** Amount of the settlement currency sent or received. */
  settlementAmount: Scalars['SignedAmount']['output'];
  /** Wallet currency for transaction. */
  settlementCurrency: WalletCurrency;
  settlementDisplayAmount: Scalars['SignedDisplayMajorAmount']['output'];
  settlementDisplayCurrency: Scalars['DisplayCurrency']['output'];
  settlementDisplayFee: Scalars['SignedDisplayMajorAmount']['output'];
  settlementFee: Scalars['SignedAmount']['output'];
  /** Price in WALLETCURRENCY/SETTLEMENTUNIT at time of settlement. */
  settlementPrice: PriceOfOneSettlementMinorUnitInDisplayMinorUnit;
  /** To which protocol the payment has settled on. */
  settlementVia: SettlementVia;
  status: TxStatus;
};

/** A connection to a list of items. */
export type TransactionConnection = {
  __typename?: 'TransactionConnection';
  /** A list of edges. */
  edges?: Maybe<Array<TransactionEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type TransactionEdge = {
  __typename?: 'TransactionEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: Transaction;
};

export enum TxDirection {
  Receive = 'RECEIVE',
  Send = 'SEND'
}

export enum TxNotificationType {
  IntraLedgerPayment = 'IntraLedgerPayment',
  IntraLedgerReceipt = 'IntraLedgerReceipt',
  LnInvoicePaid = 'LnInvoicePaid',
  OnchainPayment = 'OnchainPayment',
  OnchainReceipt = 'OnchainReceipt',
  OnchainReceiptPending = 'OnchainReceiptPending'
}

export enum TxStatus {
  Failure = 'FAILURE',
  Pending = 'PENDING',
  Success = 'SUCCESS'
}

export type UpdateWithdrawLinkInput = {
  account_type?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['Float']['input']>;
  escrow_wallet?: InputMaybe<Scalars['String']['input']>;
  k1?: InputMaybe<Scalars['String']['input']>;
  max_withdrawable?: InputMaybe<Scalars['Float']['input']>;
  min_withdrawable?: InputMaybe<Scalars['Float']['input']>;
  payment_hash?: InputMaybe<Scalars['String']['input']>;
  payment_request?: InputMaybe<Scalars['String']['input']>;
  payment_secret?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Status>;
  title?: InputMaybe<Scalars['String']['input']>;
  unique_hash?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['ID']['input']>;
};

/** A wallet belonging to an account which contains a USD balance and a list of transactions. */
export type UsdWallet = Wallet & {
  __typename?: 'UsdWallet';
  accountId: Scalars['ID']['output'];
  balance: Scalars['SignedAmount']['output'];
  id: Scalars['ID']['output'];
  /** An unconfirmed incoming onchain balance. */
  pendingIncomingBalance: Scalars['SignedAmount']['output'];
  transactions?: Maybe<TransactionConnection>;
  transactionsByAddress?: Maybe<TransactionConnection>;
  walletCurrency: WalletCurrency;
};


/** A wallet belonging to an account which contains a USD balance and a list of transactions. */
export type UsdWalletTransactionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


/** A wallet belonging to an account which contains a USD balance and a list of transactions. */
export type UsdWalletTransactionsByAddressArgs = {
  address: Scalars['OnChainAddress']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type User = {
  __typename?: 'User';
  /**
   * Get single contact details.
   * Can include the transactions associated with the contact.
   * @deprecated will be moved to Accounts
   */
  contactByUsername: UserContact;
  /**
   * Get full list of contacts.
   * Can include the transactions associated with each contact.
   * @deprecated will be moved to account
   */
  contacts: Array<UserContact>;
  createdAt: Scalars['Timestamp']['output'];
  defaultAccount: Account;
  id: Scalars['ID']['output'];
  /**
   * Preferred language for user.
   * When value is 'default' the intent is to use preferred language from OS settings.
   */
  language: Scalars['Language']['output'];
  /** Phone number with international calling code. */
  phone?: Maybe<Scalars['Phone']['output']>;
  /**
   * List the quiz questions the user may have completed.
   * @deprecated use Quiz from Account instead
   */
  quizQuestions: Array<UserQuizQuestion>;
  /**
   * Optional immutable user friendly identifier.
   * @deprecated will be moved to @Handle in Account and Wallet
   */
  username?: Maybe<Scalars['Username']['output']>;
};


export type UserContactByUsernameArgs = {
  username: Scalars['Username']['input'];
};

export type UserContact = {
  __typename?: 'UserContact';
  /**
   * Alias the user can set for this contact.
   * Only the user can see the alias attached to their contact.
   */
  alias?: Maybe<Scalars['ContactAlias']['output']>;
  id: Scalars['Username']['output'];
  /** Paginated list of transactions sent to/from this contact. */
  transactions?: Maybe<TransactionConnection>;
  transactionsCount: Scalars['Int']['output'];
  /** Actual identifier of the contact. */
  username: Scalars['Username']['output'];
};


export type UserContactTransactionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type UserContactUpdateAliasInput = {
  alias: Scalars['ContactAlias']['input'];
  username: Scalars['Username']['input'];
};

export type UserContactUpdateAliasPayload = {
  __typename?: 'UserContactUpdateAliasPayload';
  contact?: Maybe<UserContact>;
  errors: Array<Error>;
};

export type UserLoginInput = {
  code: Scalars['OneTimeAuthCode']['input'];
  phone: Scalars['Phone']['input'];
};

export type UserLogoutInput = {
  authToken: Scalars['AuthToken']['input'];
};

export type UserQuizQuestion = {
  __typename?: 'UserQuizQuestion';
  completed: Scalars['Boolean']['output'];
  question: QuizQuestion;
};

export type UserQuizQuestionUpdateCompletedInput = {
  id: Scalars['ID']['input'];
};

export type UserQuizQuestionUpdateCompletedPayload = {
  __typename?: 'UserQuizQuestionUpdateCompletedPayload';
  errors: Array<Error>;
  userQuizQuestion?: Maybe<UserQuizQuestion>;
};

export type UserRequestAuthCodeInput = {
  channel?: InputMaybe<PhoneCodeChannelType>;
  phone: Scalars['Phone']['input'];
};

export type UserUpdate = IntraLedgerUpdate | LnUpdate | OnChainUpdate | Price | RealtimePrice;

export type UserUpdateLanguageInput = {
  language: Scalars['Language']['input'];
};

export type UserUpdateLanguagePayload = {
  __typename?: 'UserUpdateLanguagePayload';
  errors: Array<Error>;
  user?: Maybe<User>;
};

export type UserUpdateUsernameInput = {
  username: Scalars['Username']['input'];
};

export type UserUpdateUsernamePayload = {
  __typename?: 'UserUpdateUsernamePayload';
  errors: Array<Error>;
  user?: Maybe<User>;
};

/** A generic wallet which stores value in one of our supported currencies. */
export type Wallet = {
  accountId: Scalars['ID']['output'];
  balance: Scalars['SignedAmount']['output'];
  id: Scalars['ID']['output'];
  pendingIncomingBalance: Scalars['SignedAmount']['output'];
  /**
   * Transactions are ordered anti-chronologically,
   * ie: the newest transaction will be first
   */
  transactions?: Maybe<TransactionConnection>;
  /**
   * Transactions are ordered anti-chronologically,
   * ie: the newest transaction will be first
   */
  transactionsByAddress?: Maybe<TransactionConnection>;
  walletCurrency: WalletCurrency;
};


/** A generic wallet which stores value in one of our supported currencies. */
export type WalletTransactionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


/** A generic wallet which stores value in one of our supported currencies. */
export type WalletTransactionsByAddressArgs = {
  address: Scalars['OnChainAddress']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export enum WalletCurrency {
  Btc = 'BTC',
  Usd = 'USD'
}

export type WithdrawLink = {
  __typename?: 'WithdrawLink';
  account_type: Scalars['String']['output'];
  amount: Scalars['Float']['output'];
  created_at: Scalars['String']['output'];
  escrow_wallet: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  k1?: Maybe<Scalars['String']['output']>;
  max_withdrawable: Scalars['Float']['output'];
  min_withdrawable: Scalars['Float']['output'];
  payment_hash: Scalars['String']['output'];
  payment_request: Scalars['String']['output'];
  payment_secret: Scalars['String']['output'];
  status: Status;
  title: Scalars['String']['output'];
  unique_hash: Scalars['String']['output'];
  updated_at: Scalars['String']['output'];
  user_id: Scalars['ID']['output'];
};

export type CreateWithdrawLinkMutationVariables = Exact<{
  input: CreateWithdrawLinkInput;
}>;


export type CreateWithdrawLinkMutation = { __typename?: 'Mutation', createWithdrawLink: { __typename?: 'WithdrawLink', id: string, user_id: string, payment_request: string, payment_hash: string, payment_secret: string, amount: number, account_type: string, escrow_wallet: string, status: Status, title: string, min_withdrawable: number, max_withdrawable: number, unique_hash: string, k1?: string | null, created_at: string, updated_at: string } };

export type UpdateWithdrawLinkMutationVariables = Exact<{
  updateWithdrawLinkId: Scalars['ID']['input'];
  updateWithdrawLinkInput: UpdateWithdrawLinkInput;
}>;


export type UpdateWithdrawLinkMutation = { __typename?: 'Mutation', updateWithdrawLink: { __typename?: 'WithdrawLink', account_type: string, amount: number, created_at: string, escrow_wallet: string, id: string, k1?: string | null, max_withdrawable: number, min_withdrawable: number, payment_hash: string, payment_request: string, payment_secret: string, status: Status, title: string, unique_hash: string, user_id: string, updated_at: string } };

export type LnInvoiceCreateOnBehalfOfRecipientMutationVariables = Exact<{
  input: LnInvoiceCreateOnBehalfOfRecipientInput;
}>;


export type LnInvoiceCreateOnBehalfOfRecipientMutation = { __typename?: 'Mutation', lnInvoiceCreateOnBehalfOfRecipient: { __typename?: 'LnInvoicePayload', errors: Array<{ __typename?: 'GraphQLApplicationError', message: string, path?: Array<string | null> | null, code?: string | null }>, invoice?: { __typename?: 'LnInvoice', paymentRequest: any, paymentHash: any, paymentSecret: any, satoshis?: any | null } | null } };

export type LnUsdInvoiceCreateOnBehalfOfRecipientMutationVariables = Exact<{
  input: LnUsdInvoiceCreateOnBehalfOfRecipientInput;
}>;


export type LnUsdInvoiceCreateOnBehalfOfRecipientMutation = { __typename?: 'Mutation', lnUsdInvoiceCreateOnBehalfOfRecipient: { __typename?: 'LnInvoicePayload', errors: Array<{ __typename?: 'GraphQLApplicationError', message: string, path?: Array<string | null> | null, code?: string | null }>, invoice?: { __typename?: 'LnInvoice', paymentRequest: any, paymentHash: any, paymentSecret: any, satoshis?: any | null } | null } };

export type GetWithdrawLinkQueryVariables = Exact<{
  getWithdrawLinkId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetWithdrawLinkQuery = { __typename?: 'Query', getWithdrawLink?: { __typename?: 'WithdrawLink', id: string, user_id: string, payment_request: string, payment_hash: string, payment_secret: string, amount: number, account_type: string, escrow_wallet: string, status: Status, title: string, min_withdrawable: number, max_withdrawable: number, unique_hash: string, k1?: string | null, created_at: string, updated_at: string } | null };

export type GetWithdrawLinksByUserIdQueryVariables = Exact<{
  user_id: Scalars['ID']['input'];
  status?: InputMaybe<Status>;
}>;


export type GetWithdrawLinksByUserIdQuery = { __typename?: 'Query', getWithdrawLinksByUserId: Array<{ __typename?: 'WithdrawLink', title: string, account_type: string, min_withdrawable: number, amount: number, created_at: string, id: string, payment_hash: string, status: Status, updated_at: string, payment_request: string, user_id: string, max_withdrawable: number, unique_hash: string, k1?: string | null, payment_secret: string, escrow_wallet: string }> };

export type LnInvoicePaymentStatusSubscriptionVariables = Exact<{
  payment_request: Scalars['LnPaymentRequest']['input'];
}>;


export type LnInvoicePaymentStatusSubscription = { __typename?: 'Subscription', lnInvoicePaymentStatus: { __typename?: 'LnInvoicePaymentStatusPayload', status?: InvoicePaymentStatus | null, errors: Array<{ __typename?: 'GraphQLApplicationError', message: string, path?: Array<string | null> | null, code?: string | null }> } };


export const CreateWithdrawLinkDocument = gql`
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
export type CreateWithdrawLinkMutationFn = Apollo.MutationFunction<CreateWithdrawLinkMutation, CreateWithdrawLinkMutationVariables>;

/**
 * __useCreateWithdrawLinkMutation__
 *
 * To run a mutation, you first call `useCreateWithdrawLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWithdrawLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWithdrawLinkMutation, { data, loading, error }] = useCreateWithdrawLinkMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateWithdrawLinkMutation(baseOptions?: Apollo.MutationHookOptions<CreateWithdrawLinkMutation, CreateWithdrawLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWithdrawLinkMutation, CreateWithdrawLinkMutationVariables>(CreateWithdrawLinkDocument, options);
      }
export type CreateWithdrawLinkMutationHookResult = ReturnType<typeof useCreateWithdrawLinkMutation>;
export type CreateWithdrawLinkMutationResult = Apollo.MutationResult<CreateWithdrawLinkMutation>;
export type CreateWithdrawLinkMutationOptions = Apollo.BaseMutationOptions<CreateWithdrawLinkMutation, CreateWithdrawLinkMutationVariables>;
export const UpdateWithdrawLinkDocument = gql`
    mutation UpdateWithdrawLink($updateWithdrawLinkId: ID!, $updateWithdrawLinkInput: UpdateWithdrawLinkInput!) {
  updateWithdrawLink(id: $updateWithdrawLinkId, input: $updateWithdrawLinkInput) {
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
export type UpdateWithdrawLinkMutationFn = Apollo.MutationFunction<UpdateWithdrawLinkMutation, UpdateWithdrawLinkMutationVariables>;

/**
 * __useUpdateWithdrawLinkMutation__
 *
 * To run a mutation, you first call `useUpdateWithdrawLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWithdrawLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWithdrawLinkMutation, { data, loading, error }] = useUpdateWithdrawLinkMutation({
 *   variables: {
 *      updateWithdrawLinkId: // value for 'updateWithdrawLinkId'
 *      updateWithdrawLinkInput: // value for 'updateWithdrawLinkInput'
 *   },
 * });
 */
export function useUpdateWithdrawLinkMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWithdrawLinkMutation, UpdateWithdrawLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWithdrawLinkMutation, UpdateWithdrawLinkMutationVariables>(UpdateWithdrawLinkDocument, options);
      }
export type UpdateWithdrawLinkMutationHookResult = ReturnType<typeof useUpdateWithdrawLinkMutation>;
export type UpdateWithdrawLinkMutationResult = Apollo.MutationResult<UpdateWithdrawLinkMutation>;
export type UpdateWithdrawLinkMutationOptions = Apollo.BaseMutationOptions<UpdateWithdrawLinkMutation, UpdateWithdrawLinkMutationVariables>;
export const LnInvoiceCreateOnBehalfOfRecipientDocument = gql`
    mutation LnInvoiceCreateOnBehalfOfRecipient($input: LnInvoiceCreateOnBehalfOfRecipientInput!) {
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
export type LnInvoiceCreateOnBehalfOfRecipientMutationFn = Apollo.MutationFunction<LnInvoiceCreateOnBehalfOfRecipientMutation, LnInvoiceCreateOnBehalfOfRecipientMutationVariables>;

/**
 * __useLnInvoiceCreateOnBehalfOfRecipientMutation__
 *
 * To run a mutation, you first call `useLnInvoiceCreateOnBehalfOfRecipientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLnInvoiceCreateOnBehalfOfRecipientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [lnInvoiceCreateOnBehalfOfRecipientMutation, { data, loading, error }] = useLnInvoiceCreateOnBehalfOfRecipientMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLnInvoiceCreateOnBehalfOfRecipientMutation(baseOptions?: Apollo.MutationHookOptions<LnInvoiceCreateOnBehalfOfRecipientMutation, LnInvoiceCreateOnBehalfOfRecipientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LnInvoiceCreateOnBehalfOfRecipientMutation, LnInvoiceCreateOnBehalfOfRecipientMutationVariables>(LnInvoiceCreateOnBehalfOfRecipientDocument, options);
      }
export type LnInvoiceCreateOnBehalfOfRecipientMutationHookResult = ReturnType<typeof useLnInvoiceCreateOnBehalfOfRecipientMutation>;
export type LnInvoiceCreateOnBehalfOfRecipientMutationResult = Apollo.MutationResult<LnInvoiceCreateOnBehalfOfRecipientMutation>;
export type LnInvoiceCreateOnBehalfOfRecipientMutationOptions = Apollo.BaseMutationOptions<LnInvoiceCreateOnBehalfOfRecipientMutation, LnInvoiceCreateOnBehalfOfRecipientMutationVariables>;
export const LnUsdInvoiceCreateOnBehalfOfRecipientDocument = gql`
    mutation LnUsdInvoiceCreateOnBehalfOfRecipient($input: LnUsdInvoiceCreateOnBehalfOfRecipientInput!) {
  lnUsdInvoiceCreateOnBehalfOfRecipient(input: $input) {
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
export type LnUsdInvoiceCreateOnBehalfOfRecipientMutationFn = Apollo.MutationFunction<LnUsdInvoiceCreateOnBehalfOfRecipientMutation, LnUsdInvoiceCreateOnBehalfOfRecipientMutationVariables>;

/**
 * __useLnUsdInvoiceCreateOnBehalfOfRecipientMutation__
 *
 * To run a mutation, you first call `useLnUsdInvoiceCreateOnBehalfOfRecipientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLnUsdInvoiceCreateOnBehalfOfRecipientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [lnUsdInvoiceCreateOnBehalfOfRecipientMutation, { data, loading, error }] = useLnUsdInvoiceCreateOnBehalfOfRecipientMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLnUsdInvoiceCreateOnBehalfOfRecipientMutation(baseOptions?: Apollo.MutationHookOptions<LnUsdInvoiceCreateOnBehalfOfRecipientMutation, LnUsdInvoiceCreateOnBehalfOfRecipientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LnUsdInvoiceCreateOnBehalfOfRecipientMutation, LnUsdInvoiceCreateOnBehalfOfRecipientMutationVariables>(LnUsdInvoiceCreateOnBehalfOfRecipientDocument, options);
      }
export type LnUsdInvoiceCreateOnBehalfOfRecipientMutationHookResult = ReturnType<typeof useLnUsdInvoiceCreateOnBehalfOfRecipientMutation>;
export type LnUsdInvoiceCreateOnBehalfOfRecipientMutationResult = Apollo.MutationResult<LnUsdInvoiceCreateOnBehalfOfRecipientMutation>;
export type LnUsdInvoiceCreateOnBehalfOfRecipientMutationOptions = Apollo.BaseMutationOptions<LnUsdInvoiceCreateOnBehalfOfRecipientMutation, LnUsdInvoiceCreateOnBehalfOfRecipientMutationVariables>;
export const GetWithdrawLinkDocument = gql`
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

/**
 * __useGetWithdrawLinkQuery__
 *
 * To run a query within a React component, call `useGetWithdrawLinkQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWithdrawLinkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWithdrawLinkQuery({
 *   variables: {
 *      getWithdrawLinkId: // value for 'getWithdrawLinkId'
 *   },
 * });
 */
export function useGetWithdrawLinkQuery(baseOptions?: Apollo.QueryHookOptions<GetWithdrawLinkQuery, GetWithdrawLinkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWithdrawLinkQuery, GetWithdrawLinkQueryVariables>(GetWithdrawLinkDocument, options);
      }
export function useGetWithdrawLinkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWithdrawLinkQuery, GetWithdrawLinkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWithdrawLinkQuery, GetWithdrawLinkQueryVariables>(GetWithdrawLinkDocument, options);
        }
export type GetWithdrawLinkQueryHookResult = ReturnType<typeof useGetWithdrawLinkQuery>;
export type GetWithdrawLinkLazyQueryHookResult = ReturnType<typeof useGetWithdrawLinkLazyQuery>;
export type GetWithdrawLinkQueryResult = Apollo.QueryResult<GetWithdrawLinkQuery, GetWithdrawLinkQueryVariables>;
export const GetWithdrawLinksByUserIdDocument = gql`
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

/**
 * __useGetWithdrawLinksByUserIdQuery__
 *
 * To run a query within a React component, call `useGetWithdrawLinksByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWithdrawLinksByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWithdrawLinksByUserIdQuery({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useGetWithdrawLinksByUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetWithdrawLinksByUserIdQuery, GetWithdrawLinksByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWithdrawLinksByUserIdQuery, GetWithdrawLinksByUserIdQueryVariables>(GetWithdrawLinksByUserIdDocument, options);
      }
export function useGetWithdrawLinksByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWithdrawLinksByUserIdQuery, GetWithdrawLinksByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWithdrawLinksByUserIdQuery, GetWithdrawLinksByUserIdQueryVariables>(GetWithdrawLinksByUserIdDocument, options);
        }
export type GetWithdrawLinksByUserIdQueryHookResult = ReturnType<typeof useGetWithdrawLinksByUserIdQuery>;
export type GetWithdrawLinksByUserIdLazyQueryHookResult = ReturnType<typeof useGetWithdrawLinksByUserIdLazyQuery>;
export type GetWithdrawLinksByUserIdQueryResult = Apollo.QueryResult<GetWithdrawLinksByUserIdQuery, GetWithdrawLinksByUserIdQueryVariables>;
export const LnInvoicePaymentStatusDocument = gql`
    subscription LnInvoicePaymentStatus($payment_request: LnPaymentRequest!) {
  lnInvoicePaymentStatus(input: {paymentRequest: $payment_request}) {
    status
    errors {
      message
      path
      code
    }
  }
}
    `;

/**
 * __useLnInvoicePaymentStatusSubscription__
 *
 * To run a query within a React component, call `useLnInvoicePaymentStatusSubscription` and pass it any options that fit your needs.
 * When your component renders, `useLnInvoicePaymentStatusSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLnInvoicePaymentStatusSubscription({
 *   variables: {
 *      payment_request: // value for 'payment_request'
 *   },
 * });
 */
export function useLnInvoicePaymentStatusSubscription(baseOptions: Apollo.SubscriptionHookOptions<LnInvoicePaymentStatusSubscription, LnInvoicePaymentStatusSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<LnInvoicePaymentStatusSubscription, LnInvoicePaymentStatusSubscriptionVariables>(LnInvoicePaymentStatusDocument, options);
      }
export type LnInvoicePaymentStatusSubscriptionHookResult = ReturnType<typeof useLnInvoicePaymentStatusSubscription>;
export type LnInvoicePaymentStatusSubscriptionResult = Apollo.SubscriptionResult<LnInvoicePaymentStatusSubscription>;
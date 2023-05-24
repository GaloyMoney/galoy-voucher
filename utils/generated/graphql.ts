/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** An Opaque Bearer token */
  AuthToken: any;
  /** (Positive) Cent amount (1/100 of a dollar) */
  CentAmount: any;
  /** An alias name that a user can set for a wallet (with which they have transactions) */
  ContactAlias: any;
  /** Display currency of an account */
  DisplayCurrency: any;
  /** Hex-encoded string of 32 bytes */
  Hex32Bytes: any;
  Language: any;
  LnPaymentPreImage: any;
  /** BOLT11 lightning invoice payment request with the amount included */
  LnPaymentRequest: any;
  LnPaymentSecret: any;
  /** Text field in a lightning payment transaction */
  Memo: any;
  /** An address for an on-chain bitcoin destination */
  OnChainAddress: any;
  OnChainTxHash: any;
  /** An authentication code valid for a single use */
  OneTimeAuthCode: any;
  PaymentHash: any;
  /** Phone number which includes country code */
  Phone: any;
  /** Non-fractional signed whole numeric value between -(2^53) + 1 and 2^53 - 1 */
  SafeInt: any;
  /** (Positive) Satoshi amount */
  SatAmount: any;
  /** (Positive) amount of seconds */
  Seconds: any;
  /** An amount (of a currency) that can be negative (e.g. in a transaction) */
  SignedAmount: any;
  /** A string amount (of a currency) that can be negative (e.g. in a transaction) */
  SignedDisplayMajorAmount: any;
  /** (Positive) Number of blocks in which the transaction is expected to be confirmed */
  TargetConfirmations: any;
  /** Timestamp field, serialized as Unix time (the number of seconds since the Unix epoch) */
  Timestamp: any;
  /** Unique identifier of a user */
  Username: any;
  /** Unique identifier of a wallet */
  WalletId: any;
};

export type Account = {
  csvTransactions: Scalars['String'];
  defaultWalletId: Scalars['WalletId'];
  displayCurrency: Scalars['DisplayCurrency'];
  id: Scalars['ID'];
  level: AccountLevel;
  limits: AccountLimits;
  realtimePrice: RealtimePrice;
  transactions?: Maybe<TransactionConnection>;
  wallets: Array<Wallet>;
};


export type AccountCsvTransactionsArgs = {
  walletIds: Array<Scalars['WalletId']>;
};


export type AccountTransactionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  walletIds?: InputMaybe<Array<InputMaybe<Scalars['WalletId']>>>;
};

export enum AccountLevel {
  One = 'ONE',
  Two = 'TWO'
}

export type AccountLimit = {
  /** The rolling time interval in seconds that the limits would apply for. */
  interval?: Maybe<Scalars['Seconds']>;
  /** The amount of cents remaining below the limit for the current 24 hour period. */
  remainingLimit?: Maybe<Scalars['CentAmount']>;
  /** The current maximum limit for a given 24 hour period. */
  totalLimit: Scalars['CentAmount'];
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
  walletId: Scalars['WalletId'];
};

export type AccountUpdateDefaultWalletIdPayload = {
  __typename?: 'AccountUpdateDefaultWalletIdPayload';
  account?: Maybe<ConsumerAccount>;
  errors: Array<Error>;
};

export type AccountUpdateDisplayCurrencyInput = {
  currency: Scalars['DisplayCurrency'];
};

export type AccountUpdateDisplayCurrencyPayload = {
  __typename?: 'AccountUpdateDisplayCurrencyPayload';
  account?: Maybe<ConsumerAccount>;
  errors: Array<Error>;
};

export type AuthTokenPayload = {
  __typename?: 'AuthTokenPayload';
  authToken?: Maybe<Scalars['AuthToken']>;
  errors: Array<Error>;
};

/** A wallet belonging to an account which contains a BTC balance and a list of transactions. */
export type BtcWallet = Wallet & {
  __typename?: 'BTCWallet';
  accountId: Scalars['ID'];
  /** A balance stored in BTC. */
  balance: Scalars['SignedAmount'];
  id: Scalars['ID'];
  /** An unconfirmed incoming onchain balance. */
  pendingIncomingBalance: Scalars['SignedAmount'];
  /** A list of BTC transactions associated with this wallet. */
  transactions?: Maybe<TransactionConnection>;
  transactionsByAddress?: Maybe<TransactionConnection>;
  walletCurrency: WalletCurrency;
};


/** A wallet belonging to an account which contains a BTC balance and a list of transactions. */
export type BtcWalletTransactionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** A wallet belonging to an account which contains a BTC balance and a list of transactions. */
export type BtcWalletTransactionsByAddressArgs = {
  address: Scalars['OnChainAddress'];
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type BuildInformation = {
  __typename?: 'BuildInformation';
  buildTime?: Maybe<Scalars['Timestamp']>;
  commitHash?: Maybe<Scalars['String']>;
  helmRevision?: Maybe<Scalars['Int']>;
};

export type CaptchaCreateChallengePayload = {
  __typename?: 'CaptchaCreateChallengePayload';
  errors: Array<Error>;
  result?: Maybe<CaptchaCreateChallengeResult>;
};

export type CaptchaCreateChallengeResult = {
  __typename?: 'CaptchaCreateChallengeResult';
  challengeCode: Scalars['String'];
  failbackMode: Scalars['Boolean'];
  id: Scalars['String'];
  newCaptcha: Scalars['Boolean'];
};

export type CaptchaRequestAuthCodeInput = {
  challengeCode: Scalars['String'];
  channel?: InputMaybe<PhoneCodeChannelType>;
  phone: Scalars['Phone'];
  secCode: Scalars['String'];
  validationCode: Scalars['String'];
};

export type CentAmountPayload = {
  __typename?: 'CentAmountPayload';
  amount?: Maybe<Scalars['CentAmount']>;
  errors: Array<Error>;
};

export type ConsumerAccount = Account & {
  __typename?: 'ConsumerAccount';
  /** return CSV stream, base64 encoded, of the list of transactions in the wallet */
  csvTransactions: Scalars['String'];
  defaultWalletId: Scalars['WalletId'];
  displayCurrency: Scalars['DisplayCurrency'];
  id: Scalars['ID'];
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
  walletIds: Array<Scalars['WalletId']>;
};


export type ConsumerAccountTransactionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  walletIds?: InputMaybe<Array<InputMaybe<Scalars['WalletId']>>>;
};

export type Coordinates = {
  __typename?: 'Coordinates';
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type CreateWithdrawLinkInput = {
  account_type: Scalars['String'];
  amount: Scalars['Float'];
  escrow_wallet: Scalars['String'];
  k1?: InputMaybe<Scalars['String']>;
  max_withdrawable: Scalars['Float'];
  min_withdrawable: Scalars['Float'];
  payment_hash: Scalars['String'];
  payment_request: Scalars['String'];
  payment_secret: Scalars['String'];
  status?: InputMaybe<Status>;
  title: Scalars['String'];
  unique_hash: Scalars['String'];
  user_id: Scalars['ID'];
};

export type Currency = {
  __typename?: 'Currency';
  flag: Scalars['String'];
  fractionDigits: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
  symbol: Scalars['String'];
};

export type DeviceNotificationTokenCreateInput = {
  deviceToken: Scalars['String'];
};

export type Error = {
  code?: Maybe<Scalars['String']>;
  message: Scalars['String'];
  path?: Maybe<Array<Maybe<Scalars['String']>>>;
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
  lightningAddressDomain: Scalars['String'];
  lightningAddressDomainAliases: Array<Scalars['String']>;
  /** Which network (mainnet, testnet, regtest, signet) this instance is running on. */
  network: Network;
  /**
   * A list of public keys for the running lightning nodes.
   * This can be used to know if an invoice belongs to one of our nodes.
   */
  nodesIds: Array<Scalars['String']>;
};

export type GraphQlApplicationError = Error & {
  __typename?: 'GraphQLApplicationError';
  code?: Maybe<Scalars['String']>;
  message: Scalars['String'];
  path?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type InitiationVia = InitiationViaIntraLedger | InitiationViaLn | InitiationViaOnChain;

export type InitiationViaIntraLedger = {
  __typename?: 'InitiationViaIntraLedger';
  counterPartyUsername?: Maybe<Scalars['Username']>;
  counterPartyWalletId?: Maybe<Scalars['WalletId']>;
};

export type InitiationViaLn = {
  __typename?: 'InitiationViaLn';
  paymentHash: Scalars['PaymentHash'];
};

export type InitiationViaOnChain = {
  __typename?: 'InitiationViaOnChain';
  address: Scalars['OnChainAddress'];
};

export type IntraLedgerPaymentSendInput = {
  /** Amount in satoshis. */
  amount: Scalars['SatAmount'];
  /** Optional memo to be attached to the payment. */
  memo?: InputMaybe<Scalars['Memo']>;
  recipientWalletId: Scalars['WalletId'];
  /** The wallet ID of the sender. */
  walletId: Scalars['WalletId'];
};

export type IntraLedgerUpdate = {
  __typename?: 'IntraLedgerUpdate';
  amount: Scalars['SatAmount'];
  displayCurrencyPerSat: Scalars['Float'];
  txNotificationType: TxNotificationType;
  /** @deprecated updated over displayCurrencyPerSat */
  usdPerSat: Scalars['Float'];
  walletId: Scalars['WalletId'];
};

export type IntraLedgerUsdPaymentSendInput = {
  /** Amount in cents. */
  amount: Scalars['CentAmount'];
  /** Optional memo to be attached to the payment. */
  memo?: InputMaybe<Scalars['Memo']>;
  recipientWalletId: Scalars['WalletId'];
  /** The wallet ID of the sender. */
  walletId: Scalars['WalletId'];
};

export enum InvoicePaymentStatus {
  Expired = 'EXPIRED',
  Paid = 'PAID',
  Pending = 'PENDING'
}

export type LnInvoice = {
  __typename?: 'LnInvoice';
  paymentHash: Scalars['PaymentHash'];
  paymentRequest: Scalars['LnPaymentRequest'];
  paymentSecret: Scalars['LnPaymentSecret'];
  satoshis?: Maybe<Scalars['SatAmount']>;
};

export type LnInvoiceCreateInput = {
  /** Amount in satoshis. */
  amount: Scalars['SatAmount'];
  /** Optional memo for the lightning invoice. */
  memo?: InputMaybe<Scalars['Memo']>;
  /** Wallet ID for a BTC wallet belonging to the current account. */
  walletId: Scalars['WalletId'];
};

export type LnInvoiceCreateOnBehalfOfRecipientInput = {
  /** Amount in satoshis. */
  amount: Scalars['SatAmount'];
  descriptionHash?: InputMaybe<Scalars['Hex32Bytes']>;
  /** Optional memo for the lightning invoice. */
  memo?: InputMaybe<Scalars['Memo']>;
  /** Wallet ID for a BTC wallet which belongs to any account. */
  recipientWalletId: Scalars['WalletId'];
};

export type LnInvoiceFeeProbeInput = {
  paymentRequest: Scalars['LnPaymentRequest'];
  walletId: Scalars['WalletId'];
};

export type LnInvoicePayload = {
  __typename?: 'LnInvoicePayload';
  errors: Array<Error>;
  invoice?: Maybe<LnInvoice>;
};

export type LnInvoicePaymentInput = {
  /** Optional memo to associate with the lightning invoice. */
  memo?: InputMaybe<Scalars['Memo']>;
  /** Payment request representing the invoice which is being paid. */
  paymentRequest: Scalars['LnPaymentRequest'];
  /** Wallet ID with sufficient balance to cover amount of invoice.  Must belong to the account of the current user. */
  walletId: Scalars['WalletId'];
};

export type LnInvoicePaymentStatusInput = {
  paymentRequest: Scalars['LnPaymentRequest'];
};

export type LnInvoicePaymentStatusPayload = {
  __typename?: 'LnInvoicePaymentStatusPayload';
  errors: Array<Error>;
  status?: Maybe<InvoicePaymentStatus>;
};

export type LnNoAmountInvoice = {
  __typename?: 'LnNoAmountInvoice';
  paymentHash: Scalars['PaymentHash'];
  paymentRequest: Scalars['LnPaymentRequest'];
  paymentSecret: Scalars['LnPaymentSecret'];
};

export type LnNoAmountInvoiceCreateInput = {
  /** Optional memo for the lightning invoice. */
  memo?: InputMaybe<Scalars['Memo']>;
  /** ID for either a USD or BTC wallet belonging to the account of the current user. */
  walletId: Scalars['WalletId'];
};

export type LnNoAmountInvoiceCreateOnBehalfOfRecipientInput = {
  /** Optional memo for the lightning invoice. */
  memo?: InputMaybe<Scalars['Memo']>;
  /** ID for either a USD or BTC wallet which belongs to the account of any user. */
  recipientWalletId: Scalars['WalletId'];
};

export type LnNoAmountInvoiceFeeProbeInput = {
  amount: Scalars['SatAmount'];
  paymentRequest: Scalars['LnPaymentRequest'];
  walletId: Scalars['WalletId'];
};

export type LnNoAmountInvoicePayload = {
  __typename?: 'LnNoAmountInvoicePayload';
  errors: Array<Error>;
  invoice?: Maybe<LnNoAmountInvoice>;
};

export type LnNoAmountInvoicePaymentInput = {
  /** Amount to pay in satoshis. */
  amount: Scalars['SatAmount'];
  /** Optional memo to associate with the lightning invoice. */
  memo?: InputMaybe<Scalars['Memo']>;
  /** Payment request representing the invoice which is being paid. */
  paymentRequest: Scalars['LnPaymentRequest'];
  /** Wallet ID with sufficient balance to cover amount defined in mutation request.  Must belong to the account of the current user. */
  walletId: Scalars['WalletId'];
};

export type LnNoAmountUsdInvoiceFeeProbeInput = {
  amount: Scalars['CentAmount'];
  paymentRequest: Scalars['LnPaymentRequest'];
  walletId: Scalars['WalletId'];
};

export type LnNoAmountUsdInvoicePaymentInput = {
  /** Amount to pay in USD cents. */
  amount: Scalars['CentAmount'];
  /** Optional memo to associate with the lightning invoice. */
  memo?: InputMaybe<Scalars['Memo']>;
  /** Payment request representing the invoice which is being paid. */
  paymentRequest: Scalars['LnPaymentRequest'];
  /** Wallet ID with sufficient balance to cover amount defined in mutation request.  Must belong to the account of the current user. */
  walletId: Scalars['WalletId'];
};

export type LnUpdate = {
  __typename?: 'LnUpdate';
  paymentHash: Scalars['PaymentHash'];
  status: InvoicePaymentStatus;
  walletId: Scalars['WalletId'];
};

export type LnUsdInvoiceCreateInput = {
  /** Amount in USD cents. */
  amount: Scalars['CentAmount'];
  /** Optional memo for the lightning invoice. */
  memo?: InputMaybe<Scalars['Memo']>;
  /** Wallet ID for a USD wallet belonging to the current user. */
  walletId: Scalars['WalletId'];
};

export type LnUsdInvoiceCreateOnBehalfOfRecipientInput = {
  /** Amount in USD cents. */
  amount: Scalars['CentAmount'];
  descriptionHash?: InputMaybe<Scalars['Hex32Bytes']>;
  /** Optional memo for the lightning invoice. Acts as a note to the recipient. */
  memo?: InputMaybe<Scalars['Memo']>;
  /** Wallet ID for a USD wallet which belongs to the account of any user. */
  recipientWalletId: Scalars['WalletId'];
};

export type LnUsdInvoiceFeeProbeInput = {
  paymentRequest: Scalars['LnPaymentRequest'];
  walletId: Scalars['WalletId'];
};

export type MapInfo = {
  __typename?: 'MapInfo';
  coordinates: Coordinates;
  title: Scalars['String'];
};

export type MapMarker = {
  __typename?: 'MapMarker';
  mapInfo: MapInfo;
  username?: Maybe<Scalars['Username']>;
};

export type MobileVersions = {
  __typename?: 'MobileVersions';
  currentSupported: Scalars['Int'];
  minSupported: Scalars['Int'];
  platform: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  accountUpdateDefaultWalletId: AccountUpdateDefaultWalletIdPayload;
  accountUpdateDisplayCurrency: AccountUpdateDisplayCurrencyPayload;
  captchaCreateChallenge: CaptchaCreateChallengePayload;
  captchaRequestAuthCode: SuccessPayload;
  createWithdrawLink: WithdrawLink;
  deleteWithdrawLink: Scalars['ID'];
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
  id: Scalars['ID'];
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
  id: Scalars['ID'];
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
  walletId: Scalars['WalletId'];
};

export type OnChainAddressCurrentInput = {
  walletId: Scalars['WalletId'];
};

export type OnChainAddressPayload = {
  __typename?: 'OnChainAddressPayload';
  address?: Maybe<Scalars['OnChainAddress']>;
  errors: Array<Error>;
};

export type OnChainPaymentSendAllInput = {
  address: Scalars['OnChainAddress'];
  memo?: InputMaybe<Scalars['Memo']>;
  targetConfirmations?: InputMaybe<Scalars['TargetConfirmations']>;
  walletId: Scalars['WalletId'];
};

export type OnChainPaymentSendInput = {
  address: Scalars['OnChainAddress'];
  amount: Scalars['SatAmount'];
  memo?: InputMaybe<Scalars['Memo']>;
  targetConfirmations?: InputMaybe<Scalars['TargetConfirmations']>;
  walletId: Scalars['WalletId'];
};

export type OnChainTxFee = {
  __typename?: 'OnChainTxFee';
  amount: Scalars['SatAmount'];
  targetConfirmations: Scalars['TargetConfirmations'];
};

export type OnChainUpdate = {
  __typename?: 'OnChainUpdate';
  amount: Scalars['SatAmount'];
  displayCurrencyPerSat: Scalars['Float'];
  txHash: Scalars['OnChainTxHash'];
  txNotificationType: TxNotificationType;
  /** @deprecated updated over displayCurrencyPerSat */
  usdPerSat: Scalars['Float'];
  walletId: Scalars['WalletId'];
};

export type OnChainUsdPaymentSendAsBtcDenominatedInput = {
  address: Scalars['OnChainAddress'];
  amount: Scalars['SatAmount'];
  memo?: InputMaybe<Scalars['Memo']>;
  targetConfirmations?: InputMaybe<Scalars['TargetConfirmations']>;
  walletId: Scalars['WalletId'];
};

export type OnChainUsdPaymentSendInput = {
  address: Scalars['OnChainAddress'];
  amount: Scalars['CentAmount'];
  memo?: InputMaybe<Scalars['Memo']>;
  targetConfirmations?: InputMaybe<Scalars['TargetConfirmations']>;
  walletId: Scalars['WalletId'];
};

export type OnChainUsdTxFee = {
  __typename?: 'OnChainUsdTxFee';
  amount: Scalars['CentAmount'];
  targetConfirmations: Scalars['TargetConfirmations'];
};

export type OneDayAccountLimit = AccountLimit & {
  __typename?: 'OneDayAccountLimit';
  /** The rolling time interval value in seconds for the current 24 hour period. */
  interval?: Maybe<Scalars['Seconds']>;
  /** The amount of cents remaining below the limit for the current 24 hour period. */
  remainingLimit?: Maybe<Scalars['CentAmount']>;
  /** The current maximum limit for a given 24 hour period. */
  totalLimit: Scalars['CentAmount'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
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
  base: Scalars['SafeInt'];
  currencyUnit: Scalars['String'];
  formattedAmount: Scalars['String'];
  offset: Scalars['Int'];
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
  amount: Scalars['SatAmount'];
  amountCurrencyUnit: ExchangeCurrencyUnit;
  priceCurrencyUnit: ExchangeCurrencyUnit;
};

export type PriceInterface = {
  base: Scalars['SafeInt'];
  /** @deprecated Deprecated due to type renaming */
  currencyUnit: Scalars['String'];
  offset: Scalars['Int'];
};

/** Price of 1 sat in base/offset. To calculate, use: `base / 10^offset` */
export type PriceOfOneSatInMinorUnit = PriceInterface & {
  __typename?: 'PriceOfOneSatInMinorUnit';
  base: Scalars['SafeInt'];
  /** @deprecated Deprecated due to type renaming */
  currencyUnit: Scalars['String'];
  offset: Scalars['Int'];
};

/** Price of 1 sat or 1 usd cent in base/offset. To calculate, use: `base / 10^offset` */
export type PriceOfOneSettlementMinorUnitInDisplayMinorUnit = PriceInterface & {
  __typename?: 'PriceOfOneSettlementMinorUnitInDisplayMinorUnit';
  base: Scalars['SafeInt'];
  /** @deprecated Deprecated due to type renaming */
  currencyUnit: Scalars['String'];
  /** @deprecated Deprecated please use `base / 10^offset` */
  formattedAmount: Scalars['String'];
  offset: Scalars['Int'];
};

/** Price of 1 usd cent in base/offset. To calculate, use: `base / 10^offset` */
export type PriceOfOneUsdCentInMinorUnit = PriceInterface & {
  __typename?: 'PriceOfOneUsdCentInMinorUnit';
  base: Scalars['SafeInt'];
  /** @deprecated Deprecated due to type renaming */
  currencyUnit: Scalars['String'];
  offset: Scalars['Int'];
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
  timestamp: Scalars['Timestamp'];
};

/** A public view of a generic wallet which stores value in one of our supported currencies. */
export type PublicWallet = {
  __typename?: 'PublicWallet';
  id: Scalars['ID'];
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
  userDefaultWalletId: Scalars['WalletId'];
  usernameAvailable?: Maybe<Scalars['Boolean']>;
};


export type QueryAccountDefaultWalletArgs = {
  username: Scalars['Username'];
  walletCurrency?: InputMaybe<WalletCurrency>;
};


export type QueryBtcPriceArgs = {
  currency?: Scalars['DisplayCurrency'];
};


export type QueryBtcPriceListArgs = {
  range: PriceGraphRange;
};


export type QueryGetWithdrawLinkArgs = {
  id?: InputMaybe<Scalars['ID']>;
  k1?: InputMaybe<Scalars['String']>;
  payment_hash?: InputMaybe<Scalars['String']>;
  unique_hash?: InputMaybe<Scalars['String']>;
};


export type QueryLnInvoicePaymentStatusArgs = {
  input: LnInvoicePaymentStatusInput;
};


export type QueryOnChainTxFeeArgs = {
  address: Scalars['OnChainAddress'];
  amount: Scalars['SatAmount'];
  targetConfirmations?: InputMaybe<Scalars['TargetConfirmations']>;
  walletId: Scalars['WalletId'];
};


export type QueryOnChainUsdTxFeeArgs = {
  address: Scalars['OnChainAddress'];
  amount: Scalars['CentAmount'];
  targetConfirmations?: InputMaybe<Scalars['TargetConfirmations']>;
  walletId: Scalars['WalletId'];
};


export type QueryOnChainUsdTxFeeAsBtcDenominatedArgs = {
  address: Scalars['OnChainAddress'];
  amount: Scalars['SatAmount'];
  targetConfirmations?: InputMaybe<Scalars['TargetConfirmations']>;
  walletId: Scalars['WalletId'];
};


export type QueryRealtimePriceArgs = {
  currency?: InputMaybe<Scalars['DisplayCurrency']>;
};


export type QueryUserDefaultWalletIdArgs = {
  username: Scalars['Username'];
};


export type QueryUsernameAvailableArgs = {
  username: Scalars['Username'];
};

export type Quiz = {
  __typename?: 'Quiz';
  /** The reward in Satoshis for the quiz question */
  amount: Scalars['SatAmount'];
  completed: Scalars['Boolean'];
  id: Scalars['ID'];
};

export type QuizCompletedInput = {
  id: Scalars['ID'];
};

export type QuizCompletedPayload = {
  __typename?: 'QuizCompletedPayload';
  errors: Array<Error>;
  quiz?: Maybe<Quiz>;
};

export type QuizQuestion = {
  __typename?: 'QuizQuestion';
  /** The earn reward in Satoshis for the quiz question */
  earnAmount: Scalars['SatAmount'];
  id: Scalars['ID'];
};

export type RealtimePrice = {
  __typename?: 'RealtimePrice';
  btcSatPrice: PriceOfOneSatInMinorUnit;
  denominatorCurrency: Scalars['DisplayCurrency'];
  id: Scalars['ID'];
  /** Unix timestamp (number of seconds elapsed since January 1, 1970 00:00:00 UTC) */
  timestamp: Scalars['Timestamp'];
  usdCentPrice: PriceOfOneUsdCentInMinorUnit;
};

export type RealtimePriceInput = {
  currency?: InputMaybe<Scalars['DisplayCurrency']>;
};

export type RealtimePricePayload = {
  __typename?: 'RealtimePricePayload';
  errors: Array<Error>;
  realtimePrice?: Maybe<RealtimePrice>;
};

export type SatAmountPayload = {
  __typename?: 'SatAmountPayload';
  amount?: Maybe<Scalars['SatAmount']>;
  errors: Array<Error>;
};

export type SettlementVia = SettlementViaIntraLedger | SettlementViaLn | SettlementViaOnChain;

export type SettlementViaIntraLedger = {
  __typename?: 'SettlementViaIntraLedger';
  /** Settlement destination: Could be null if the payee does not have a username */
  counterPartyUsername?: Maybe<Scalars['Username']>;
  counterPartyWalletId?: Maybe<Scalars['WalletId']>;
};

export type SettlementViaLn = {
  __typename?: 'SettlementViaLn';
  /** @deprecated Shifting property to 'preImage' to improve granularity of the LnPaymentSecret type */
  paymentSecret?: Maybe<Scalars['LnPaymentSecret']>;
  preImage?: Maybe<Scalars['LnPaymentPreImage']>;
};

export type SettlementViaOnChain = {
  __typename?: 'SettlementViaOnChain';
  transactionHash: Scalars['OnChainTxHash'];
  vout?: Maybe<Scalars['Int']>;
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
  success?: Maybe<Scalars['Boolean']>;
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
  createdAt: Scalars['Timestamp'];
  direction: TxDirection;
  id: Scalars['ID'];
  /** From which protocol the payment has been initiated. */
  initiationVia: InitiationVia;
  memo?: Maybe<Scalars['Memo']>;
  /** Amount of the settlement currency sent or received. */
  settlementAmount: Scalars['SignedAmount'];
  /** Wallet currency for transaction. */
  settlementCurrency: WalletCurrency;
  settlementDisplayAmount: Scalars['SignedDisplayMajorAmount'];
  settlementDisplayCurrency: Scalars['DisplayCurrency'];
  settlementDisplayFee: Scalars['SignedDisplayMajorAmount'];
  settlementFee: Scalars['SignedAmount'];
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
  cursor: Scalars['String'];
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
  account_type?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['Float']>;
  escrow_wallet?: InputMaybe<Scalars['String']>;
  k1?: InputMaybe<Scalars['String']>;
  max_withdrawable?: InputMaybe<Scalars['Float']>;
  min_withdrawable?: InputMaybe<Scalars['Float']>;
  payment_hash?: InputMaybe<Scalars['String']>;
  payment_request?: InputMaybe<Scalars['String']>;
  payment_secret?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Status>;
  title?: InputMaybe<Scalars['String']>;
  unique_hash?: InputMaybe<Scalars['String']>;
  user_id?: InputMaybe<Scalars['ID']>;
};

/** A wallet belonging to an account which contains a USD balance and a list of transactions. */
export type UsdWallet = Wallet & {
  __typename?: 'UsdWallet';
  accountId: Scalars['ID'];
  balance: Scalars['SignedAmount'];
  id: Scalars['ID'];
  /** An unconfirmed incoming onchain balance. */
  pendingIncomingBalance: Scalars['SignedAmount'];
  transactions?: Maybe<TransactionConnection>;
  transactionsByAddress?: Maybe<TransactionConnection>;
  walletCurrency: WalletCurrency;
};


/** A wallet belonging to an account which contains a USD balance and a list of transactions. */
export type UsdWalletTransactionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** A wallet belonging to an account which contains a USD balance and a list of transactions. */
export type UsdWalletTransactionsByAddressArgs = {
  address: Scalars['OnChainAddress'];
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
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
  createdAt: Scalars['Timestamp'];
  defaultAccount: Account;
  id: Scalars['ID'];
  /**
   * Preferred language for user.
   * When value is 'default' the intent is to use preferred language from OS settings.
   */
  language: Scalars['Language'];
  /** Phone number with international calling code. */
  phone?: Maybe<Scalars['Phone']>;
  /**
   * List the quiz questions the user may have completed.
   * @deprecated use Quiz from Account instead
   */
  quizQuestions: Array<UserQuizQuestion>;
  /**
   * Optional immutable user friendly identifier.
   * @deprecated will be moved to @Handle in Account and Wallet
   */
  username?: Maybe<Scalars['Username']>;
};


export type UserContactByUsernameArgs = {
  username: Scalars['Username'];
};

export type UserContact = {
  __typename?: 'UserContact';
  /**
   * Alias the user can set for this contact.
   * Only the user can see the alias attached to their contact.
   */
  alias?: Maybe<Scalars['ContactAlias']>;
  id: Scalars['Username'];
  /** Paginated list of transactions sent to/from this contact. */
  transactions?: Maybe<TransactionConnection>;
  transactionsCount: Scalars['Int'];
  /** Actual identifier of the contact. */
  username: Scalars['Username'];
};


export type UserContactTransactionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type UserContactUpdateAliasInput = {
  alias: Scalars['ContactAlias'];
  username: Scalars['Username'];
};

export type UserContactUpdateAliasPayload = {
  __typename?: 'UserContactUpdateAliasPayload';
  contact?: Maybe<UserContact>;
  errors: Array<Error>;
};

export type UserLoginInput = {
  code: Scalars['OneTimeAuthCode'];
  phone: Scalars['Phone'];
};

export type UserLogoutInput = {
  authToken: Scalars['AuthToken'];
};

export type UserQuizQuestion = {
  __typename?: 'UserQuizQuestion';
  completed: Scalars['Boolean'];
  question: QuizQuestion;
};

export type UserQuizQuestionUpdateCompletedInput = {
  id: Scalars['ID'];
};

export type UserQuizQuestionUpdateCompletedPayload = {
  __typename?: 'UserQuizQuestionUpdateCompletedPayload';
  errors: Array<Error>;
  userQuizQuestion?: Maybe<UserQuizQuestion>;
};

export type UserRequestAuthCodeInput = {
  channel?: InputMaybe<PhoneCodeChannelType>;
  phone: Scalars['Phone'];
};

export type UserUpdate = IntraLedgerUpdate | LnUpdate | OnChainUpdate | Price | RealtimePrice;

export type UserUpdateLanguageInput = {
  language: Scalars['Language'];
};

export type UserUpdateLanguagePayload = {
  __typename?: 'UserUpdateLanguagePayload';
  errors: Array<Error>;
  user?: Maybe<User>;
};

export type UserUpdateUsernameInput = {
  username: Scalars['Username'];
};

export type UserUpdateUsernamePayload = {
  __typename?: 'UserUpdateUsernamePayload';
  errors: Array<Error>;
  user?: Maybe<User>;
};

/** A generic wallet which stores value in one of our supported currencies. */
export type Wallet = {
  accountId: Scalars['ID'];
  balance: Scalars['SignedAmount'];
  id: Scalars['ID'];
  pendingIncomingBalance: Scalars['SignedAmount'];
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
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


/** A generic wallet which stores value in one of our supported currencies. */
export type WalletTransactionsByAddressArgs = {
  address: Scalars['OnChainAddress'];
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export enum WalletCurrency {
  Btc = 'BTC',
  Usd = 'USD'
}

export type WithdrawLink = {
  __typename?: 'WithdrawLink';
  account_type: Scalars['String'];
  amount: Scalars['Float'];
  created_at: Scalars['String'];
  escrow_wallet: Scalars['String'];
  id: Scalars['ID'];
  k1?: Maybe<Scalars['String']>;
  max_withdrawable: Scalars['Float'];
  min_withdrawable: Scalars['Float'];
  payment_hash: Scalars['String'];
  payment_request: Scalars['String'];
  payment_secret: Scalars['String'];
  status: Status;
  title: Scalars['String'];
  unique_hash: Scalars['String'];
  updated_at: Scalars['String'];
  user_id: Scalars['ID'];
};

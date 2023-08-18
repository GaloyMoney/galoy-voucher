# Galoy Voucher

Galoy Voucher is a web application built with Next.js 13, GraphQL, TypeScript, and PostgreSQL. It leverages the Lightning Network (LN) and LNURL withdraw to facilitate the creation and redemption of vouchers for Bitcoin transactions.

Galoy-Voucher uses query, mutation, and subscription operations from the Galoy's graphql API endpoints.

### Actors Involved

- Merchant/Bitcoin Seller/Voucher Creator
- Bitcoin Buyer/Voucher Redeemer
- Escrow Wallet that holds the funds until they are redeemed

## How to run this repo locally?
Setup [Galoy Quickstart](https://github.com/GaloyMoney/galoy/tree/main/quickstart)  for Backend.


add these in your .env files or in `/config/env.ts` file.

```bash
ESCROW_TOKEN
NEXT_PUBLIC_ESCROW_WALLET_USD
```

to configure more option look into `/config/env.ts `

then run

```
yarn install
```

and run

```
make start-dev
```

to start app in dev mode and docker containers for Database and kratos.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to build for production?

In the project directory, you can run:
```
yarn install
yarn build
```
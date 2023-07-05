import { errorArrayToString } from "@/utils/helpers";
import {
  getAllWithdrawLinksQuery,
  createWithdrawLinkMutation,
  updateWithdrawLinkMutation,
  deleteWithdrawLinkMutation,
  getWithdrawLinkByIdQuery,
  getWithdrawLinkByUniqueHashQuery,
  getWithdrawLinkByK1Query,
  getWithdrawLinkByPaymentHashQuery,
  getWithdrawLinksByUserIdQuery,
  updateWithdrawLinkStatus,
  GetWithdrawLinkBySecret,
} from "../utils/crud";
import {
  getOnChainTxFeeBTC,
  getOnChainTxFeeUSD,
  sendOnChainPaymentBTC,
  sendOnChainPaymentUSD,
} from "@/services/galoy";

//TODO need to send and handel errors
const resolvers = {
  Query: {
    getWithdrawLink: async (parent: any, args: any, context: any) => {
      const { id, unique_hash, k1, payment_hash, secret_code } = args;
      if (id) {
        return getWithdrawLinkByIdQuery(id);
      }
      if (unique_hash) {
        return getWithdrawLinkByUniqueHashQuery(unique_hash);
      }
      if (k1) {
        return getWithdrawLinkByK1Query(k1);
      }
      if (payment_hash) {
        return getWithdrawLinkByPaymentHashQuery(payment_hash);
      }
      if (secret_code) {
        return GetWithdrawLinkBySecret(secret_code);
      }
    },
    getAllWithdrawLinks: async (parent: any, args: any, context: any) => {
      return getAllWithdrawLinksQuery();
    },
    getWithdrawLinksByUserId: async (parent: any, args: any, context: any) => {
      const { user_id, status, limit, offset } = args;
      return getWithdrawLinksByUserIdQuery(user_id, status, limit, offset);
    },
    getOnChainPaymentFees: async (parent: any, args: any, context: any) => {
      const { id, btc_wallet_address } = args;
      const data = await getWithdrawLinkByIdQuery(id);
      const { escrow_wallet, account_type, max_withdrawable : amount } = data;
      if (account_type === "BTC") {
        const result = await getOnChainTxFeeBTC(
          escrow_wallet,
          btc_wallet_address,
          amount
        );
        const errorMessage = errorArrayToString(result.errors);
        if (errorMessage) {
          throw new Error(errorMessage);
        }
        return { fees: result.data.onChainTxFee.amount };
      } else {
        console.log("USD");
        const result = await getOnChainTxFeeUSD(
          escrow_wallet,
          btc_wallet_address,
          amount
        );
        const errorMessage = errorArrayToString(result.errors);
        if (errorMessage) {
          throw new Error(errorMessage);
        }
        return { fees: result.data.onChainUsdTxFee.amount };
      }
    },
  },

  Mutation: {
    createWithdrawLink: async (parent: any, args: any, context: any) => {
      const { input } = args;
      return createWithdrawLinkMutation(input);
    },
    updateWithdrawLink: async (parent: any, args: any, context: any) => {
      const { id, input } = args;
      return updateWithdrawLinkMutation(id, input);
    },
    deleteWithdrawLink: async (parent: any, args: any, context: any) => {
      const { id } = args;
      return deleteWithdrawLinkMutation(id);
    },
    sendPaymentOnChain: async (parent: any, args: any, context: any) => {
      const { id, btc_wallet_address } = args;
      const data = await getWithdrawLinkByIdQuery(id);
      const {
        escrow_wallet,
        account_type,
        max_withdrawable: amount,
        title,
        status,
      } = data;

      if (account_type === "BTC") {
        const fees_result = await getOnChainTxFeeBTC(
          escrow_wallet,
          btc_wallet_address,
          amount
        );
        const final_amount = amount - fees_result.data.onChainTxFee.amount;
        if (final_amount <= 0) {
          throw new Error("Amount is less than fees");
        }
        if (status === "PAID") {
          throw new Error("Payment already sent");
        }
        await updateWithdrawLinkStatus(id, "PAID");
        const result = await sendOnChainPaymentBTC(
          escrow_wallet,
          btc_wallet_address,
          final_amount,
          title
        );
        const errorMessage = errorArrayToString(result.errors);
        if (errorMessage) {
          throw new Error(errorMessage);
        }
        return {
          status: result.data.onChainPaymentSend.status,
          amount: final_amount,
        };
      } else {
        const fees_result = await getOnChainTxFeeUSD(
          escrow_wallet,
          btc_wallet_address,
          amount
        );
        const final_amount = amount - fees_result.data.onChainUsdTxFee.amount;
        if (final_amount <= 0) {
          throw new Error("Amount is less than fees");
        }
        if (status === "PAID") {
          throw new Error("Payment already sent");
        }
        await updateWithdrawLinkStatus(id, "PAID");
        const result = await sendOnChainPaymentUSD(
          escrow_wallet,
          btc_wallet_address,
          final_amount,
          title
        );
        const errorMessage = errorArrayToString(result.errors);
        if (errorMessage) {
          throw new Error(errorMessage);
        }
        return {
          status: result.data.onChainUsdPaymentSend.status,
          amount: final_amount,
        };
      }
    },
  },
};

export default resolvers;

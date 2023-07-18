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
import { CustomError, createCustomError } from "@/utils/errorHandler";
import { messageCode } from "@/utils/errorHandler";
//TODO need to send and handel errors

const resolvers = {
  Query: {
    getWithdrawLink: async (parent: any, args: any, context: any) => {
      try {
        const { id, unique_hash, k1, payment_hash, secret_code } = args;
        let data;
        if (id) {
          data = await getWithdrawLinkByIdQuery(id);
        } else if (unique_hash) {
          data = await getWithdrawLinkByUniqueHashQuery(unique_hash);
        } else if (k1) {
          data = await getWithdrawLinkByK1Query(k1);
        } else if (payment_hash) {
          data = await getWithdrawLinkByPaymentHashQuery(payment_hash);
        } else if (secret_code) {
          data = await GetWithdrawLinkBySecret(secret_code);
        } else {
          throw new CustomError(
            messageCode.BAD_USER_INPUT.messageCode,
            "input not provided"
          );
        }
        if (data instanceof Error) {
          throw new Error();
        }
        return data;
      } catch (error) {
        console.log(error);
        createCustomError(messageCode.INTERNAL_SERVER_ERROR, error as Error);
      }
    },
    getAllWithdrawLinks: async (parent: any, args: any, context: any) => {
      try {
        const data = await getAllWithdrawLinksQuery();
        if (data instanceof Error) {
          throw new Error();
        }
        return data;
      } catch (error) {
        console.log(error);
        createCustomError(messageCode.INTERNAL_SERVER_ERROR, error as Error);
      }
    },
    getWithdrawLinksByUserId: async (parent: any, args: any, context: any) => {
      try {
        const { user_id, status, limit, offset } = args;
        if (!user_id) {
          throw new CustomError(
            messageCode.BAD_USER_INPUT.messageCode,
            "user_id is not provided"
          );
        }
        const data = await getWithdrawLinksByUserIdQuery(
          user_id,
          status,
          limit,
          offset
        );
        if (data instanceof Error) {
          throw new Error();
        }
        return data;
      } catch (error) {
        console.log(error)
        createCustomError(messageCode.INTERNAL_SERVER_ERROR, error as Error);
      }
    },
    getOnChainPaymentFees: async (parent: any, args: any, context: any) => {
      try {
        const { id, btc_wallet_address } = args;
        const data = await getWithdrawLinkByIdQuery(id);
        const { escrow_wallet, account_type, voucher_amount: amount } = data;
        if (account_type === "BTC") {
          const result = await getOnChainTxFeeBTC(
            escrow_wallet,
            btc_wallet_address,
            amount
          );
          const errorMessage = errorArrayToString(result.errors);
          if (errorMessage) {
            throw new CustomError(
              messageCode.BAD_USER_INPUT.messageCode,
              errorMessage
            );
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
            throw new CustomError(
              messageCode.BAD_USER_INPUT.messageCode,
              errorMessage
            );
          }
          return { fees: result.data.onChainUsdTxFee.amount };
        }
      } catch (error) {
        console.log(error);
        createCustomError(messageCode.INTERNAL_SERVER_ERROR, error as Error);
      }
    },
  },

  Mutation: {
    createWithdrawLink: async (parent: any, args: any, context: any) => {
      try {
        const { input } = args;
        const data = await createWithdrawLinkMutation(input);
        if (data instanceof Error) {
          throw new Error();
        }
        return data;
      } catch (error) {
        console.log(error);
        createCustomError(messageCode.INTERNAL_SERVER_ERROR, error as Error);
      }
    },
    updateWithdrawLink: async (parent: any, args: any, context: any) => {
      try {
        const { id, input } = args;
        if (!id) {
          throw new CustomError(
            messageCode.BAD_USER_INPUT.messageCode,
            "id is not provided"
          );
        }
        const data = await updateWithdrawLinkMutation(id, input);
        if (data instanceof Error) {
          throw new Error();
        }
        return data;
      } catch (error) {
        createCustomError(messageCode.INTERNAL_SERVER_ERROR, error as Error);
      }
    },
    deleteWithdrawLink: async (parent: any, args: any, context: any) => {
      try {
        const { id } = args;
        if (!id) {
          throw new CustomError(
            messageCode.BAD_USER_INPUT.messageCode,
            "id is not provided"
          );
        }
        const data: any = await deleteWithdrawLinkMutation(id);
        if (data instanceof Error) {
          throw new Error();
        }
        return data;
      } catch (error) {
        console.log(error);
        createCustomError(messageCode.INTERNAL_SERVER_ERROR, error as Error);
      }
    },
    sendPaymentOnChain: async (parent: any, args: any, context: any) => {
      try {
        const { id, btc_wallet_address } = args;
        const data = await getWithdrawLinkByIdQuery(id);
        const {
          escrow_wallet,
          account_type,
          voucher_amount: amount,
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
            throw new CustomError(
              messageCode.BAD_USER_INPUT.messageCode,
              "Amount is less than fees"
            );
          }
          if (status === "PAID") {
            throw new CustomError(
              messageCode.BAD_USER_INPUT.messageCode,
              "Payment already sent"
            );
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
            throw new CustomError(
              messageCode.BAD_USER_INPUT.messageCode,
              errorMessage
            );
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
            throw new CustomError(
              messageCode.BAD_USER_INPUT.messageCode,
              "Amount is less than fees"
            );
          }
          if (status === "PAID") {
            throw new CustomError(
              messageCode.BAD_USER_INPUT.messageCode,
              "Payment already sent"
            );
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
            throw new CustomError(
              messageCode.BAD_USER_INPUT.messageCode,
              errorMessage
            );
          }
          return {
            status: result.data.onChainUsdPaymentSend.status,
            amount: final_amount,
          };
        }
      } catch (error) {
        console.log(error);
        createCustomError(messageCode.INTERNAL_SERVER_ERROR, error as Error);
      }
    },
  },
};

export default resolvers;

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
} from "../utils/crud";

//resolvers for the Schema
//TODO need to send and handel errors
const resolvers = {
  Query: {
    getWithdrawLink: async (parent: any, args: any, context: any) => {
      const { id, unique_hash, k1, payment_hash } = args;
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
    },
    getAllWithdrawLinks: async (parent: any, args: any, context: any) => {
      return getAllWithdrawLinksQuery();
    },
    getWithdrawLinksByUserId: async (parent: any, args: any, context: any) => {
      const { user_id, status } = args;
      return getWithdrawLinksByUserIdQuery(user_id, status);
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
  },
};

export default resolvers;

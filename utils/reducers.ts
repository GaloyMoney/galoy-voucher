import { MAX_INPUT_VALUE_LENGTH } from "@/config/variables";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  DELETE_DIGIT: "delete-digit",
  CLEAR_INPUT: "clear-input",
  UPDATE_WALLET_CURRENCY: "update-wallet-currency",
  SET_AMOUNT: "set-amount",
};

export type ACTION_TYPE = {
  type: string;
  payload?: string | string[] | (() => void) | boolean | undefined;
};

function reducer(state: React.ComponentState, { type, payload }: ACTION_TYPE) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.currentAmount.includes("NaN")) {
        state.currentAmount = state.currentAmount.replace("NaN", "");
      }
      if (payload == "0" && state.currentAmount == "0") return state;
      if (payload === "." && state.currentAmount.includes(".")) return state;
      if (state.currentAmount?.length >= MAX_INPUT_VALUE_LENGTH) return state;
      if (state.currentAmount.match(/(\.[0-9]{2,}$|\..*\.)/)) return state;
      if (
        payload === "." &&
        (state.currentAmount === "0" || state.currentAmount === "")
      ) {
        return { ...state, currentAmount: "0." };
      }
      return {
        ...state,
        currentAmount: `${state.currentAmount || ""}${payload}`,
      };

    case ACTIONS.DELETE_DIGIT:
      if (state.currentAmount == null) return state;
      return {
        ...state,
        currentAmount: state.currentAmount?.slice(0, -1),
      };

    case ACTIONS.CLEAR_INPUT:
      if (state.currentAmount == null) return state;
      return {
        ...state,
        currentAmount: "0",
      };

    case ACTIONS.UPDATE_WALLET_CURRENCY:
      return {
        ...state,
        walletCurrency: payload,
      };
    case ACTIONS.SET_AMOUNT:
      if (state.currentAmount == null) return state;
      if (payload?.toString().match(/(\.[0-9]{2,}$|\..*\.)/)) {
        if (payload?.toString() === "0.00")
          return {
            ...state,
            currentAmount: "0",
          };
        return {
          ...state,
          currentAmount: Number(payload).toFixed(2),
        };
      }
      return {
        ...state,
        currentAmount: payload,
      };

    default:
      return state;
  }
}

export default reducer;

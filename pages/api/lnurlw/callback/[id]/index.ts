// pages/api/lnurlw/callback/[id].js
import {
  getWithdrawLinkByK1Query,
  updateWithdrawLinkMutation,
} from "../../../../../utils/crud";
import { sendPaymentRequest } from "@/utils/galoy";
import { decode } from "light-bolt11-decoder";

//TODO need to add interface in this 
export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    const { id } = req.query;
    const { k1, pr } = req.query;

    try {
      //validating the invoice and details saved in DB an them invoice is paid
      const withdrawLink = await getWithdrawLinkByK1Query(k1);
      const amount = decode(pr).sections.find(
        (section: any) => section.name === "amount"
      )?.value;

      if (!withdrawLink) {
        return res
          .status(404)
          .json({ status: "ERROR", reason: "Withdraw link not found" });
      }

      if (withdrawLink.id !== id) {
        return res
          .status(404)
          .json({ status: "ERROR", reason: "Invalid Request" });
      }

      if (withdrawLink.status === "PAID") {
        return res
          .status(404)
          .json({ status: "ERROR", reason: "Withdraw link claimed" });
      }

      if (
        !(
          amount >= withdrawLink.min_withdrawable * 1000 &&
          amount <= withdrawLink.max_withdrawable * 1000
        )
      ) {
        return res
          .status(404)
          .json({ status: "ERROR", reason: "Invalid amount" });
      }

      
      const sendPaymentResponse = await sendPaymentRequest(
        process.env.NEXT_PUBLIC_ESCROW_WALLET_BTC || "",
        pr,
        withdrawLink.title
      );

      const { data: sendPaymentData, errors: sendPaymentErrors } =
        sendPaymentResponse;

      if (sendPaymentErrors) {
        console.error(sendPaymentErrors);
        return res
          .status(500)
          .json({ status: "ERROR", reason: "Internal Server Error" });
      } else {
        //TODO need to handel errors here
        const updateWithdrawLink = await updateWithdrawLinkMutation(id, {
          status: "PAID",
        });
        res.status(200).json({ status: "OK" });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ status: "ERROR", reason: "internal server error" });
    }
  } else {
    res.status(405).json({ status: "ERROR", reason: "INVALID REQUEST" });
  }
}

import { getWithdrawLinkByUniqueHashQuery } from "../../../../utils/crud";

//TODO need to add interface in this 
export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    try {
      const uniqueHash = req.query.unique_hash;

      const withdrawLink = await getWithdrawLinkByUniqueHashQuery(uniqueHash);

      if (!withdrawLink) {
        return res.status(404).json({ error: "Withdraw link not found" });
      }

      res.status(200).json({
        tag: "withdrawRequest",
        callback: `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/lnurlw/callback/${withdrawLink.id}`,
        k1: withdrawLink.k1,
        minWithdrawable: withdrawLink.min_withdrawable * 1000,
        maxWithdrawable: withdrawLink.max_withdrawable * 1000,
        defaultDescription: withdrawLink.title,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

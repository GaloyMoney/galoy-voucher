import knexConfig from "../config/knexfile";
const knexConfigObj = knexConfig["development"];
const knex = require("knex")(knexConfigObj);
import { v4 as uuidv4 } from "uuid";

//CREATE READ UPDATE DELETE functions
export async function getWithdrawLinkByIdQuery(id: string) {
  const query = knex.select().from("withdraw_links").where({ id });
  const withdrawLink = await query.first();
  return withdrawLink;
}

export async function getWithdrawLinkByUniqueHashQuery(uniqueHash: string) {
  const query = knex
    .select()
    .from("withdraw_links")
    .where({ unique_hash: uniqueHash });
  const withdrawLink = await query.first();
  return withdrawLink;
}

export async function getWithdrawLinkByK1Query(k1: string) {
  const query = knex.select().from("withdraw_links").where({ k1 });
  const withdrawLink = await query.first();
  return withdrawLink;
}

export async function getWithdrawLinkByPaymentHashQuery(paymentHash: string) {
  const query = knex
    .select()
    .from("withdraw_links")
    .where({ payment_hash: paymentHash });
  const withdrawLink = await query.first();
  return withdrawLink;
}

export async function getAllWithdrawLinksQuery() {
  const withdrawLinks = await knex.select().from("withdraw_links");
  return withdrawLinks;
}

export async function createWithdrawLinkMutation(input: any) {
  const withdrawLink = {
    id: uuidv4(),
    ...input,
  };

  const [createdWithdrawLink] = await knex("withdraw_links")
    .insert(withdrawLink)
    .returning("*");

  return createdWithdrawLink;
}

export async function updateWithdrawLinkMutation(id: string, input: any) {
  const [withdrawLink] = await knex("withdraw_links")
    .where({ id })
    .update(input)
    .returning("*");

  return withdrawLink;
}

export async function deleteWithdrawLinkMutation(id: string) {
  await knex("withdraw_links").where({ id }).del();
  return id;
}

export async function getWithdrawLinksByUserIdQuery(
  user_id: string,
  status?: string
) {
  let query = knex
    .select()
    .from("withdraw_links")
    .where({ user_id: user_id })
    ;

  if (status) {
    query = query.andWhere({ status: status });
  }

  const withdrawLinks = await query.orderBy("created_at", "desc");
  return withdrawLinks;
}

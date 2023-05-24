import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("withdraw_links", function (table) {
    table.uuid("id").primary();  
    table.uuid("user_id").notNullable();
    table.text("payment_request").notNullable(); // invoice created by escrow account for to take funds from user
    table.text("payment_hash").notNullable(); 
    table.text("payment_secret").notNullable(); 
    table.decimal("amount").notNullable(); // total sum of amount it will be used if multiple links are created at once like 10 links for 10 sats then this will be 100
    table.text("account_type").notNullable(); // BTC or USD
    table.text("escrow_wallet").notNullable(); // escrow account wallet USD or BTC 
    table
      .enu("status", ["FUNDED", "UNFUNDED", "PAID"]) // FUNDED = can be used now, PAID = cannot be used now link used  
      .notNullable()
      .defaultTo("UNFUNDED");
    table.text("title").notNullable(); //description ot title of the link
    table.decimal("min_withdrawable").notNullable(); 
    table.decimal("max_withdrawable").notNullable();
    table.text("unique_hash").notNullable(); 
    table.text("k1"); 
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("withdraw_links");
}

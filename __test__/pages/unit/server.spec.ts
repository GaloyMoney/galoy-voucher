const { server } =  require("../../../pages/api/graphql/index");

import { gql } from "@apollo/client";
describe("GraphQL API Tests", () => {
  it("returns data as expected for GET_WITHDRAW_LINK query", async () => {
    const query = gql`
      query GetWithdrawLink($getWithdrawLinkId: ID) {
        getWithdrawLink(id: $getWithdrawLinkId) {
          id
          user_id
          payment_request
          payment_hash
          payment_secret
          sales_amount
          account_type
          escrow_wallet
          status
          title
          voucher_amount
          unique_hash
          k1
          created_at
          updated_at
          commission_percentage
          identifier_code
          secret_code
          invoice_expiration
        }
      }
    `;

    const variables = {
      getWithdrawLinkId: "071887c1-d2cc-4999-ac76-99e98b444ac8",
    };

    const { data } = await server.executeOperation({ query, variables });

    const expectedData = {
      data: {
        getWithdrawLink: {
          id: "071887c1-d2cc-4999-ac76-99e98b444ac8",
          user_id: "aaaaaaaa-e098-4a16-932b-e4f4abc24366",
          payment_request:
            "lntbs16370n1pj2d0mzpp5jsvpmkzx9dx3glfmr0xqgj527s6mwapgj4m6zm5643yvspnu63dsdp8gaskcmmeypmkjargv3exzaeqyqjrqt34ypqr2vqcqzpuxqzfvsp5fy2dl26yp78h3afzg5r95gkr00pdv6wcq4ujnc22fww700r8qfks9qyyssqttva0h982z498ru86zngsxan0h354cpprnrw2rlt44xjjqup34y3qxl0nx3jlwyhzd8n3nvjruua67dppq93essu82cuwe9c9mfwhtqpc5lrej",
          payment_hash:
            "94181dd8462b4d147d3b1bcc044a8af435b774289577a16e9aac48c8067cd45b",
          payment_secret:
            "4914dfab440f8f78f52245065a22c37bc2d669d8057929e14a4b9de7bc67026d",
          sales_amount: 1,
          account_type: "USD",
          escrow_wallet: "a9f06793-078e-4fac-b125-5489de1f0442",
          status: "FUNDED",
          title: "Galoy withdraw  $0.5 @50",
          voucher_amount: 50,
          unique_hash: "35201d17d51e4a90ab74531657f7f13c",
          k1: "b2d75f48111f4add880fa220da47cbca",
          created_at: "1688649571020",
          updated_at: "1688649571020",
          commission_percentage: 50,
          identifier_code: "DL1SV",
          secret_code: "FVMEK3UU9PUJ",
          invoice_expiration: "1688649871020",
        },
      },
    };

    expect(data).toEqual(expectedData);
  });
});

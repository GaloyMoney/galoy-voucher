"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/config/apollo";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApolloProvider client={apolloClient}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ApolloProvider>
  );
}

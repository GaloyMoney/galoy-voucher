"use client";
import "./globals.css";
import { Inter_Tight } from "next/font/google";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/config/apollo";
import Navigation from "@/components/NavBar/Navigation";
import { SessionProvider } from "@/context/session";
const inter = Inter_Tight({ subsets: ["latin"], display: "auto" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApolloProvider client={apolloClient}>
      <SessionProvider>
        <html lang="en">
          <body className={inter.className}>
            <Navigation />
            {children}
          </body>
        </html>
      </SessionProvider>
    </ApolloProvider>
  );
}

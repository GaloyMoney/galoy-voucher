"use client";
import "./globals.css";
import { Inter_Tight } from "next/font/google";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/config/apollo";
import NavBarComponent from "@/components/NavBar/NavBar";
const inter = Inter_Tight({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApolloProvider client={apolloClient}>
      <html lang="en">
        <body className={inter.className}>
          <NavBarComponent />
          {children}
        </body>
      </html>
    </ApolloProvider>
  );
}

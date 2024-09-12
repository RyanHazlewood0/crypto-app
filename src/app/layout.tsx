"use client";
import { CoinProvider } from "./contexts/CoinProvider";
import "./globals.css";
import styled from "styled-components";
import MarketDataBar from "./components/MarketDataBar/MarketDataBar";
import NavBar from "./components/NavBar/NavBar";
import { useEffect } from "react";
import { useCoin } from "./contexts/CoinProvider";
import { CoinTypes } from "types";

const MainContainer = styled.div`
  max-width: 1296px;
  margin-left: auto;
  margin-right: auto;
`;

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <CoinProvider>
          <MarketDataBar />
          <MainContainer>
            <NavBar />
            {children}
          </MainContainer>
        </CoinProvider>
      </body>
    </html>
  );
}

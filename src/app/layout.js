"use client";
import { Inter } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import styled from "styled-components";
import Link from "next/link";
import PropTypes from "prop-types";
import Navbar from "./components/Navbar";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
});

const BtnsContainer = styled.div`
  display: flex;
`;

const CoinsBtnContainer = styled.div`
  background: #6161d6;
  color: white;
  width: 244px;
  height: 45px;
  font-size: 16px;
  text-align: center;
  border-radius: 10px;
`;

const PortfolioBtnContainer = styled.div`
  background: #232336;
  color: white;
  width: 244px;
  height: 45px;
  font-size: 16px;
  text-align: center;
  border-radius: 10px;
`;

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <BtnsContainer className={spaceGrotesk.className}>
          <CoinsBtnContainer>
            <Link href="/">Home</Link>
          </CoinsBtnContainer>
          <PortfolioBtnContainer>
            <Link href="/portfolio">Portfolio</Link>
          </PortfolioBtnContainer>
        </BtnsContainer>
        {children}
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

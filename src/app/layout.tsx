"use client";
import { CryptoProvider } from "./contexts/CryptoProvider";
import "./globals.css";
import MarketDataBar from "./components/MarketDataBar/MarketDataBar";
import NavBar from "./components/NavBar/NavBar";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <CryptoProvider>
          <MarketDataBar />
          <div
            className={
              "mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-md sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl"
            }
          >
            <NavBar />
            {children}
          </div>
        </CryptoProvider>
      </body>
    </html>
  );
}

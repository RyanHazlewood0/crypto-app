
export type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  price_change_percent_24h: number;
  circulating_supply: number;
  total_supply: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  sparkline_in_7d: {
    price: number[];
  };
}
  
  export type CoinPageObject = {
    id: string;
    symbol: string;
    name: string;
    image: {
      small: string;
    };
    links: {
      homepage: string[];
      blockchain_site: string[];
    };
   market_data: { 
      current_price: CurrencyValue;
      ath_date: string;
      atl_date: string;
      atl: CurrencyValue;
      ath: CurrencyValue;
      market_cap: CurrencyValue;
      fully_diluted_valuation: CurrencyValue;
      total_volume: CurrencyValue;
      circulating_supply: number;
      total_supply: number;
    };
    description: {
      en: string;
    };
  }
  
  export type PortfolioCoin = {
    name: string;
    totalAmount: number;
    purchaseDate: Date;
    currentPrice: number;
    totalValue: number;
    image: string;
    circulating_supply: number;
    total_supply: number;
    total_volume: number;
    market_cap: number;
    priceChange24h: number;
    symbol: string;
    id: string;
  }

  export type CurrencyValue = {
    [key: string]: number;
  }
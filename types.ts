export interface CoinTypes {
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
  
  export interface CurrencyValue {
    [key: string]: number;
  }
  
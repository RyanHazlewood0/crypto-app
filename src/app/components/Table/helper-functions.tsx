import { CoinTypes } from "@/app/contexts/CoinProvider";

export const abbreviateNumber = (num: number): number | string => {
  const prefixes = ["", "k", "M", "B", "T"];
  if (num < 1) {
    return num.toFixed(2);
  }
  const magnitude = Math.floor(Math.log10(Math.abs(num)) / 3);
  const scaled = num / Math.pow(1000, magnitude);
  const formatted = scaled >= 100 ? scaled.toFixed(2) : scaled.toFixed(2);
  return `${formatted}${prefixes[magnitude]}`;
};

export const findSupplyLevel = (coin: CoinTypes): number => {
  const progress = (coin.circulating_supply / coin.total_supply) * 100;
  return progress;
};

export const findVolumeLevel = (coin: CoinTypes): number => {
  const progress = (coin.total_volume / coin.market_cap) * 100;
  return progress;
};

"use client";
import PropTypes from "prop-types";
import { useCoin } from "@/app/contexts/CoinProvider";

export default function Coin({ params }) {
  const { coins } = useCoin();
  const thisCoin = coins.find((coin) => coin.id === params.coinId);

  return (
    coins && (
      <>
        <p>{thisCoin.symbol}</p>
      </>
    )
  );
}

Coin.propTypes = {
  params: PropTypes.shape({
    coinId: PropTypes.string.isRequired,
  }).isRequired,
};

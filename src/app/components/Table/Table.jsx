import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

const CoinTable = styled.table`
  max-width: 1440px;
`;

const TableRow = styled.tr`
  width: 100%;
  background: #191925;
`;

const Table = () => {
  const [hasError, setHasError] = useState(false);
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    setHasError(false);
    const getCoinData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d"
        );
        const fetchedData = await response.json();
        setCoins(fetchedData);
      } catch {
        setHasError(true);
      }
    };
    getCoinData();
  }, []);

  return hasError ? (
    <div>Error loading coin data</div>
  ) : (
    <CoinTable>
      {coins.map((coin) => (
        <TableRow key={coin.id}>
          <td>{coin.market_cap_rank}</td>
          <td>{coin.name}</td>
          <td>{coin.current_price}</td>
          <td>{coin.price_change_percentage_1h_in_currency}</td>
          <td>{coin.price_change_percentage_24h_in_currency}</td>
          <td>{coin.price_change_percentage_7d_in_currency}</td>
          <td>
            {coin.market_cap} / {coin.total_volume}
          </td>
          <td>
            {coin.circulating_supply} / {coin.total_supply}
          </td>
          <td>"placeholder for 7day sparkline"</td>
        </TableRow>
      ))}
    </CoinTable>
  );
};

export default Table;

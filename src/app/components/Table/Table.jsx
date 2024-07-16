import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

const CoinTable = styled.table`
  max-width: 1440px;
`;

const TableRow = styled.tr`
  width: 100%;
  background: #191925;
  border-top: 5px solid #03071e;
`;

const TableHeader = styled.th`
  color: #d1d1d1;
  font-size: 14px;
`;

const Table = () => {
  const [hasError, setHasError] = useState(false);
  const [coins, setCoins] = useState([]);

  function abbreviateNumber(num) {
    const prefixes = ["", "k", "M", "B", "T"];
    if (num < 1) {
      return num.toFixed(2);
    }
    const magnitude = Math.floor(Math.log10(Math.abs(num)) / 3);
    const scaled = num / Math.pow(1000, magnitude);
    const formatted = scaled >= 100 ? scaled.toFixed(2) : scaled.toFixed(2);
    return `${formatted}${prefixes[magnitude]}`;
  }

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
    <div>{"Error loading coin data"}</div>
  ) : (
    <CoinTable>
      <tbody>
        <tr>
          <TableHeader style={{ textAlign: "left" }}>#</TableHeader>
          <TableHeader style={{ textAlign: "left" }}>Name</TableHeader>
          <TableHeader style={{ textAlign: "left" }}>Price</TableHeader>
          <TableHeader style={{ textAlign: "left" }}>1h%</TableHeader>
          <TableHeader style={{ textAlign: "left" }}>24h%</TableHeader>
          <TableHeader style={{ textAlign: "left" }}>7d%</TableHeader>
          <TableHeader style={{ textAlign: "left" }}>
            24h Volume / Market Cap
          </TableHeader>
          <TableHeader style={{ textAlign: "left" }}>
            Circulating / Total Supply
          </TableHeader>
          <TableHeader style={{ textAlign: "left" }}>Last 7d</TableHeader>
        </tr>
        {coins.map((coin) => (
          <TableRow key={coin.id}>
            <td>{coin.market_cap_rank}</td>
            <td>{coin.name}</td>
            <td>{abbreviateNumber(coin.current_price)}</td>
            <td>{coin.price_change_percentage_1h_in_currency.toFixed(2)}</td>
            <td>{coin.price_change_percentage_24h_in_currency.toFixed(2)}</td>
            <td>{coin.price_change_percentage_7d_in_currency.toFixed(2)}</td>
            <td>
              {abbreviateNumber(coin.market_cap)} /{" "}
              {abbreviateNumber(coin.total_volume)}
            </td>
            <td>
              {abbreviateNumber(coin.circulating_supply)} /{" "}
              {abbreviateNumber(coin.total_supply)}
            </td>
            <td>{"placeholder sparkline"}</td>
          </TableRow>
        ))}
      </tbody>
    </CoinTable>
  );
};

export default Table;

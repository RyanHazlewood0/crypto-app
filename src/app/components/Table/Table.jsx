import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

const CoinTable = styled.table`
  max-width: 1440px;
  margin: 0 auto 0 auto;
  border-collapse: separate;
  border-spacing: 0 6px;
`;

const TableRow = styled.tr`
  width: 100%;
  background: #191925;
  font-size: 14px;
`;

const TableHeader = styled.thead`
  color: #d1d1d1;
  font-size: 12px;
  text-align: left;
`;

const NameAndImageContainer = styled.td`
  display: flex;
  align-items: center;
  padding: 15px;
  max-width: 175px;
  height: 75px;
`;

const StyledTd = styled.td`
  padding: 15px;
  height: 75px;
`;

const StyledTh = styled.th`
  padding: 5px 15px 5px 15px;
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
      <TableHeader>
        <tr>
          <StyledTh>#</StyledTh>
          <StyledTh>Name</StyledTh>
          <StyledTh>Price</StyledTh>
          <StyledTh>1h%</StyledTh>
          <StyledTh>24h%</StyledTh>
          <StyledTh>7d%</StyledTh>
          <StyledTh>24h Volume / Market Cap</StyledTh>
          <StyledTh>Circulating / Total Supply</StyledTh>
          <StyledTh>Last 7d</StyledTh>
        </tr>
      </TableHeader>
      <tbody>
        {coins.map((coin) => (
          <TableRow key={coin.id}>
            <StyledTd style={{ borderRadius: "10px 0 0 10px" }}>
              {coin.market_cap_rank}
            </StyledTd>
            <NameAndImageContainer>
              <img
                src={coin.image}
                style={{
                  width: "32px",
                  marginRight: "15px",
                }}
              />
              {coin.name} ({coin.symbol.toUpperCase()})
            </NameAndImageContainer>
            <StyledTd>{abbreviateNumber(coin.current_price)}</StyledTd>
            <StyledTd>
              {coin.price_change_percentage_1h_in_currency.toFixed(2)}
            </StyledTd>
            <StyledTd>
              {coin.price_change_percentage_24h_in_currency.toFixed(2)}
            </StyledTd>
            <StyledTd>
              {coin.price_change_percentage_7d_in_currency.toFixed(2)}
            </StyledTd>
            <StyledTd>
              {abbreviateNumber(coin.market_cap)} /{" "}
              {abbreviateNumber(coin.total_volume)}
              {" line placeholer"}
            </StyledTd>
            <StyledTd>
              {abbreviateNumber(coin.circulating_supply)} /{" "}
              {abbreviateNumber(coin.total_supply)}
              {" line placeholer"}
            </StyledTd>
            <StyledTd style={{ borderRadius: "0 10px 10px 0" }}>
              {"placeholder sparkline"}
            </StyledTd>
          </TableRow>
        ))}
      </tbody>
    </CoinTable>
  );
};

export default Table;

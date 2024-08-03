import { useState } from "react";
import { useEffect } from "react";
import { useCoin } from "@/app/contexts/CoinProvider";
import {
  abbreviateNumber,
  findSupplyLevel,
  findVolumeLevel,
} from "./helper-functions";
import TableLineChart from "../TableLineChart/TableLineChart";
import Link from "next/link";
import styled from "styled-components";
import RedArrow from "./svg/RedArrow";
import GreenArrow from "./svg/GreenArrow";

const CoinTable = styled.table`
  max-width: 100%;
  width: 100%;
  margin: 0 auto 0 auto;
  border-collapse: separate;
  border-spacing: 0 6px;
`;

const TableRow = styled.tr`
  width: 100%;
  background: #191925;
  font-size: 14px;
  height: 77px;
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
  height: 77px;
`;

const StyledTd = styled.td`
  padding: 15px;
  height: 77px;
`;

const StyledTh = styled.th`
  padding: 5px 15px 5px 15px;
`;

const ArrowAndPercentContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LevelIndicatorOuter = styled.div`
  display: flex;
  height: 5px;
  background-color: #40916c;
  border-radius: 5px;
`;

const LevelIndicatorInner = styled.div`
  height: 5px;
  background-color: #30e0a1;
  border-radius: 5px;
`;

const NumberSeparator = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;
`;

const PriceChangeDiv = styled.div`
  color: ${(props) => (props.green ? "#01F1E3" : "#FE2264")};
`;

const Table = () => {
  const [hasError, setHasError] = useState(false);
  const [sortOrder, setSortOrder] = useState("descending mcap");

  const { coins, setCoins } = useCoin();

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    setHasError(false);
    const getCoinData = async () => {
      try {
        const response = await fetch(
          `https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&x_cg_pro_api_key=${apiKey}`
        );
        const fetchedData = await response.json();
        setCoins(fetchedData);
      } catch {
        setHasError(true);
      }
    };
    getCoinData();
  }, [sortOrder]);

  const getSortOption = (e) => {
    const order = e.currentTarget.dataset.order;
    setSortOrder(order);
  };

  const sortedCoins = [...coins].sort((a, b) => {
    if (sortOrder === "price-desc") {
      return a.current_price - b.current_price;
    } else if (sortOrder === "price-asc") {
      return b.current_price - a.current_price;
    } else if (sortOrder === "1h-desc") {
      return (
        a.price_change_percentage_1h_in_currency -
        b.price_change_percentage_1h_in_currency
      );
    } else if (sortOrder === "1h-asc") {
      return (
        b.price_change_percentage_1h_in_currency -
        a.price_change_percentage_1h_in_currency
      );
    } else if (sortOrder === "24h-desc") {
      return (
        a.price_change_percentage_24h_in_currency -
        b.price_change_percentage_24h_in_currency
      );
    } else if (sortOrder === "24h-asc") {
      return (
        b.price_change_percentage_24h_in_currency -
        a.price_change_percentage_24h_in_currency
      );
    } else if (sortOrder === "7d-desc") {
      return (
        a.price_change_percentage_7d_in_currency -
        b.price_change_percentage_7d_in_currency
      );
    } else if (sortOrder === "7d-asc") {
      return (
        b.price_change_percentage_7d_in_currency -
        a.price_change_percentage_7d_in_currency
      );
    } else if (sortOrder === "mcap-desc") {
      return a.market_cap - b.market_cap;
    } else if (sortOrder === "mcap-asc") {
      return b.market_cap - a.market_cap;
    } else if (sortOrder === "name-desc") {
      return b.name.localeCompare(a.name);
    } else if (sortOrder === "name-asc") {
      return a.name.localeCompare(b.name);
    }
  });

  return hasError ? (
    <div>{"Error loading coin data"}</div>
  ) : (
    <CoinTable>
      <TableHeader>
        <tr>
          <StyledTh>
            <p>
              #
              <span
                style={{ margin: "0 5px 0 5px", cursor: "pointer" }}
                onClick={(e) => getSortOption(e)}
                data-order="mcap-desc"
              >
                ▼
              </span>
              <span
                onClick={(e) => getSortOption(e)}
                data-order="mcap-asc"
                style={{ cursor: "pointer" }}
              >
                ▲
              </span>
            </p>
          </StyledTh>
          <StyledTh>
            <p>
              Name{" "}
              <span
                style={{ margin: "0 5px 0 5px", cursor: "pointer" }}
                onClick={(e) => getSortOption(e)}
                data-order="name-desc"
              >
                ▼
              </span>
              <span
                onClick={(e) => getSortOption(e)}
                data-order="name-asc"
                style={{ cursor: "pointer" }}
              >
                ▲
              </span>
            </p>
          </StyledTh>
          <StyledTh>
            <p>
              Price{" "}
              <span
                style={{ margin: "0 5px 0 5px", cursor: "pointer" }}
                data-order="price-desc"
                onClick={(e) => getSortOption(e)}
              >
                ▼
              </span>
              <span
                data-order="price-asc"
                onClick={(e) => getSortOption(e)}
                style={{ cursor: "pointer" }}
              >
                ▲
              </span>
            </p>
          </StyledTh>
          <StyledTh>
            <p>
              1h%{" "}
              <span
                style={{ margin: "0 5px 0 5px", cursor: "pointer" }}
                onClick={(e) => getSortOption(e)}
                data-order="1h-desc"
              >
                ▼
              </span>
              <span
                onClick={(e) => getSortOption(e)}
                data-order="1h-asc"
                style={{ cursor: "pointer" }}
              >
                ▲
              </span>
            </p>
          </StyledTh>
          <StyledTh>
            <p>
              24h%{" "}
              <span
                style={{ margin: "0 5px 0 5px", cursor: "pointer" }}
                onClick={(e) => getSortOption(e)}
                data-order="24h-desc"
              >
                ▼
              </span>
              <span
                onClick={(e) => getSortOption(e)}
                data-order="24h-asc"
                style={{ cursor: "pointer" }}
              >
                ▲
              </span>
            </p>
          </StyledTh>
          <StyledTh>
            <p>
              7d%{" "}
              <span
                style={{ margin: "0 5px 0 5px", cursor: "pointer" }}
                onClick={(e) => getSortOption(e)}
                data-order="7d-desc"
              >
                ▼
              </span>
              <span
                onClick={(e) => getSortOption(e)}
                data-order="7d-asc"
                style={{ cursor: "pointer" }}
              >
                ▲
              </span>
            </p>
          </StyledTh>
          <StyledTh>24h Volume / Market Cap</StyledTh>
          <StyledTh>Circulating / Total Supply</StyledTh>
          <StyledTh>Last 7d</StyledTh>
        </tr>
      </TableHeader>
      <tbody>
        {sortedCoins.map((coin) => (
          <TableRow key={coin.id}>
            <StyledTd style={{ borderRadius: "10px 0 0 10px" }}>
              {coin.market_cap_rank}
            </StyledTd>
            <NameAndImageContainer>
              <img
                src={coin.image}
                style={{
                  marginRight: "15px",
                  width: "32px",
                }}
              />
              <Link href={`/coin/${coin.id}`}>
                {coin.name} ({coin.symbol.toUpperCase()})
              </Link>
            </NameAndImageContainer>
            <StyledTd>${abbreviateNumber(coin.current_price)}</StyledTd>
            <StyledTd>
              <ArrowAndPercentContainer>
                {Math.sign(coin.price_change_percentage_1h_in_currency) !==
                1 ? (
                  <RedArrow />
                ) : (
                  <GreenArrow />
                )}
                <PriceChangeDiv
                  green={
                    Math.sign(coin.price_change_percentage_1h_in_currency) === 1
                  }
                >
                  {coin.price_change_percentage_1h_in_currency.toFixed(2)}%
                </PriceChangeDiv>
              </ArrowAndPercentContainer>
            </StyledTd>
            <StyledTd>
              <ArrowAndPercentContainer>
                {Math.sign(coin.price_change_percentage_24h_in_currency) !==
                1 ? (
                  <RedArrow />
                ) : (
                  <GreenArrow />
                )}
                <PriceChangeDiv
                  green={
                    Math.sign(coin.price_change_percentage_24h_in_currency) ===
                    1
                  }
                >
                  {coin.price_change_percentage_24h_in_currency.toFixed(2)}%
                </PriceChangeDiv>
              </ArrowAndPercentContainer>
            </StyledTd>
            <StyledTd>
              <ArrowAndPercentContainer>
                {Math.sign(coin.price_change_percentage_7d_in_currency) !==
                1 ? (
                  <RedArrow />
                ) : (
                  <GreenArrow />
                )}
                <PriceChangeDiv
                  green={
                    Math.sign(coin.price_change_percentage_7d_in_currency) === 1
                  }
                >
                  {coin.price_change_percentage_7d_in_currency.toFixed(2)}%
                </PriceChangeDiv>
              </ArrowAndPercentContainer>
            </StyledTd>
            <StyledTd>
              <NumberSeparator>
                <div>{abbreviateNumber(coin.total_volume)}</div>
                <div>{abbreviateNumber(coin.market_cap)}</div>
              </NumberSeparator>
              <LevelIndicatorOuter>
                <LevelIndicatorInner
                  style={{ width: `${findVolumeLevel(coin)}%` }}
                />
              </LevelIndicatorOuter>
            </StyledTd>
            <StyledTd>
              <NumberSeparator>
                <div>{abbreviateNumber(coin.circulating_supply)}</div>
                <div>{abbreviateNumber(coin.total_supply)}</div>
              </NumberSeparator>
              <LevelIndicatorOuter>
                <LevelIndicatorInner
                  style={{ width: `${findSupplyLevel(coin)}%` }}
                />
              </LevelIndicatorOuter>
            </StyledTd>
            <StyledTd
              style={{ borderRadius: "0 10px 10px 0", paddingRight: "0" }}
            >
              <div style={{ maxHeight: "47px", width: "150px" }}>
                <TableLineChart coin={coin} />
              </div>
            </StyledTd>
          </TableRow>
        ))}
      </tbody>
    </CoinTable>
  );
};

export default Table;

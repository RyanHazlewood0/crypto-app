import { useState } from "react";
import { useEffect } from "react";
import { useCryptoContext } from "@/app/contexts/CryptoProvider";
import {
  abbreviateNumber,
  findSupplyLevel,
  findVolumeLevel,
} from "./helper-functions";
import { Coin } from "types";
import TableLineChart from "../TableLineChart/TableLineChart";
import Link from "next/link";
import styled from "styled-components";
import RedArrow from "./svg/RedArrow";
import GreenArrow from "./svg/GreenArrow";
import { breakpoints } from "breakpoints";
import useWindowSize from "windowSizeHook";
import InfiniteScroll from "react-infinite-scroll-component";

const CoinTable = styled.table`
  width: 100%;
  margin: 0 auto 0 auto;
  border-collapse: separate;
  border-spacing: 0 6px;
  @media (max-width: ${breakpoints.mobile}) {
    width: 375px;
  }
`;

const TableRow = styled.tr<StyleProp>`
  width: 100%;
  background: ${(props) => (props.light ? "white" : "#191925")};
  font-size: 14px;
  height: 77px;
`;

const TableHeader = styled.thead`
  color: #d1d1d1;
  font-size: 12px;
`;

const NameAndImageContainer = styled.td`
  display: flex;
  align-items: center;
  padding: 15px;
  width: 175px;
  height: 77px;
  @media (max-width: ${breakpoints.mobile}) {
    max-width: 125px;
  }
`;

const StyledTd = styled.td<StyleProp>`
  padding: 15px;
  height: 77px;
  border-radius: ${(props) =>
    props.left ? "10px 0 0 10px" : props.right ? "0 10px 10px 0" : "none"};
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 16px;
    padding: 0;
  }
`;

const StyledTh = styled.th<StyleProp>`
  padding: 5px 15px 5px 15px;
  text-align: left;
  color: ${(props) => (props.light ? "#353570" : "#D1D1D1")};
  @media (max-width: ${breakpoints.mobile}) {
    padding: 0;
    text-align: center;
  }
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

const PriceChangeDiv = styled.div<StyleProp>`
  color: ${(props) => (props.green ? "#01F1E3" : "#FE2264")};
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 12px;
  }
`;

const ArrowSpan = styled.span<StyleProp>`
  margin: ${(props) => (props.left ? "0 5px 0 5px" : "none")};
  cursor: pointer;
`;

const CoinImage = styled.img`
  margin-right: 15px;
  width: 32px;
`;

const LineChartContainer = styled.div`
  width: 150px;
  max-height: 47px;
  @media (max-width: ${breakpoints.mobile}) {
    width: 120px;
    margin-left: 20px;
  }
`;

const TextAndArrowText = styled.p<StyleProp>`
  display: flex;
  margin-bottom: 10px;
  color: ${(props) => (props.light ? "#353570" : "#D1D1D1")};
`;

const LoadingMessage = styled.p`
  font-size: 50px;
  font-weight: bold;
  text-align: center;
`;

const MobilePriceAnd24hContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

type StyleProp = {
  left?: boolean;
  green?: boolean;
  right?: boolean;
  gray?: boolean;
  light?: boolean;
};

const Table = () => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("descending mcap");
  const [currentPage, setCurrentPage] = useState(1);
  const [tableCoins, setTableCoins] = useState([]);

  const { fiatCurrency, theme } = useCryptoContext();
  const size = useWindowSize();

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);
    const getCoinData = async () => {
      try {
        const response1: Response = await fetch(
          `https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=${fiatCurrency}&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&x_cg_pro_api_key=${apiKey}`
        );
        const fetchedData1: Coin[] = await response1.json();
        setTableCoins(fetchedData1);
        setIsLoading(false);
      } catch {
        setHasError(true);
        setIsLoading(false);
      }
    };
    getCoinData();
    setCurrentPage(currentPage + 1);
  }, [fiatCurrency, apiKey, setTableCoins]);

  const getMoreData = async () => {
    const response: Response = await fetch(
      `https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=${fiatCurrency}&order=market_cap_desc&per_page=50&page=${currentPage}&sparkline=true&price_change_percentage=1h%2C24h%2C7d&x_cg_pro_api_key=${apiKey}`
    );
    const data: Coin[] = await response.json();
    setTableCoins([...tableCoins, ...data]);
    setCurrentPage(currentPage + 1);
  };

  const getSortOption = (
    e: React.MouseEvent<HTMLSpanElement>,
    order: string
  ) => {
    setSortOrder(order);
  };

  const sortedCoins = [...tableCoins].sort((a, b): number => {
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

  if (isLoading) {
    return <LoadingMessage>Loading coin table data...</LoadingMessage>;
  }

  if (hasError) {
    return <LoadingMessage>Error loading coin data...</LoadingMessage>;
  }

  return (
    <>
      <CoinTable>
        {size.width > parseInt(breakpoints.mobile) && (
          <TableHeader>
            <tr>
              <StyledTh light={theme === "light"}>
                <TextAndArrowText light={theme === "light"}>
                  #
                  <ArrowSpan
                    left
                    onClick={(e) => getSortOption(e, "mcap-desc")}
                  >
                    ▼
                  </ArrowSpan>
                  <ArrowSpan onClick={(e) => getSortOption(e, "mcap-asc")}>
                    ▲
                  </ArrowSpan>
                </TextAndArrowText>
              </StyledTh>
              <StyledTh>
                <TextAndArrowText light={theme === "light"}>
                  Name{" "}
                  <ArrowSpan
                    left
                    onClick={(e) => getSortOption(e, "name-desc")}
                  >
                    ▼
                  </ArrowSpan>
                  <ArrowSpan onClick={(e) => getSortOption(e, "name-asc")}>
                    ▲
                  </ArrowSpan>
                </TextAndArrowText>
              </StyledTh>
              <StyledTh>
                <TextAndArrowText light={theme === "light"}>
                  Price{" "}
                  <ArrowSpan
                    left
                    onClick={(e) => getSortOption(e, "price-desc")}
                  >
                    ▼
                  </ArrowSpan>
                  <ArrowSpan onClick={(e) => getSortOption(e, "price-asc")}>
                    ▲
                  </ArrowSpan>
                </TextAndArrowText>
              </StyledTh>
              <StyledTh>
                <TextAndArrowText light={theme === "light"}>
                  1h%{" "}
                  <ArrowSpan left onClick={(e) => getSortOption(e, "1h-desc")}>
                    ▼
                  </ArrowSpan>
                  <ArrowSpan onClick={(e) => getSortOption(e, "1h-asc")}>
                    ▲
                  </ArrowSpan>
                </TextAndArrowText>
              </StyledTh>
              <StyledTh>
                <TextAndArrowText light={theme === "light"}>
                  24h%{" "}
                  <ArrowSpan left onClick={(e) => getSortOption(e, "24h-desc")}>
                    ▼
                  </ArrowSpan>
                  <ArrowSpan onClick={(e) => getSortOption(e, "24h-asc")}>
                    ▲
                  </ArrowSpan>
                </TextAndArrowText>
              </StyledTh>
              <StyledTh>
                <TextAndArrowText light={theme === "light"}>
                  7d%{" "}
                  <ArrowSpan left onClick={(e) => getSortOption(e, "7d-desc")}>
                    ▼
                  </ArrowSpan>
                  <ArrowSpan onClick={(e) => getSortOption(e, "7d-asc")}>
                    ▲
                  </ArrowSpan>
                </TextAndArrowText>
              </StyledTh>
              <StyledTh light={theme === "light"}>
                <p style={{ marginBottom: "10px" }}>24h Volume / Market Cap</p>
              </StyledTh>
              <StyledTh light={theme === "light"}>
                {" "}
                <p style={{ marginBottom: "10px" }}>
                  Circulating / Total Supply
                </p>
              </StyledTh>
              <StyledTh light={theme === "light"}>
                {" "}
                <p style={{ marginBottom: "10px" }}>Last 7d</p>
              </StyledTh>
            </tr>
          </TableHeader>
        )}
        {size.width < parseInt(breakpoints.mobile) && (
          <TableHeader>
            <tr>
              <StyledTh>
                <TextAndArrowText light={theme === "light"}>
                  Name{" "}
                  <ArrowSpan
                    left
                    onClick={(e) => getSortOption(e, "name-desc")}
                  >
                    ▼
                  </ArrowSpan>
                  <ArrowSpan onClick={(e) => getSortOption(e, "name-asc")}>
                    ▲
                  </ArrowSpan>
                </TextAndArrowText>
              </StyledTh>
              <StyledTh>
                <TextAndArrowText light={theme === "light"}>
                  Price{" "}
                  <ArrowSpan
                    left
                    onClick={(e) => getSortOption(e, "price-desc")}
                  >
                    ▼
                  </ArrowSpan>
                  <ArrowSpan onClick={(e) => getSortOption(e, "price-asc")}>
                    ▲
                  </ArrowSpan>
                </TextAndArrowText>
              </StyledTh>
              <StyledTh light={theme === "light"}>
                {" "}
                <p style={{ marginBottom: "10px" }}>Last 7d</p>
              </StyledTh>
            </tr>
          </TableHeader>
        )}

        <tbody>
          {sortedCoins.map((coin) => (
            <TableRow key={coin.id} light={theme === "light"}>
              {size.width > parseInt(breakpoints.mobile) && (
                <StyledTd left>{coin.market_cap_rank}</StyledTd>
              )}
              {size.width > parseInt(breakpoints.mobile) ? (
                <NameAndImageContainer>
                  <CoinImage src={coin.image} />
                  <Link href={`/coin/${coin.id}`}>
                    <div style={{ display: "flex" }}>
                      {size.width > parseInt(breakpoints.mobile)
                        ? coin.name + " " + `(${coin.symbol.toUpperCase()})`
                        : coin.symbol.toUpperCase()}
                    </div>
                  </Link>
                </NameAndImageContainer>
              ) : (
                <StyledTd left>
                  <NameAndImageContainer>
                    <CoinImage src={coin.image} />
                    <Link href={`/coin/${coin.id}`}>
                      <div style={{ display: "flex" }}>
                        {size.width > parseInt(breakpoints.mobile)
                          ? coin.name + " " + `(${coin.symbol.toUpperCase()})`
                          : coin.symbol.toUpperCase()}
                      </div>
                    </Link>
                  </NameAndImageContainer>
                </StyledTd>
              )}

              {size.width > parseInt(breakpoints.mobile) && (
                <StyledTd>${abbreviateNumber(coin.current_price)}</StyledTd>
              )}
              {size.width < parseInt(breakpoints.mobile) && (
                <StyledTd>
                  <MobilePriceAnd24hContainer>
                    ${abbreviateNumber(coin.current_price)}
                    <PriceChangeDiv
                      green={
                        Math.sign(
                          coin.price_change_percentage_24h_in_currency
                        ) === 1
                      }
                    >
                      <ArrowAndPercentContainer>
                        {Math.sign(
                          coin.price_change_percentage_24h_in_currency
                        ) !== 1 ? (
                          <RedArrow />
                        ) : (
                          <GreenArrow />
                        )}
                        <PriceChangeDiv
                          green={
                            Math.sign(
                              coin.price_change_percentage_24h_in_currency
                            ) === 1
                          }
                        >
                          {coin.price_change_percentage_24h_in_currency.toFixed(
                            2
                          )}
                          %
                        </PriceChangeDiv>
                      </ArrowAndPercentContainer>
                    </PriceChangeDiv>
                  </MobilePriceAnd24hContainer>
                </StyledTd>
              )}
              {size.width > parseInt(breakpoints.mobile) && (
                <>
                  <StyledTd>
                    {coin.price_change_percentage_1h_in_currency && (
                      <ArrowAndPercentContainer>
                        {Math.sign(
                          coin.price_change_percentage_1h_in_currency
                        ) !== 1 ? (
                          <RedArrow />
                        ) : (
                          <GreenArrow />
                        )}
                        <PriceChangeDiv
                          green={
                            Math.sign(
                              coin.price_change_percentage_1h_in_currency
                            ) === 1
                          }
                        >
                          {coin.price_change_percentage_1h_in_currency.toFixed(
                            2
                          )}
                          %
                        </PriceChangeDiv>
                      </ArrowAndPercentContainer>
                    )}
                  </StyledTd>
                  <StyledTd>
                    {coin.price_change_percentage_24h_in_currency && (
                      <ArrowAndPercentContainer>
                        {Math.sign(
                          coin.price_change_percentage_24h_in_currency
                        ) !== 1 ? (
                          <RedArrow />
                        ) : (
                          <GreenArrow />
                        )}
                        <PriceChangeDiv
                          green={
                            Math.sign(
                              coin.price_change_percentage_24h_in_currency
                            ) === 1
                          }
                        >
                          {coin.price_change_percentage_24h_in_currency.toFixed(
                            2
                          )}
                          %
                        </PriceChangeDiv>
                      </ArrowAndPercentContainer>
                    )}
                  </StyledTd>
                  <StyledTd>
                    {coin.price_change_percentage_7d_in_currency && (
                      <ArrowAndPercentContainer>
                        {Math.sign(
                          coin.price_change_percentage_7d_in_currency
                        ) !== 1 ? (
                          <RedArrow />
                        ) : (
                          <GreenArrow />
                        )}
                        <PriceChangeDiv
                          green={
                            Math.sign(
                              coin.price_change_percentage_7d_in_currency
                            ) === 1
                          }
                        >
                          {coin.price_change_percentage_7d_in_currency.toFixed(
                            2
                          )}
                          %
                        </PriceChangeDiv>
                      </ArrowAndPercentContainer>
                    )}
                  </StyledTd>
                  <StyledTd>
                    <NumberSeparator>
                      {coin.total_volume && coin.market_cap && (
                        <>
                          <div>{abbreviateNumber(coin.total_volume)}</div>
                          <div>{abbreviateNumber(coin.market_cap)}</div>
                        </>
                      )}
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
                </>
              )}
              <StyledTd right>
                <LineChartContainer>
                  <TableLineChart coin={coin} />
                </LineChartContainer>
              </StyledTd>
            </TableRow>
          ))}
        </tbody>
      </CoinTable>
      <div>
        <InfiniteScroll
          dataLength={tableCoins.length}
          next={getMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {""}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Table;

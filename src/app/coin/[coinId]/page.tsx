"use client";
import styled from "styled-components";
import Link from "next/link";
import { useCoin } from "@/app/contexts/CoinProvider";
import { useState, useEffect } from "react";
import { abbreviateNumber } from "@/app/components/Table/helper-functions";
import CopyIcon from "./svg/CopyIcon";
import RoundIcon from "./svg/RoundIcon";
import RedArrow from "./svg/RedArrow";
import GreenArrow from "./svg/GreenArrow";
import { CoinDataTypes } from "types";

const Container = styled.div`
  width: 100%;
`;

const Header = styled.h1`
  font-size: 20px;
`;

const BackBtn = styled.div`
  font-size: 20px;
  margin-right: 15px;
`;

const HeaderAndBtnContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const TopHalfContainer = styled.div`
  width: 100%;
  display: flex;
  height: 420px;
  justify-content: space-between;
  margin-bottom: 100px;
`;

const BottomHalfContainer = styled.div`
  width: 100%;
  display: flex;
  height: 250px;
  justify-content: space-between;
`;

const InfoContainerOne = styled.div`
  width: 692px;
  display: flex;
  justify-content: space-between;
`;

const NameAndLinkContainer = styled.div`
  width: 305px;
  height: 333px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CoinNameContainer = styled.div`
  width: 305px;
  height: 265px;
  background: brown;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #1e1932;
  border-radius: 12px;
  gap: 20px;
`;

const PriceInfoContainer = styled.div`
  width: 355px;
  height: 333px;
  background: pink;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #1e1932;
  border-radius: 12px;
  gap: 20px;
`;

const CoinLinkContainer = styled.div`
  width: 305px;
  height: 52px;
  background: red;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1e1932;
  border-radius: 12px;
`;

const InfoContainerThree = styled.div`
  width: 692px;
  height: 250px;
`;

const DescriptionHeader = styled.h2`
  font-size: 24px;
`;

const DescriptionText = styled.p`
  font-size: 14px;
`;

const InfoContainerFour = styled.div`
  width: 544px;
  height: 204px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const LinkContainer = styled.div`
  width: 100%;
  height: 52px;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1e1932;
  border-radius: 12px;
`;

const TableRow = styled.tr`
  background: #1e1932;
  font-size: 14px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 544px;
  padding: 0 35px;
`;

const StyledTd = styled.td`
  display: flex;
  align-items: center;
`;

const LeftContent = styled.div`
  display: flex;
  gap: 10px;
  font-size: 16px;
`;

const RightText = styled.p`
  font-size: 20px;
`;

const TableContainer = styled.div`
  height: 420px;
`;

const PriceInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 243px;
  gap: 20px;
`;

const DateText = styled.p`
  font-size: 14px;
  color: #b9b9ba;
  text-align: center;
`;

interface CoinProps {
  params: { coinId: string };
}

export default function Coin({ params }: CoinProps) {
  const [hasError, setHasError] = useState(false);
  const [thisCoinData, setThisCoinData] = useState<CoinDataTypes | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { fiatCurrency } = useCoin();

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      setHasError(false);
      setIsLoading(true);
      try {
        const response: Response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${params.coinId}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=falsex_cg_pro_api_key=${apiKey}`
        );
        const fetchedData: CoinDataTypes = await response.json();
        setThisCoinData(fetchedData);
        setIsLoading(false);
      } catch {
        setIsLoading(false);
        setHasError(true);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString();
    return formattedDate;
  };

  if (isLoading) {
    return <p>Loading Data</p>;
  }

  if (hasError) {
    return <p>Error loading data</p>;
  }

  return (
    thisCoinData !== null && (
      <Container>
        <HeaderAndBtnContainer>
          <Link href="/">
            <BackBtn>←</BackBtn>
          </Link>
          <Header>{thisCoinData.name}</Header>
        </HeaderAndBtnContainer>
        <TopHalfContainer>
          <InfoContainerOne>
            <NameAndLinkContainer>
              <CoinNameContainer>
                <img src={thisCoinData.image.small} />
                <h1 style={{ fontSize: "28px" }}>
                  {thisCoinData.name} ({thisCoinData.symbol})
                </h1>
              </CoinNameContainer>
              <CoinLinkContainer>
                <Link
                  href={thisCoinData.links.homepage[0]}
                  style={{ marginRight: "10px" }}
                >
                  {thisCoinData.links.homepage[0]}
                </Link>
                <div
                  onClick={() =>
                    navigator.clipboard.writeText(
                      thisCoinData.links.homepage[0]
                    )
                  }
                  style={{ cursor: "pointer" }}
                >
                  <CopyIcon />
                </div>
              </CoinLinkContainer>
            </NameAndLinkContainer>
            <PriceInfoContainer>
              <h1 style={{ fontSize: "36px", fontWeight: "bold" }}>
                $
                {abbreviateNumber(
                  thisCoinData.market_data.current_price[fiatCurrency]
                )}
              </h1>
              <PriceInnerContainer>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      marginBottom: "7px",
                    }}
                  >
                    <GreenArrow />
                    <p style={{ fontSize: "16px" }}>All time high:</p>
                    <p style={{ fontSize: "20px" }}>
                      $
                      {abbreviateNumber(
                        thisCoinData.market_data.ath[fiatCurrency]
                      )}
                    </p>{" "}
                  </div>
                  <DateText>
                    {formatDate(thisCoinData.market_data.ath_date)}
                  </DateText>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      marginBottom: "7px",
                    }}
                  >
                    <RedArrow />
                    <p style={{ fontSize: "16px" }}>All time low:</p>
                    <p style={{ fontSize: "20px" }}>
                      $
                      {abbreviateNumber(
                        thisCoinData.market_data.atl[fiatCurrency]
                      )}
                    </p>{" "}
                  </div>
                  <DateText>
                    {formatDate(thisCoinData.market_data.atl_date)}
                  </DateText>
                </div>
              </PriceInnerContainer>
            </PriceInfoContainer>
          </InfoContainerOne>
          <TableContainer>
            <table>
              <TableRow
                style={{
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                }}
              >
                <LeftContent>
                  <RoundIcon />
                  <p>Market Cap</p>
                </LeftContent>
                <StyledTd>
                  <RightText>
                    $
                    {abbreviateNumber(
                      thisCoinData.market_data.market_cap[fiatCurrency]
                    )}
                  </RightText>
                </StyledTd>
              </TableRow>
              <TableRow>
                <LeftContent>
                  <RoundIcon />
                  <p>Fully Diluted Valuation</p>
                </LeftContent>
                <StyledTd>
                  <RightText>
                    $
                    {abbreviateNumber(
                      thisCoinData.market_data.fully_diluted_valuation[
                        fiatCurrency
                      ]
                    )}
                  </RightText>
                </StyledTd>
              </TableRow>
              <TableRow>
                <LeftContent>
                  <RoundIcon />
                  <p>Volume 24h</p>
                </LeftContent>
                <StyledTd>
                  <RightText>
                    $
                    {abbreviateNumber(
                      thisCoinData.market_data.total_volume[fiatCurrency]
                    )}
                  </RightText>
                </StyledTd>
              </TableRow>
              <TableRow>
                <LeftContent>
                  <RoundIcon />
                  <p>Volume / Market</p>
                </LeftContent>
                <StyledTd>
                  <RightText>*Volume / Market*</RightText>
                </StyledTd>
              </TableRow>
              <TableRow>
                <LeftContent>
                  <RoundIcon />
                  <p>Total Volume</p>
                </LeftContent>
                <StyledTd>
                  <RightText>*Total Volume*</RightText>
                </StyledTd>
              </TableRow>
              <TableRow>
                <LeftContent>
                  <RoundIcon />
                  <p>Circulating Supply</p>
                </LeftContent>
                <StyledTd>
                  <RightText>
                    {abbreviateNumber(
                      thisCoinData.market_data.circulating_supply
                    )}
                  </RightText>
                </StyledTd>
              </TableRow>
              <TableRow
                style={{
                  borderBottomLeftRadius: "12px",
                  borderBottomRightRadius: "12px",
                }}
              >
                <LeftContent>
                  <RoundIcon />
                  <p>Total Supply</p>
                </LeftContent>
                <StyledTd>
                  <RightText>
                    {abbreviateNumber(thisCoinData.market_data.total_supply)}
                  </RightText>
                </StyledTd>
              </TableRow>
            </table>
          </TableContainer>
        </TopHalfContainer>
        <BottomHalfContainer>
          <InfoContainerThree>
            <DescriptionHeader>Description</DescriptionHeader>
            <DescriptionText>{thisCoinData.description.en}</DescriptionText>
          </InfoContainerThree>
          <InfoContainerFour>
            <LinkContainer>
              <Link
                style={{ marginRight: "10px" }}
                href={thisCoinData.links.blockchain_site[0]}
              >
                {thisCoinData.links.blockchain_site[0]}
              </Link>
              <div
                onClick={() =>
                  navigator.clipboard.writeText(
                    thisCoinData.links.blockchain_site[0]
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <CopyIcon />
              </div>
            </LinkContainer>
            <LinkContainer>
              <Link
                style={{ marginRight: "10px" }}
                href={thisCoinData.links.blockchain_site[1]}
              >
                {thisCoinData.links.blockchain_site[1]}
              </Link>
              <div
                onClick={() =>
                  navigator.clipboard.writeText(
                    thisCoinData.links.blockchain_site[1]
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <CopyIcon />
              </div>
            </LinkContainer>
            <LinkContainer>
              <Link
                style={{ marginRight: "10px" }}
                href={thisCoinData.links.blockchain_site[2]}
              >
                {thisCoinData.links.blockchain_site[2]}
              </Link>
              <div
                onClick={() =>
                  navigator.clipboard.writeText(
                    thisCoinData.links.blockchain_site[2]
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <CopyIcon />
              </div>
            </LinkContainer>
          </InfoContainerFour>
        </BottomHalfContainer>
      </Container>
    )
  );
}

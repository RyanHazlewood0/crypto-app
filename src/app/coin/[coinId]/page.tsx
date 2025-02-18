"use client";
import styled from "styled-components";
import Link from "next/link";
import { useCryptoContext } from "@/app/contexts/CryptoProvider";
import { useState, useEffect } from "react";
import { abbreviateNumber } from "helper-functions";
import CopyIcon from "./svg/CopyIcon";
import RoundIcon from "./svg/RoundIcon";
import RedArrow from "./svg/RedArrow";
import GreenArrow from "./svg/GreenArrow";
import { CoinPageObject } from "types";
import { breakpoints } from "breakpoints";
import useWindowSize from "windowSizeHook";

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
  justify-content: space-between;
  margin-bottom: 100px;
  @media (max-width: ${breakpoints.mobile}) {
    display: flex;
    flex-direction: column;
  }
`;

const BottomHalfContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const InfoContainerOne = styled.div`
  width: 692px;
  display: flex;
  justify-content: space-between;
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    flex-direction: column;
  }
`;

const NameAndLinkContainer = styled.div`
  width: 305px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CoinNameContainer = styled.div<ThemeProp>`
  width: 305px;
  padding: 20% 0 20% 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props.$light ? "white" : "#1e1932")};
  border-radius: 12px;
  gap: 20px;
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    gap: 5px;
    padding: 7.5% 0 7.5% 0;
  }
`;

const PriceInfoContainer = styled.div<ThemeProp>`
  width: 355px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props.$light ? "white" : "#1e1932")};
  border-radius: 12px;
  gap: 10px;
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 15px 0 15px 0;
  }
`;

const CoinLinkContainer = styled.div<ThemeProp>`
  width: 305px;
  padding: 10px 0 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props.$light ? "white" : "#1e1932")};
  border-radius: 12px;
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
  }
`;

const InfoContainerThree = styled.div`
  width: 692px;
`;

const DescriptionHeader = styled.h2`
  font-size: 24px;
`;

const DescriptionText = styled.p`
  font-size: 14px;
`;

const InfoContainerFour = styled.div`
  width: 544px;
  gap: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

const LinkContainer = styled.div<ThemeProp>`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props.$light ? "white" : "#1e1932")};
  border-radius: 12px;
`;

const TableRow = styled.tr<ThemeProp>`
  background: ${(props) => (props.$light ? "white" : "#1e1932")};
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 544px;
  padding: 5px 15px 5px 15px;
  @media (max-width: ${breakpoints.mobile}) {
    width: 355px;
  }
`;

const StyledTd = styled.td`
  display: flex;
  align-items: center;
  padding: 10px 0 10px 0;
`;

const LeftContent = styled.div`
  display: flex;
  gap: 10px;
  font-size: 16px;
`;

const RightText = styled.p`
  font-size: 20px;
`;

const TableContainer = styled.div``;

const PriceInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 243px;
  gap: 20px;
`;

const DateText = styled.p<ThemeProp>`
  font-size: 14px;
  color: ${(props) => (props.$light ? "#353570" : "#b9b9ba")};
  text-align: center;
`;

const MobileContainer = styled.div`
  width: 375px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
  padding: 10px;
`;

const StyledLink = styled.a`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const CopiedMessageContainer = styled.div`
  background: black;
  border-radius: 6px;
  color: white;
  padding: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

type CoinProps = {
  params: { coinId: string };
};

type ThemeProp = {
  $light?: boolean;
};

export default function Coin({ params }: CoinProps) {
  const [hasError, setHasError] = useState(false);
  const [thisCoinData, setThisCoinData] = useState<CoinPageObject | null>(null);
  const [copyClicked, setCopyClicked] = useState(false);

  const { fiatCurrency, theme, setSelectedNavLink } = useCryptoContext();

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const size = useWindowSize();

  useEffect(() => {
    setSelectedNavLink("Coin");
    const fetchData = async () => {
      setHasError(false);
      try {
        const response: Response = await fetch(
          `https://pro-api.coingecko.com/api/v3/coins/${params.coinId}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false&x_cg_pro_api_key=${apiKey}`
        );
        const fetchedData: CoinPageObject = await response.json();
        setThisCoinData(fetchedData);
      } catch {
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

  const handleCopyTrue = () => {
    navigator.clipboard.writeText(thisCoinData.links.homepage[0]);
    setCopyClicked(true);
    setTimeout(() => setCopyClicked(false), 2000);
  };

  if (hasError) {
    return <p>Error loading data</p>;
  }

  if (size.width > parseInt(breakpoints.mobile)) {
    return (
      <Container>
        {thisCoinData !== null && (
          <>
            <HeaderAndBtnContainer>
              <StyledLink href="/">
                <BackBtn>←</BackBtn>
              </StyledLink>
              <Header>{thisCoinData.name}</Header>
            </HeaderAndBtnContainer>
            <TopHalfContainer>
              <InfoContainerOne>
                <NameAndLinkContainer>
                  <CoinNameContainer $light={theme === "light"}>
                    <img src={thisCoinData.image.small} />
                    <h1 style={{ fontSize: "28px" }}>
                      {thisCoinData.name} ({thisCoinData.symbol})
                    </h1>
                  </CoinNameContainer>
                  <CoinLinkContainer $light={theme === "light"}>
                    <StyledLink
                      href={thisCoinData.links.homepage[0]}
                      style={{ marginRight: "10px" }}
                    >
                      {thisCoinData.links.homepage[0]}
                    </StyledLink>
                    <div onClick={handleCopyTrue} style={{ cursor: "pointer" }}>
                      <CopyIcon />
                    </div>
                  </CoinLinkContainer>
                  {copyClicked === true && (
                    <CopiedMessageContainer>
                      Link has been copied!
                    </CopiedMessageContainer>
                  )}
                </NameAndLinkContainer>
                <PriceInfoContainer $light={theme === "light"}>
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
                      <DateText $light={theme === "light"}>
                        {formatDate(
                          thisCoinData.market_data.ath_date[fiatCurrency]
                        )}
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
                      <DateText $light={theme === "light"}>
                        {formatDate(
                          thisCoinData.market_data.atl_date[fiatCurrency]
                        )}
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
                    $light={theme === "light"}
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
                  <TableRow $light={theme === "light"}>
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
                  <TableRow $light={theme === "light"}>
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

                  <TableRow $light={theme === "light"}>
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
                    $light={theme === "light"}
                  >
                    <LeftContent>
                      <RoundIcon />
                      <p>Total Supply</p>
                    </LeftContent>
                    <StyledTd>
                      <RightText>
                        {abbreviateNumber(
                          thisCoinData.market_data.total_supply
                        )}
                      </RightText>
                    </StyledTd>
                  </TableRow>
                </table>
              </TableContainer>
            </TopHalfContainer>
            <BottomHalfContainer>
              <InfoContainerThree>
                <DescriptionHeader>Description</DescriptionHeader>
                <DescriptionText
                  dangerouslySetInnerHTML={{
                    __html: thisCoinData.description.en,
                  }}
                />
              </InfoContainerThree>
              <InfoContainerFour>
                <LinkContainer $light={theme === "light"}>
                  <StyledLink
                    style={{ marginRight: "10px" }}
                    href={thisCoinData.links.blockchain_site[0]}
                  >
                    {thisCoinData.links.blockchain_site[0]}
                  </StyledLink>
                  <div onClick={handleCopyTrue} style={{ cursor: "pointer" }}>
                    <CopyIcon />
                  </div>
                  {copyClicked === true && (
                    <CopiedMessageContainer>
                      Link has been copied!
                    </CopiedMessageContainer>
                  )}
                </LinkContainer>
                <LinkContainer $light={theme === "light"}>
                  <StyledLink
                    style={{ marginRight: "10px" }}
                    href={thisCoinData.links.blockchain_site[1]}
                  >
                    {thisCoinData.links.blockchain_site[1]}
                  </StyledLink>
                  <div onClick={handleCopyTrue} style={{ cursor: "pointer" }}>
                    <CopyIcon />
                  </div>
                  {copyClicked === true && (
                    <CopiedMessageContainer>
                      Link has been copied!
                    </CopiedMessageContainer>
                  )}
                </LinkContainer>
                <LinkContainer $light={theme === "light"}>
                  <StyledLink
                    style={{ marginRight: "10px" }}
                    href={thisCoinData.links.blockchain_site[2]}
                  >
                    {thisCoinData.links.blockchain_site[2]}
                  </StyledLink>
                  <div onClick={handleCopyTrue} style={{ cursor: "pointer" }}>
                    <CopyIcon />
                  </div>
                  {copyClicked === true && (
                    <CopiedMessageContainer>
                      Link has been copied!
                    </CopiedMessageContainer>
                  )}
                </LinkContainer>
              </InfoContainerFour>
            </BottomHalfContainer>
          </>
        )}
      </Container>
    );
  } else {
    return (
      <>
        <MobileContainer>
          {thisCoinData !== null && (
            <>
              <HeaderAndBtnContainer>
                <Link href="/">
                  <BackBtn>←</BackBtn>
                </Link>
                <Header>{thisCoinData.name}</Header>
              </HeaderAndBtnContainer>

              <CoinNameContainer $light={theme === "light"}>
                <img src={thisCoinData.image.small} />
                <h1 style={{ fontSize: "28px" }}>
                  {thisCoinData.name} ({thisCoinData.symbol})
                </h1>
              </CoinNameContainer>
              <CoinLinkContainer $light={theme === "light"}>
                <StyledLink
                  href={thisCoinData.links.homepage[0]}
                  style={{ marginRight: "10px" }}
                >
                  {thisCoinData.links.homepage[0]}
                </StyledLink>
                <div onClick={handleCopyTrue} style={{ cursor: "pointer" }}>
                  <CopyIcon />
                </div>
                {copyClicked === true && (
                  <CopiedMessageContainer>
                    Link has been copied!
                  </CopiedMessageContainer>
                )}
              </CoinLinkContainer>
              <PriceInfoContainer $light={theme === "light"}>
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
                    <DateText $light={theme === "light"}>
                      {formatDate(
                        thisCoinData.market_data.ath_date[fiatCurrency]
                      )}
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
                    <DateText $light={theme === "light"}>
                      {formatDate(
                        thisCoinData.market_data.atl_date[fiatCurrency]
                      )}
                    </DateText>
                  </div>
                </PriceInnerContainer>
              </PriceInfoContainer>
              <TableContainer>
                <table>
                  <TableRow
                    style={{
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                    }}
                    $light={theme === "light"}
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
                  <TableRow $light={theme === "light"}>
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
                  <TableRow $light={theme === "light"}>
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
                  <TableRow $light={theme === "light"}>
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
                    $light={theme === "light"}
                  >
                    <LeftContent>
                      <RoundIcon />
                      <p>Total Supply</p>
                    </LeftContent>
                    <StyledTd>
                      <RightText>
                        {abbreviateNumber(
                          thisCoinData.market_data.total_supply
                        )}
                      </RightText>
                    </StyledTd>
                  </TableRow>
                </table>
              </TableContainer>
              <DescriptionHeader>Description</DescriptionHeader>
              <DescriptionText>{thisCoinData.description.en}</DescriptionText>
              <LinkContainer $light={theme === "light"}>
                <StyledLink
                  style={{ marginRight: "10px" }}
                  href={thisCoinData.links.blockchain_site[0]}
                >
                  {thisCoinData.links.blockchain_site[0]}
                </StyledLink>
                <div onClick={handleCopyTrue} style={{ cursor: "pointer" }}>
                  <CopyIcon />
                </div>
                {copyClicked === true && (
                  <CopiedMessageContainer>
                    Link has been copied!
                  </CopiedMessageContainer>
                )}
              </LinkContainer>
              <LinkContainer $light={theme === "light"}>
                <StyledLink
                  style={{ marginRight: "10px" }}
                  href={thisCoinData.links.blockchain_site[1]}
                >
                  {thisCoinData.links.blockchain_site[1]}
                </StyledLink>
                <div onClick={handleCopyTrue} style={{ cursor: "pointer" }}>
                  <CopyIcon />
                </div>
                {copyClicked === true && (
                  <CopiedMessageContainer>
                    Link has been copied!
                  </CopiedMessageContainer>
                )}
              </LinkContainer>
              <LinkContainer $light={theme === "light"}>
                <StyledLink
                  style={{ marginRight: "10px" }}
                  href={thisCoinData.links.blockchain_site[2]}
                >
                  {thisCoinData.links.blockchain_site[2]}
                </StyledLink>
                <div onClick={handleCopyTrue} style={{ cursor: "pointer" }}>
                  <CopyIcon />
                </div>
                {copyClicked === true && (
                  <CopiedMessageContainer>
                    Link has been copied!
                  </CopiedMessageContainer>
                )}
              </LinkContainer>
            </>
          )}
        </MobileContainer>
      </>
    );
  }
}

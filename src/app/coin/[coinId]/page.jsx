"use client";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import { useCoin } from "@/app/contexts/CoinProvider";
import { useState, useEffect } from "react";
import { abbreviateNumber } from "@/app/components/Table/helper-functions";

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

const InfoContainerTwo = styled.div`
  width: 544px;
  background: purple;
  height: 420px;
  display: flex;
  flex-direction: column;
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

export default function Coin({ params }) {
  const [hasError, setHasError] = useState(false);
  const [coinData, setCoinData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { coins } = useCoin();

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      const thisCoin = coins.find((coin) => coin.id === params.coinId);
      setHasError(false);
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${thisCoin.id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=falsex_cg_pro_api_key=${apiKey}`
        );
        const fetchedData = await response.json();
        setCoinData(fetchedData);
        setIsLoading(false);
      } catch {
        setIsLoading(false);
        setHasError(true);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading Data</p>;
  }

  if (hasError) {
    return <p>Error loading data</p>;
  }

  return (
    coinData !== null && (
      <Container>
        <HeaderAndBtnContainer>
          <Link href="/">
            <BackBtn>←</BackBtn>
          </Link>
          <Header>{coinData.name}</Header>
        </HeaderAndBtnContainer>
        <TopHalfContainer>
          <InfoContainerOne>
            <NameAndLinkContainer>
              <CoinNameContainer>
                <img src={coinData.image.small} />
                <h1 style={{ fontSize: "28px" }}>
                  {coinData.name} ({coinData.symbol})
                </h1>
              </CoinNameContainer>
              <Link href={coinData.links.homepage[0]}>
                <CoinLinkContainer>{coinData.links.homepage}</CoinLinkContainer>
              </Link>
            </NameAndLinkContainer>
            <PriceInfoContainer>
              <h1 style={{ fontSize: "36px", fontWeight: "bold" }}>
                ${abbreviateNumber(coinData.market_data.current_price.usd)}
              </h1>
            </PriceInfoContainer>
          </InfoContainerOne>
          <InfoContainerTwo>bunch of price stuff</InfoContainerTwo>
        </TopHalfContainer>
        <BottomHalfContainer>
          <InfoContainerThree>
            <DescriptionHeader>Description</DescriptionHeader>
            <DescriptionText>{coinData.description.en}</DescriptionText>
          </InfoContainerThree>
          <InfoContainerFour>
            <LinkContainer>www.google.com</LinkContainer>
            <LinkContainer>www.google.com</LinkContainer>
            <LinkContainer>www.google.com</LinkContainer>
          </InfoContainerFour>
        </BottomHalfContainer>
      </Container>
    )
  );
}

Coin.propTypes = {
  params: PropTypes.shape({
    coinId: PropTypes.string.isRequired,
  }).isRequired,
};

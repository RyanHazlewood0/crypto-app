"use client";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useCoin } from "@/app/contexts/CoinProvider";

const Container = styled.div`
  width: 100%;
`;

const Header = styled.h1`
  font-size: 20px;
`;

const TopHalfContainer = styled.div`
  width: 100%;
  display: flex;
  background: green;
  height: 420px;
`;

const BottomHalfContainer = styled.div`
  width: 100%;
  display: flex;
  background: orange;
  height: 250px;
`;

const InfoContainerOne = styled.div`
  width: 662px;
  background: blue;
`;

const NameAndLinkContainer = styled.div`
  width: 305px;
  height: 333px;
  background: gray;
`;

const CoinNameContainer = styled.div`
  width: 305px;
  height: 265px;
  background: brown;
`;

const PriceInfoContainer = styled.div`
  width: 355px;
  height: 333px;
  background: pink;
`;

const CoinLinkContainer = styled.div`
  width: 305px;
  height: 52px;
  background: red;
`;

const InfoContainerTwo = styled.div`
  width: 544px;
  background: blue;
`;

const InfoContainerThree = styled.div`
  width: 692px;
  background: blue;
`;

const DescriptionHeader = styled.h2`
  font-size: 24px;
`;

const DescriptionText = styled.p`
  font-size: 14px;
`;

const InfoContainerFour = styled.div`
  width: 544px;
  background: blue;
`;

const LinkContainer = styled.div`
  width: 100%;
  height: 52px;
  background: black;
`;

export default function Coin({ params }) {
  const { coins } = useCoin();
  const thisCoin = coins.find((coin) => coin.id === params.coinId);

  return (
    thisCoin && (
      <Container>
        <Header>{thisCoin.name}</Header>
        <TopHalfContainer>
          <InfoContainerOne>
            <NameAndLinkContainer>
              <CoinNameContainer>
                <img src={thisCoin.image} style={{ width: "64=px" }} />
                <h1 style={{ fontSize: "28px" }}>{thisCoin.name}</h1>
              </CoinNameContainer>
              <CoinLinkContainer>www.bitcoin.com</CoinLinkContainer>
            </NameAndLinkContainer>
            <PriceInfoContainer> price stuff</PriceInfoContainer>
          </InfoContainerOne>
          <InfoContainerTwo>bunch of price stuff</InfoContainerTwo>
        </TopHalfContainer>
        <BottomHalfContainer>
          <InfoContainerThree>
            <DescriptionHeader>Description</DescriptionHeader>
            <DescriptionText>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which dont look even slightly
              believable. If you are going to use a passage of Lorem Ipsum, you
              need to be sure there isnt anything embarrassing hidden in the
              middle of text. All the Lorem Ipsum generators on the Internet
              tend to repeat predefined chunks as necessary, making this the
              first true generator on the Internet. It uses a dictionary of over
              200 Latin words, combined with a handful of model sentence
              structures, to generate Lorem Ipsum which looks reasonable. The
              generated Lorem Ipsum is therefore always free from repetition,
              injected humour, or non-characteristic words etc.
            </DescriptionText>
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

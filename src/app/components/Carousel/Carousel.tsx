import { useCoin } from "@/app/contexts/CoinProvider";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { abbreviateNumber } from "../Table/helper-functions";
import RedArrow from "./svg/RedArrow";
import GreenArrow from "./svg/GreenArrow";
import { CoinTypes } from "types";
import { useEffect } from "react";
import { breakpoints } from "breakpoints";

const CarouselContainer = styled.div`
  width: 100%;
  margin-top: 80px;
  @media (max-width: ${breakpoints.mobile}) {
    margin-top: 40px;
  }
`;

const CarouselBox = styled.div<StylePropSelected>`
  display: flex !important;
  height: 78px;
  background: ${(props) => (props.selected ? "#6161d6" : "#232336")};
  border-radius: 6px;
  padding: 10px;
  align-items: center;
  justify-content: space-around;
  border: ${(props) => (props.selected ? "solid 1px #a7a7cc" : "none")};
  cursor: pointer;
  width: 210px !important;
  @media (max-width: ${breakpoints.mobile}) {
    width: 180px !important;
  }
`;

const ArrowAndPercentContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PriceChangeDiv = styled.div<StylePropGreen>`
  color: ${(props) => (props.green ? "#01F1E3" : "#FE2264")};
`;

const HeaderText = styled.p`
  color: #d1d1d1;
  font-size: 14px;
  margin-bottom: 20px;
`;

const StyledSlider = styled(Slider)`
  .slick-slide {
    margin: 0 18.625px 0 18.625px;
    @media (max-width: ${breakpoints.mobile}) {
      margin: 0 7.5px 0 7.5px;
    }
  }
  .slick-next {
    position: absolute;
    right: 10px;
    top: 42px;
    hover: pointer;
    z-index: 1;
  }
  .slick-prev {
    position: absolute;
    top: 42px;
    hover: pointer;
    z-index: 1;
    left: 10px;
  }
  .slick-track,
  .slick-list {
    max-height: 78px;
  }
  .slick-list {
    margin-bottom: 30px;
  }

  .slick-track {
    @media (max-width: ${breakpoints.mobile}) {
      max-width: 375px;
      display: flex;
    }
  }
`;

const CoinImage = styled.img`
  width: 32px;
  height: 32px;
`;

const CoinNameText = styled.p`
  font-size: 16px;
`;
const CoinPricetext = styled.p`
  font-size: 14px;
  margin-right: 10px;
  color: #d1d1d1;
`;

const MessageText = styled.p`
  font-size: 35px;
  font-weight: bold;
`;

type StylePropGreen = {
  green: boolean;
};

type StylePropSelected = {
  selected: boolean;
};

interface CarouselProps {
  selectedCoin: CoinTypes | null;
  setSelectedCoin: Dispatch<SetStateAction<CoinTypes | null>>;
}

const Carousel = ({ setSelectedCoin, selectedCoin }: CarouselProps) => {
  const [hasError, setHasError] = useState(false);
  const [carouselCoins, setCarouselCoins] = useState([]);
  const { fiatCurrency } = useCoin();
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const handleSelectCoin = (coin: CoinTypes) => {
    setSelectedCoin(coin);
  };

  useEffect(() => {
    setHasError(false);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=${fiatCurrency}&order=market_cap_desc&per_page=24&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&x_cg_pro_api_key=${apiKey}`
        );
        const data = await response.json();
        setCarouselCoins(data);
      } catch {
        setHasError(true);
      }
    };
    fetchData();
  }, [fiatCurrency, apiKey]);

  useEffect(() => {
    if (carouselCoins.length > 0) {
      setSelectedCoin(carouselCoins[0]);
    }
  }, [carouselCoins]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: breakpoints.mobile ? 2 : 6,
    slidesToScroll: 1,
    variableWidth: true,
  };

  if (hasError) {
    return <MessageText>Error loading carousel coin data...</MessageText>;
  }

  return (
    selectedCoin !== null && (
      <CarouselContainer>
        <HeaderText>Select the currency to view statistics</HeaderText>
        <StyledSlider {...settings}>
          {carouselCoins.map((coin) => (
            <CarouselBox
              style={{ width: breakpoints.mobile ? 180 : 210 }}
              key={coin.id}
              selected={coin.id === selectedCoin.id}
              onClick={() => handleSelectCoin(coin)}
            >
              <CoinImage src={coin.image} />
              <div>
                <CoinNameText>
                  {coin.name}({coin.symbol.toUpperCase()})
                </CoinNameText>
                <ArrowAndPercentContainer>
                  <CoinPricetext>
                    ${abbreviateNumber(coin.current_price)}
                  </CoinPricetext>
                  {Math.sign(coin.price_change_percentage_1h_in_currency) !==
                  1 ? (
                    <RedArrow />
                  ) : (
                    <GreenArrow />
                  )}
                  <PriceChangeDiv
                    green={
                      Math.sign(coin.price_change_percentage_1h_in_currency) ===
                      1
                    }
                  >
                    {coin.price_change_percentage_1h_in_currency.toFixed(2)}%
                  </PriceChangeDiv>
                </ArrowAndPercentContainer>
              </div>
            </CarouselBox>
          ))}
        </StyledSlider>
      </CarouselContainer>
    )
  );
};

export default Carousel;

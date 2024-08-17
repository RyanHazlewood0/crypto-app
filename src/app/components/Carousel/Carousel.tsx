import { useCoin } from "@/app/contexts/CoinProvider";
import { Dispatch, SetStateAction } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { abbreviateNumber } from "../Table/helper-functions";
import RedArrow from "./svg/RedArrow";
import GreenArrow from "./svg/GreenArrow";
import { SelectedCoinTypes } from "@/app/page";
import { CoinTypes } from "@/app/contexts/CoinProvider";
import { useEffect } from "react";

const CarouselContainer = styled.div`
  width: 100%;
  margin-top: 80px;
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
    margin: 0 3.6px 0 3.6px;
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

type StylePropGreen = {
  green: boolean;
};

type StylePropSelected = {
  selected: boolean;
};

type CarouselProps = {
  selectedCoin: SelectedCoinTypes | null;
  setSelectedCoin: Dispatch<
    SetStateAction<SelectedCoinTypes | CoinTypes | null>
  >;
};

const Carousel = ({ setSelectedCoin, selectedCoin }: CarouselProps) => {
  const { coins } = useCoin();

  const handleSelectCoin = (coin: SelectedCoinTypes) => {
    setSelectedCoin(coin);
  };

  useEffect(() => {
    if (coins.length > 0) {
      setSelectedCoin(coins[0]);
    }
  }, [coins]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    variableWidth: true,
  };

  return (
    selectedCoin !== null && (
      <CarouselContainer>
        <HeaderText>Select the currency to view statistics</HeaderText>
        <StyledSlider {...settings}>
          {coins.map((coin) => (
            <CarouselBox
              style={{ width: 210 }}
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

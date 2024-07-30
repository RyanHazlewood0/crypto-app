import { useCoin } from "@/app/contexts/CoinProvider";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { abbreviateNumber } from "../Table/helper-functions";
import RedArrow from "./svg/RedArrow";
import GreenArrow from "./svg/GreenArrow";
import PropTypes from "prop-types";
import { useEffect } from "react";

const CarouselContainer = styled.div`
  width: 100%;
  margin-top: 80px;
`;

const CarouselBox = styled.div`
  display: flex !important;
  height: 78px;
  background: ${(props) => (props.selected ? "#6161d6" : "#232336")};
  border-radius: 6px;
  padding: 10px;
  align-items: center;
  justify-content: space-around;
`;

const ArrowAndPercentContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PriceChangeDiv = styled.div`
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

const Carousel = ({ setSelectedCoin, selectedCoin }) => {
  const { coins } = useCoin();

  const handleSelectCoin = (coin) => {
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
            >
              <CoinImage
                src={coin.image}
                style={{
                  width: "32px",
                }}
              />
              <div>
                <p
                  style={{ fontSize: "16px", cursor: "pointer" }}
                  onClick={() => handleSelectCoin(coin)}
                >
                  {coin.name}({coin.symbol.toUpperCase()})
                </p>
                <ArrowAndPercentContainer>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#D1D1D1",
                      marginRight: "10px",
                    }}
                  >
                    ${abbreviateNumber(coin.current_price)}
                  </p>
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

Carousel.propTypes = {
  green: PropTypes.style,
  setSelectedCoin: PropTypes.func,
  selectedCoin: PropTypes.object,
};

export default Carousel;

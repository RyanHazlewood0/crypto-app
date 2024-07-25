import { useCoin } from "@/app/contexts/CoinProvider";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { abbreviateNumber } from "../Table/helper-functions";
import RedArrow from "./svg/RedArrow";
import GreenArrow from "./svg/GreenArrow";
import PropTypes from "prop-types";
const Carousel = () => {
  const CarouselContainer = styled.div`
    width: 100%;
  `;

  const CarouselBox = styled.div`
    display: flex;
    height: 78px;
    background: #232336;
    border-radius: 6px;
  `;

  const CoinInfoBox = styled.div`
    width: 75%;
  `;

  const ArrowAndPercentContainer = styled.div`
    display: flex;
    align-items: center;
  `;

  const PriceChangeDiv = styled.div`
    color: ${(props) => (props.green ? "#01F1E3" : "#FE2264")};
  `;

  const { coins } = useCoin();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    variableWidth: true,
  };
  return (
    <CarouselContainer>
      <Slider {...settings}>
        {coins.map((coin) => (
          <CarouselBox style={{ width: 250 }} key={coin.id}>
            <img
              src={coin.image}
              style={{
                width: "32px",
              }}
            />
            <CoinInfoBox>
              <p>
                {coin.name}({coin.symbol.toUpperCase()})
              </p>
              <ArrowAndPercentContainer>
                <p style={{ marginRight: "10px" }}>
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
                    Math.sign(coin.price_change_percentage_1h_in_currency) === 1
                  }
                >
                  {coin.price_change_percentage_1h_in_currency.toFixed(2)}%
                </PriceChangeDiv>
              </ArrowAndPercentContainer>
            </CoinInfoBox>
          </CarouselBox>
        ))}
      </Slider>
    </CarouselContainer>
  );
};

Carousel.propTypes = {
  green: PropTypes.style,
};

export default Carousel;

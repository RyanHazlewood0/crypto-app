import { useCryptoContext } from "@/app/contexts/CryptoProvider";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { abbreviateNumber } from "helper-functions";
import RedArrow from "./svg/RedArrow";
import GreenArrow from "./svg/GreenArrow";
import { Coin } from "types";
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
  @media (max-width: ${breakpoints.mobile}) {
    width: 181px !important;

    }
  display: flex !important;
  height: 78px;
  border-radius: 6px;
  padding: 10px;
  align-items: center;
  justify-content: space-around;
  border: ${(props) => {
    if (props.selected) {
      if (props.light) {
        return "solid 1px #232336";
      } else {
        return "solid 1px #a7a7cc";
      }
    }
  }};
  cursor: pointer;
   background: ${(props) => {
     if (props.selected) {
       if (props.light) {
         return "#A7A7CC";
       } else {
         return "#6161d6";
       }
     } else {
       if (props.light) {
         return "white";
       } else {
         return "#232336";
       }
     }
   }}};
 
`;

const ArrowAndPercentContainer = styled.div`
  display: flex;
  align-items: center;
`;

const PriceChangeDiv = styled.div<StylePropGreen>`
  color: ${(props) => (props.green ? "#01F1E3" : "#FE2264")};
`;

const HeaderText = styled.p<ThemeProp>`
  color: ${(props) => (props.light ? "#424286" : "#d1d1d1")};
  font-size: 14px;
  margin-bottom: 20px;
`;

const StyledSlider = styled(Slider)`
  .slick-slide {
    margin: 0 6.51px 0 6.51px;
    width: 205px;
    @media (max-width: ${breakpoints.mobile}) {
      margin: 0 6.25px 0 6.25px;
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
const CoinPricetext = styled.p<ThemeProp>`
  font-size: 14px;
  margin-right: 10px;
  color: ${(props) => (props.light ? "#424286" : "#d1d1d1")};
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
  light: boolean;
};

type ThemeProp = {
  light: boolean;
};

interface CarouselProps {
  selectedCoin: Coin[] | [];
  setSelectedCoin: Dispatch<SetStateAction<Coin[] | null>>;
}

const Carousel = ({ setSelectedCoin, selectedCoin }: CarouselProps) => {
  const [hasError, setHasError] = useState(false);
  const [carouselCoins, setCarouselCoins] = useState([]);
  const { fiatCurrency, theme } = useCryptoContext();
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const findCoin = (coin) => {
    if (selectedCoin.length === 2)
      if (coin.id === selectedCoin[0].id) {
        const updatedSelection = [...selectedCoin].pop();
        setSelectedCoin([updatedSelection]);
      } else if (coin.id === selectedCoin[1].id) {
        const updatedSelection = [...selectedCoin].shift();
        setSelectedCoin([updatedSelection]);
      } else {
        const updatedSelection = [...selectedCoin].pop();
        setSelectedCoin([updatedSelection, coin]);
      }
    if (selectedCoin.length === 1) {
      if (selectedCoin[0].id === coin.id) {
        return;
      } else {
        setSelectedCoin([...selectedCoin, coin]);
      }
    }
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
      setSelectedCoin([carouselCoins[0]]);
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
    carouselCoins !== null && (
      <CarouselContainer>
        <HeaderText light={theme === "light"}>
          Select 1 - 2 currencies to view statistics
        </HeaderText>
        <StyledSlider {...settings}>
          {carouselCoins.length > 0 &&
            carouselCoins.map((coin) => (
              <CarouselBox
                light={theme === "light"}
                key={coin.id}
                selected={
                  selectedCoin.length !== 0
                    ? selectedCoin.length === 1
                      ? coin.id === selectedCoin[0].id
                      : coin.id === selectedCoin[1].id ||
                        coin.id === selectedCoin[0].id
                    : null
                }
                onClick={() => findCoin(coin)}
              >
                <CoinImage src={coin.image} />
                <div>
                  <CoinNameText>
                    {coin.name}({coin.symbol.toUpperCase()})
                  </CoinNameText>
                  <ArrowAndPercentContainer>
                    <CoinPricetext light={theme === "light"}>
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
                        Math.sign(
                          coin.price_change_percentage_1h_in_currency
                        ) === 1
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

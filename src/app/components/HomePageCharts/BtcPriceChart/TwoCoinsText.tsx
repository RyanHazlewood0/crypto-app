import { abbreviateNumber } from "helper-functions";
import { Coin } from "types";

type TwoCoinsTextProps = {
  selectedCoin: Coin[];
};

const TwoCoinsText = ({ selectedCoin }: TwoCoinsTextProps) => {
  return (
    <>
      {selectedCoin.length === 2 && (
        <>
          <div className={"w-full flex gap-[20px] ml-[2.5%] mb-[2.5%]"}>
            <div className={"flex items-center gap-[10px]"}>
              <p className={"text-gray-500 text-[16px] md:[text-20px]"}>
                {selectedCoin[0].symbol.toUpperCase() +
                  " " +
                  "$" +
                  abbreviateNumber(selectedCoin[0].current_price)}
              </p>
              <div
                className={
                  "w-[14px] h-[14px] rounded-[5px] bg-[#2d00f7] md:w-[20px] md:h-[20px]"
                }
              />
            </div>
            <div className={"flex items-center gap-[10px]"}>
              <p className={"text-gray-500 text-[16px] md:[text-20px]"}>
                {selectedCoin[1].symbol.toUpperCase() +
                  " " +
                  "$" +
                  abbreviateNumber(selectedCoin[1].current_price)}
              </p>
              <div
                className={
                  "w-[14px] h-[14px] rounded-[5px] bg-[#ff0054] md:w-[20px] md:h-[20px]"
                }
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TwoCoinsText;

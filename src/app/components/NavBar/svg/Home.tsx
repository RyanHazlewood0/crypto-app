import { useCryptoContext } from "@/app/contexts/CryptoProvider";
interface HomeProps {
  selectedNavLink: string;
}

const Home = ({ selectedNavLink }: HomeProps) => {
  const { theme } = useCryptoContext();

  const getStyle = () => {
    if (selectedNavLink === "Home") {
      if (theme === "light") {
        return { fill: "#353570", fillOpacity: "1" };
      } else {
        return { fill: "white", fillOpacity: "1" };
      }
    } else if (selectedNavLink === "Portfolio" || selectedNavLink === "Coin") {
      if (theme === "light") {
        return { fill: "gray", fillOpacity: "1" };
      } else {
        return { fill: "gray", fillOpacity: "1" };
      }
    }
  };

  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.5402 6.81969L14.7802 2.78969C13.2102 1.68969 10.8002 1.74969 9.29023 2.91969L4.28023 6.82969C3.28023 7.60969 2.49023 9.20969 2.49023 10.4697V17.3697C2.49023 19.9197 4.56023 21.9997 7.11023 21.9997H17.8902C20.4402 21.9997 22.5102 19.9297 22.5102 17.3797V10.5997C22.5102 9.24969 21.6402 7.58969 20.5402 6.81969ZM13.2502 17.9997C13.2502 18.4097 12.9102 18.7497 12.5002 18.7497C12.0902 18.7497 11.7502 18.4097 11.7502 17.9997V14.9997C11.7502 14.5897 12.0902 14.2497 12.5002 14.2497C12.9102 14.2497 13.2502 14.5897 13.2502 14.9997V17.9997Z"
        style={getStyle()}
      />
    </svg>
  );
};

export default Home;

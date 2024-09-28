import { useCryptoContext } from "@/app/contexts/CryptoProvider";

interface PortfolioProps {
  selectedNavLink: string;
}

const Portfolio = ({ selectedNavLink }: PortfolioProps) => {
  const { theme } = useCryptoContext();

  const getStyle = () => {
    if (selectedNavLink === "Portfolio") {
      if (theme === "light") {
        return { fill: "#353570", fillOpacity: "1" };
      } else {
        return { fill: "white", fillOpacity: "1" };
      }
    } else if (selectedNavLink === "Home") {
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
        d="M21.5 12L12.5 18L3.5 12M21.5 16L12.5 22L3.5 16M21.5 8L12.5 14L3.5 8L12.5 2L21.5 8Z"
        style={getStyle()}
      />
    </svg>
  );
};

export default Portfolio;

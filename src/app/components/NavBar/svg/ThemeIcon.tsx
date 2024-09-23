import { useCoin } from "@/app/contexts/CoinProvider";
const ThemeIcon = () => {
  const { theme } = useCoin();
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.7297 2V3.62162M11.7297 20.3784V22M22 12H20.3784M3.62162 12H2M19.0711 19.0711L17.9244 17.9244M6.07559 6.07559L4.92893 4.92893M4.92894 19.0711L6.0756 17.9244M17.9244 6.0756L19.0711 4.92894M17.4054 12C17.4054 14.9853 14.9853 17.4054 12 17.4054C9.01468 17.4054 6.59459 14.9853 6.59459 12C6.59459 9.01468 9.01468 6.59459 12 6.59459C14.9853 6.59459 17.4054 9.01468 17.4054 12Z"
        stroke="white"
        style={{
          stroke: theme === "light" ? "black" : "white",
          strokeOpacity: "1",
        }}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ThemeIcon;

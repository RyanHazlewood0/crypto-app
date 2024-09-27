import { useCryptoContext } from "@/app/contexts/CryptoProvider";

const CopyIcon = () => {
  const { theme } = useCryptoContext();
  return (
    <svg
      width="21"
      height="20"
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.487 10.7503V14.2503C13.487 17.167 12.3203 18.3337 9.40365 18.3337H5.90365C2.98698 18.3337 1.82031 17.167 1.82031 14.2503V10.7503C1.82031 7.83366 2.98698 6.66699 5.90365 6.66699H9.40365C12.3203 6.66699 13.487 7.83366 13.487 10.7503Z"
        stroke="white"
        style={{
          stroke: theme === "light" ? "#353570" : "white",
          strokeOpacity: "1",
        }}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.487 5.75033V9.25033C18.487 12.167 17.3203 13.3337 14.4036 13.3337H13.487V10.7503C13.487 7.83366 12.3203 6.66699 9.40365 6.66699H6.82031V5.75033C6.82031 2.83366 7.98698 1.66699 10.9036 1.66699H14.4036C17.3203 1.66699 18.487 2.83366 18.487 5.75033Z"
        stroke="white"
        style={{
          stroke: theme === "light" ? "#353570" : "white",
          strokeOpacity: "1",
        }}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CopyIcon;

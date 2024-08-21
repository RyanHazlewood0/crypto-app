const RoundIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_bd_587_9796)">
        <circle
          cx="12"
          cy="12"
          r="11"
          fill="#6161D6"
          fillOpacity="0.5"
          style={{
            fillOpacity: 0.5,
          }}
          shapeRendering="crispEdges"
        />
        <circle
          cx="12"
          cy="12"
          r="10.5"
          stroke="url(#paint0_linear_587_9796)"
          shapeRendering="crispEdges"
        />
      </g>
      <path
        d="M6 12H18"
        stroke="white"
        style={{ stroke: "white", strokeOpacity: 1 }}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 18V6"
        stroke="white"
        style={{ stroke: "white", strokeOpacity: 1 }}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <filter
          id="filter0_bd_587_9796"
          x="-12"
          y="-12"
          width="48"
          height="48"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_587_9796"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="8"
            operator="dilate"
            in="SourceAlpha"
            result="effect2_dropShadow_587_9796"
          />
          <feOffset dx="4" dy="4" />
          <feGaussianBlur stdDeviation="10" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.470588 0 0 0 0 0.470588 0 0 0 0 0.980392 0 0 0 0.15 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_backgroundBlur_587_9796"
            result="effect2_dropShadow_587_9796"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect2_dropShadow_587_9796"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_587_9796"
          x1="12"
          y1="1"
          x2="12"
          y2="23"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            stopColor="#7878FA"
            style={{
              stopColor: "#7878FA",
              stopOpacity: 1,
            }}
          />
          <stop
            offset="1"
            stopColor="#7878FA"
            stopOpacity="0"
            style={{ stopColor: "none", stopOpacity: 0 }}
          />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default RoundIcon;

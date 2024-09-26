export interface IconProps {
  size: number;
  color?: string;
}

export const SvgProjectLogo = ({ color, size }: IconProps) => (
  <svg
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 8.5V17.75C3 19.5449 4.45507 21 6.25 21H17.75C19.5449 21 21 19.5449 21 17.75V6.25C21 4.45507 19.5449 3 17.75 3H8.5V8.5H3ZM8.5 10L8.5 14H4.5V10H8.5ZM10 14L10 10H14L14 14H10ZM15.5 14L15.5 10H19.5V14H15.5ZM10 15.5H14V19.5H10V15.5ZM15.5 15.5H19.5V17.75C19.5 18.7165 18.7165 19.5 17.75 19.5H15.5V15.5ZM15.5 4.5H17.75C18.7165 4.5 19.5 5.2835 19.5 6.25V8.5H15.5V4.5ZM14 8.5H10V4.5H14V8.5ZM8.5 15.5V19.5H6.25C5.2835 19.5 4.5 18.7165 4.5 17.75V15.5H8.5Z"
      fill={color ?? "currentColor"}
    />
  </svg>
);

export const MenuIcon = ({ color, size }: IconProps) => (
  <svg
    width={size}
    height={size}
    fill={color ?? "currentColor"}
    id="Layer_1"
    enableBackground="new 0 0 32 32"
    version="1.1"
    viewBox="0 0 32 32"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
  </svg>
);

export const LeaderboardIconOne = ({ color, size }: IconProps) => (
  <svg
    width={size}
    height={size}
    fill={color ?? "currentColor"}
    id="Icons"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title />
    <path d="M22,7H16.333V4a1,1,0,0,0-1-1H8.667a1,1,0,0,0-1,1v7H2a1,1,0,0,0-1,1v8a1,1,0,0,0,1,1H22a1,1,0,0,0,1-1V8A1,1,0,0,0,22,7ZM7.667,19H3V13H7.667ZM14.333,8V19H9.667V5h4.666ZM21,19H16.333V9H21Z" />
  </svg>
);

export const GearIconOne = ({ color, size }: IconProps) => (
  <svg
    width={size}
    height={size}
    fill={color ?? "currentColor"}
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M499.5 332c0-5.66-3.112-11.13-8.203-14.07l-46.61-26.91C446.8 279.6 448 267.1 448 256s-1.242-23.65-3.34-35.02l46.61-26.91c5.092-2.941 8.203-8.411 8.203-14.07c0-14.1-41.98-99.04-63.86-99.04c-2.832 0-5.688 .7266-8.246 2.203l-46.72 26.98C362.9 94.98 342.4 83.1 320 75.16V21.28c0-7.523-5.162-14.28-12.53-15.82C290.8 1.977 273.7 0 256 0s-34.85 1.977-51.48 5.461C197.2 7.004 192 13.76 192 21.28v53.88C169.6 83.1 149.1 94.98 131.4 110.1L84.63 83.16C82.08 81.68 79.22 80.95 76.39 80.95c-19.72 0-63.86 81.95-63.86 99.04c0 5.66 3.112 11.13 8.203 14.07l46.61 26.91C65.24 232.4 64 244 64 256s1.242 23.65 3.34 35.02l-46.61 26.91c-5.092 2.941-8.203 8.411-8.203 14.07c0 14.1 41.98 99.04 63.86 99.04c2.832 0 5.688-.7266 8.246-2.203l46.72-26.98C149.1 417 169.6 428.9 192 436.8v53.88c0 7.523 5.162 14.28 12.53 15.82C221.2 510 238.3 512 255.1 512s34.85-1.977 51.48-5.461C314.8 504.1 320 498.2 320 490.7v-53.88c22.42-7.938 42.93-19.82 60.65-34.97l46.72 26.98c2.557 1.477 5.416 2.203 8.246 2.203C455.3 431 499.5 349.1 499.5 332zM256 336c-44.11 0-80-35.89-80-80S211.9 176 256 176s80 35.89 80 80S300.1 336 256 336z" />
  </svg>
);

export const HelpIconOne = ({ color, size }: IconProps) => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke={color ?? "currentColor"}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" x2="12.01" y1="17" y2="17" />
  </svg>
);

export const CloseXOne = ({ color, size }: IconProps) => (
  <svg
    width={size}
    height={size}
    fill={color ?? "currentColor"}
    id="Layer_1"
    enableBackground="new 0 0 512 512"
    version="1.1"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z" />
  </svg>
);

export const CoinsOne = ({ color, size }: IconProps): JSX.Element => (
  <svg
    width={size}
    height={size}
    fill={color ?? "currentColor"}
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 405.3V448c0 35.3 86 64 192 64s192-28.7 192-64v-42.7C342.7 434.4 267.2 448 192 448S41.3 434.4 0 405.3zM320 128c106 0 192-28.7 192-64S426 0 320 0 128 28.7 128 64s86 64 192 64zM0 300.4V352c0 35.3 86 64 192 64s192-28.7 192-64v-51.6c-41.3 34-116.9 51.6-192 51.6S41.3 334.4 0 300.4zm416 11c57.3-11.1 96-31.7 96-55.4v-42.7c-23.2 16.4-57.3 27.6-96 34.5v63.6zM192 160C86 160 0 195.8 0 240s86 80 192 80 192-35.8 192-80-86-80-192-80zm219.3 56.3c60-10.8 100.7-32 100.7-56.3v-42.7c-35.5 25.1-96.5 38.6-160.7 41.8 29.5 14.3 51.2 33.5 60 57.2z" />
  </svg>
);

export const EthIcon = ({ color, size }: IconProps): JSX.Element => (
  <svg
    width={size}
    height={size}
    fill={color ?? "currentColor"}
    data-name="Layer 1"
    id="Layer_1"
    viewBox="0 0 128 128"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title />
    <polygon points="28.09 65.65 64 7 99.91 65.65 64 86.57 28.09 65.65" />
    <polygon points="64 93.16 98.76 71.58 64 121 28.42 71.58 64 93.16" />
  </svg>
);

export const EthCircleIcon = ({ size }: { size: string }): JSX.Element => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 256 256"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <style></style>
    </defs>
    <g data-name="etherium eth ethcoin crypto" id="etherium_eth_ethcoin_crypto">
      <g data-name="etherium eth" id="etherium_eth">
        <circle fill="#acb7dd" cx="128" cy="128" r="128" />
        <path
          fillRule="evenodd"
          fill="#828384"
          d="M1144.2,652L1080,758.641l64.2,38.144,63.8-38.144ZM1080,771.355l64.2,37.735,63.8-37.735L1144.2,862Z"
          transform="translate(-1016 -629)"
        />
        <path
          fillRule="evenodd"
          fill="#2f3030"
          d="M1144.2,796.539V652l63.62,106.339Zm63.41-25.044L1144.2,862V809.256Z"
          transform="translate(-1016 -629)"
        />
        <path
          opacity={0.8}
          fill="#131313"
          d="M1144.2,729.93L1080,758.641l64.2,38.144,63.8-38.144Z"
          transform="translate(-1016 -629)"
        />
      </g>
    </g>
  </svg>
);

export const AnalyticsIconOne = ({ color, size }: IconProps): JSX.Element => (
  <svg
    width={size}
    height={size}
    fill={color ?? "currentColor"}
    color={color}
    viewBox="0 0 170 99"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0)">
      <path
        d="M159.524 0.393145C156.399 0.123788 154.058 0.750571 152.37 2.30179C150.171 4.32164 149.108 7.85474 149.031 13.4077C147.212 15.4816 145.399 17.5445 143.593 19.5965C139.42 24.3401 135.106 29.2446 130.918 34.0834C126.73 38.9222 122.505 43.8811 118.419 48.6762C116.665 50.7333 114.91 52.7923 113.152 54.8533C112.677 54.843 112.182 54.8083 111.663 54.7723C110.128 54.5701 108.57 54.6493 107.064 55.0063C105.06 55.6145 103.869 55.0462 102.107 53.6307C92.4085 45.8476 83.3948 39.8002 74.55 35.1446C73.8555 34.8254 73.2439 34.3489 72.7624 33.752C72.2816 33.1552 71.9436 32.4542 71.7758 31.704C71.0743 29.0054 69.3499 26.6922 66.9731 25.2626C64.5969 23.833 61.7583 23.4013 59.0692 24.0605C56.3348 24.7041 53.9423 26.364 52.3692 28.7085C50.7961 31.0531 50.1584 33.9097 50.5836 36.7075C50.6933 37.4468 50.826 38.1861 50.9536 38.89L51.056 39.4685L15.5387 73.8969C15.3582 73.8795 15.1783 73.8596 14.9991 73.8409C14.4072 73.7767 13.7946 73.7124 13.1805 73.6963C7.30631 73.5259 3.69542 76.116 1.80964 81.8503C0.395138 86.151 1.94355 89.9895 3.23178 92.5031C4.10457 94.3089 5.43379 95.8517 7.0859 96.9748C8.73803 98.0985 10.6546 98.7639 12.6428 98.9034C12.843 98.9143 13.0427 98.9195 13.2422 98.9201C15.156 98.8912 17.0327 98.382 18.7028 97.4396C20.3728 96.4965 21.7836 95.1497 22.8082 93.5201C25.8693 88.8825 26.3451 84.5362 24.2534 80.2489L58.7173 47.1571L68.318 44.1679L96.7993 63.863C97.0238 68.0989 98.0703 71.2753 100.173 74.1232C101.397 75.8724 103.174 77.1517 105.213 77.7521C107.252 78.3519 109.432 78.2368 111.398 77.4262C117.081 75.2495 120.237 70.4261 120.088 64.1697L154.653 20.8963C159.556 21.8606 163.362 21.4107 165.969 19.5528C167.985 18.1186 169.212 15.895 169.615 12.9436C169.846 11.4554 169.772 9.93496 169.397 8.4767C169.022 7.01851 168.354 5.65349 167.434 4.46625C166.462 3.27794 165.259 2.30335 163.898 1.60274C162.538 0.902131 161.049 0.490445 159.524 0.393145Z"
        fill={color}
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect
          fill="white"
          height="99"
          transform="translate(0.777344)"
          width="169"
        />
      </clipPath>
    </defs>
  </svg>
);

export const ChainIcon = ({ color, size }: IconProps): JSX.Element => (
  <svg
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title />
    <g data-name="Layer 2" id="Layer_2">
      <path d="M18.89,3.69a3.82,3.82,0,0,0-4.6.6l-2,2a3.82,3.82,0,0,0-.6,4.6l-.8.8a3.82,3.82,0,0,0-4.6.6l-2,2a3.82,3.82,0,0,0-.6,4.6l-2.4,2.4,1.41,1.41,2.4-2.4a3.79,3.79,0,0,0,4.6-.6l2-2a3.82,3.82,0,0,0,.6-4.6l.8-.8a3.79,3.79,0,0,0,4.6-.6l2-2a3.82,3.82,0,0,0,.6-4.6l2.4-2.4L21.29,1.29Zm-8.6,12.6-2,2a1.83,1.83,0,0,1-1.67.49l1.08-1.08L6.29,16.29,5.21,17.37a1.83,1.83,0,0,1,.49-1.67l2-2a1.81,1.81,0,0,1,1.67-.49L8.29,14.29l1.41,1.41,1.08-1.08A1.83,1.83,0,0,1,10.29,16.29Zm8-8-2,2a1.83,1.83,0,0,1-1.67.49l1.08-1.08L14.29,8.29,13.21,9.37a1.83,1.83,0,0,1,.49-1.67l2-2a1.81,1.81,0,0,1,1.67-.49L16.29,6.29l1.41,1.41,1.08-1.08A1.83,1.83,0,0,1,18.29,8.29Z" />
    </g>
  </svg>
);

export const UserIcon = ({ color, size }: IconProps): JSX.Element => (
  <svg
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 6C7 3.23858 9.23858 1 12 1C14.7614 1 17 3.23858 17 6C17 8.76142 14.7614 11 12 11C9.23858 11 7 8.76142 7 6ZM12 3C10.3431 3 9 4.34315 9 6C9 7.65685 10.3431 9 12 9C13.6569 9 15 7.65685 15 6C15 4.34315 13.6569 3 12 3Z"
      fill={color ?? "currentColor"}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 22C2 16.4772 6.47715 12 12 12C17.5228 12 22 16.4772 22 22V23H2V22ZM4.06189 21H19.9381C19.446 17.0537 16.0796 14 12 14C7.92038 14 4.55399 17.0537 4.06189 21Z"
      fill={color ?? "currentColor"}
    />
  </svg>
);

export const ShieldIconOne = ({ color, size }: IconProps): JSX.Element => (
  <svg
    width={size}
    height={size}
    id="Icons"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs></defs>
    <path
      fill={color ?? "currentColor"}
      d="M22.814,9.216l-.826-5.368A1,1,0,0,0,21,3C15.533,3,12.731.316,12.707.293a1,1,0,0,0-1.41,0C11.269.316,8.467,3,3,3a1,1,0,0,0-.988.848L1.186,9.216A12.033,12.033,0,0,0,7.3,21.576l4.22,2.3a1,1,0,0,0,.958,0l4.22-2.3A12.033,12.033,0,0,0,22.814,9.216Zm-7.072,10.6L12,21.861,8.258,19.82a10.029,10.029,0,0,1-5.1-10.3l.7-4.541A14.717,14.717,0,0,0,12,2.3,14.717,14.717,0,0,0,20.139,4.98l.7,4.54A10.029,10.029,0,0,1,15.742,19.82Z"
    />
    <path
      fill={color ?? "currentColor"}
      d="M15.293,8.293,10,13.586,8.707,12.293a1,1,0,1,0-1.414,1.414l2,2a1,1,0,0,0,1.414,0l6-6a1,1,0,0,0-1.414-1.414Z"
    />
  </svg>
);

export const EmailAtIcon = ({ color, size }: IconProps): JSX.Element => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke={color ?? "currentColor"}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
  </svg>
);

export const SuccessCircleOne = ({ color, size }: IconProps): JSX.Element => (
  <svg
    width={size}
    height={size}
    enableBackground="new 0 0 512 512"
    id="Layer_1"
    version="1.1"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <path
      d="M256,6.998c-137.533,0-249,111.467-249,249c0,137.534,111.467,249,249,249s249-111.467,249-249  C505,118.464,393.533,6.998,256,6.998z M256,485.078c-126.309,0-229.08-102.771-229.08-229.081  c0-126.31,102.771-229.08,229.08-229.08c126.31,0,229.08,102.771,229.08,229.08C485.08,382.307,382.31,485.078,256,485.078z"
      fill={color ?? "currentColor "}
    />
    <polygon
      fill={color ?? "currentColor"}
      points="384.235,158.192 216.919,325.518 127.862,236.481 113.72,250.624 216.919,353.803 398.28,172.334   "
    />
  </svg>
);

export const ErrorCircle = ({ color, size }: IconProps): JSX.Element => (
  <svg
    width={size}
    height={size}
    version="1.1"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <title />
    <desc />
    <defs />
    <g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1">
      <g
        fill={color ?? "currentColor"}
        id="Core"
        transform="translate(-2.000000, -212.000000)"
      >
        <g id="error" transform="translate(2.000000, 212.000000)">
          <path
            d="M10,0 C4.5,0 0,4.5 0,10 C0,15.5 4.5,20 10,20 C15.5,20 20,15.5 20,10 C20,4.5 15.5,0 10,0 L10,0 Z M11,15 L9,15 L9,13 L11,13 L11,15 L11,15 Z M11,11 L9,11 L9,5 L11,5 L11,11 L11,11 Z"
            id="Shape"
          />
        </g>
      </g>
    </g>
  </svg>
);

export const LabelIcon = ({ color, size }: IconProps): JSX.Element => (
  <svg
    width={size}
    height={size}
    fill={color ?? "currentColor"}
    viewBox="0 0 448 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 60c0-15.46 12.54-28 28-28h186.8c12.76 0 30.58 7.381 39.6 16.4l177.2 177.2c21.87 21.87 21.87 57.33-.0008 79.2l-158.8 158.8c-21.87 21.87-57.33 21.87-79.19-.0017l-177.2-177.2C7.381 277.4 0 259.6 0 246.8V60zM80 144c0 17.68 14.33 32 32 32s32-14.32 32-32s-14.33-32-32-32S80 126.3 80 144z" />
  </svg>
);

import tailwindConfig from "../../../../tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";

interface SpinnerProps {
  size: number;
  color?: string;
  fillColor?: string;
}

const tailwindTheme = resolveConfig(tailwindConfig).theme;

export const LoadingSpinner = ({
  size,
  color,
  fillColor,
}: SpinnerProps): JSX.Element => (
  <div role="status">
    <svg
      width={size}
      height={size}
      aria-hidden="true"
      className="inline animate-spin fill-primary-1 text-gray-400"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill={fillColor ?? "currentColor"}
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill={color ?? tailwindTheme.colors["almostblack"]}
      />
    </svg>
    <span className="sr-only">Loading...</span>
  </div>
);

export const GameLoadingSpinner = ({ size }: { size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    width={size}
    height={size}
    shapeRendering="auto"
    display="block"
    style={{ background: "transparent" }}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <g>
      <rect fill="#fad1a4" height="27" width="27" y="6.5" x="6.5">
        <animate
          calcMode="discrete"
          begin="0s"
          repeatCount="indefinite"
          dur="1s"
          keyTimes="0;0.125;1"
          values="#d1a4fa;#fad1a4;#fad1a4"
          attributeName="fill"
        ></animate>
      </rect>
      <rect fill="#fad1a4" height="27" width="27" y="6.5" x="36.5">
        <animate
          calcMode="discrete"
          begin="0.125s"
          repeatCount="indefinite"
          dur="1s"
          keyTimes="0;0.125;1"
          values="#d1a4fa;#fad1a4;#fad1a4"
          attributeName="fill"
        ></animate>
      </rect>
      <rect fill="#fad1a4" height="27" width="27" y="6.5" x="66.5">
        <animate
          calcMode="discrete"
          begin="0.25s"
          repeatCount="indefinite"
          dur="1s"
          keyTimes="0;0.125;1"
          values="#d1a4fa;#fad1a4;#fad1a4"
          attributeName="fill"
        ></animate>
      </rect>
      <rect fill="#fad1a4" height="27" width="27" y="36.5" x="6.5">
        <animate
          calcMode="discrete"
          begin="0.875s"
          repeatCount="indefinite"
          dur="1s"
          keyTimes="0;0.125;1"
          values="#d1a4fa;#fad1a4;#fad1a4"
          attributeName="fill"
        ></animate>
      </rect>
      <rect fill="#fad1a4" height="27" width="27" y="36.5" x="66.5">
        <animate
          calcMode="discrete"
          begin="0.375s"
          repeatCount="indefinite"
          dur="1s"
          keyTimes="0;0.125;1"
          values="#d1a4fa;#fad1a4;#fad1a4"
          attributeName="fill"
        ></animate>
      </rect>
      <rect fill="#fad1a4" height="27" width="27" y="66.5" x="6.5">
        <animate
          calcMode="discrete"
          begin="0.75s"
          repeatCount="indefinite"
          dur="1s"
          keyTimes="0;0.125;1"
          values="#d1a4fa;#fad1a4;#fad1a4"
          attributeName="fill"
        ></animate>
      </rect>
      <rect fill="#fad1a4" height="27" width="27" y="66.5" x="36.5">
        <animate
          calcMode="discrete"
          begin="0.625s"
          repeatCount="indefinite"
          dur="1s"
          keyTimes="0;0.125;1"
          values="#d1a4fa;#fad1a4;#fad1a4"
          attributeName="fill"
        ></animate>
      </rect>
      <rect fill="#fad1a4" height="27" width="27" y="66.5" x="66.5">
        <animate
          calcMode="discrete"
          begin="0.5s"
          repeatCount="indefinite"
          dur="1s"
          keyTimes="0;0.125;1"
          values="#d1a4fa;#fad1a4;#fad1a4"
          attributeName="fill"
        ></animate>
      </rect>
      <g></g>
    </g>
  </svg>
);

export const GameLoadingCircles = ({
  size,
  color,
}: SpinnerProps): JSX.Element => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 105 105"
    xmlns="http://www.w3.org/2000/svg"
    fill={color ?? "currentColor"}
  >
    <circle cx="12.5" cy="12.5" r="12.5">
      <animate
        attributeName="fill-opacity"
        begin="0s"
        dur="1s"
        values="1;.2;1"
        calcMode="linear"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="12.5" cy="52.5" r="12.5" fillOpacity=".5">
      <animate
        attributeName="fill-opacity"
        begin="100ms"
        dur="1s"
        values="1;.2;1"
        calcMode="linear"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="52.5" cy="12.5" r="12.5">
      <animate
        attributeName="fill-opacity"
        begin="300ms"
        dur="1s"
        values="1;.2;1"
        calcMode="linear"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="52.5" cy="52.5" r="12.5">
      <animate
        attributeName="fill-opacity"
        begin="600ms"
        dur="1s"
        values="1;.2;1"
        calcMode="linear"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="92.5" cy="12.5" r="12.5">
      <animate
        attributeName="fill-opacity"
        begin="800ms"
        dur="1s"
        values="1;.2;1"
        calcMode="linear"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="92.5" cy="52.5" r="12.5">
      <animate
        attributeName="fill-opacity"
        begin="400ms"
        dur="1s"
        values="1;.2;1"
        calcMode="linear"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="12.5" cy="92.5" r="12.5">
      <animate
        attributeName="fill-opacity"
        begin="700ms"
        dur="1s"
        values="1;.2;1"
        calcMode="linear"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="52.5" cy="92.5" r="12.5">
      <animate
        attributeName="fill-opacity"
        begin="500ms"
        dur="1s"
        values="1;.2;1"
        calcMode="linear"
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="92.5" cy="92.5" r="12.5">
      <animate
        attributeName="fill-opacity"
        begin="200ms"
        dur="1s"
        values="1;.2;1"
        calcMode="linear"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

import * as React from "react";

interface OldPowerFlowSVGProps {
    SolarValue : number;
    GridValue : number;
    DGValue : number;
    BatteryValue : number;
    LoadValue : number;
    combineResult : any[];
}

const OldPowerFlowSVG:React.FC<OldPowerFlowSVGProps> = ({SolarValue, DGValue, GridValue, BatteryValue, LoadValue, combineResult}) => {
  var GridFlow = GridValue < 0 ? "M30,0 L460,0" : "M460,0 L30,0"
  var batteryFlow = BatteryValue < 0 ? "M -10 40 C 166 56, 207 0.67263, 207.637 5.67263" : "M 207.637 5.67263 C 207 0.67263 166 56 -10 40 ";
  return (
    
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    // width={1600}
    // height={1080}
    viewBox="95 425 1042 980"
    xmlSpace="preserve"
    style={{
      margin : "auto",
      width : window.screen.height < 950 ? 1600 : "110%",
      height : window.screen.height < 950 ? 1080 : "480%",
    }}
  >
    <desc>{"Created with Fabric.js 5.2.4"}</desc>
    <defs />
    <g
      transform="matrix(1 0 0 1 540 540)"
      id="c81cbcc4-f802-44cc-a0e2-a0ebb32bb2a8"
    >
      <rect
        style={{
          stroke: "none",
          strokeWidth: 1,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeDashoffset: 0,
          strokeLinejoin: "miter",
          strokeMiterlimit: 4,
          fill: "rgb(255,255,255)",
          fillRule: "nonzero",
          opacity: 1,
          visibility: "hidden",
        }}
        vectorEffect="non-scaling-stroke"
        x={-540}
        y={-540}
        rx={0}
        ry={0}
        width={1406}
        height={235}
      />
    </g>
    <g
      transform="matrix(1 0 0 1 540 540)"
      id="6989e609-cc2c-420c-a510-313baf4a3417"
    />
    <g
      transform="matrix(1 0 0 1 540 540)"
      id="d56390de-0cca-45a4-815d-25712780e506"
    >
      <linearGradient
        id="SVGID_paint0_linear_498_5248_3"
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(1 0 0 1 -657 -119.5)"
        x1={845}
        y1={-7.64552}
        x2={845.714}
        y2={157.837}
      >
        <stop
          offset="0%"
          style={{
            stopColor: "rgb(255,255,255)",
            stopOpacity: 1,
          }}
        />
        <stop
          offset="100%"
          style={{
            stopColor: "rgb(199,229,225)",
            stopOpacity: 1,
          }}
        />
      </linearGradient>
      <rect
        style={{
          stroke: "rgb(0,0,0)",
          strokeWidth: 0,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeDashoffset: 0,
          strokeLinejoin: "miter",
          strokeMiterlimit: 4,
          fill: "url(#SVGID_paint0_linear_498_5248_3)",
          fillRule: "nonzero",
          opacity: 1,
        }}
        vectorEffect="non-scaling-stroke"
        x={-653}
        y={-117.5}
        rx={0}
        ry={0}
        width={1306}
        height={235}
      />
    </g>
    <g transform="matrix(1 0 0 1 279.73 489.46)">
      <g style={{}} vectorEffect="non-scaling-stroke">
        <g transform="matrix(1 0 0 1 -121.5 0)">
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(155,209,147)",
              fillRule: "nonzero",
              opacity: 0.4,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-104, -13.5)"
            d="M 66.3272 4.77117 C 45.3236 16.896 13.3576 24.6424 0 27 L 192.764 27 C 205.66 27 222.334 25.7875 185.854 20.9376 C 140.254 14.8752 92.5818 -10.3849 66.3272 4.77117 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 -2.5 0)">
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(147,193,140)",
              fillRule: "nonzero",
              opacity: 0.4,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-223, -13.5)"
            d="M 185.327 4.77117 C 164.324 16.896 132.358 24.6424 119 27 L 311.764 27 C 324.66 27 341.334 25.7875 304.854 20.9376 C 259.254 14.8752 211.582 -10.3849 185.327 4.77117 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 121.5 0)">
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(131,172,125)",
              fillRule: "nonzero",
              opacity: 0.4,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-347, -13.5)"
            d="M 309.327 4.77117 C 288.324 16.896 256.358 24.6424 243 27 L 435.764 27 C 448.66 27 465.334 25.7875 428.854 20.9376 C 383.254 14.8752 335.582 -10.3849 309.327 4.77117 Z"
            strokeLinecap="round"
          />
        </g>
      </g>
    </g>
    <g transform="matrix(1 0 0 1 772.48 517.26)">
      <g style={{}} vectorEffect="non-scaling-stroke">
        <g transform="matrix(1 0 0 1 -164.5 0)">
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(155,209,147)",
              fillRule: "nonzero",
              opacity: 0.4,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-104, -13.5)"
            d="M 66.3272 4.77117 C 45.3236 16.896 13.3576 24.6424 0 27 L 192.764 27 C 205.66 27 222.334 25.7875 185.854 20.9376 C 140.254 14.8752 92.5818 -10.3849 66.3272 4.77117 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 164.5 0)">
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(147,193,140)",
              fillRule: "nonzero",
              opacity: 0.4,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-433, -13.5)"
            d="M 395.327 4.77117 C 374.324 16.896 342.358 24.6424 329 27 L 521.764 27 C 534.66 27 551.334 25.7875 514.854 20.9376 C 469.254 14.8752 421.582 -10.3849 395.327 4.77117 Z"
            strokeLinecap="round"
          />
        </g>
      </g>
    </g>
    <g transform="matrix(1 0 0 1 1010 562.74)">
      <g style={{}} vectorEffect="non-scaling-stroke">
        <g
          transform="matrix(1 0 0 1 -28.2 -15.27)"
          clipPath="url(#CLIPPATH_28)"
        >
          <clipPath id="CLIPPATH_28">
            <rect
              transform="matrix(-1 0 0 1 -0.11 15.27)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-30, -21.06)"
            d="M 22.3002 42.1068 L 23.7102 42.1068 L 23.7102 14.2768 L 30.0002 2.92684 L 36.2802 14.2768 L 36.2802 42.1068 L 37.7002 42.1068 L 37.7002 13.9068 L 30.0002 0.00683594 L 22.3002 13.9068 L 22.3002 42.1068 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -28.21 -22.23)"
          clipPath="url(#CLIPPATH_29)"
        >
          <clipPath id="CLIPPATH_29">
            <rect
              transform="matrix(-1 0 0 1 -0.1 22.23)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-30, -14.1)"
            d="M 23.0002 13.3867 L 36.9902 13.3867 L 36.9902 14.8067 L 23.0002 14.8067 L 23.0002 13.3867 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -28.23 -15.26)"
          clipPath="url(#CLIPPATH_30)"
        >
          <clipPath id="CLIPPATH_30">
            <rect
              transform="matrix(-1 0 0 1 -0.08 15.26)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-29.97, -21.06)"
            d="M 23.5063 13.5932 L 37.4434 27.5303 L 36.4393 28.5344 L 22.5022 14.5973 L 23.5063 13.5932 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -28.19 -15.26)"
          clipPath="url(#CLIPPATH_31)"
        >
          <clipPath id="CLIPPATH_31">
            <rect
              transform="matrix(-1 0 0 1 -0.12 15.26)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-30.01, -21.07)"
            d="M 36.4949 13.5867 L 37.499 14.5908 L 23.5337 28.5562 L 22.5296 27.5521 L 36.4949 13.5867 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -28.16 -1.24)"
          clipPath="url(#CLIPPATH_32)"
        >
          <clipPath id="CLIPPATH_32">
            <rect
              transform="matrix(-1 0 0 1 -0.16 1.24)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-30.05, -35.08)"
            d="M 23.523 27.5562 L 37.5732 41.6064 L 36.5691 42.6105 L 22.5189 28.5603 L 23.523 27.5562 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 -28.2 -1.35)" clipPath="url(#CLIPPATH_33)">
          <clipPath id="CLIPPATH_33">
            <rect
              transform="matrix(-1 0 0 1 -0.11 1.35)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-30, -34.97)"
            d="M 36.4363 27.5311 L 37.4404 28.5352 L 23.5599 42.4157 L 22.5558 41.4116 L 36.4363 27.5311 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -42.09 -18.58)"
          clipPath="url(#CLIPPATH_34)"
        >
          <clipPath id="CLIPPATH_34">
            <rect
              transform="matrix(-1 0 0 1 13.78 18.58)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-16.11, -17.74)"
            d="M 8.84988 21.9973 L 23.0099 21.9973 L 23.0099 20.5773 L 13.8399 20.5773 L 23.3799 14.6973 L 22.6299 13.4873 L 8.84988 21.9973 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -45.51 -3.15)"
          clipPath="url(#CLIPPATH_35)"
        >
          <clipPath id="CLIPPATH_35">
            <rect
              transform="matrix(-1 0 0 1 17.19 3.15)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-12.7, -33.18)"
            d="M 2.04058 38.9165 L 23.0106 38.9165 L 23.0106 37.4965 L 7.50059 37.4965 L 23.3506 28.6765 L 22.6606 27.4365 L 2.04058 38.9165 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -14.32 -18.58)"
          clipPath="url(#CLIPPATH_36)"
        >
          <clipPath id="CLIPPATH_36">
            <rect
              transform="matrix(-1 0 0 1 -14 18.58)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-43.89, -17.74)"
            d="M 36.9904 21.9973 L 51.1504 21.9973 L 37.3704 13.4873 L 36.6204 14.6973 L 46.1604 20.5773 L 36.9904 20.5773 L 36.9904 21.9973 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 -10.9 -3.15)" clipPath="url(#CLIPPATH_37)">
          <clipPath id="CLIPPATH_37">
            <rect
              transform="matrix(-1 0 0 1 -17.41 3.15)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-47.3, -33.18)"
            d="M 36.99 38.9165 L 57.96 38.9165 L 37.34 27.4365 L 36.65 28.6765 L 52.5 37.4965 L 36.99 37.4965 L 36.99 38.9165 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 -43.9 20.69)" clipPath="url(#CLIPPATH_38)">
          <clipPath id="CLIPPATH_38">
            <rect
              transform="matrix(-1 0 0 1 15.59 -20.69)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-14.3, -57.02)"
            d="M 22.3938 41.7449 L 23.6201 42.4609 L 6.20415 72.2887 L 4.97788 71.5727 L 22.3938 41.7449 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -12.51 20.69)"
          clipPath="url(#CLIPPATH_39)"
        >
          <clipPath id="CLIPPATH_39">
            <rect
              transform="matrix(-1 0 0 1 -15.8 -20.69)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-45.69, -57.02)"
            d="M 37.5954 41.7485 L 55.0166 71.5732 L 53.7905 72.2895 L 36.3693 42.4647 L 37.5954 41.7485 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 -28.2 5.58)" clipPath="url(#CLIPPATH_40)">
          <clipPath id="CLIPPATH_40">
            <rect
              transform="matrix(-1 0 0 1 -0.11 -5.58)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-30.01, -41.91)"
            d="M 22.3102 41.1973 L 37.7002 41.1973 L 37.7002 42.6173 L 22.3102 42.6173 L 22.3102 41.1973 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -28.42 26.58)"
          clipPath="url(#CLIPPATH_41)"
        >
          <clipPath id="CLIPPATH_41">
            <rect
              transform="matrix(-1 0 0 1 0.11 -26.58)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-29.78, -62.91)"
            d="M 10.4299 62.1973 L 49.1299 62.1973 L 49.1299 63.6173 L 10.4299 63.6173 L 10.4299 62.1973 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -28.33 14.54)"
          clipPath="url(#CLIPPATH_42)"
        >
          <clipPath id="CLIPPATH_42">
            <rect
              transform="matrix(-1 0 0 1 0.02 -14.54)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-29.87, -50.87)"
            d="M 17.6304 50.1572 L 42.1104 50.1572 L 42.1104 51.5772 L 17.6304 51.5772 L 17.6304 50.1572 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -25.65 10.16)"
          clipPath="url(#CLIPPATH_43)"
        >
          <clipPath id="CLIPPATH_43">
            <rect
              transform="matrix(-1 0 0 1 -2.66 -10.16)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-32.55, -46.48)"
            d="M 23.2944 41.4552 L 42.4004 50.2188 L 41.8084 51.5095 L 22.7023 42.7459 L 23.2944 41.4552 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -30.63 10.01)"
          clipPath="url(#CLIPPATH_44)"
        >
          <clipPath id="CLIPPATH_44">
            <rect
              transform="matrix(-1 0 0 1 2.32 -10.01)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-27.57, -46.33)"
            d="M 36.7911 41.4565 L 37.3682 42.7539 L 18.3543 51.2115 L 17.7772 49.914 L 36.7911 41.4565 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 -24.6 20.4)" clipPath="url(#CLIPPATH_45)">
          <clipPath id="CLIPPATH_45">
            <rect
              transform="matrix(-1 0 0 1 -3.71 -20.4)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-33.6, -56.73)"
            d="M 18.3262 49.8968 L 49.3936 62.2412 L 48.8692 63.5609 L 17.8018 51.2165 L 18.3262 49.8968 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -31.72 20.56)"
          clipPath="url(#CLIPPATH_46)"
        >
          <clipPath id="CLIPPATH_46">
            <rect
              transform="matrix(-1 0 0 1 3.41 -20.56)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-26.48, -56.88)"
            d="M 41.8469 50.2013 L 42.3574 51.5264 L 11.1158 63.5627 L 10.6053 62.2376 L 41.8469 50.2013 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -28.06 35.61)"
          clipPath="url(#CLIPPATH_47)"
        >
          <clipPath id="CLIPPATH_47">
            <rect
              transform="matrix(-1 0 0 1 -0.25 -35.61)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-30.15, -71.94)"
            d="M 1.67012 71.2266 L 58.6201 71.2266 L 58.6201 72.6466 L 1.67012 72.6466 L 1.67012 71.2266 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 -56.16 -0.7)" clipPath="url(#CLIPPATH_48)">
          <clipPath id="CLIPPATH_48">
            <rect
              transform="matrix(-1 0 0 1 27.84 0.7)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(117,117,117)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-2.05, -35.63)"
            d="M 2.04031 31.6865 L 2.05031 31.6865 C 2.47557 31.6865 2.82031 32.0313 2.82031 32.4565 L 2.82031 38.7965 C 2.82031 39.2218 2.47557 39.5665 2.05031 39.5665 L 2.04031 39.5665 C 1.61505 39.5665 1.27031 39.2218 1.27031 38.7965 L 1.27031 32.4565 C 1.27031 32.0313 1.61505 31.6865 2.04031 31.6865 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 -56.15 -3)" clipPath="url(#CLIPPATH_49)">
          <clipPath id="CLIPPATH_49">
            <rect
              transform="matrix(-1 0 0 1 27.83 3)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(209,209,209)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-2.06, -33.33)"
            d="M 0.0105858 33.2061 L 4.10059 33.2061 L 4.10059 33.4461 L 0.0105858 33.4461 L 0.0105858 33.2061 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -56.15 -1.58)"
          clipPath="url(#CLIPPATH_50)"
        >
          <clipPath id="CLIPPATH_50">
            <rect
              transform="matrix(-1 0 0 1 27.83 1.58)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(209,209,209)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-2.06, -34.75)"
            d="M 0.0105858 34.627 L 4.10059 34.627 L 4.10059 34.867 L 0.0105858 34.867 L 0.0105858 34.627 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -56.15 -0.17)"
          clipPath="url(#CLIPPATH_51)"
        >
          <clipPath id="CLIPPATH_51">
            <rect
              transform="matrix(-1 0 0 1 27.83 0.17)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(209,209,209)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-2.06, -36.16)"
            d="M 0.0105858 36.0361 L 4.10059 36.0361 L 4.10059 36.2761 L 0.0105858 36.2761 L 0.0105858 36.0361 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 -56.15 1.25)" clipPath="url(#CLIPPATH_52)">
          <clipPath id="CLIPPATH_52">
            <rect
              transform="matrix(-1 0 0 1 27.83 -1.25)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(209,209,209)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-2.06, -37.58)"
            d="M 0.0105858 37.4561 L 4.10059 37.4561 L 4.10059 37.6961 L 0.0105858 37.6961 L 0.0105858 37.4561 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 -0.47 -0.7)" clipPath="url(#CLIPPATH_53)">
          <clipPath id="CLIPPATH_53">
            <rect
              transform="matrix(-1 0 0 1 -27.85 0.7)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(117,117,117)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-57.74, -35.63)"
            d="M 57.7307 31.6865 L 57.7407 31.6865 C 58.166 31.6865 58.5107 32.0313 58.5107 32.4565 L 58.5107 38.7965 C 58.5107 39.2218 58.166 39.5665 57.7407 39.5665 L 57.7307 39.5665 C 57.3055 39.5665 56.9607 39.2218 56.9607 38.7965 L 56.9607 32.4565 C 56.9607 32.0313 57.3055 31.6865 57.7307 31.6865 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 -0.47 -3)" clipPath="url(#CLIPPATH_54)">
          <clipPath id="CLIPPATH_54">
            <rect
              transform="matrix(-1 0 0 1 -27.84 3)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(209,209,209)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-57.74, -33.33)"
            d="M 55.6903 33.2061 L 59.7803 33.2061 L 59.7803 33.4461 L 55.6903 33.4461 L 55.6903 33.2061 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 -0.47 -1.58)" clipPath="url(#CLIPPATH_55)">
          <clipPath id="CLIPPATH_55">
            <rect
              transform="matrix(-1 0 0 1 -27.84 1.58)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(209,209,209)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-57.74, -34.75)"
            d="M 55.6903 34.627 L 59.7803 34.627 L 59.7803 34.867 L 55.6903 34.867 L 55.6903 34.627 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 -0.47 -0.17)" clipPath="url(#CLIPPATH_56)">
          <clipPath id="CLIPPATH_56">
            <rect
              transform="matrix(-1 0 0 1 -27.84 0.17)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(209,209,209)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-57.74, -36.16)"
            d="M 55.6903 36.0361 L 59.7803 36.0361 L 59.7803 36.2761 L 55.6903 36.2761 L 55.6903 36.0361 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 -0.47 1.25)" clipPath="url(#CLIPPATH_57)">
          <clipPath id="CLIPPATH_57">
            <rect
              transform="matrix(-1 0 0 1 -27.84 -1.25)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(209,209,209)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-57.74, -37.58)"
            d="M 55.6903 37.4561 L 59.7803 37.4561 L 59.7803 37.6961 L 55.6903 37.6961 L 55.6903 37.4561 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 -7.5 -17.32)" clipPath="url(#CLIPPATH_58)">
          <clipPath id="CLIPPATH_58">
            <rect
              transform="matrix(-1 0 0 1 -20.82 17.32)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(117,117,117)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-50.71, -19.01)"
            d="M 50.7005 15.0674 L 50.7105 15.0674 C 51.1357 15.0674 51.4805 15.4121 51.4805 15.8374 L 51.4805 22.1774 C 51.4805 22.6026 51.1357 22.9474 50.7105 22.9474 L 50.7005 22.9474 C 50.2752 22.9474 49.9305 22.6026 49.9305 22.1774 L 49.9305 15.8374 C 49.9305 15.4121 50.2752 15.0674 50.7005 15.0674 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 -7.5 -19.61)" clipPath="url(#CLIPPATH_59)">
          <clipPath id="CLIPPATH_59">
            <rect
              transform="matrix(-1 0 0 1 -20.81 19.61)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(209,209,209)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-50.7, -16.72)"
            d="M 48.66 16.5977 L 52.75 16.5977 L 52.75 16.8377 L 48.66 16.8377 L 48.66 16.5977 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 -7.5 -18.2)" clipPath="url(#CLIPPATH_60)">
          <clipPath id="CLIPPATH_60">
            <rect
              transform="matrix(-1 0 0 1 -20.81 18.2)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(209,209,209)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-50.7, -18.13)"
            d="M 48.66 18.0078 L 52.75 18.0078 L 52.75 18.2478 L 48.66 18.2478 L 48.66 18.0078 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 -7.5 -16.78)" clipPath="url(#CLIPPATH_61)">
          <clipPath id="CLIPPATH_61">
            <rect
              transform="matrix(-1 0 0 1 -20.81 16.78)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(209,209,209)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-50.7, -19.55)"
            d="M 48.66 19.4277 L 52.75 19.4277 L 52.75 19.6677 L 48.66 19.6677 L 48.66 19.4277 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 -7.5 -15.36)" clipPath="url(#CLIPPATH_62)">
          <clipPath id="CLIPPATH_62">
            <rect
              transform="matrix(-1 0 0 1 -20.81 15.36)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(209,209,209)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-50.7, -20.97)"
            d="M 48.66 20.8477 L 52.75 20.8477 L 52.75 21.0877 L 48.66 21.0877 L 48.66 20.8477 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -49.29 -17.32)"
          clipPath="url(#CLIPPATH_63)"
        >
          <clipPath id="CLIPPATH_63">
            <rect
              transform="matrix(-1 0 0 1 20.97 17.32)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(117,117,117)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-8.92, -19.01)"
            d="M 8.91043 15.0674 L 8.92043 15.0674 C 9.34569 15.0674 9.69043 15.4121 9.69043 15.8374 L 9.69043 22.1774 C 9.69043 22.6026 9.34569 22.9474 8.92043 22.9474 L 8.91043 22.9474 C 8.48517 22.9474 8.14043 22.6026 8.14043 22.1774 L 8.14043 15.8374 C 8.14043 15.4121 8.48517 15.0674 8.91043 15.0674 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -49.28 -19.61)"
          clipPath="url(#CLIPPATH_64)"
        >
          <clipPath id="CLIPPATH_64">
            <rect
              transform="matrix(-1 0 0 1 20.96 19.61)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(209,209,209)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-8.93, -16.72)"
            d="M 6.8807 16.5977 L 10.9707 16.5977 L 10.9707 16.8377 L 6.8807 16.8377 L 6.8807 16.5977 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -49.28 -18.2)"
          clipPath="url(#CLIPPATH_65)"
        >
          <clipPath id="CLIPPATH_65">
            <rect
              transform="matrix(-1 0 0 1 20.96 18.2)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(209,209,209)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-8.93, -18.13)"
            d="M 6.8807 18.0078 L 10.9707 18.0078 L 10.9707 18.2478 L 6.8807 18.2478 L 6.8807 18.0078 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -49.28 -16.78)"
          clipPath="url(#CLIPPATH_66)"
        >
          <clipPath id="CLIPPATH_66">
            <rect
              transform="matrix(-1 0 0 1 20.96 16.78)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(209,209,209)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-8.93, -19.55)"
            d="M 6.8807 19.4277 L 10.9707 19.4277 L 10.9707 19.6677 L 6.8807 19.6677 L 6.8807 19.4277 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -49.28 -15.36)"
          clipPath="url(#CLIPPATH_67)"
        >
          <clipPath id="CLIPPATH_67">
            <rect
              transform="matrix(-1 0 0 1 20.96 15.36)"
              id="clip0_498_5593"
              x={-29.89}
              y={-36.32}
              rx={0}
              ry={0}
              width={59.78}
              height={72.64}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(209,209,209)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-8.93, -20.97)"
            d="M 6.8807 20.8477 L 10.9707 20.8477 L 10.9707 21.0877 L 6.8807 21.0877 L 6.8807 20.8477 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 18.64 6.56)" clipPath="url(#CLIPPATH_68)">
          <clipPath id="CLIPPATH_68">
            <rect
              transform="matrix(-1 0 0 1 -0.06 8.62)"
              id="clip1_498_5593"
              x={-17}
              y={-20.5}
              rx={0}
              ry={0}
              width={34}
              height={41}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-76.84, -42.89)"
            d="M 72.4629 54.7692 L 73.2648 54.7692 L 73.2648 39.0612 L 76.8423 32.655 L 80.4141 39.0612 L 80.4141 54.7692 L 81.2217 54.7692 L 81.2217 38.8524 L 76.8423 31.0068 L 72.4629 38.8524 L 72.4629 54.7692 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 18.64 2.63)" clipPath="url(#CLIPPATH_69)">
          <clipPath id="CLIPPATH_69">
            <rect
              transform="matrix(-1 0 0 1 -0.06 12.55)"
              id="clip1_498_5593"
              x={-17}
              y={-20.5}
              rx={0}
              ry={0}
              width={34}
              height={41}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-76.84, -38.96)"
            d="M 72.8615 38.5596 L 80.8184 38.5596 L 80.8184 39.3611 L 72.8615 39.3611 L 72.8615 38.5596 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 18.63 6.56)" clipPath="url(#CLIPPATH_70)">
          <clipPath id="CLIPPATH_70">
            <rect
              transform="matrix(-1 0 0 1 -0.05 8.62)"
              id="clip1_498_5593"
              x={-17}
              y={-20.5}
              rx={0}
              ry={0}
              width={34}
              height={41}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-76.83, -42.89)"
            d="M 73.1494 38.6745 L 81.0762 46.541 L 80.5051 47.1078 L 72.5784 39.2413 L 73.1494 38.6745 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 18.65 6.57)" clipPath="url(#CLIPPATH_71)">
          <clipPath id="CLIPPATH_71">
            <rect
              transform="matrix(-1 0 0 1 -0.07 8.61)"
              id="clip1_498_5593"
              x={-17}
              y={-20.5}
              rx={0}
              ry={0}
              width={34}
              height={41}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-76.85, -42.9)"
            d="M 80.5363 38.6718 L 81.1074 39.2385 L 73.1646 47.121 L 72.5935 46.5542 L 80.5363 38.6718 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 18.67 14.48)" clipPath="url(#CLIPPATH_72)">
          <clipPath id="CLIPPATH_72">
            <rect
              transform="matrix(-1 0 0 1 -0.09 0.7)"
              id="clip1_498_5593"
              x={-17}
              y={-20.5}
              rx={0}
              ry={0}
              width={34}
              height={41}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-76.87, -50.8)"
            d="M 73.1583 46.556 L 81.1494 54.4863 L 80.5783 55.0531 L 72.5872 47.1227 L 73.1583 46.556 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 18.64 14.42)" clipPath="url(#CLIPPATH_73)">
          <clipPath id="CLIPPATH_73">
            <rect
              transform="matrix(-1 0 0 1 -0.06 0.76)"
              id="clip1_498_5593"
              x={-17}
              y={-20.5}
              rx={0}
              ry={0}
              width={34}
              height={41}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-76.84, -50.74)"
            d="M 80.5031 46.5426 L 81.0742 47.1094 L 73.1797 54.9439 L 72.6086 54.3772 L 80.5031 46.5426 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 10.74 4.69)" clipPath="url(#CLIPPATH_74)">
          <clipPath id="CLIPPATH_74">
            <rect
              transform="matrix(-1 0 0 1 7.84 10.49)"
              id="clip1_498_5593"
              x={-17}
              y={-20.5}
              rx={0}
              ry={0}
              width={34}
              height={41}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-68.95, -41.02)"
            d="M 64.8132 43.4185 L 72.8667 43.4185 L 72.8667 42.617 L 67.6513 42.617 L 73.0771 39.2982 L 72.6506 38.6152 L 64.8132 43.4185 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 8.8 13.4)" clipPath="url(#CLIPPATH_75)">
          <clipPath id="CLIPPATH_75">
            <rect
              transform="matrix(-1 0 0 1 9.78 1.78)"
              id="clip1_498_5593"
              x={-17}
              y={-20.5}
              rx={0}
              ry={0}
              width={34}
              height={41}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-67, -49.73)"
            d="M 60.9404 52.9689 L 72.8672 52.9689 L 72.8672 52.1674 L 64.0458 52.1674 L 73.0605 47.1891 L 72.6681 46.4893 L 60.9404 52.9689 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 26.54 4.69)" clipPath="url(#CLIPPATH_76)">
          <clipPath id="CLIPPATH_76">
            <rect
              transform="matrix(-1 0 0 1 -7.96 10.49)"
              id="clip1_498_5593"
              x={-17}
              y={-20.5}
              rx={0}
              ry={0}
              width={34}
              height={41}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-84.74, -41.02)"
            d="M 80.8176 43.4185 L 88.8711 43.4185 L 81.0337 38.6152 L 80.6071 39.2982 L 86.033 42.617 L 80.8176 42.617 L 80.8176 43.4185 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 28.48 13.4)" clipPath="url(#CLIPPATH_77)">
          <clipPath id="CLIPPATH_77">
            <rect
              transform="matrix(-1 0 0 1 -9.9 1.78)"
              id="clip1_498_5593"
              x={-17}
              y={-20.5}
              rx={0}
              ry={0}
              width={34}
              height={41}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-86.69, -49.73)"
            d="M 80.8184 52.9689 L 92.7451 52.9689 L 81.0174 46.4893 L 80.625 47.1891 L 89.6397 52.1674 L 80.8184 52.1674 L 80.8184 52.9689 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 9.71 26.86)" clipPath="url(#CLIPPATH_78)">
          <clipPath id="CLIPPATH_78">
            <rect
              transform="matrix(-1 0 0 1 8.87 -11.68)"
              id="clip1_498_5593"
              x={-17}
              y={-20.5}
              rx={0}
              ry={0}
              width={34}
              height={41}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-67.91, -63.18)"
            d="M 72.5164 54.5646 L 73.2139 54.9688 L 63.3085 71.8044 L 62.6111 71.4002 L 72.5164 54.5646 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 27.57 26.86)" clipPath="url(#CLIPPATH_79)">
          <clipPath id="CLIPPATH_79">
            <rect
              transform="matrix(-1 0 0 1 -8.99 -11.68)"
              id="clip1_498_5593"
              x={-17}
              y={-20.5}
              rx={0}
              ry={0}
              width={34}
              height={41}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-85.77, -63.19)"
            d="M 81.162 54.5667 L 91.0703 71.4006 L 90.3729 71.8049 L 80.4646 54.971 L 81.162 54.5667 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 18.64 18.33)" clipPath="url(#CLIPPATH_80)">
          <clipPath id="CLIPPATH_80">
            <rect
              transform="matrix(-1 0 0 1 -0.06 -3.15)"
              id="clip1_498_5593"
              x={-17}
              y={-20.5}
              rx={0}
              ry={0}
              width={34}
              height={41}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-76.85, -54.66)"
            d="M 72.4686 54.2559 L 81.2217 54.2559 L 81.2217 55.0573 L 72.4686 55.0573 L 72.4686 54.2559 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 18.52 30.18)" clipPath="url(#CLIPPATH_81)">
          <clipPath id="CLIPPATH_81">
            <rect
              transform="matrix(-1 0 0 1 0.06 -15)"
              id="clip1_498_5593"
              x={-17}
              y={-20.5}
              rx={0}
              ry={0}
              width={34}
              height={41}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-76.72, -66.51)"
            d="M 65.712 66.1086 L 87.7227 66.1086 L 87.7227 66.9101 L 65.712 66.9101 L 65.712 66.1086 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 18.57 23.39)" clipPath="url(#CLIPPATH_82)">
          <clipPath id="CLIPPATH_82">
            <rect
              transform="matrix(-1 0 0 1 0.01 -8.21)"
              id="clip1_498_5593"
              x={-17}
              y={-20.5}
              rx={0}
              ry={0}
              width={34}
              height={41}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-76.77, -59.71)"
            d="M 69.8074 59.3135 L 83.7305 59.3135 L 83.7305 60.115 L 69.8074 60.115 L 69.8074 59.3135 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 20.09 20.91)" clipPath="url(#CLIPPATH_83)">
          <clipPath id="CLIPPATH_83">
            <rect
              transform="matrix(-1 0 0 1 -1.51 -5.73)"
              id="clip1_498_5593"
              x={-17}
              y={-20.5}
              rx={0}
              ry={0}
              width={34}
              height={41}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-78.29, -57.24)"
            d="M 73.0289 54.4013 L 83.8955 59.3477 L 83.5588 60.0762 L 72.6922 55.1298 L 73.0289 54.4013 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 17.26 20.83)" clipPath="url(#CLIPPATH_84)">
          <clipPath id="CLIPPATH_84">
            <rect
              transform="matrix(-1 0 0 1 1.32 -5.65)"
              id="clip1_498_5593"
              x={-17}
              y={-20.5}
              rx={0}
              ry={0}
              width={34}
              height={41}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-75.46, -57.16)"
            d="M 80.705 54.4022 L 81.0332 55.1345 L 70.219 59.9082 L 69.8908 59.1759 L 80.705 54.4022 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 20.69 26.7)" clipPath="url(#CLIPPATH_85)">
          <clipPath id="CLIPPATH_85">
            <rect
              transform="matrix(-1 0 0 1 -2.11 -11.52)"
              id="clip1_498_5593"
              x={-17}
              y={-20.5}
              rx={0}
              ry={0}
              width={34}
              height={41}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-78.89, -63.02)"
            d="M 70.2024 59.1663 L 87.8721 66.1338 L 87.5738 66.8786 L 69.9042 59.9111 L 70.2024 59.1663 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 16.64 26.78)" clipPath="url(#CLIPPATH_86)">
          <clipPath id="CLIPPATH_86">
            <rect
              transform="matrix(-1 0 0 1 1.94 -11.6)"
              id="clip1_498_5593"
              x={-17}
              y={-20.5}
              rx={0}
              ry={0}
              width={34}
              height={41}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-74.84, -63.11)"
            d="M 83.5807 59.338 L 83.8711 60.0859 L 66.1024 66.8796 L 65.812 66.1317 L 83.5807 59.338 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 18.72 35.28)" clipPath="url(#CLIPPATH_87)">
          <clipPath id="CLIPPATH_87">
            <rect
              transform="matrix(-1 0 0 1 -0.14 -20.1)"
              id="clip1_498_5593"
              x={-17}
              y={-20.5}
              rx={0}
              ry={0}
              width={34}
              height={41}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-76.92, -71.61)"
            d="M 60.7297 71.2051 L 93.1201 71.2051 L 93.1201 72.0066 L 60.7297 72.0066 L 60.7297 71.2051 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 48.62 17.92)" clipPath="url(#CLIPPATH_88)">
          <clipPath id="CLIPPATH_88">
            <rect
              transform="matrix(-1 0 0 1 -0.04 5.26)"
              id="clip2_498_5593"
              x={-10}
              y={-12.5}
              rx={0}
              ry={0}
              width={20}
              height={25}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-106.82, -54.25)"
            d="M 104.241 61.4961 L 104.713 61.4961 L 104.713 51.918 L 106.817 48.0118 L 108.918 51.918 L 108.918 61.4961 L 109.394 61.4961 L 109.394 51.7907 L 106.817 47.0068 L 104.241 51.7907 L 104.241 61.4961 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 48.61 15.53)" clipPath="url(#CLIPPATH_89)">
          <clipPath id="CLIPPATH_89">
            <rect
              transform="matrix(-1 0 0 1 -0.04 7.65)"
              id="clip2_498_5593"
              x={-10}
              y={-12.5}
              rx={0}
              ry={0}
              width={20}
              height={25}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-106.82, -51.86)"
            d="M 104.476 51.6113 L 109.156 51.6113 L 109.156 52.1 L 104.476 52.1 L 104.476 51.6113 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 48.61 17.93)" clipPath="url(#CLIPPATH_90)">
          <clipPath id="CLIPPATH_90">
            <rect
              transform="matrix(-1 0 0 1 -0.03 5.25)"
              id="clip2_498_5593"
              x={-10}
              y={-12.5}
              rx={0}
              ry={0}
              width={20}
              height={25}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-106.81, -54.25)"
            d="M 104.645 51.6829 L 109.308 56.4795 L 108.972 56.8251 L 104.309 52.0284 L 104.645 51.6829 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 48.62 17.93)" clipPath="url(#CLIPPATH_91)">
          <clipPath id="CLIPPATH_91">
            <rect
              transform="matrix(-1 0 0 1 -0.04 5.25)"
              id="clip2_498_5593"
              x={-10}
              y={-12.5}
              rx={0}
              ry={0}
              width={20}
              height={25}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-106.82, -54.26)"
            d="M 108.99 51.6808 L 109.326 52.0264 L 104.654 56.8327 L 104.318 56.4872 L 108.99 51.6808 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 48.63 22.75)" clipPath="url(#CLIPPATH_92)">
          <clipPath id="CLIPPATH_92">
            <rect
              transform="matrix(-1 0 0 1 -0.05 0.43)"
              id="clip2_498_5593"
              x={-10}
              y={-12.5}
              rx={0}
              ry={0}
              width={20}
              height={25}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-106.83, -59.08)"
            d="M 104.651 56.4877 L 109.352 61.3232 L 109.016 61.6688 L 104.315 56.8333 L 104.651 56.4877 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 48.62 22.71)" clipPath="url(#CLIPPATH_93)">
          <clipPath id="CLIPPATH_93">
            <rect
              transform="matrix(-1 0 0 1 -0.04 0.47)"
              id="clip2_498_5593"
              x={-10}
              y={-12.5}
              rx={0}
              ry={0}
              width={20}
              height={25}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-106.82, -59.04)"
            d="M 108.971 56.4796 L 109.307 56.8252 L 104.663 61.6024 L 104.327 61.2568 L 108.971 56.4796 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 43.97 16.78)" clipPath="url(#CLIPPATH_94)">
          <clipPath id="CLIPPATH_94">
            <rect
              transform="matrix(-1 0 0 1 4.61 6.4)"
              id="clip2_498_5593"
              x={-10}
              y={-12.5}
              rx={0}
              ry={0}
              width={20}
              height={25}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-102.17, -53.11)"
            d="M 99.7414 54.5753 L 104.479 54.5753 L 104.479 54.0866 L 101.411 54.0866 L 104.603 52.0629 L 104.352 51.6465 L 99.7414 54.5753 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 42.83 22.1)" clipPath="url(#CLIPPATH_95)">
          <clipPath id="CLIPPATH_95">
            <rect
              transform="matrix(-1 0 0 1 5.75 1.08)"
              id="clip2_498_5593"
              x={-10}
              y={-12.5}
              rx={0}
              ry={0}
              width={20}
              height={25}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-101.03, -58.42)"
            d="M 97.4633 60.3983 L 104.479 60.3983 L 104.479 59.9095 L 99.29 59.9095 L 104.593 56.874 L 104.362 56.4473 L 97.4633 60.3983 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 53.26 16.78)" clipPath="url(#CLIPPATH_96)">
          <clipPath id="CLIPPATH_96">
            <rect
              transform="matrix(-1 0 0 1 -4.68 6.4)"
              id="clip2_498_5593"
              x={-10}
              y={-12.5}
              rx={0}
              ry={0}
              width={20}
              height={25}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-111.46, -53.11)"
            d="M 109.156 54.5753 L 113.894 54.5753 L 109.283 51.6465 L 109.032 52.0629 L 112.224 54.0866 L 109.156 54.0866 L 109.156 54.5753 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 54.41 22.1)" clipPath="url(#CLIPPATH_97)">
          <clipPath id="CLIPPATH_97">
            <rect
              transform="matrix(-1 0 0 1 -5.83 1.08)"
              id="clip2_498_5593"
              x={-10}
              y={-12.5}
              rx={0}
              ry={0}
              width={20}
              height={25}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-112.61, -58.42)"
            d="M 109.156 60.3983 L 116.172 60.3983 L 109.273 56.4473 L 109.042 56.874 L 114.345 59.9095 L 109.156 59.9095 L 109.156 60.3983 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 43.36 30.3)" clipPath="url(#CLIPPATH_98)">
          <clipPath id="CLIPPATH_98">
            <rect
              transform="matrix(-1 0 0 1 5.22 -7.12)"
              id="clip2_498_5593"
              x={-10}
              y={-12.5}
              rx={0}
              ry={0}
              width={20}
              height={25}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-101.56, -66.63)"
            d="M 104.272 61.3717 L 104.683 61.6182 L 98.8559 71.8838 L 98.4457 71.6374 L 104.272 61.3717 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 53.87 30.3)" clipPath="url(#CLIPPATH_99)">
          <clipPath id="CLIPPATH_99">
            <rect
              transform="matrix(-1 0 0 1 -5.29 -7.12)"
              id="clip2_498_5593"
              x={-10}
              y={-12.5}
              rx={0}
              ry={0}
              width={20}
              height={25}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-112.07, -66.63)"
            d="M 109.358 61.3731 L 115.187 71.6377 L 114.776 71.8842 L 108.948 61.6196 L 109.358 61.3731 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 48.62 25.1)" clipPath="url(#CLIPPATH_100)">
          <clipPath id="CLIPPATH_100">
            <rect
              transform="matrix(-1 0 0 1 -0.04 -1.92)"
              id="clip2_498_5593"
              x={-10}
              y={-12.5}
              rx={0}
              ry={0}
              width={20}
              height={25}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-106.82, -61.43)"
            d="M 104.245 61.1826 L 109.394 61.1826 L 109.394 61.6713 L 104.245 61.6713 L 104.245 61.1826 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 48.54 32.33)"
          clipPath="url(#CLIPPATH_101)"
        >
          <clipPath id="CLIPPATH_101">
            <rect
              transform="matrix(-1 0 0 1 0.04 -9.15)"
              id="clip2_498_5593"
              x={-10}
              y={-12.5}
              rx={0}
              ry={0}
              width={20}
              height={25}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-106.74, -68.65)"
            d="M 100.27 68.4104 L 113.218 68.4104 L 113.218 68.8991 L 100.27 68.8991 L 100.27 68.4104 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 48.57 28.18)"
          clipPath="url(#CLIPPATH_102)"
        >
          <clipPath id="CLIPPATH_102">
            <rect
              transform="matrix(-1 0 0 1 0.01 -5)"
              id="clip2_498_5593"
              x={-10}
              y={-12.5}
              rx={0}
              ry={0}
              width={20}
              height={25}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-106.77, -64.51)"
            d="M 102.679 64.2666 L 110.869 64.2666 L 110.869 64.7553 L 102.679 64.7553 L 102.679 64.2666 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 49.47 26.68)"
          clipPath="url(#CLIPPATH_103)"
        >
          <clipPath id="CLIPPATH_103">
            <rect
              transform="matrix(-1 0 0 1 -0.89 -3.5)"
              id="clip2_498_5593"
              x={-10}
              y={-12.5}
              rx={0}
              ry={0}
              width={20}
              height={25}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-107.67, -63)"
            d="M 104.574 61.272 L 110.966 64.2881 L 110.768 64.7323 L 104.376 61.7162 L 104.574 61.272 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 47.8 26.62)" clipPath="url(#CLIPPATH_104)">
          <clipPath id="CLIPPATH_104">
            <rect
              transform="matrix(-1 0 0 1 0.78 -3.44)"
              id="clip2_498_5593"
              x={-10}
              y={-12.5}
              rx={0}
              ry={0}
              width={20}
              height={25}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-106, -62.95)"
            d="M 109.089 61.2722 L 109.282 61.7188 L 102.921 64.6295 L 102.728 64.183 L 109.089 61.2722 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 49.82 30.2)" clipPath="url(#CLIPPATH_105)">
          <clipPath id="CLIPPATH_105">
            <rect
              transform="matrix(-1 0 0 1 -1.24 -7.02)"
              id="clip2_498_5593"
              x={-10}
              y={-12.5}
              rx={0}
              ry={0}
              width={20}
              height={25}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-108.02, -66.53)"
            d="M 102.912 64.1773 L 113.306 68.4258 L 113.13 68.88 L 102.736 64.6315 L 102.912 64.1773 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 47.44 30.25)"
          clipPath="url(#CLIPPATH_106)"
        >
          <clipPath id="CLIPPATH_106">
            <rect
              transform="matrix(-1 0 0 1 1.14 -7.07)"
              id="clip2_498_5593"
              x={-10}
              y={-12.5}
              rx={0}
              ry={0}
              width={20}
              height={25}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-105.64, -66.58)"
            d="M 110.781 64.2813 L 110.952 64.7373 L 100.5 68.8798 L 100.329 68.4237 L 110.781 64.2813 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 48.66 35.44)"
          clipPath="url(#CLIPPATH_107)"
        >
          <clipPath id="CLIPPATH_107">
            <rect
              transform="matrix(-1 0 0 1 -0.09 -12.26)"
              id="clip2_498_5593"
              x={-10}
              y={-12.5}
              rx={0}
              ry={0}
              width={20}
              height={25}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-106.87, -71.76)"
            d="M 97.3394 71.5186 L 116.393 71.5186 L 116.393 72.0073 L 97.3394 72.0073 L 97.3394 71.5186 Z"
            strokeLinecap="round"
          />
        </g>
      </g>
    </g>
    <g transform="matrix(1 0 0 1 27.04 580.43)">
      <g style={{}} vectorEffect="non-scaling-stroke">
        <g transform="matrix(1 0 0 1 -3.76 8.94)">
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-19.17, -24.4)"
            d="M 17.3711 28.0724 L 17.3711 20.7236 L 20.9638 20.7236 L 20.9638 28.0724 L 17.3711 28.0724 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 0 -4.05)">
          <linearGradient
            id="SVGID_paint0_linear_498_5684_8"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(1 0 0 1 0 0)"
            x1={22.9233}
            y1={2.10645}
            x2={22.9233}
            y2={20.7233}
          >
            <stop
              offset="0%"
              style={{
                stopColor: "rgb(177,219,209)",
                stopOpacity: 1,
              }}
            />
            <stop
              offset="100%"
              style={{
                stopColor: "rgb(34,143,137)",
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <path
            style={{
              stroke: "rgb(10,16,16)",
              strokeWidth: 3,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "url(#SVGID_paint0_linear_498_5684_8)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-22.92, -11.41)"
            d="M 42.8466 2.10645 L 11.4919 2.10645 L 3 20.7233 L 33.7015 20.7233 L 42.8466 2.10645 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 -0.28 -4.21)">
          <path
            style={{
              stroke: "rgb(12,20,20)",
              strokeWidth: 2,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "none",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-22.64, -11.25)"
            d="M 21.548 2.10645 L 12.1242 20.3967 M 32.9214 2.10645 L 24.4744 20.3967 M 7.45117 10.925 L 37.826 10.925"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 -4.59 12.86)">
          <path
            style={{
              stroke: "rgb(0,0,0)",
              strokeWidth: 4,
              strokeDasharray: "none",
              strokeLinecap: "round",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "none",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-18.33, -28.32)"
            d="M 7.45117 28.3193 L 29.2128 28.3193"
            strokeLinecap="round"
          />
        </g>
      </g>
    </g>
    <g transform="matrix(1 0 0 1 70 567.8)">
      <g style={{}} vectorEffect="non-scaling-stroke">
        <g transform="matrix(1 0 0 1 -6.97 16.79)">
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-32.51, -43.35)"
            d="M 29.1787 50.1703 L 29.1787 36.5391 L 35.8429 36.5391 L 35.8429 50.1703 L 29.1787 50.1703 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 0 -7.29)">
          <linearGradient
            id="SVGID_paint0_linear_498_5689_10"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(1 0 0 1 0 0)"
            x1={39.4774}
            y1={2.00684}
            x2={39.4774}
            y2={36.5394}
          >
            <stop
              offset="0%"
              style={{
                stopColor: "rgb(177,219,209)",
                stopOpacity: 1,
              }}
            />
            <stop
              offset="100%"
              style={{
                stopColor: "rgb(34,143,137)",
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <path
            style={{
              stroke: "rgb(10,16,16)",
              strokeWidth: 3,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "url(#SVGID_paint0_linear_498_5689_10)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-39.48, -19.27)"
            d="M 76.4333 2.00684 L 18.2732 2.00684 L 2.52148 36.5394 L 59.4699 36.5394 L 76.4333 2.00684 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 -0.53 -7.6)">
          <path
            style={{
              stroke: "rgb(12,20,20)",
              strokeWidth: 2,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "none",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-38.95, -18.97)"
            d="M 36.9267 2.00684 L 19.4464 35.9336 M 58.0232 2.00684 L 42.3549 35.9336 M 10.7783 18.3644 L 67.1209 18.3644"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 -8.52 24.06)">
          <path
            style={{
              stroke: "rgb(0,0,0)",
              strokeWidth: 4,
              strokeDasharray: "none",
              strokeLinecap: "round",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "none",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-30.96, -50.63)"
            d="M 10.7783 50.6289 L 51.1442 50.6289"
            strokeLinecap="round"
          />
        </g>
      </g>
    </g>
    <g transform="matrix(1 0 0 1 353.01 512.2)">
      <g style={{}} vectorEffect="non-scaling-stroke">
        <g transform="matrix(1 0 0 1 5.16 21.95)" clipPath="url(#CLIPPATH_108)">
          <clipPath id="CLIPPATH_108">
            <rect
              transform="matrix(1 0 0 1 0 -19.94)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(60,66,89)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-40.16, -45.76)"
            d="M 70.0004 43.8972 L 10.3281 43.8972 L 10.3281 47.6233 L 70.0004 47.6233 L 70.0004 43.8972 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -20.6 15.23)"
          clipPath="url(#CLIPPATH_109)"
        >
          <clipPath id="CLIPPATH_109">
            <rect
              transform="matrix(1 0 0 1 25.77 -13.23)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(66,66,66)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-14.4, -39.05)"
            d="M 15.2102 34.0195 L 13.5859 34.0195 L 13.5859 44.0733 L 15.2102 44.0733 L 15.2102 34.0195 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -20.6 12.94)"
          clipPath="url(#CLIPPATH_110)"
        >
          <clipPath id="CLIPPATH_110">
            <rect
              transform="matrix(1 0 0 1 25.77 -10.94)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,0,0)",
              fillRule: "nonzero",
              opacity: 0.2,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-14.4, -36.76)"
            d="M 15.2102 34.0195 L 13.5859 34.0195 L 13.5859 39.4924 L 15.2102 39.4924 L 15.2102 34.0195 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -3.04 16.63)"
          clipPath="url(#CLIPPATH_111)"
        >
          <clipPath id="CLIPPATH_111">
            <rect
              transform="matrix(1 0 0 1 8.21 -14.62)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(120,120,120)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-31.96, -40.44)"
            d="M 48.7006 34.0195 L 15.21 34.0195 L 15.21 46.8702 L 48.7006 46.8702 L 48.7006 34.0195 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -3.27 20.03)"
          clipPath="url(#CLIPPATH_112)"
        >
          <clipPath id="CLIPPATH_112">
            <rect
              transform="matrix(1 0 0 1 8.43 -18.03)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(36,36,36)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-31.73, -43.84)"
            d="M 46.6147 44.1469 L 16.8524 44.1469 C 16.5293 44.1469 16.2617 44.0169 16.2617 43.8496 C 16.2617 43.6823 16.5293 43.543 16.8524 43.543 L 46.6147 43.543 C 46.9377 43.543 47.2053 43.6731 47.2053 43.8403 C 47.2053 44.0076 46.9377 44.1469 46.6147 44.1469 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -3.27 17.41)"
          clipPath="url(#CLIPPATH_113)"
        >
          <clipPath id="CLIPPATH_113">
            <rect
              transform="matrix(1 0 0 1 8.43 -15.41)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(36,36,36)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-31.73, -41.23)"
            d="M 46.6147 41.5278 L 16.8524 41.5278 C 16.5293 41.5278 16.2617 41.3977 16.2617 41.2305 C 16.2617 41.0632 16.5293 40.9238 16.8524 40.9238 L 46.6147 40.9238 C 46.9377 40.9238 47.2053 41.0539 47.2053 41.2212 C 47.2053 41.3884 46.9377 41.5278 46.6147 41.5278 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -3.27 14.79)"
          clipPath="url(#CLIPPATH_114)"
        >
          <clipPath id="CLIPPATH_114">
            <rect
              transform="matrix(1 0 0 1 8.43 -12.79)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(36,36,36)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-31.73, -38.6)"
            d="M 46.6147 38.9069 L 16.8524 38.9069 C 16.5293 38.9069 16.2617 38.7769 16.2617 38.6096 C 16.2617 38.4424 16.5293 38.303 16.8524 38.303 L 46.6147 38.303 C 46.9377 38.303 47.2053 38.4331 47.2053 38.6003 C 47.2053 38.7676 46.9377 38.9069 46.6147 38.9069 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -3.27 12.17)"
          clipPath="url(#CLIPPATH_115)"
        >
          <clipPath id="CLIPPATH_115">
            <rect
              transform="matrix(1 0 0 1 8.43 -10.17)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(36,36,36)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-31.73, -35.99)"
            d="M 46.6147 36.2873 L 16.8524 36.2873 C 16.5293 36.2873 16.2617 36.1572 16.2617 35.99 C 16.2617 35.8227 16.5293 35.6833 16.8524 35.6833 L 46.6147 35.6833 C 46.9377 35.6833 47.2053 35.8134 47.2053 35.9807 C 47.2053 36.1479 46.9377 36.2873 46.6147 36.2873 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -3.04 13.69)"
          clipPath="url(#CLIPPATH_116)"
        >
          <clipPath id="CLIPPATH_116">
            <rect
              transform="matrix(1 0 0 1 8.21 -11.68)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,0,0)",
              fillRule: "nonzero",
              opacity: 0.2,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-31.96, -37.5)"
            d="M 48.7006 34.0195 L 15.21 34.0195 L 15.21 40.9791 L 48.7006 40.9791 L 48.7006 34.0195 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 22.42 15.76)"
          clipPath="url(#CLIPPATH_117)"
        >
          <clipPath id="CLIPPATH_117">
            <rect
              transform="matrix(1 0 0 1 -17.26 -13.75)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(120,120,120)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-57.42, -39.57)"
            d="M 66.1433 34.0195 L 48.7012 34.0195 L 48.7012 45.1233 L 66.1433 45.1233 L 66.1433 34.0195 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 16.06 15.76)"
          clipPath="url(#CLIPPATH_118)"
        >
          <clipPath id="CLIPPATH_118">
            <rect
              transform="matrix(1 0 0 1 -10.89 -13.75)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(51,51,51)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-51.06, -39.57)"
            d="M 53.417 34.0195 L 48.7012 34.0195 L 48.7012 45.1233 L 53.417 45.1233 L 53.417 34.0195 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 22.42 13.15)"
          clipPath="url(#CLIPPATH_119)"
        >
          <clipPath id="CLIPPATH_119">
            <rect
              transform="matrix(1 0 0 1 -17.26 -11.15)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,0,0)",
              fillRule: "nonzero",
              opacity: 0.2,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-57.42, -36.97)"
            d="M 66.1433 34.0195 L 48.7012 34.0195 L 48.7012 39.9106 L 66.1433 39.9106 L 66.1433 34.0195 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 4.75 3.85)" clipPath="url(#CLIPPATH_120)">
          <clipPath id="CLIPPATH_120">
            <rect
              transform="matrix(1 0 0 1 0.41 -1.84)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,0,0)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-39.75, -27.66)"
            d="M 67.3053 21.3088 L 12.2012 21.3088 L 12.2012 34.0201 L 67.3053 34.0201 L 67.3053 21.3088 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 4.76 -11.48)"
          clipPath="url(#CLIPPATH_121)"
        >
          <clipPath id="CLIPPATH_121">
            <rect
              transform="matrix(1 0 0 1 0.41 13.49)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(255,206,71)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-39.76, -12.33)"
            d="M 64.7679 4.0166 L 14.7488 4.0166 C 12.9861 4.0166 11.5557 5.45684 11.5557 7.23158 L 11.5557 20.649 L 67.961 20.649 L 67.961 7.23158 C 67.961 5.45684 66.5306 4.0166 64.7679 4.0166 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 10.16 -12.78)"
          clipPath="url(#CLIPPATH_122)"
        >
          <clipPath id="CLIPPATH_122">
            <rect
              transform="matrix(1 0 0 1 -5 14.79)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(255,61,61)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-45.16, -11.03)"
            d="M 60.8089 13.6434 L 29.5146 13.6434 L 29.5146 8.41211 L 54.7918 8.41211 L 60.8089 13.6434 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -11.49 -11.26)"
          clipPath="url(#CLIPPATH_123)"
        >
          <clipPath id="CLIPPATH_123">
            <rect
              transform="matrix(1 0 0 1 16.66 13.26)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(255,125,43)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-23.51, -12.56)"
            d="M 28.2227 8.41211 L 18.791 8.41211 L 18.791 16.7004 L 28.2227 16.7004 L 28.2227 8.41211 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 10.16 -8.09)"
          clipPath="url(#CLIPPATH_124)"
        >
          <clipPath id="CLIPPATH_124">
            <rect
              transform="matrix(1 0 0 1 -5 10.1)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(255,255,255)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-45.16, -15.72)"
            d="M 60.8089 14.7393 L 29.5146 14.7393 L 29.5146 16.6998 L 60.8089 16.6998 L 60.8089 14.7393 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 4.76 -7.12)" clipPath="url(#CLIPPATH_125)">
          <clipPath id="CLIPPATH_125">
            <rect
              transform="matrix(1 0 0 1 0.41 9.13)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,0,0)",
              fillRule: "nonzero",
              opacity: 0.2,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-39.76, -16.69)"
            d="M 67.961 12.7412 L 11.5557 12.7412 L 11.5557 20.6486 L 67.961 20.6486 L 67.961 12.7412 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 4.76 -3.16)" clipPath="url(#CLIPPATH_126)">
          <clipPath id="CLIPPATH_126">
            <rect
              transform="matrix(1 0 0 1 0.41 5.17)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(56,56,56)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-39.76, -20.65)"
            d="M 67.961 19.999 L 11.5557 19.999 L 11.5557 21.3092 L 67.961 21.3092 L 67.961 19.999 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 4.68 3.48)" clipPath="url(#CLIPPATH_127)">
          <clipPath id="CLIPPATH_127">
            <rect
              transform="matrix(1 0 0 1 0.48 -1.47)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(55,100,102)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-39.68, -27.29)"
            d="M 66.5865 21.708 L 12.7744 21.708 L 12.7744 32.8675 L 66.5865 32.8675 L 66.5865 21.708 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -15.83 3.62)"
          clipPath="url(#CLIPPATH_128)"
        >
          <clipPath id="CLIPPATH_128">
            <rect
              transform="matrix(1 0 0 1 20.99 -1.61)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(47,151,163)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-19.17, -27.43)"
            d="M 21.6061 23.334 L 16.7334 23.334 L 16.7334 31.5201 L 21.6061 31.5201 L 21.6061 23.334 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -16.56 3.58)"
          clipPath="url(#CLIPPATH_129)"
        >
          <clipPath id="CLIPPATH_129">
            <rect
              transform="matrix(1 0 0 1 21.72 -1.57)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(15,50,54)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-18.44, -27.39)"
            d="M 19.6209 24.6533 L 17.2676 24.6533 L 17.2676 30.1355 L 19.6209 30.1355 L 19.6209 24.6533 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -16.56 1.49)"
          clipPath="url(#CLIPPATH_130)"
        >
          <clipPath id="CLIPPATH_130">
            <rect
              transform="matrix(1 0 0 1 21.72 0.52)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(255,53,53)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-18.44, -25.3)"
            d="M 19.6209 24.9326 L 17.2676 24.9326 L 17.2676 25.6667 L 19.6209 25.6667 L 19.6209 24.9326 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 -16.56 2.3)" clipPath="url(#CLIPPATH_131)">
          <clipPath id="CLIPPATH_131">
            <rect
              transform="matrix(1 0 0 1 21.72 -0.3)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(107,12,12)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-18.44, -26.12)"
            d="M 19.6209 25.666 L 17.2676 25.666 L 17.2676 26.5673 L 19.6209 26.5673 L 19.6209 25.666 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 -9.5 3.62)" clipPath="url(#CLIPPATH_132)">
          <clipPath id="CLIPPATH_132">
            <rect
              transform="matrix(1 0 0 1 14.66 -1.61)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(47,151,163)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-25.5, -27.43)"
            d="M 27.9362 23.334 L 23.0635 23.334 L 23.0635 31.5201 L 27.9362 31.5201 L 27.9362 23.334 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -10.22 3.58)"
          clipPath="url(#CLIPPATH_133)"
        >
          <clipPath id="CLIPPATH_133">
            <rect
              transform="matrix(1 0 0 1 15.38 -1.57)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(15,50,54)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-24.78, -27.39)"
            d="M 25.9607 24.6533 L 23.6074 24.6533 L 23.6074 30.1355 L 25.9607 30.1355 L 25.9607 24.6533 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 -10.22 1.49)"
          clipPath="url(#CLIPPATH_134)"
        >
          <clipPath id="CLIPPATH_134">
            <rect
              transform="matrix(1 0 0 1 15.38 0.52)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(255,53,53)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-24.78, -25.3)"
            d="M 25.9607 24.9326 L 23.6074 24.9326 L 23.6074 25.6667 L 25.9607 25.6667 L 25.9607 24.9326 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 -10.22 2.3)" clipPath="url(#CLIPPATH_135)">
          <clipPath id="CLIPPATH_135">
            <rect
              transform="matrix(1 0 0 1 15.38 -0.3)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(107,12,12)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-24.78, -26.12)"
            d="M 25.9607 25.666 L 23.6074 25.666 L 23.6074 26.5673 L 25.9607 26.5673 L 25.9607 25.666 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 5.95 3.62)" clipPath="url(#CLIPPATH_136)">
          <clipPath id="CLIPPATH_136">
            <rect
              transform="matrix(1 0 0 1 -0.79 -1.61)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(245,245,245)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-40.95, -27.43)"
            d="M 49.1167 23.334 L 32.7913 23.334 C 32.256 23.334 31.8223 23.7707 31.8223 24.3096 L 31.8223 31.5201 L 50.0857 31.5201 L 50.0857 24.3096 C 50.0857 23.7707 49.652 23.334 49.1167 23.334 Z M 49.6058 31.0276 L 32.256 31.0276 L 32.256 24.9322 L 49.6058 24.9322 L 49.6058 31.0276 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 23.61 4.27)" clipPath="url(#CLIPPATH_137)">
          <clipPath id="CLIPPATH_137">
            <rect
              transform="matrix(1 0 0 1 -18.44 -2.26)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(140,140,140)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-58.61, -28.08)"
            d="M 64.4824 24.6543 L 52.7344 24.6543 L 52.7344 31.5117 L 64.4824 31.5117 L 64.4824 24.6543 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 4 2.52)" clipPath="url(#CLIPPATH_138)">
          <clipPath id="CLIPPATH_138">
            <rect
              transform="matrix(1 0 0 1 1.17 -0.51)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(26,48,48)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-39, -26.33)"
            d="M 45.2035 25.7783 L 32.791 25.7783 L 32.791 26.8841 L 45.2035 26.8841 L 45.2035 25.7783 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 5.36 4.17)" clipPath="url(#CLIPPATH_139)">
          <clipPath id="CLIPPATH_139">
            <rect
              transform="matrix(1 0 0 1 -0.2 -2.17)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(26,48,48)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-40.36, -27.99)"
            d="M 47.9352 27.4326 L 32.791 27.4326 L 32.791 28.5383 L 47.9352 28.5383 L 47.9352 27.4326 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 5.36 5.76)" clipPath="url(#CLIPPATH_140)">
          <clipPath id="CLIPPATH_140">
            <rect
              transform="matrix(1 0 0 1 -0.2 -3.75)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(26,48,48)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-40.36, -29.57)"
            d="M 47.9352 29.0215 L 32.791 29.0215 L 32.791 30.1272 L 47.9352 30.1272 L 47.9352 29.0215 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 4.68 6.16)" clipPath="url(#CLIPPATH_141)">
          <clipPath id="CLIPPATH_141">
            <rect
              transform="matrix(1 0 0 1 0.48 -4.15)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,0,0)",
              fillRule: "nonzero",
              opacity: 0.2,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-39.68, -29.97)"
            d="M 66.5865 27.0684 L 12.7744 27.0684 L 12.7744 32.8665 L 66.5865 32.8665 L 66.5865 27.0684 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 4.78 -1.44)" clipPath="url(#CLIPPATH_142)">
          <clipPath id="CLIPPATH_142">
            <rect
              transform="matrix(1 0 0 1 0.39 3.44)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(255,255,255)",
              fillRule: "nonzero",
              opacity: 0.2,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-39.78, -22.38)"
            d="M 39.7777 22.6552 C 54.2425 22.6552 65.9686 22.5304 65.9686 22.3764 C 65.9686 22.2225 54.2425 22.0977 39.7777 22.0977 C 25.3129 22.0977 13.5869 22.2225 13.5869 22.3764 C 13.5869 22.5304 25.3129 22.6552 39.7777 22.6552 Z"
            strokeLinecap="round"
          />
        </g>
        <g
          transform="matrix(1 0 0 1 5.16 -17.72)"
          clipPath="url(#CLIPPATH_143)"
        >
          <clipPath id="CLIPPATH_143">
            <rect
              transform="matrix(1 0 0 1 0.01 19.73)"
              id="clip0_498_5454"
              x={-29.83615}
              y={-21.80335}
              rx={0}
              ry={0}
              width={59.6723}
              height={43.6067}
            />
          </clipPath>
          <path
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(255,255,255)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-40.16, -6.09)"
            d="M 65.0912 6.08776 C 65.0912 6.38509 53.9246 6.62668 40.1555 6.62668 C 26.3864 6.62668 15.2197 6.38509 15.2197 6.08776 C 15.2197 5.79042 26.3864 5.54883 40.1555 5.54883 C 53.9246 5.54883 65.0912 5.79042 65.0912 6.08776 Z"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 -24.96 -13.77)">
          <circle
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(255,255,255)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            cx={0}
            cy={0}
            r={10.041}
          />
        </g>
        <g transform="matrix(1 0 0 1 -24.67 -13.63)">
          <path
            style={{
              stroke: "rgb(255,206,71)",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(244,183,37)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-10.33, -10.19)"
            d="M 8.31928 4.59082 L 14.057 4.59082 L 11.475 8.03345 L 14.9177 8.03345 L 5.7373 15.7794 L 9.46682 9.75477 L 6.59796 10.9023 L 8.31928 4.59082 Z"
            strokeLinecap="round"
          />
        </g>
      </g>
    </g>
    <g transform="matrix(1 0 0 1 770.27 494.84)">
        <svg viewBox="263.9016 133.0967 54.8852 55.5463" width="54.8852" height="55.5463" xmlns="http://www.w3.org/2000/svg">
          <path d="M 271.444 133.101 C 271.528 133.101 271.611 133.1 271.697 133.098 C 271.972 133.096 272.246 133.097 272.52 133.1 C 272.712 133.099 272.904 133.098 273.096 133.098 C 273.497 133.097 273.898 133.098 274.299 133.101 C 274.813 133.104 275.326 133.102 275.84 133.099 C 276.235 133.097 276.631 133.097 277.027 133.099 C 277.216 133.099 277.405 133.099 277.594 133.097 C 277.859 133.096 278.124 133.098 278.389 133.101 C 278.539 133.102 278.69 133.102 278.844 133.103 C 279.331 133.194 279.562 133.365 279.936 133.782 C 280.392 134.685 280.392 134.685 280.392 137.995 C 285.813 137.995 291.235 137.995 296.82 137.995 C 296.82 136.902 296.82 135.81 296.82 134.685 C 297.382 133.572 297.382 133.572 297.961 133.179 C 298.368 133.103 298.368 133.103 298.824 133.101 C 298.907 133.101 298.991 133.1 299.077 133.098 C 299.352 133.096 299.626 133.097 299.901 133.1 C 300.092 133.099 300.284 133.098 300.476 133.098 C 300.877 133.097 301.278 133.098 301.679 133.101 C 302.193 133.104 302.706 133.102 303.219 133.099 C 303.615 133.097 304.011 133.097 304.406 133.099 C 304.595 133.099 304.785 133.099 304.974 133.097 C 305.239 133.096 305.504 133.098 305.769 133.101 C 305.919 133.102 306.069 133.102 306.225 133.103 C 306.83 133.217 307.176 133.583 307.585 134.164 C 307.854 134.912 307.821 135.58 307.8 136.396 C 307.799 136.55 307.797 136.704 307.794 136.862 C 307.789 137.24 307.782 137.618 307.772 137.995 C 307.894 137.994 308.015 137.993 308.14 137.991 C 309.284 137.979 310.429 137.97 311.574 137.964 C 312.163 137.961 312.751 137.957 313.34 137.949 C 313.908 137.943 314.476 137.94 315.044 137.938 C 315.261 137.937 315.477 137.935 315.694 137.931 C 315.998 137.927 316.301 137.926 316.605 137.927 C 316.694 137.925 316.784 137.922 316.875 137.92 C 317.466 137.926 317.806 138.07 318.268 138.597 C 318.703 139.278 318.782 139.756 318.783 140.638 C 318.784 140.803 318.784 140.803 318.786 140.972 C 318.788 141.335 318.786 141.696 318.785 142.058 C 318.785 142.311 318.785 142.564 318.786 142.817 C 318.786 143.346 318.786 143.876 318.783 144.405 C 318.781 145.082 318.782 145.759 318.785 146.436 C 318.787 146.958 318.786 147.481 318.785 148.003 C 318.785 148.252 318.785 148.502 318.786 148.751 C 318.788 149.101 318.786 149.45 318.783 149.799 C 318.783 149.998 318.782 150.196 318.782 150.401 C 318.694 151.222 318.417 151.678 317.94 152.198 C 317.583 152.442 317.583 152.442 316.899 152.442 C 316.899 162.772 316.899 173.101 316.899 183.744 C 317.125 183.744 317.351 183.744 317.583 183.744 C 318.127 184.118 318.465 184.513 318.724 185.249 C 318.81 186.092 318.812 186.804 318.539 187.582 C 318.12 188.164 317.777 188.525 317.163 188.635 C 317.002 188.638 316.842 188.638 316.681 188.636 C 316.592 188.637 316.503 188.637 316.411 188.638 C 316.112 188.641 315.813 188.638 315.513 188.637 C 315.297 188.637 315.08 188.638 314.864 188.639 C 314.268 188.642 313.673 188.641 313.077 188.639 C 312.435 188.637 311.793 188.639 311.151 188.641 C 309.893 188.644 308.635 188.643 307.378 188.641 C 306.355 188.64 305.333 188.64 304.311 188.641 C 304.165 188.641 304.02 188.641 303.87 188.641 C 303.575 188.641 303.28 188.641 302.985 188.641 C 300.294 188.643 297.603 188.641 294.912 188.638 C 292.454 188.635 289.997 188.636 287.54 188.638 C 284.78 188.641 282.02 188.643 279.26 188.641 C 278.966 188.641 278.672 188.641 278.378 188.641 C 278.233 188.641 278.088 188.64 277.939 188.64 C 276.918 188.64 275.896 188.641 274.875 188.642 C 273.632 188.644 272.387 188.643 271.143 188.64 C 270.508 188.638 269.873 188.638 269.238 188.64 C 268.657 188.641 268.076 188.641 267.495 188.637 C 267.284 188.637 267.074 188.637 266.864 188.638 C 266.578 188.64 266.292 188.638 266.007 188.636 C 265.925 188.637 265.843 188.638 265.758 188.64 C 265.185 188.629 264.864 188.427 264.42 187.958 C 264.007 187.383 263.929 186.922 263.907 186.152 C 263.929 185.382 264.007 184.921 264.42 184.346 C 264.942 183.778 265.077 183.744 265.79 183.744 C 265.79 173.415 265.79 163.085 265.79 152.442 C 265.564 152.442 265.338 152.442 265.105 152.442 C 264.555 152.065 264.264 151.648 263.965 150.937 C 263.906 150.401 263.906 150.401 263.906 149.799 C 263.904 149.689 263.904 149.579 263.903 149.465 C 263.901 149.103 263.902 148.741 263.904 148.379 C 263.904 148.126 263.903 147.873 263.902 147.62 C 263.902 147.091 263.902 146.562 263.905 146.032 C 263.907 145.355 263.906 144.678 263.903 144.001 C 263.902 143.479 263.902 142.957 263.903 142.435 C 263.904 142.185 263.903 141.935 263.902 141.686 C 263.901 141.337 263.902 140.988 263.906 140.638 C 263.906 140.44 263.906 140.241 263.906 140.037 C 263.993 139.228 264.269 138.772 264.728 138.244 C 265.214 137.924 265.585 137.918 266.12 137.936 C 266.215 137.937 266.311 137.938 266.409 137.939 C 266.711 137.942 267.013 137.95 267.316 137.957 C 267.521 137.961 267.727 137.963 267.933 137.966 C 268.435 137.973 268.938 137.983 269.44 137.995 C 269.438 137.9 269.435 137.804 269.433 137.706 C 269.424 137.269 269.418 136.833 269.412 136.396 C 269.408 136.246 269.404 136.095 269.4 135.941 C 269.391 135.044 269.412 134.469 269.897 133.782 C 270.425 133.228 270.773 133.104 271.444 133.101 Z" fill="#A5C2DB" />
          <path d="M 271.444 133.101 C 271.528 133.101 271.611 133.1 271.697 133.098 C 271.972 133.096 272.246 133.097 272.52 133.1 C 272.712 133.099 272.904 133.098 273.096 133.098 C 273.497 133.097 273.898 133.098 274.299 133.101 C 274.813 133.104 275.326 133.102 275.84 133.099 C 276.235 133.097 276.631 133.097 277.027 133.099 C 277.216 133.099 277.405 133.099 277.594 133.097 C 277.859 133.096 278.124 133.098 278.389 133.101 C 278.539 133.102 278.69 133.102 278.844 133.103 C 279.45 133.217 279.796 133.583 280.205 134.164 C 280.474 134.912 280.442 135.58 280.421 136.396 C 280.419 136.55 280.417 136.704 280.415 136.862 C 280.409 137.24 280.401 137.618 280.392 137.995 C 280.51 137.992 280.628 137.989 280.75 137.986 C 281.189 137.975 281.628 137.968 282.067 137.962 C 282.257 137.959 282.446 137.955 282.636 137.949 C 282.909 137.942 283.183 137.939 283.456 137.936 C 283.583 137.932 283.583 137.932 283.712 137.927 C 284.095 137.927 284.378 137.991 284.728 138.196 C 285.255 139.126 284.933 140.816 284.852 141.927 C 284.842 142.085 284.831 142.243 284.819 142.406 C 284.783 142.925 284.746 143.443 284.71 143.961 C 284.684 144.325 284.659 144.689 284.634 145.053 C 284.568 146.007 284.501 146.962 284.433 147.917 C 284.326 149.444 284.219 150.97 284.113 152.496 C 284.076 153.026 284.039 153.556 284.001 154.086 C 283.846 156.297 283.846 156.297 283.727 158.512 C 283.701 158.905 283.652 159.28 283.586 159.666 C 283.664 159.664 283.741 159.663 283.821 159.662 C 284.626 159.648 285.431 159.639 286.236 159.633 C 286.537 159.63 286.837 159.626 287.137 159.62 C 287.569 159.613 288.001 159.61 288.433 159.607 C 288.567 159.604 288.701 159.601 288.84 159.598 C 289.37 159.597 289.755 159.598 290.236 159.905 C 290.511 160.414 290.493 160.706 290.432 161.321 C 290.335 161.698 290.235 162.034 290.108 162.392 C 290.074 162.494 290.04 162.596 290.003 162.701 C 289.888 163.038 289.772 163.374 289.655 163.71 C 289.572 163.95 289.49 164.19 289.408 164.431 C 288.699 166.496 287.972 168.551 287.246 170.606 C 286.585 172.479 285.941 174.36 285.313 176.251 C 284.777 177.859 284.224 179.456 283.67 181.053 C 283.583 181.3 283.498 181.547 283.412 181.794 C 283.204 182.394 282.996 182.994 282.788 183.594 C 282.861 183.594 282.935 183.594 283.01 183.594 C 287.357 183.6 291.704 183.608 296.051 183.62 C 296.573 183.622 297.095 183.624 297.617 183.625 C 297.773 183.625 297.773 183.625 297.932 183.626 C 299.614 183.631 301.297 183.633 302.979 183.635 C 304.706 183.637 306.432 183.641 308.158 183.647 C 309.223 183.651 310.288 183.653 311.354 183.653 C 312.084 183.652 312.815 183.655 313.545 183.659 C 313.966 183.661 314.388 183.662 314.809 183.661 C 315.266 183.66 315.723 183.663 316.18 183.666 C 316.38 183.664 316.38 183.664 316.584 183.663 C 317.296 183.672 317.729 183.712 318.268 184.346 C 318.682 184.921 318.759 185.382 318.781 186.152 C 318.759 186.922 318.682 187.383 318.268 187.958 C 317.742 188.513 317.339 188.647 316.681 188.636 C 316.592 188.637 316.503 188.637 316.411 188.638 C 316.112 188.641 315.813 188.638 315.513 188.637 C 315.297 188.637 315.08 188.638 314.864 188.639 C 314.268 188.642 313.673 188.641 313.077 188.639 C 312.435 188.637 311.793 188.639 311.151 188.641 C 309.893 188.644 308.635 188.643 307.378 188.641 C 306.355 188.64 305.333 188.64 304.311 188.641 C 304.165 188.641 304.02 188.641 303.87 188.641 C 303.575 188.641 303.28 188.641 302.985 188.641 C 300.294 188.643 297.603 188.641 294.912 188.638 C 292.454 188.635 289.997 188.636 287.54 188.638 C 284.78 188.641 282.02 188.643 279.26 188.641 C 278.966 188.641 278.672 188.641 278.378 188.641 C 278.233 188.641 278.088 188.64 277.939 188.64 C 276.918 188.64 275.896 188.641 274.875 188.642 C 273.632 188.644 272.387 188.643 271.143 188.64 C 270.508 188.638 269.873 188.638 269.238 188.64 C 268.657 188.641 268.076 188.641 267.495 188.637 C 267.284 188.637 267.074 188.637 266.864 188.638 C 266.578 188.64 266.292 188.638 266.007 188.636 C 265.925 188.637 265.843 188.638 265.758 188.64 C 265.185 188.629 264.864 188.427 264.42 187.958 C 264.007 187.383 263.929 186.922 263.907 186.152 C 263.929 185.382 264.007 184.921 264.42 184.346 C 264.942 183.778 265.077 183.744 265.79 183.744 C 265.79 173.415 265.79 163.085 265.79 152.442 C 265.564 152.442 265.338 152.442 265.105 152.442 C 264.555 152.065 264.264 151.648 263.965 150.937 C 263.906 150.401 263.906 150.401 263.906 149.799 C 263.904 149.689 263.904 149.579 263.903 149.465 C 263.901 149.103 263.902 148.741 263.904 148.379 C 263.904 148.126 263.903 147.873 263.902 147.62 C 263.902 147.091 263.902 146.562 263.905 146.032 C 263.907 145.355 263.906 144.678 263.903 144.001 C 263.902 143.479 263.902 142.957 263.903 142.435 C 263.904 142.185 263.903 141.935 263.902 141.686 C 263.901 141.337 263.902 140.988 263.906 140.638 C 263.906 140.44 263.906 140.241 263.906 140.037 C 263.993 139.228 264.269 138.772 264.728 138.244 C 265.214 137.924 265.585 137.918 266.12 137.936 C 266.215 137.937 266.311 137.938 266.409 137.939 C 266.711 137.942 267.013 137.95 267.316 137.957 C 267.521 137.961 267.727 137.963 267.933 137.966 C 268.435 137.973 268.938 137.983 269.44 137.995 C 269.438 137.9 269.435 137.804 269.433 137.706 C 269.424 137.269 269.418 136.833 269.412 136.396 C 269.408 136.246 269.404 136.095 269.4 135.941 C 269.391 135.044 269.412 134.469 269.897 133.782 C 270.425 133.228 270.773 133.104 271.444 133.101 Z" fill="#F99F19" />
          <path d="M 266.555 137.927 C 266.774 137.927 266.774 137.927 266.997 137.927 C 267.395 137.926 267.794 137.93 268.192 137.934 C 268.61 137.938 269.026 137.938 269.444 137.939 C 270.233 137.941 271.022 137.946 271.811 137.952 C 272.709 137.958 273.608 137.962 274.506 137.965 C 276.355 137.971 278.202 137.982 280.05 137.995 C 279.979 138.11 279.907 138.225 279.833 138.343 C 279.571 138.785 279.412 139.21 279.239 139.723 C 279.206 139.817 279.175 139.912 279.141 140.009 C 279.034 140.322 278.929 140.635 278.823 140.949 C 278.748 141.171 278.672 141.393 278.596 141.616 C 278.438 142.081 278.28 142.547 278.122 143.012 C 277.781 144.011 277.436 145.007 277.09 146.002 C 276.938 146.442 276.785 146.881 276.633 147.32 C 276.403 147.985 276.172 148.649 275.942 149.313 C 275.674 150.087 275.405 150.86 275.137 151.633 C 275.099 151.743 275.062 151.852 275.023 151.964 C 274.437 153.653 273.854 155.343 273.272 157.034 C 272.855 158.247 272.436 159.459 272.016 160.67 C 271.974 160.791 271.932 160.912 271.888 161.036 C 271.685 161.623 271.481 162.209 271.277 162.796 C 271.204 163.007 271.13 163.219 271.057 163.43 C 271.024 163.526 270.99 163.622 270.955 163.72 C 270.525 164.879 270.525 164.879 270.467 166.137 C 270.701 166.533 270.839 166.717 271.216 166.817 C 271.382 166.819 271.382 166.819 271.551 166.821 C 271.677 166.824 271.802 166.827 271.932 166.83 C 272.134 166.83 272.134 166.83 272.341 166.83 C 272.479 166.833 272.618 166.836 272.761 166.838 C 273.203 166.846 273.647 166.849 274.089 166.852 C 274.389 166.856 274.69 166.861 274.99 166.865 C 275.726 166.876 276.462 166.884 277.198 166.89 C 277.207 167.859 277.173 168.806 277.106 169.772 C 277.091 169.991 277.091 169.991 277.076 170.215 C 277.044 170.694 277.01 171.173 276.977 171.652 C 276.954 171.987 276.932 172.321 276.909 172.655 C 276.862 173.354 276.814 174.052 276.765 174.751 C 276.704 175.647 276.643 176.543 276.582 177.439 C 276.535 178.129 276.488 178.818 276.441 179.508 C 276.418 179.838 276.396 180.169 276.373 180.5 C 276.342 180.96 276.311 181.421 276.279 181.882 C 276.269 182.019 276.26 182.156 276.25 182.297 C 276.242 182.422 276.233 182.547 276.224 182.677 C 276.217 182.785 276.209 182.894 276.202 183.006 C 276.171 183.293 276.171 183.293 276.057 183.745 C 272.669 183.745 269.28 183.745 265.79 183.745 C 265.79 173.415 265.79 163.085 265.79 152.442 C 265.564 152.442 265.338 152.442 265.105 152.442 C 264.555 152.065 264.264 151.648 263.965 150.938 C 263.906 150.401 263.906 150.401 263.906 149.799 C 263.904 149.689 263.904 149.579 263.903 149.465 C 263.901 149.103 263.902 148.741 263.904 148.379 C 263.904 148.126 263.903 147.873 263.902 147.62 C 263.902 147.091 263.902 146.562 263.905 146.032 C 263.907 145.355 263.906 144.678 263.903 144.001 C 263.902 143.479 263.902 142.957 263.903 142.435 C 263.904 142.185 263.903 141.936 263.902 141.686 C 263.901 141.337 263.902 140.988 263.906 140.638 C 263.906 140.44 263.906 140.241 263.906 140.037 C 263.994 139.224 264.258 138.801 264.701 138.244 C 265.313 137.868 265.888 137.917 266.555 137.927 Z" fill="#D7E5EF" />
          <path d="M 283.929 154.85 C 288.786 154.85 293.642 154.85 298.645 154.85 C 298.645 164.385 298.645 173.92 298.645 183.745 C 293.375 183.745 288.104 183.745 282.674 183.745 C 283.314 181.717 283.314 181.717 283.635 180.8 C 283.707 180.594 283.779 180.389 283.85 180.183 C 283.888 180.077 283.924 179.971 283.963 179.862 C 284.641 177.921 285.307 175.974 285.961 174.019 C 286.584 172.158 287.223 170.309 287.873 168.465 C 288.271 167.338 288.667 166.211 289.063 165.084 C 289.099 164.979 289.136 164.874 289.174 164.766 C 289.394 164.139 289.611 163.512 289.825 162.883 C 289.877 162.735 289.928 162.589 289.982 162.437 C 290.23 161.7 290.424 161.091 290.317 160.268 C 289.971 159.818 289.71 159.758 289.233 159.751 C 289.108 159.748 288.982 159.745 288.853 159.742 C 288.717 159.741 288.583 159.74 288.444 159.739 C 288.236 159.735 288.236 159.735 288.024 159.731 C 287.581 159.723 287.138 159.718 286.696 159.713 C 286.395 159.708 286.095 159.703 285.795 159.697 C 285.058 159.684 284.322 159.674 283.586 159.666 C 283.617 159.028 283.647 158.391 283.678 157.754 C 283.688 157.536 283.698 157.32 283.709 157.103 C 283.723 156.791 283.738 156.48 283.753 156.168 C 283.762 155.981 283.771 155.793 283.781 155.6 C 283.815 155.151 283.815 155.151 283.929 154.85 Z" fill="#D7E5EF" />
          <path d="M 299.086 137.973 C 299.204 137.972 299.204 137.972 299.323 137.971 C 299.587 137.97 299.851 137.969 300.114 137.969 C 300.303 137.968 300.492 137.967 300.68 137.965 C 301.301 137.962 301.921 137.961 302.541 137.959 C 302.755 137.959 302.969 137.958 303.182 137.957 C 304.185 137.955 305.188 137.953 306.191 137.951 C 307.349 137.95 308.507 137.946 309.665 137.94 C 310.56 137.935 311.455 137.933 312.351 137.933 C 312.885 137.932 313.42 137.931 313.954 137.927 C 314.457 137.924 314.96 137.923 315.463 137.925 C 315.647 137.925 315.831 137.924 316.016 137.921 C 316.268 137.919 316.52 137.92 316.772 137.922 C 316.913 137.921 317.054 137.921 317.199 137.921 C 317.801 138.038 318.149 138.412 318.535 139.015 C 318.762 139.597 318.782 139.986 318.783 140.638 C 318.784 140.749 318.785 140.859 318.786 140.972 C 318.788 141.335 318.786 141.696 318.785 142.059 C 318.785 142.311 318.785 142.564 318.786 142.818 C 318.786 143.347 318.786 143.876 318.783 144.405 C 318.781 145.083 318.782 145.759 318.785 146.436 C 318.787 146.958 318.786 147.481 318.785 148.003 C 318.785 148.252 318.785 148.502 318.786 148.751 C 318.788 149.101 318.786 149.45 318.783 149.799 C 318.783 149.998 318.782 150.196 318.782 150.401 C 318.694 151.218 318.445 151.655 317.96 152.163 C 317.522 152.488 317.264 152.518 316.765 152.519 C 316.685 152.52 316.605 152.521 316.523 152.522 C 316.257 152.524 315.992 152.522 315.725 152.52 C 315.535 152.521 315.343 152.522 315.152 152.523 C 314.634 152.526 314.116 152.525 313.597 152.523 C 313.054 152.522 312.512 152.523 311.969 152.524 C 311.058 152.525 310.146 152.524 309.234 152.521 C 308.181 152.518 307.128 152.519 306.074 152.522 C 305.169 152.525 304.265 152.525 303.36 152.523 C 302.82 152.523 302.28 152.523 301.739 152.524 C 301.232 152.526 300.724 152.525 300.216 152.521 C 300.029 152.521 299.843 152.521 299.657 152.522 C 299.402 152.524 299.148 152.522 298.893 152.519 C 298.751 152.519 298.609 152.519 298.462 152.518 C 297.87 152.402 297.521 152.031 297.127 151.455 C 296.804 150.839 296.805 150.353 296.802 149.621 C 296.801 149.467 296.801 149.467 296.8 149.31 C 296.799 148.971 296.797 148.632 296.797 148.292 C 296.796 148.056 296.796 147.819 296.795 147.583 C 296.794 147.087 296.793 146.591 296.793 146.095 C 296.792 145.462 296.79 144.828 296.786 144.194 C 296.784 143.706 296.784 143.217 296.784 142.729 C 296.783 142.495 296.782 142.262 296.781 142.028 C 296.779 141.7 296.779 141.373 296.779 141.045 C 296.779 140.859 296.779 140.673 296.778 140.481 C 296.834 139.783 296.981 139.184 297.329 138.636 C 297.935 138.022 298.332 137.977 299.086 137.973 Z" fill="#23AAE6" />
          <path d="M 298.824 133.101 C 298.907 133.101 298.991 133.1 299.077 133.098 C 299.352 133.096 299.626 133.097 299.901 133.1 C 300.092 133.099 300.284 133.098 300.476 133.098 C 300.877 133.097 301.278 133.098 301.679 133.101 C 302.193 133.104 302.706 133.102 303.219 133.099 C 303.615 133.097 304.011 133.097 304.406 133.099 C 304.595 133.099 304.785 133.099 304.974 133.097 C 305.239 133.096 305.504 133.098 305.769 133.101 C 305.919 133.102 306.069 133.102 306.225 133.103 C 306.83 133.217 307.176 133.583 307.585 134.164 C 307.854 134.912 307.821 135.58 307.8 136.396 C 307.799 136.55 307.797 136.704 307.794 136.862 C 307.789 137.24 307.782 137.618 307.772 137.995 C 307.655 137.996 307.538 137.997 307.418 137.998 C 306.315 138.006 305.213 138.018 304.109 138.03 C 303.543 138.037 302.976 138.043 302.409 138.047 C 301.862 138.051 301.314 138.057 300.767 138.065 C 300.558 138.067 300.35 138.069 300.141 138.07 C 299.849 138.071 299.556 138.076 299.263 138.081 C 299.178 138.08 299.092 138.08 299.004 138.08 C 298.301 138.096 297.741 138.278 297.233 138.964 C 296.914 139.63 296.919 140.205 296.916 140.986 C 296.915 141.089 296.915 141.192 296.914 141.298 C 296.912 141.637 296.912 141.977 296.911 142.316 C 296.911 142.552 296.91 142.789 296.909 143.025 C 296.908 143.521 296.907 144.017 296.907 144.512 C 296.906 145.146 296.903 145.78 296.9 146.414 C 296.898 146.903 296.897 147.391 296.897 147.88 C 296.897 148.113 296.896 148.347 296.894 148.581 C 296.893 148.908 296.893 149.235 296.894 149.563 C 296.893 149.749 296.893 149.935 296.893 150.126 C 296.955 150.886 297.134 151.374 297.569 151.878 C 297.661 151.965 297.752 152.052 297.847 152.141 C 297.922 152.241 297.997 152.34 298.075 152.442 C 293.482 152.442 288.889 152.442 284.157 152.442 C 284.157 149.903 284.157 149.903 284.22 149.043 C 284.233 148.85 284.247 148.657 284.262 148.457 C 284.269 148.358 284.276 148.259 284.284 148.157 C 284.307 147.84 284.33 147.521 284.353 147.203 C 284.393 146.643 284.433 146.082 284.474 145.522 C 284.54 144.623 284.605 143.725 284.669 142.826 C 284.691 142.516 284.714 142.206 284.737 141.896 C 284.798 141.04 284.855 140.182 284.88 139.322 C 284.883 139.195 284.887 139.069 284.891 138.939 C 284.852 138.499 284.852 138.499 284.385 137.995 C 288.489 137.995 292.592 137.995 296.82 137.995 C 296.82 136.902 296.82 135.81 296.82 134.685 C 297.409 133.519 297.761 133.105 298.824 133.101 Z" fill="#5AD6FE" />
          <path d="M 266.555 137.927 C 266.774 137.927 266.774 137.927 266.997 137.927 C 267.395 137.926 267.794 137.93 268.192 137.934 C 268.61 137.938 269.026 137.938 269.444 137.939 C 270.233 137.941 271.022 137.946 271.811 137.952 C 272.709 137.958 273.608 137.962 274.506 137.965 C 276.355 137.971 278.202 137.982 280.05 137.995 C 279.979 138.11 279.907 138.225 279.833 138.343 C 279.571 138.785 279.412 139.21 279.239 139.723 C 279.19 139.864 279.19 139.864 279.141 140.01 C 279.034 140.322 278.929 140.635 278.823 140.949 C 278.749 141.17 278.673 141.391 278.598 141.611 C 278.48 141.957 278.363 142.303 278.245 142.649 C 277.851 143.808 277.451 144.962 277.051 146.116 C 276.86 146.665 276.669 147.214 276.479 147.763 C 276.443 147.868 276.406 147.972 276.369 148.079 C 276.143 148.733 275.917 149.388 275.693 150.043 C 275.639 150.2 275.585 150.356 275.53 150.517 C 275.433 150.801 275.335 151.085 275.239 151.37 C 275.198 151.491 275.156 151.613 275.113 151.738 C 275.077 151.842 275.042 151.947 275.005 152.055 C 274.916 152.292 274.916 152.292 274.802 152.442 C 274.504 152.46 274.209 152.468 273.91 152.469 C 273.816 152.47 273.723 152.471 273.627 152.472 C 273.316 152.475 273.005 152.477 272.694 152.478 C 272.588 152.479 272.482 152.479 272.373 152.48 C 271.811 152.483 271.249 152.485 270.688 152.487 C 270.108 152.488 269.529 152.494 268.949 152.499 C 268.503 152.503 268.057 152.505 267.611 152.505 C 267.397 152.506 267.184 152.508 266.97 152.511 C 266.67 152.514 266.371 152.514 266.071 152.513 C 265.983 152.515 265.895 152.517 265.805 152.519 C 265.209 152.511 264.871 152.353 264.42 151.841 C 263.986 151.16 263.907 150.681 263.906 149.799 C 263.904 149.689 263.904 149.579 263.903 149.465 C 263.901 149.103 263.902 148.741 263.904 148.379 C 263.904 148.126 263.903 147.873 263.902 147.62 C 263.902 147.091 263.902 146.562 263.905 146.032 C 263.907 145.355 263.906 144.678 263.903 144.001 C 263.902 143.479 263.902 142.957 263.903 142.435 C 263.904 142.185 263.903 141.936 263.902 141.686 C 263.901 141.337 263.902 140.988 263.906 140.638 C 263.906 140.44 263.906 140.241 263.906 140.037 C 263.994 139.224 264.258 138.801 264.701 138.244 C 265.313 137.868 265.888 137.917 266.555 137.927 Z" fill="#5AD6FE" />
          <path d="M 283.231 183.724 C 283.353 183.724 283.474 183.723 283.599 183.722 C 283.734 183.722 283.869 183.722 284.008 183.722 C 284.15 183.722 284.292 183.721 284.439 183.72 C 284.836 183.719 285.232 183.719 285.628 183.718 C 286.055 183.717 286.482 183.716 286.909 183.715 C 287.941 183.712 288.973 183.71 290.005 183.709 C 290.49 183.708 290.976 183.708 291.462 183.707 C 293.075 183.704 294.689 183.702 296.302 183.701 C 296.722 183.7 297.141 183.7 297.56 183.7 C 297.716 183.7 297.716 183.7 297.876 183.7 C 299.563 183.699 301.25 183.695 302.937 183.69 C 304.669 183.685 306.4 183.682 308.132 183.682 C 309.104 183.681 310.076 183.68 311.049 183.676 C 311.877 183.673 312.706 183.672 313.534 183.673 C 313.957 183.674 314.379 183.673 314.802 183.671 C 315.26 183.668 315.718 183.669 316.177 183.671 C 316.31 183.669 316.444 183.668 316.582 183.666 C 317.294 183.673 317.728 183.71 318.268 184.346 C 318.682 184.921 318.759 185.382 318.781 186.152 C 318.759 186.922 318.682 187.383 318.268 187.958 C 317.617 188.738 316.948 188.643 316.102 188.633 C 315.95 188.633 315.797 188.633 315.644 188.634 C 315.226 188.635 314.807 188.633 314.388 188.63 C 313.937 188.627 313.485 188.628 313.034 188.629 C 312.251 188.629 311.469 188.627 310.687 188.624 C 309.555 188.619 308.424 188.617 307.293 188.617 C 305.458 188.615 303.623 188.611 301.788 188.605 C 300.005 188.6 298.223 188.596 296.44 188.593 C 296.331 188.593 296.22 188.593 296.107 188.593 C 295.556 188.592 295.005 188.591 294.453 188.59 C 289.881 188.584 285.307 188.573 280.735 188.56 C 280.806 188.445 280.878 188.33 280.951 188.211 C 281.205 187.784 281.362 187.377 281.531 186.884 C 281.59 186.71 281.651 186.537 281.712 186.358 C 281.773 186.178 281.834 185.999 281.896 185.814 C 282.019 185.455 282.142 185.097 282.265 184.739 C 282.319 184.581 282.373 184.422 282.428 184.259 C 282.642 183.667 282.747 183.725 283.231 183.724 Z" fill="#4B9640"/>
          <path d="M 286.211 159.666 C 286.72 159.651 287.229 159.64 287.739 159.633 C 287.912 159.63 288.085 159.626 288.259 159.62 C 288.508 159.613 288.757 159.61 289.007 159.607 C 289.157 159.604 289.307 159.601 289.461 159.597 C 289.935 159.678 290.124 159.786 290.432 160.268 C 290.521 161.069 290.361 161.676 290.108 162.393 C 290.056 162.545 290.056 162.545 290.003 162.701 C 289.888 163.038 289.772 163.374 289.654 163.71 C 289.572 163.95 289.49 164.19 289.407 164.431 C 288.698 166.497 287.971 168.553 287.245 170.609 C 286.659 172.271 286.087 173.94 285.526 175.618 C 284.776 177.862 284.001 180.089 283.215 182.312 C 283.126 182.567 283.036 182.821 282.946 183.076 C 282.902 183.198 282.859 183.321 282.814 183.447 C 282.553 184.187 282.297 184.929 282.046 185.674 C 281.988 185.844 281.93 186.014 281.87 186.188 C 281.768 186.491 281.667 186.795 281.567 187.099 C 281.501 187.293 281.501 187.293 281.434 187.491 C 281.397 187.601 281.361 187.711 281.324 187.823 C 281.153 188.19 281.022 188.354 280.735 188.56 C 280.347 188.611 280.347 188.611 279.891 188.604 C 279.811 188.604 279.73 188.603 279.648 188.602 C 279.392 188.6 279.136 188.594 278.881 188.588 C 278.707 188.586 278.533 188.584 278.359 188.582 C 277.934 188.577 277.509 188.569 277.084 188.56 C 277.185 188.443 277.185 188.443 277.289 188.323 C 277.582 187.897 277.74 187.454 277.908 186.931 C 277.959 186.777 277.959 186.777 278.011 186.62 C 278.084 186.397 278.158 186.174 278.231 185.95 C 278.431 185.337 278.635 184.726 278.838 184.114 C 278.902 183.921 278.902 183.921 278.968 183.725 C 279.446 182.292 279.947 180.874 280.449 179.456 C 281.129 177.532 281.797 175.603 282.446 173.661 C 283.109 171.676 283.792 169.703 284.485 167.736 C 284.578 167.472 284.671 167.208 284.763 166.944 C 285.145 165.861 285.526 164.778 285.917 163.699 C 285.972 163.546 286.026 163.393 286.082 163.235 C 286.178 162.969 286.273 162.704 286.372 162.441 C 286.641 161.679 286.752 161.111 286.667 160.268 C 286.444 159.934 286.444 159.934 286.211 159.666 Z" fill="#EF6423"/>
          <path d="M 280.735 137.995 C 281.244 137.98 281.753 137.97 282.263 137.962 C 282.436 137.959 282.61 137.955 282.782 137.95 C 283.032 137.942 283.281 137.939 283.531 137.937 C 283.681 137.933 283.831 137.93 283.985 137.927 C 284.385 137.995 284.385 137.995 284.724 138.196 C 285.258 139.12 284.933 140.816 284.852 141.927 C 284.836 142.164 284.836 142.164 284.819 142.407 C 284.783 142.925 284.746 143.443 284.71 143.961 C 284.684 144.325 284.659 144.689 284.634 145.053 C 284.568 146.008 284.501 146.962 284.433 147.917 C 284.326 149.444 284.219 150.97 284.113 152.497 C 284.076 153.026 284.039 153.556 284.001 154.086 C 283.846 156.297 283.846 156.297 283.727 158.512 C 283.701 158.914 283.701 158.914 283.586 159.666 C 282.382 159.666 281.177 159.666 279.936 159.666 C 280.061 157.262 280.212 154.868 280.392 152.47 C 280.402 152.336 280.412 152.201 280.423 152.062 C 280.462 151.533 280.502 151.005 280.542 150.476 C 280.639 149.183 280.732 147.889 280.817 146.594 C 280.842 146.227 280.866 145.861 280.891 145.494 C 280.931 144.896 280.971 144.298 281.01 143.7 C 281.025 143.463 281.042 143.225 281.057 142.988 C 281.136 141.835 281.204 140.682 281.229 139.524 C 281.235 139.276 281.235 139.276 281.241 139.024 C 281.179 138.498 281.042 138.326 280.735 137.995 Z" fill="#EF6423"/>
          <path d="M 282.928 183.726 C 283.099 183.726 283.099 183.726 283.272 183.726 C 283.402 183.726 283.532 183.726 283.665 183.725 C 283.809 183.726 283.953 183.727 284.1 183.727 C 284.251 183.727 284.401 183.727 284.556 183.727 C 284.969 183.727 285.382 183.728 285.795 183.729 C 286.227 183.73 286.658 183.73 287.089 183.73 C 287.907 183.731 288.724 183.732 289.541 183.733 C 290.472 183.735 291.402 183.736 292.333 183.737 C 294.247 183.738 296.161 183.741 298.075 183.745 C 297.986 183.835 297.897 183.926 297.806 184.021 C 297.403 184.456 296.967 184.978 296.911 185.694 C 296.899 186.465 296.939 186.997 297.276 187.657 C 297.559 187.996 297.559 187.996 297.847 188.259 C 297.96 188.408 297.96 188.408 298.075 188.56 C 292.352 188.56 286.63 188.56 280.735 188.56 C 280.885 188.312 281.036 188.064 281.19 187.807 C 281.311 187.504 281.424 187.196 281.531 186.884 C 281.59 186.71 281.651 186.537 281.712 186.358 C 281.773 186.178 281.834 185.998 281.896 185.814 C 282.019 185.455 282.142 185.097 282.265 184.739 C 282.319 184.581 282.373 184.422 282.428 184.259 C 282.613 183.749 282.613 183.749 282.928 183.726 Z" fill="#91C73B"/>
          <path d="M 266.188 183.676 C 266.348 183.676 266.348 183.676 266.512 183.676 C 266.864 183.676 267.216 183.681 267.568 183.685 C 267.812 183.687 268.057 183.688 268.301 183.688 C 268.944 183.69 269.586 183.696 270.229 183.703 C 270.885 183.709 271.542 183.712 272.197 183.715 C 273.484 183.721 274.771 183.732 276.057 183.745 C 276.049 183.923 276.049 183.923 276.04 184.105 C 276.014 184.647 275.993 185.187 275.972 185.729 C 275.958 186.01 275.958 186.01 275.943 186.297 C 275.937 186.478 275.931 186.659 275.923 186.845 C 275.916 187.012 275.909 187.178 275.902 187.349 C 275.953 187.914 276.107 188.153 276.399 188.56 C 274.939 188.574 273.478 188.585 272.017 188.591 C 271.339 188.594 270.66 188.599 269.982 188.605 C 269.327 188.612 268.673 188.616 268.018 188.617 C 267.769 188.618 267.519 188.621 267.269 188.624 C 266.919 188.628 266.57 188.629 266.22 188.629 C 266.117 188.63 266.014 188.633 265.907 188.635 C 265.278 188.629 264.92 188.511 264.42 187.958 C 264.007 187.383 263.929 186.922 263.907 186.152 C 263.929 185.382 264.007 184.921 264.42 184.346 C 265.012 183.697 265.453 183.66 266.188 183.676 Z" fill="#91C73B"/>
          <path d="M 298.824 133.101 C 298.907 133.101 298.991 133.1 299.077 133.098 C 299.352 133.096 299.626 133.097 299.901 133.1 C 300.092 133.099 300.284 133.098 300.476 133.098 C 300.877 133.097 301.278 133.098 301.679 133.101 C 302.193 133.104 302.706 133.102 303.219 133.099 C 303.615 133.097 304.011 133.097 304.406 133.099 C 304.595 133.099 304.785 133.099 304.974 133.097 C 305.239 133.096 305.504 133.098 305.769 133.101 C 305.919 133.102 306.069 133.102 306.225 133.103 C 306.71 133.194 306.942 133.365 307.315 133.782 C 307.772 134.685 307.772 134.685 307.772 137.995 C 304.158 137.995 300.544 137.995 296.82 137.995 C 296.82 134.685 296.82 134.685 297.276 133.782 C 297.792 133.207 298.156 133.104 298.824 133.101 Z" fill="#91C73C"/>
          <path d="M 271.444 133.101 C 271.528 133.101 271.611 133.1 271.697 133.098 C 271.972 133.096 272.246 133.097 272.52 133.1 C 272.712 133.099 272.904 133.098 273.096 133.098 C 273.497 133.097 273.898 133.098 274.299 133.101 C 274.813 133.104 275.326 133.102 275.84 133.099 C 276.235 133.097 276.631 133.097 277.027 133.099 C 277.216 133.099 277.405 133.099 277.594 133.097 C 277.859 133.096 278.124 133.098 278.389 133.101 C 278.539 133.102 278.69 133.102 278.844 133.103 C 279.331 133.194 279.562 133.365 279.936 133.782 C 280.392 134.685 280.392 134.685 280.392 137.995 C 276.778 137.995 273.164 137.995 269.44 137.995 C 269.44 134.685 269.44 134.685 269.897 133.782 C 270.413 133.207 270.775 133.104 271.444 133.101 Z" fill="#91C73C"/>
          <path d="M 269.568 140.394 C 269.644 140.408 269.72 140.421 269.798 140.436 C 270.113 140.611 270.198 140.746 270.353 141.156 C 270.394 141.646 270.385 142.13 270.374 142.623 C 270.372 142.823 270.372 142.823 270.369 143.028 C 270.366 143.357 270.36 143.686 270.353 144.015 C 270.495 144.01 270.636 144.004 270.782 143.999 C 270.969 143.995 271.157 143.991 271.344 143.987 C 271.437 143.983 271.53 143.979 271.626 143.975 C 272.166 143.966 272.547 143.98 272.977 144.466 C 273.111 145.062 273.137 145.38 272.949 145.953 C 272.749 146.272 272.749 146.272 272.406 146.423 C 272.246 146.435 272.085 146.439 271.924 146.437 C 271.832 146.437 271.741 146.437 271.646 146.436 C 271.551 146.435 271.456 146.433 271.358 146.432 C 271.262 146.432 271.166 146.431 271.066 146.43 C 270.828 146.428 270.59 146.425 270.353 146.423 C 270.359 146.703 270.359 146.703 270.365 146.989 C 270.368 147.236 270.371 147.483 270.374 147.73 C 270.377 147.853 270.38 147.976 270.383 148.102 C 270.389 148.813 270.383 149.323 270.01 149.884 C 269.711 150.053 269.422 150.065 269.098 150.035 C 268.725 149.782 268.661 149.661 268.528 149.132 C 268.519 148.92 268.516 148.707 268.517 148.495 C 268.517 148.374 268.517 148.254 268.517 148.129 C 268.519 148.004 268.52 147.878 268.52 147.749 C 268.521 147.622 268.522 147.495 268.522 147.364 C 268.523 147.05 268.525 146.736 268.528 146.423 C 268.464 146.425 268.401 146.427 268.336 146.43 C 268.048 146.439 267.76 146.445 267.472 146.451 C 267.373 146.455 267.273 146.458 267.171 146.462 C 266.437 146.473 266.437 146.473 266.07 146.231 C 265.883 145.939 265.822 145.765 265.782 145.388 C 265.77 145.289 265.756 145.19 265.743 145.088 C 265.824 144.534 266.02 144.341 266.36 144.015 C 266.736 143.925 267.099 143.943 267.48 143.968 C 267.58 143.971 267.681 143.975 267.785 143.978 C 268.033 143.987 268.28 144 268.528 144.015 C 268.521 143.817 268.514 143.62 268.508 143.416 C 268.502 143.155 268.497 142.894 268.492 142.632 C 268.487 142.502 268.482 142.372 268.478 142.238 C 268.467 141.559 268.475 141.252 268.785 140.688 C 269.201 140.309 269.201 140.309 269.568 140.394 Z" fill="#D5E5F0"/>
          <path d="M 265.79 152.442 C 268.764 152.442 271.738 152.442 274.802 152.442 C 274.555 153.256 274.301 154.066 274.004 154.85 C 271.293 154.85 268.582 154.85 265.79 154.85 C 265.79 154.056 265.79 153.261 265.79 152.442 Z" fill="#A5C2DB" />
          <path d="M 289.622 143.926 C 289.82 143.926 289.82 143.926 290.022 143.926 C 290.301 143.926 290.58 143.929 290.859 143.933 C 291.286 143.939 291.712 143.939 292.139 143.938 C 292.41 143.94 292.681 143.942 292.952 143.944 C 293.079 143.944 293.207 143.944 293.338 143.944 C 293.517 143.948 293.517 143.948 293.7 143.951 C 293.856 143.954 293.856 143.954 294.016 143.955 C 294.376 144.028 294.591 144.177 294.881 144.466 C 295.015 145.062 295.041 145.38 294.852 145.952 C 294.653 146.272 294.653 146.272 294.311 146.423 C 294.115 146.438 293.919 146.445 293.724 146.447 C 293.604 146.448 293.485 146.45 293.361 146.451 C 293.232 146.452 293.103 146.453 292.97 146.453 C 292.838 146.454 292.705 146.455 292.568 146.456 C 292.287 146.457 292.007 146.458 291.726 146.459 C 291.297 146.46 290.867 146.465 290.436 146.47 C 290.164 146.471 289.891 146.472 289.619 146.472 C 289.49 146.474 289.361 146.476 289.229 146.477 C 289.109 146.477 288.989 146.477 288.865 146.476 C 288.707 146.477 288.707 146.477 288.546 146.478 C 288.21 146.412 288.054 146.273 287.807 145.971 C 287.718 145.69 287.718 145.69 287.686 145.388 C 287.673 145.289 287.66 145.19 287.647 145.088 C 287.705 144.688 287.833 144.457 288.055 144.177 C 288.521 143.815 289.098 143.915 289.622 143.926 Z" fill="#D5E5F0" />
          <path d="M 302.296 135.588 C 304.103 135.588 305.91 135.588 307.772 135.588 C 307.772 136.382 307.772 137.176 307.772 137.995 C 305.965 137.995 304.158 137.995 302.296 137.995 C 302.296 137.201 302.296 136.406 302.296 135.588 Z" fill="#4B9641" />
          <path d="M 274.916 135.588 C 276.723 135.588 278.531 135.588 280.392 135.588 C 280.392 136.382 280.392 137.176 280.392 137.995 C 278.585 137.995 276.778 137.995 274.916 137.995 C 274.916 137.201 274.916 136.406 274.916 135.588 Z" fill="#4B9641" />
        </svg>

    </g>
    <g transform="matrix(1 0 0 1 512.2 580.43)">
      <g style={{}} vectorEffect="non-scaling-stroke">
        <g transform="matrix(1 0 0 1 -0.35 8.86)">
          <rect
            style={{
              stroke: "none",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "rgb(0,84,84)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            x={-14.3863}
            y={-19.1817}
            rx={4}
            ry={4}
            width={28.7726}
            height={38.3634}
          />
        </g>
        <g transform="matrix(1 0 0 1 -6.34 4.62)">
          <linearGradient
            id="SVGID_paint0_linear_498_6028_14"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(1 0 0 1 -21.78 -35.26)"
            x1={21.7813}
            y1={30.9961}
            x2={21.7813}
            y2={39.5288}
          >
            <stop
              offset="0%"
              style={{
                stopColor: "rgb(180,219,210)",
                stopOpacity: 1,
              }}
            />
            <stop
              offset="100%"
              style={{
                stopColor: "rgb(71,162,155)",
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <rect
            style={{
              stroke: "rgb(0,84,84)",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "url(#SVGID_paint0_linear_498_6028_14)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            x={-3.61923}
            y={-3.76635}
            rx={3.61923}
            ry={3.61923}
            width={7.23846}
            height={7.5327}
          />
        </g>
        <g transform="matrix(1 0 0 1 6.53 4.85)">
          <linearGradient
            id="SVGID_paint1_linear_498_6028_15"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(1 0 0 1 -34.65 -35.49)"
            x1={34.6476}
            y1={31.2285}
            x2={34.6476}
            y2={39.7612}
          >
            <stop
              offset="0%"
              style={{
                stopColor: "rgb(179,218,210)",
                stopOpacity: 1,
              }}
            />
            <stop
              offset="100%"
              style={{
                stopColor: "rgb(47,149,143)",
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <rect
            style={{
              stroke: "rgb(0,84,84)",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "url(#SVGID_paint1_linear_498_6028_15)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            x={-3.61923}
            y={-3.76635}
            rx={3.61923}
            ry={3.61923}
            width={7.23846}
            height={7.5327}
          />
        </g>
        <g transform="matrix(1 0 0 1 0.27 18.13)">
          <linearGradient
            id="SVGID_paint2_linear_498_6028_16"
            gradientUnits="userSpaceOnUse"
            gradientTransform="matrix(1 0 0 1 -28.39 -48.77)"
            x1={28.3841}
            y1={43.915}
            x2={28.3841}
            y2={53.6247}
          >
            <stop
              offset="0%"
              style={{
                stopColor: "rgb(177,217,209)",
                stopOpacity: 1,
              }}
            />
            <stop
              offset="100%"
              style={{
                stopColor: "rgb(46,149,142)",
                stopOpacity: 1,
              }}
            />
          </linearGradient>
          <rect
            style={{
              stroke: "rgb(0,84,84)",
              strokeWidth: 1,
              strokeDasharray: "none",
              strokeLinecap: "butt",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "url(#SVGID_paint2_linear_498_6028_16)",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            x={-4.35481}
            y={-4.35481}
            rx={4.35481}
            ry={4.35481}
            width={8.70962}
            height={8.70962}
          />
        </g>
        <g transform="matrix(1 0 0 1 0 27.1)">
          <path
            style={{
              stroke: "rgb(26,17,17)",
              strokeWidth: 5,
              strokeDasharray: "none",
              strokeLinecap: "round",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "none",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-28.14, -57.72)"
            d="M 3.27539 57.8438 L 52.9998 57.596"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 -0.1 -14.59)">
          <path
            style={{
              stroke: "rgb(0,84,84)",
              strokeWidth: 4,
              strokeDasharray: "none",
              strokeLinecap: "round",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "none",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-28.04, -16.03)"
            d="M 19.8797 19.9533 L 19.8657 17.1562 C 19.852 14.3948 22.0794 12.1451 24.8408 12.1313 L 31.1705 12.0998 C 33.9319 12.086 36.1816 14.3134 36.1953 17.0748 L 36.2093 19.8719"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 0 -23.39)">
          <path
            style={{
              stroke: "rgb(0,84,84)",
              strokeWidth: 3,
              strokeDasharray: "none",
              strokeLinecap: "round",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "none",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-28.13, -7.23)"
            d="M 24.5481 12.0693 L 24.51 4.42283 C 24.5045 3.31827 25.3954 2.41839 26.5 2.41289 L 29.7086 2.3969 C 30.8131 2.3914 31.713 3.28235 31.7185 4.38691 L 31.7566 12.0334"
            strokeLinecap="round"
          />
        </g>
        <g transform="matrix(1 0 0 1 0.45 -24.71)">
          <path
            style={{
              stroke: "rgb(0,84,84)",
              strokeWidth: 2,
              strokeDasharray: "none",
              strokeLinecap: "round",
              strokeDashoffset: 0,
              strokeLinejoin: "miter",
              strokeMiterlimit: 4,
              fill: "none",
              fillRule: "nonzero",
              opacity: 1,
            }}
            vectorEffect="non-scaling-stroke"
            transform=" translate(-28.58, -5.91)"
            d="M 25.6543 5.91211 C 29.3384 5.91211 31.0967 5.91211 31.5154 5.91211"
            strokeLinecap="round"
          />
        </g>
      </g>
    </g>
    <g
      transform="matrix(1 0 0 1 54.83 620.86)"
      id="36d736ad-bc16-4a59-ba06-b96a8cbabdc4"
    >
      <text x={-40} y={7} fontWeight="700" fontFamily={"inter"} fontSize={"18px"}>
        {combineResult[0] == "NA" || combineResult[0] == null ? "NA"  : combineResult[0] + " kW"} {/**Solar */}
      </text>
    </g>
    <g
      // transform="matrix(1 0 0 1 206.45 560.22)"
      // id="8c4f65c6-9787-49b9-af4a-f70b100763cb"
    >
      {/* <text x={-35} y={5} fontWeight="700" fontFamily={"inter"} fontSize={"18px"}> */}
        {/* {DGValue + " kW"} */}{/* ND */}
      {/* </text> */}
    </g>
    <g
      transform="matrix(1 0 0 1 358.06 555.16)"
      id="8df62697-6676-4462-8fbe-2d13816f5ac0"
    >
      <text x={-35} y={5} fontWeight="700" fontFamily={"inter"} fontSize={"18px"}>
        {combineResult[2] == "NA" || combineResult[2] == null ? "NA"  : combineResult[2] + " kW"}  {/**DG */}
      </text>
    </g>
    <g
      transform="matrix(1 0 0 1 815.43 565.27)"
      id="40e1a97b-0393-4012-b69a-1286d4cd5723"
    >
      <text x={-45} y={5} fontWeight="700" fontFamily={"inter"} fontSize={"18px"}>
        {combineResult[3] == "NA" || combineResult[3] == null ? "NA" : combineResult[3] + " kW"} {/**Battery / BESS */}
      </text>
    </g>
    <g
      transform="matrix(1 0 0 1 514.73 623.39)"
      id="b868ecaf-e155-462f-8c86-e11154c67120"
    >
      <text x={-33} y={5} fontWeight="700" fontFamily={"inter"} fontSize={"18px"}>
        {LoadValue + " kW"}
      </text>
    </g>
    <g
      transform="matrix(1 0 0 1 997.37 620.86)"
      id="766cbd28-6b3d-4a94-9765-8cfe0e52fdf0"
    >
      <text x={-35} y={5} fontWeight="700" fontFamily={"inter"} fontSize={"18px"}>
        {combineResult[1] == "NA" || combineResult[1] == null ? "NA"  : combineResult[1] + " kW"} {/**GRID */}
      </text>
    </g>
    <g
      transform="matrix(0.77 0 0 1 286.12 623.39)"
      id="402194b2-6a02-4f99-acc1-a7a6f50c46b2"
    >
      <path
        id="Solar"
        style={{
          stroke: "transparent",
          fill: "red",
          fillRule: "nonzero",
          opacity: 1,
        }}
        vectorEffect="non-scaling-stroke"
        transform=" translate(-233.75, -4.49)"
        d="M0,0 L480,0"
        strokeLinecap="round"
      />
      <circle cx="-250" cy="0" r="5" fill="green" visibility={SolarValue > 0? "visible" : "hidden"}>
        <animateMotion repeatCount="indefinite" dur="4s" transform=" translate(-233.75, -4.49)">
          <mpath href="#Solar" />
        </animateMotion>
      </circle>
    </g>
    <g
      transform="matrix(0.77 0 0 1 286.12 623.39)"
      id="402194b2-6a02-4f99-acc1-a7a6f50c46b2"
    >
      <path
        style={{
          stroke: "rgb(0,0,0)",
          strokeWidth: 0,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeDashoffset: 0,
          strokeLinejoin: "miter",
          strokeMiterlimit: 4,
          fill: "rgb(0,84,84)",
          fillRule: "nonzero",
          opacity: 1,
        }}
        vectorEffect="non-scaling-stroke"
        transform=" translate(-233.75, -4.49)"
        d="M 0.363363 6.15505 C 1.28336 8.16351 3.65733 9.04589 5.66579 8.1259 C 7.67425 7.2059 8.55663 4.83192 7.63664 2.82346 C 6.71664 0.815004 4.34267 -0.0673721 2.33421 0.852621 C 0.325747 1.77261 -0.55663 4.14659 0.363363 6.15505 Z M 467.5 4.48926 L 460 0.159135 L 460 8.8194 L 467.5 4.48926 Z M 4 5.23926 L 6.51902 5.23926 L 6.51902 3.73926 L 4 3.73926 L 4 5.23926 Z M 11.5571 5.23926 L 16.5951 5.23926 L 16.5951 3.73926 L 11.5571 3.73926 L 11.5571 5.23926 Z M 21.6332 5.23926 L 26.6712 5.23926 L 26.6712 3.73926 L 21.6332 3.73926 L 21.6332 5.23926 Z M 31.7092 5.23926 L 36.7473 5.23926 L 36.7473 3.73926 L 31.7092 3.73926 L 31.7092 5.23926 Z M 41.7853 5.23926 L 46.8234 5.23926 L 46.8234 3.73926 L 41.7853 3.73926 L 41.7853 5.23926 Z M 51.8614 5.23926 L 56.8995 5.23926 L 56.8995 3.73926 L 51.8614 3.73926 L 51.8614 5.23926 Z M 61.9375 5.23926 L 66.9755 5.23926 L 66.9755 3.73926 L 61.9375 3.73926 L 61.9375 5.23926 Z M 72.0136 5.23926 L 77.0516 5.23926 L 77.0516 3.73926 L 72.0136 3.73926 L 72.0136 5.23926 Z M 82.0897 5.23926 L 87.1277 5.23926 L 87.1277 3.73926 L 82.0897 3.73926 L 82.0897 5.23926 Z M 92.1657 5.23926 L 97.2038 5.23926 L 97.2038 3.73926 L 92.1657 3.73926 L 92.1657 5.23926 Z M 102.242 5.23926 L 107.28 5.23926 L 107.28 3.73926 L 102.242 3.73926 L 102.242 5.23926 Z M 112.318 5.23926 L 117.356 5.23926 L 117.356 3.73926 L 112.318 3.73926 L 112.318 5.23926 Z M 122.394 5.23926 L 127.432 5.23926 L 127.432 3.73926 L 122.394 3.73926 L 122.394 5.23926 Z M 132.47 5.23926 L 137.508 5.23926 L 137.508 3.73926 L 132.47 3.73926 L 132.47 5.23926 Z M 142.546 5.23926 L 147.584 5.23926 L 147.584 3.73926 L 142.546 3.73926 L 142.546 5.23926 Z M 152.622 5.23926 L 157.66 5.23926 L 157.66 3.73926 L 152.622 3.73926 L 152.622 5.23926 Z M 162.698 5.23926 L 167.736 5.23926 L 167.736 3.73925 L 162.698 3.73926 L 162.698 5.23926 Z M 172.774 5.23926 L 177.812 5.23926 L 177.812 3.73926 L 172.774 3.73926 L 172.774 5.23926 Z M 182.85 5.23926 L 187.889 5.23926 L 187.889 3.73925 L 182.85 3.73926 L 182.85 5.23926 Z M 192.927 5.23926 L 197.965 5.23926 L 197.965 3.73926 L 192.927 3.73926 L 192.927 5.23926 Z M 203.003 5.23926 L 208.041 5.23926 L 208.041 3.73926 L 203.003 3.73926 L 203.003 5.23926 Z M 213.079 5.23926 L 218.117 5.23926 L 218.117 3.73926 L 213.079 3.73927 L 213.079 5.23926 Z M 223.155 5.23926 L 228.193 5.23926 L 228.193 3.73925 L 223.155 3.73926 L 223.155 5.23926 Z M 233.231 5.23926 L 238.269 5.23926 L 238.269 3.73926 L 233.231 3.73926 L 233.231 5.23926 Z M 243.307 5.23926 L 248.345 5.23926 L 248.345 3.73926 L 243.307 3.73926 L 243.307 5.23926 Z M 253.383 5.23926 L 258.421 5.23926 L 258.421 3.73926 L 253.383 3.73926 L 253.383 5.23926 Z M 263.459 5.23926 L 268.497 5.23927 L 268.497 3.73926 L 263.459 3.73926 L 263.459 5.23926 Z M 273.535 5.23926 L 278.573 5.23926 L 278.573 3.73926 L 273.535 3.73926 L 273.535 5.23926 Z M 283.611 5.23926 L 288.649 5.23926 L 288.649 3.73926 L 283.611 3.73926 L 283.611 5.23926 Z M 293.687 5.23926 L 298.726 5.23926 L 298.726 3.73926 L 293.687 3.73926 L 293.687 5.23926 Z M 303.764 5.23926 L 308.802 5.23926 L 308.802 3.73926 L 303.764 3.73926 L 303.764 5.23926 Z M 313.84 5.23926 L 318.878 5.23926 L 318.878 3.73925 L 313.84 3.73925 L 313.84 5.23926 Z M 323.916 5.23926 L 328.954 5.23926 L 328.954 3.73926 L 323.916 3.73926 L 323.916 5.23926 Z M 333.992 5.23926 L 339.03 5.23925 L 339.03 3.73926 L 333.992 3.73926 L 333.992 5.23926 Z M 344.068 5.23925 L 349.106 5.23925 L 349.106 3.73926 L 344.068 3.73926 L 344.068 5.23925 Z M 354.144 5.23925 L 359.182 5.23925 L 359.182 3.73925 L 354.144 3.73926 L 354.144 5.23925 Z M 364.22 5.23926 L 369.258 5.23926 L 369.258 3.73925 L 364.22 3.73925 L 364.22 5.23926 Z M 374.296 5.23926 L 379.334 5.23926 L 379.334 3.73926 L 374.296 3.73926 L 374.296 5.23926 Z M 384.372 5.23926 L 389.411 5.23926 L 389.411 3.73926 L 384.372 3.73926 L 384.372 5.23926 Z M 394.449 5.23926 L 399.487 5.23925 L 399.487 3.73926 L 394.449 3.73926 L 394.449 5.23926 Z M 404.525 5.23925 L 409.563 5.23925 L 409.563 3.73926 L 404.525 3.73926 L 404.525 5.23925 Z M 414.601 5.23925 L 419.639 5.23926 L 419.639 3.73925 L 414.601 3.73925 L 414.601 5.23925 Z M 424.677 5.23926 L 429.715 5.23926 L 429.715 3.73926 L 424.677 3.73925 L 424.677 5.23926 Z M 434.753 5.23926 L 439.791 5.23926 L 439.791 3.73926 L 434.753 3.73926 L 434.753 5.23926 Z M 444.829 5.23926 L 449.867 5.23926 L 449.867 3.73926 L 444.829 3.73926 L 444.829 5.23926 Z M 454.905 5.23926 L 459.943 5.23927 L 459.943 3.73926 L 454.905 3.73926 L 454.905 5.23926 Z"
        strokeLinecap="round"
      />
    </g>
    {/* <g
      transform="matrix(1 0 0 1 307.52 603.17)"
      // id="402194b2-6a02-4f99-acc1-a7a6f50c46b2"
    >
      <path
        id="ND" // ND => Not Define
        style={{
          stroke: "transparent",
          fill: "transparent",
          fillRule: "nonzero",
          opacity: 1,
        }}
        vectorEffect="non-scaling-stroke"
        transform="  translate(-103.52, -21.31)"
        d="M 0 4 C 99 75 245 23 245 45"
        strokeLinecap="round"
      />
      <circle cx="-100" cy="-22" r="5" fill="rgb(0,84,84)" visibility={DGValue > 0? "visible" : "hidden"}>
        <animateMotion repeatCount="indefinite" dur="4s" transform="  translate(-103.52, -21.31)">
          <mpath href="#ND" />
        </animateMotion>
      </circle>
    </g>
    <g
      transform="matrix(1 0 0 1 307.52 603.17)"
      id="5841e42f-af8a-42b5-84ac-576733cb7a9d"
    >
      <path
        style={{
          stroke: "rgb(0,0,0)",
          strokeWidth: 0,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeDashoffset: 0,
          strokeLinejoin: "miter",
          strokeMiterlimit: 4,
          fill: "rgb(0,84,84)",
          fillRule: "nonzero",
          opacity: 1,
        }}
        vectorEffect="non-scaling-stroke"
        transform=" translate(-103.52, -21.31)"
        d="M 0.363363 5.67263 C 1.28336 7.68109 3.65733 8.56347 5.66579 7.64347 C 7.67425 6.72348 8.55663 4.3495 7.63664 2.34104 C 6.71664 0.332583 4.34267 -0.549794 2.33421 0.370199 C 0.325747 1.29019 -0.55663 3.66417 0.363363 5.67263 Z M 3.51986 4.583 C 4.16941 5.12429 4.8222 5.65873 5.47837 6.18638 L 6.41836 5.01744 C 5.76905 4.4953 5.12302 3.9664 4.48014 3.43067 L 3.51986 4.583 Z M 9.4699 9.281 C 10.8218 10.2909 12.1885 11.2736 13.5711 12.2298 L 14.4243 10.996 C 13.0569 10.0504 11.705 9.07827 10.3676 8.07926 L 9.4699 9.281 Z M 17.7783 15.0259 C 19.1969 15.9313 20.6326 16.8105 22.0863 17.664 L 22.8458 16.3705 C 21.4081 15.5264 19.9883 14.6568 18.5852 13.7614 L 17.7783 15.0259 Z M 26.489 20.1408 C 27.9665 20.9366 29.4628 21.7077 30.9789 22.4546 L 31.6418 21.109 C 30.1419 20.3701 28.6617 19.6073 27.2002 18.8202 L 26.489 20.1408 Z M 35.5484 24.6057 C 37.075 25.2918 38.6217 25.9551 40.1894 26.5963 L 40.7572 25.2079 C 39.2051 24.5731 37.6742 23.9165 36.1633 23.2375 L 35.5484 24.6057 Z M 44.8937 28.4302 C 46.4593 29.0113 48.0457 29.572 49.6538 30.1125 L 50.1317 28.6907 C 48.5381 28.155 46.9664 27.5996 45.4157 27.0239 L 44.8937 28.4302 Z M 54.4626 31.6498 C 56.0584 32.1343 57.6753 32.6006 59.3141 33.0489 L 59.7099 31.6021 C 58.0842 31.1573 56.4807 30.6949 54.8984 30.2145 L 54.4626 31.6498 Z M 64.203 34.3177 C 65.8172 34.7146 67.4523 35.0954 69.1091 35.4605 L 69.4319 33.9957 C 67.7866 33.6331 66.1633 33.255 64.5611 32.8611 L 64.203 34.3177 Z M 74.0383 36.4881 C 75.6679 36.8091 77.3182 37.1159 78.9896 37.409 L 79.2487 35.9316 C 77.5872 35.6402 75.9473 35.3353 74.3281 35.0164 L 74.0383 36.4881 Z M 83.9616 38.2309 C 85.6053 38.4865 87.2692 38.7299 88.9537 38.9611 L 89.1577 37.475 C 87.4818 37.245 85.8268 37.003 84.1921 36.7487 L 83.9616 38.2309 Z M 93.9625 39.6061 C 95.6061 39.8041 97.269 39.9915 98.9516 40.1684 L 99.1085 38.6767 C 97.4332 38.5005 95.7778 38.314 94.142 38.1168 L 93.9625 39.6061 Z M 103.957 40.659 C 105.613 40.8098 107.287 40.9511 108.981 41.0833 L 109.098 39.5879 C 107.41 39.4562 105.742 39.3154 104.093 39.1652 L 103.957 40.659 Z M 114.016 41.4456 C 115.666 41.5547 117.334 41.6556 119.021 41.7485 L 119.103 40.2508 C 117.422 40.1581 115.759 40.0576 114.114 39.9489 L 114.016 41.4456 Z M 124.047 41.9998 C 125.714 42.0747 127.398 42.1425 129.1 42.2031 L 129.153 40.7041 C 127.456 40.6436 125.777 40.576 124.115 40.5013 L 124.047 41.9998 Z M 134.105 42.3598 C 135.765 42.4048 137.441 42.4435 139.135 42.476 L 139.164 40.9763 C 137.474 40.9439 135.801 40.9053 134.145 40.8604 L 134.105 42.3598 Z M 144.186 42.5543 C 145.839 42.5739 147.507 42.588 149.191 42.5968 L 149.199 41.0968 C 147.518 41.088 145.853 41.074 144.204 41.0544 L 144.186 42.5543 Z M 154.233 42.6071 C 155.893 42.6054 157.569 42.5988 159.26 42.5874 L 159.25 41.0874 C 157.562 41.0988 155.889 41.1054 154.231 41.1071 L 154.233 42.6071 Z M 164.281 42.5401 C 165.95 42.5201 167.635 42.4956 169.335 42.4669 L 169.309 40.9671 C 167.612 40.9958 165.93 41.0202 164.263 41.0402 L 164.281 42.5401 Z M 174.334 42.371 C 176.004 42.3354 177.687 42.2958 179.385 42.2524 L 179.347 40.7529 C 177.651 40.7962 175.97 40.8357 174.302 40.8714 L 174.334 42.371 Z M 184.39 42.1148 C 186.055 42.0659 187.735 42.0136 189.428 41.9579 L 189.378 40.4587 C 187.687 40.5143 186.01 40.5666 184.346 40.6155 L 184.39 42.1148 Z M 194.443 41.7845 C 196.106 41.7244 197.783 41.6612 199.472 41.595 L 199.413 40.0961 C 197.725 40.1623 196.051 40.2254 194.389 40.2855 L 194.443 41.7845 Z M 204.493 41.3912 C 205.336 41.3558 206.183 41.3198 207.032 41.283 L 206.968 39.7844 C 206.119 39.8211 205.273 39.8572 204.43 39.8925 L 204.493 41.3912 Z"
        strokeLinecap="round"
      />
    </g> */}
    <g
      transform="matrix(1 0 0 1 406.07 603.17)"
      // id="402194b2-6a02-4f99-acc1-a7a6f50c46b2"
    >
      <path
        id="DG"
        style={{
          stroke: "transparent",
          fill: "transparent",
          fillRule: "nonzero",
          opacity: 1,
        }}
        vectorEffect="non-scaling-stroke"
        transform="  translate(-57.02, -21.48)"
        d="M 0 6 C 40 75 113 25 100 45"
        strokeLinecap="round"
      />
      <circle cx="-50" cy="-22" r="5" fill="#10BDF3" visibility={DGValue > 0? "visible" : "hidden"}>
        <animateMotion repeatCount="indefinite" dur="4s" transform="  translate(-57.02, -21.48)">
          <mpath href="#DG" />
        </animateMotion>
      </circle>
    </g>
    <g
      transform="matrix(1 0 0 1 406.07 603.17)"
      id="18cdbe98-1576-4063-9920-ccff4d2d2b65"
    >
      <path
        style={{
          stroke: "rgb(0,0,0)",
          strokeWidth: 0,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeDashoffset: 0,
          strokeLinejoin: "miter",
          strokeMiterlimit: 4,
          fill: "rgb(0,84,84)",
          fillRule: "nonzero",
          opacity: 1,
        }}
        vectorEffect="non-scaling-stroke"
        transform=" translate(-57.02, -21.48)"
        d="M 0.363363 6.19021 C 1.28336 8.19867 3.65733 9.08104 5.66579 8.16105 C 7.67425 7.24106 8.55663 4.86708 7.63664 2.85862 C 6.71664 0.850161 4.34267 -0.0322158 2.33421 0.887777 C 0.325747 1.80777 -0.55663 4.18175 0.363363 6.19021 Z M 3.39498 4.96764 C 3.87159 5.61824 4.32242 6.2695 4.75218 6.92073 L 6.00415 6.09455 C 5.56196 5.42448 5.09719 4.75302 4.60502 4.08119 L 3.39498 4.96764 Z M 7.21958 11.0079 C 8.01483 12.431 8.75391 13.8428 9.49258 15.2457 L 10.8199 14.5469 C 10.0841 13.1496 9.33537 11.7192 8.529 10.2762 L 7.21958 11.0079 Z M 11.8113 19.5097 C 12.6206 20.9147 13.4828 22.2956 14.4529 23.6381 L 15.6687 22.7596 C 14.7371 21.4704 13.9029 20.1357 13.1111 18.761 L 11.8113 19.5097 Z M 17.6204 27.414 C 18.7217 28.5381 19.9505 29.6196 21.346 30.6508 L 22.2374 29.4444 C 20.9074 28.4616 19.7387 27.4328 18.6919 26.3642 L 17.6204 27.414 Z M 25.5064 33.2847 C 26.8643 34.0212 28.3455 34.7214 29.9689 35.3822 L 30.5344 33.9929 C 28.9587 33.3515 27.5277 32.6746 26.2216 31.9662 L 25.5064 33.2847 Z M 34.5394 37.0149 C 36.0071 37.4743 37.5711 37.9082 39.2404 38.3153 L 39.5958 36.858 C 37.9553 36.458 36.4223 36.0325 34.9874 35.5834 L 34.5394 37.0149 Z M 44.0084 39.3478 C 45.5292 39.6392 47.1256 39.9119 48.8023 40.1652 L 49.0263 38.682 C 47.3677 38.4315 45.7909 38.1621 44.2907 37.8746 L 44.0084 39.3478 Z M 53.6022 40.8097 C 55.1417 40.9924 56.7415 41.1607 58.4046 41.3142 L 58.5425 39.8206 C 56.8916 39.6682 55.3048 39.5012 53.779 39.3201 L 53.6022 40.8097 Z M 63.2168 41.704 C 64.7775 41.8137 66.3888 41.9117 68.0527 41.9977 L 68.1301 40.4997 C 66.475 40.4142 64.873 40.3167 63.322 40.2077 L 63.2168 41.704 Z M 72.93 42.2093 C 74.4872 42.2647 76.0869 42.3104 77.7304 42.3462 L 77.7631 40.8466 C 76.1262 40.8109 74.5334 40.7654 72.9832 40.7103 L 72.93 42.2093 Z M 82.55 42.4215 C 84.1444 42.437 85.7773 42.4438 87.4496 42.4419 L 87.4478 40.9419 C 85.7808 40.9438 84.1534 40.937 82.5645 40.9216 L 82.55 42.4215 Z M 92.2176 42.4136 C 93.8043 42.3968 95.4244 42.3727 97.0788 42.341 L 97.05 40.8413 C 95.3999 40.8729 93.7841 40.897 92.2018 40.9137 L 92.2176 42.4136 Z M 101.892 42.23 C 103.474 42.1875 105.086 42.1386 106.727 42.083 L 106.677 40.5839 C 105.038 40.6393 103.43 40.6881 101.852 40.7305 L 101.892 42.23 Z M 111.555 41.904 C 112.373 41.8711 113.199 41.8366 114.032 41.8006 L 113.968 40.302 C 113.136 40.338 112.312 40.3724 111.494 40.4052 L 111.555 41.904 Z"
        strokeLinecap="round"
      />
    </g>
    <g
      transform="matrix(0.84 0 0 1 755.04 620.86)"
      // id="402194b2-6a02-4f99-acc1-a7a6f50c46b2"
    >
      <path
        id="Grid"
        style={{
          stroke: "transparent",
          fill: "red",
          fillRule: "nonzero",
          opacity: 1,
        }}
        vectorEffect="non-scaling-stroke"
        transform=" translate(-220.5, -4.49)"
        d={GridFlow}
        strokeLinecap="round"
      />
      <circle cx={-250} cy={ 0} r="5" fill={GridValue > 0 ? "purple" : "green"} display={GridValue > 0 || GridValue < 0 ? "block" : "none"} >
        <animateMotion repeatCount="indefinite" dur="4s" transform=" translate(-220.5, -4.49)">
          <mpath href="#Grid" />
        </animateMotion>
      </circle>
    </g>
    <g
      transform="matrix(0.84 0 0 1 755.04 620.86)"
      id="024276b1-f576-4f48-bff5-1a5a8249b665"
    >
      <path
        style={{
          stroke: "rgb(0,0,0)",
          strokeWidth: 0,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeDashoffset: 0,
          strokeLinejoin: "miter",
          strokeMiterlimit: 4,
          fill: "rgb(0,84,84)",
          fillRule: "nonzero",
          opacity: 1,
        }}
        vectorEffect="non-scaling-stroke"
        transform=" translate(-220.5, -4.49)"
        d="M 440.137 6.15505 C 439.217 8.16351 436.843 9.04589 434.834 8.1259 C 432.826 7.2059 431.943 4.83192 432.863 2.82346 C 433.783 0.815004 436.157 -0.0673721 438.166 0.852621 C 440.174 1.77261 441.057 4.14659 440.137 6.15505 Z M 0.499996 4.48926 L 7.99999 0.159129 L 8 8.81939 L 0.499996 4.48926 Z M 436.5 5.23926 L 434.023 5.23926 L 434.023 3.73926 L 436.5 3.73926 L 436.5 5.23926 Z M 429.068 5.23926 L 424.114 5.23926 L 424.114 3.73926 L 429.068 3.73926 L 429.068 5.23926 Z M 419.159 5.23926 L 414.205 5.23926 L 414.205 3.73926 L 419.159 3.73926 L 419.159 5.23926 Z M 409.25 5.23926 L 404.295 5.23926 L 404.295 3.73926 L 409.25 3.73926 L 409.25 5.23926 Z M 399.341 5.23926 L 394.386 5.23926 L 394.386 3.73926 L 399.341 3.73926 L 399.341 5.23926 Z M 389.432 5.23926 L 384.477 5.23926 L 384.477 3.73926 L 389.432 3.73926 L 389.432 5.23926 Z M 379.523 5.23926 L 374.568 5.23926 L 374.568 3.73926 L 379.523 3.73926 L 379.523 5.23926 Z M 369.614 5.23926 L 364.659 5.23926 L 364.659 3.73926 L 369.614 3.73926 L 369.614 5.23926 Z M 359.705 5.23926 L 354.75 5.23926 L 354.75 3.73926 L 359.705 3.73926 L 359.705 5.23926 Z M 349.795 5.23926 L 344.841 5.23926 L 344.841 3.73926 L 349.795 3.73926 L 349.795 5.23926 Z M 339.886 5.23926 L 334.932 5.23926 L 334.932 3.73926 L 339.886 3.73926 L 339.886 5.23926 Z M 329.977 5.23926 L 325.023 5.23926 L 325.023 3.73926 L 329.977 3.73926 L 329.977 5.23926 Z M 320.068 5.23926 L 315.114 5.23926 L 315.114 3.73926 L 320.068 3.73926 L 320.068 5.23926 Z M 310.159 5.23926 L 305.205 5.23926 L 305.205 3.73926 L 310.159 3.73926 L 310.159 5.23926 Z M 300.25 5.23926 L 295.295 5.23925 L 295.295 3.73926 L 300.25 3.73926 L 300.25 5.23926 Z M 290.341 5.23925 L 285.386 5.23926 L 285.386 3.73925 L 290.341 3.73926 L 290.341 5.23925 Z M 280.432 5.23926 L 275.477 5.23925 L 275.477 3.73926 L 280.432 3.73926 L 280.432 5.23926 Z M 270.523 5.23926 L 265.568 5.23926 L 265.568 3.73926 L 270.523 3.73925 L 270.523 5.23926 Z M 260.614 5.23926 L 255.659 5.23926 L 255.659 3.73926 L 260.614 3.73926 L 260.614 5.23926 Z M 250.705 5.23925 L 245.75 5.23925 L 245.75 3.73925 L 250.705 3.73925 L 250.705 5.23925 Z M 240.795 5.23926 L 235.841 5.23926 L 235.841 3.73925 L 240.795 3.73926 L 240.795 5.23926 Z M 230.886 5.23925 L 225.932 5.23926 L 225.932 3.73925 L 230.886 3.73926 L 230.886 5.23925 Z M 220.977 5.23926 L 216.023 5.23926 L 216.023 3.73926 L 220.977 3.73926 L 220.977 5.23926 Z M 211.068 5.23926 L 206.114 5.23925 L 206.114 3.73925 L 211.068 3.73926 L 211.068 5.23926 Z M 201.159 5.23926 L 196.205 5.23925 L 196.205 3.73926 L 201.159 3.73926 L 201.159 5.23926 Z M 191.25 5.23926 L 186.296 5.23926 L 186.296 3.73926 L 191.25 3.73925 L 191.25 5.23926 Z M 181.341 5.23926 L 176.386 5.23926 L 176.386 3.73926 L 181.341 3.73926 L 181.341 5.23926 Z M 171.432 5.23926 L 166.477 5.23926 L 166.477 3.73926 L 171.432 3.73926 L 171.432 5.23926 Z M 161.523 5.23926 L 156.568 5.23926 L 156.568 3.73926 L 161.523 3.73925 L 161.523 5.23926 Z M 151.614 5.23926 L 146.659 5.23926 L 146.659 3.73925 L 151.614 3.73926 L 151.614 5.23926 Z M 141.704 5.23926 L 136.75 5.23925 L 136.75 3.73926 L 141.704 3.73925 L 141.704 5.23926 Z M 131.795 5.23926 L 126.841 5.23926 L 126.841 3.73926 L 131.795 3.73926 L 131.795 5.23926 Z M 121.886 5.23925 L 116.932 5.23925 L 116.932 3.73926 L 121.886 3.73925 L 121.886 5.23925 Z M 111.977 5.23926 L 107.023 5.23926 L 107.023 3.73926 L 111.977 3.73926 L 111.977 5.23926 Z M 102.068 5.23926 L 97.1135 5.23927 L 97.1135 3.73926 L 102.068 3.73925 L 102.068 5.23926 Z M 92.1589 5.23924 L 87.2043 5.23925 L 87.2043 3.73925 L 92.1589 3.73925 L 92.1589 5.23924 Z M 82.2498 5.23925 L 77.2952 5.23925 L 77.2952 3.73925 L 82.2498 3.73925 L 82.2498 5.23925 Z M 72.3407 5.23926 L 67.3861 5.23925 L 67.3861 3.73925 L 72.3406 3.73925 L 72.3407 5.23926 Z M 62.4315 5.23925 L 57.477 5.23926 L 57.477 3.73926 L 62.4316 3.73926 L 62.4315 5.23925 Z M 52.5224 5.23926 L 47.5679 5.23925 L 47.5679 3.73925 L 52.5224 3.73926 L 52.5224 5.23926 Z M 42.6133 5.23925 L 37.6587 5.23926 L 37.6587 3.73926 L 42.6133 3.73926 L 42.6133 5.23925 Z M 32.7042 5.23926 L 27.7496 5.23926 L 27.7496 3.73925 L 32.7042 3.73925 L 32.7042 5.23926 Z M 22.7951 5.23925 L 17.8405 5.23926 L 17.8405 3.73926 L 22.7951 3.73926 L 22.7951 5.23925 Z M 12.886 5.23926 L 7.93139 5.23926 L 7.9314 3.73927 L 12.886 3.73926 L 12.886 5.23926 Z"
        strokeLinecap="round"
      />
    </g>
    <g
      transform="matrix(1 0 0 1 684.03 600.65)"
      // id="f66350f0-2c9e-4e15-b376-7894a58c0514"
    >
      <path
        id="BESS"
        style={{
          stroke: "transparent",
          fill: "transparent",
          fillRule: "nonzero",
          opacity: 1,
        }}
        vectorEffect="non-scaling-stroke"
        transform="translate(-104.48, -21.31)"
        d={batteryFlow}

        strokeLinecap="round"
      />
      <circle cx="-100" cy="-23" r="5" fill={BatteryValue > 0 ? "#3853A5" : "green"} visibility={BatteryValue > 0 || BatteryValue < 0? "visible" : "hidden"}>
    <animateMotion repeatCount="indefinite" dur="4s" transform="translate(-104.48, -21.31)">
      <mpath href="#BESS" />
    </animateMotion>
  </circle>
    </g>
    <g
      transform="matrix(1 0 0 1 684.03 600.65)"
      id="f66350f0-2c9e-4e15-b376-7894a58c0514"
    >
      <path
        style={{
          stroke: "rgb(0,0,0)",
          strokeWidth: 0,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeDashoffset: 0,
          strokeLinejoin: "miter",
          strokeMiterlimit: 4,
          fill: "rgb(0,84,84)",
          fillRule: "nonzero",
          opacity: 1,
        }}
        vectorEffect="non-scaling-stroke"
        transform="translate(-104.48, -21.31)"
        d="M 207.637 5.67263 C 206.717 7.68109 204.343 8.56347 202.334 7.64347 C 200.326 6.72348 199.443 4.3495 200.363 2.34104 C 201.283 0.332583 203.657 -0.549794 205.666 0.370199 C 207.674 1.29019 208.557 3.66417 207.637 5.67263 Z M 204.48 4.583 C 203.831 5.12429 203.178 5.65873 202.522 6.18638 L 201.582 5.01744 C 202.231 4.4953 202.877 3.9664 203.52 3.43067 L 204.48 4.583 Z M 198.53 9.281 C 197.178 10.2909 195.811 11.2736 194.429 12.2298 L 193.576 10.996 C 194.943 10.0504 196.295 9.07827 197.632 8.07926 L 198.53 9.281 Z M 190.222 15.0259 C 188.803 15.9313 187.367 16.8105 185.914 17.664 L 185.154 16.3705 C 186.592 15.5264 188.012 14.6568 189.415 13.7614 L 190.222 15.0259 Z M 181.511 20.1408 C 180.034 20.9366 178.537 21.7077 177.021 22.4546 L 176.358 21.109 C 177.858 20.3701 179.338 19.6073 180.8 18.8202 L 181.511 20.1408 Z M 172.452 24.6057 C 170.925 25.2918 169.378 25.9551 167.811 26.5963 L 167.243 25.2079 C 168.795 24.5731 170.326 23.9165 171.837 23.2375 L 172.452 24.6057 Z M 163.106 28.4302 C 161.541 29.0113 159.954 29.572 158.346 30.1125 L 157.868 28.6907 C 159.462 28.155 161.034 27.5996 162.584 27.0239 L 163.106 28.4302 Z M 153.537 31.6498 C 151.942 32.1343 150.325 32.6006 148.686 33.0489 L 148.29 31.6021 C 149.916 31.1573 151.519 30.6949 153.102 30.2145 L 153.537 31.6498 Z M 143.797 34.3177 C 142.183 34.7146 140.548 35.0954 138.891 35.4605 L 138.568 33.9957 C 140.213 33.6331 141.837 33.255 143.439 32.8611 L 143.797 34.3177 Z M 133.962 36.4881 C 132.332 36.8091 130.682 37.1159 129.01 37.409 L 128.751 35.9316 C 130.413 35.6402 132.053 35.3353 133.672 35.0164 L 133.962 36.4881 Z M 124.038 38.2309 C 122.395 38.4865 120.731 38.7299 119.046 38.9611 L 118.842 37.475 C 120.518 37.245 122.173 37.003 123.808 36.7487 L 124.038 38.2309 Z M 114.037 39.6061 C 112.394 39.8041 110.731 39.9915 109.048 40.1684 L 108.892 38.6767 C 110.567 38.5005 112.222 38.314 113.858 38.1168 L 114.037 39.6061 Z M 104.043 40.659 C 102.387 40.8098 100.713 40.9511 99.0188 41.0833 L 98.9021 39.5879 C 100.59 39.4562 102.258 39.3154 103.907 39.1652 L 104.043 40.659 Z M 93.9844 41.4456 C 92.334 41.5547 90.6657 41.6556 88.9792 41.7485 L 88.8967 40.2508 C 90.5779 40.1581 92.2407 40.0576 93.8855 39.9489 L 93.9844 41.4456 Z M 83.9525 41.9998 C 82.2859 42.0747 80.602 42.1425 78.9003 42.2031 L 78.8469 40.7041 C 80.544 40.6436 82.2233 40.576 83.8851 40.5013 L 83.9525 41.9998 Z M 73.8952 42.3598 C 72.2352 42.4048 70.5586 42.4435 68.8652 42.476 L 68.8364 40.9763 C 70.526 40.9439 72.1986 40.9053 73.8546 40.8604 L 73.8952 42.3598 Z M 63.8139 42.5543 C 62.1612 42.5739 60.4929 42.588 58.8086 42.5968 L 58.8008 41.0968 C 60.4819 41.088 62.1469 41.074 63.7961 41.0544 L 63.8139 42.5543 Z M 53.7672 42.6071 C 52.1066 42.6054 50.4308 42.5988 48.7396 42.5874 L 48.7497 41.0874 C 50.4382 41.0988 52.1111 41.1054 53.7688 41.1071 L 53.7672 42.6071 Z M 43.7195 42.5401 C 42.0496 42.5201 40.365 42.4956 38.6654 42.4669 L 38.6908 40.9671 C 40.388 40.9958 42.0701 41.0202 43.7375 41.0402 L 43.7195 42.5401 Z M 33.6656 42.371 C 31.9962 42.3354 30.3127 42.2958 28.6149 42.2524 L 28.6532 40.7529 C 30.349 40.7962 32.0305 40.8357 33.6976 40.8714 L 33.6656 42.371 Z M 23.6103 42.1148 C 21.9445 42.0659 20.2652 42.0136 18.5722 41.9579 L 18.6216 40.4587 C 20.3128 40.5143 21.9904 40.5666 23.6543 40.6155 L 23.6103 42.1148 Z M 13.5567 41.7845 C 11.8936 41.7244 10.2174 41.6612 8.52815 41.595 L 8.58688 40.0961 C 10.2747 40.1623 11.9493 40.2254 13.6109 40.2855 L 13.5567 41.7845 Z M 3.507 41.3912 C 2.66376 41.3558 1.81728 41.3198 0.967582 41.283 L 1.03243 39.7844 C 1.88148 39.8211 2.7273 39.8572 3.56988 39.8925 L 3.507 41.3912 Z"
        strokeLinecap="round"
      />
    </g>
  </svg>
);
};
export default OldPowerFlowSVG;

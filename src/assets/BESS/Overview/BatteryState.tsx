import * as React from "react";
interface BatteryStateProps {
  batteryPercentage : number;
}
function scaleValue(value : number, srcRange : number[], dstRange: number[]) : any {
  const [srcMin, srcMax] = srcRange;
  const [dstMin, dstMax] = dstRange;

  // Perform the scaling
  const scaledValue = dstMin + ((value - srcMin) / (srcMax - srcMin)) * (dstMax - dstMin);

  return scaledValue;
}

const BatteryState : React.FC<BatteryStateProps> = ({batteryPercentage}) => {

var srcRange = [0, 100];
var dstRange = [-15, 173];

// Example usage
// var value1 = 1400; // A value in the range 0 to 1500
const scaledValue = scaleValue(batteryPercentage, srcRange, dstRange);

var srcRange = [0, 100];
var dstRange = [200, 9];
const scaledValueBar = scaleValue(batteryPercentage, srcRange, dstRange);
  
  var bar = `M52 200.855L52 ${Math.ceil(scaledValueBar) + ".8094C79.2185"}  ${ scaledValueBar + 0.6417} 96.0879 ${scaledValueBar + 0.4783} 126.569 ${Math.ceil(scaledValueBar) + ".8094L126.569"} 200.855C102.451 204.519 87.5263 205.546 52 200.855Z`
  
  return (
  <svg
    viewBox="0 0 178 218"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      width : "100%",
      height : "auto"
    }}
  >
    <defs>
      <radialGradient
        id="paint0_radial_387_5732"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(89 203) scale(78.8021 13.2812)"
      >
        <stop stopColor="#323232" />
        <stop offset={1} stopColor="white" stopOpacity={0} />
      </radialGradient>
      <linearGradient
        id="paint1_linear_387_5732"
        x1={44.4266}
        y1={62.4419}
        x2={155.108}
        y2={61.3847}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.65} stopColor="#D9D9D9" />
        <stop offset={1} stopColor="#737373" />
      </linearGradient>
      <linearGradient
        id="paint2_linear_387_5732"
        x1={141.425}
        y1={91.7895}
        x2={24.9104}
        y2={91.7896}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#117A54" />
        <stop offset={1} stopColor="#23DFC8" />
      </linearGradient>
      <linearGradient
        id="paint3_linear_387_5732"
        x1={52}
        y1={10.1201}
        x2={142.016}
        y2={10.1201}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={0.51} stopColor="#D9D9D9" />
        <stop offset={1} stopColor="#737373" />
      </linearGradient>
      <linearGradient
        id="paint4_linear_387_5732"
        x1={93.0131}
        y1={2.5641}
        x2={93.4411}
        y2={14.9785}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#D9D9D9" />
        <stop offset={1} stopColor="#737373" />
      </linearGradient>
      <linearGradient
        id="paint5_linear_387_5732"
        x1={93.0131}
        y1={0.373241}
        x2={93.0423}
        y2={3.6129}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#D9D9D9" />
        <stop offset={1} stopColor="#737373" />
      </linearGradient>
    </defs>
    <ellipse
      cx={89}
      cy={203}
      rx={89}
      ry={15}
      fill="url(#paint0_radial_387_5732)"
      transform="matrix(1, 0, 0, 1, 3.552713678800501e-15, 0)"
    />
    <rect
      x={106.861}
      y={75.1018}
      width={6.39165}
      height={4.2611}
      transform="matrix(0, -1, 1, 0, 31.759198471295804, 181.96280178372263)"
      fill="#D5AE23"
    />
    <path
      d="M52 198.416L52 10.12C79.2185 11.598 96.0879 11.3078 126.569 10.12L126.569 198.416C102.451 204.922 87.5263 206.745 52 198.416Z"
      fill="url(#paint1_linear_387_5732)"
      transform="matrix(1, 0, 0, 1, 3.552713678800501e-15, 0)"
    />
    <path
      d={bar}
      fill="url(#paint2_linear_387_5732)"
      transform="matrix(1, 0, 0, 1, 3.552713678800501e-15, 0)"
    />
    <path
      d="M89.2846 5.82635C99.5661 5.82635 108.865 6.3623 115.585 7.22632C118.949 7.65878 121.647 8.17104 123.494 8.73253C124.421 9.01438 125.104 9.30005 125.546 9.57734C126.017 9.87372 126.069 10.0668 126.069 10.1201C126.069 10.1734 126.017 10.3664 125.546 10.6628C125.104 10.9401 124.421 11.2258 123.494 11.5076C121.647 12.0691 118.949 12.5814 115.585 13.0138C108.865 13.8779 99.5661 14.4138 89.2846 14.4138C79.0032 14.4138 69.7043 13.8779 62.9842 13.0138C59.6205 12.5814 56.9226 12.0691 55.0754 11.5076C54.1482 11.2258 53.4648 10.9401 53.0235 10.6628C52.5518 10.3664 52.5 10.1734 52.5 10.1201C52.5 10.0668 52.5518 9.87372 53.0235 9.57735C53.4648 9.30006 54.1482 9.01439 55.0754 8.73253C56.9226 8.17105 59.6205 7.65879 62.9842 7.22632C69.7043 6.3623 79.0032 5.82635 89.2846 5.82635Z"
      fill="url(#paint3_linear_387_5732)"
      stroke="#ACABAB"
      transform="matrix(1, 0, 0, 1, 3.552713678800501e-15, 0)"
    />
    <ellipse
      cx={scaledValue + .2846}
      cy={94.8093}
      rx={4.79374}
      ry={37.2846}
      transform="matrix(0, -1, 1, 0, -5.5247010100588305, 184.09390533110354)"
      fill="#1A9678"
    />
    <path
      d="M100.338 9.47977C91.9456 10.784 87.0704 10.6444 78.6631 9.47264L78.6631 1.63215L100.338 1.63215L100.338 9.47977Z"
      fill="url(#paint4_linear_387_5732)"
      stroke="#C9C6C6"
      transform="matrix(1, 0, 0, 1, 3.552713678800501e-15, 0)"
    />
    <path
      d="M89.5004 0.499975C92.6185 0.499975 95.4333 0.642091 97.4612 0.869941C98.4785 0.984234 99.2801 1.11822 99.8184 1.2612C99.8342 1.26542 99.8498 1.26961 99.865 1.27379C99.8498 1.27797 99.8342 1.28216 99.8184 1.28638C99.2801 1.42936 98.4785 1.56335 97.4612 1.67764C95.4333 1.90549 92.6185 2.04761 89.5004 2.04761C86.3823 2.04761 83.5675 1.90549 81.5395 1.67764C80.5223 1.56335 79.7207 1.42936 79.1824 1.28638C79.1665 1.28217 79.151 1.27797 79.1358 1.27379C79.151 1.26961 79.1665 1.26542 79.1824 1.26121C79.7207 1.11822 80.5223 0.984234 81.5395 0.869941C83.5675 0.642092 86.3823 0.499976 89.5004 0.499975Z"
      fill="url(#paint5_linear_387_5732)"
      stroke="#ACABAB"
      transform="matrix(1, 0, 0, 1, 3.552713678800501e-15, 0)"
    />
    <path
      d="M91.9687 144.93L92.315 127.356L92.504 117.771L74.8856 146.724L86.6014 146.955L84.4685 174.083L103.684 145.161L91.9687 144.93Z"
      fill="#D9D9D9"
      transform="matrix(1, 0, 0, 1, 3.552713678800501e-15, 0)"
    />
    <path
      d="M52.2666 17.0441C63.9846 20.4175 95.0906 25.1402 125.771 17.0441"
      stroke="#ACABAB"
      transform="matrix(1, 0, 0, 1, 3.552713678800501e-15, 0)"
    />
    <text x={70} y={69} fontWeight={600} fill="black">
      {batteryPercentage  + "%"}
    </text>
  </svg>
)
};
export default BatteryState;

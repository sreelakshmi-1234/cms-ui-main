import { useColorModeValue } from "@chakra-ui/react";


interface PVPowerFlowSvgProps {
    props?: any;
    SolarValue: number;
    GridValue: number;
    PVMeterValue: number;
    combineResult: any[];
}

const PVPowerFlowSvg: React.FC<PVPowerFlowSvgProps> = ({ props, SolarValue, GridValue, PVMeterValue, combineResult}) => {

    const SolarFlow = SolarValue < 0 ? "M188.5 220.398V220.398C188.5 184.011 161.506 153.272 125.424 148.57L70.7678 141.449C57.1717 139.677 47 128.094 47 114.383V114.383" : "M47 114.383V114.383C47 128.094 57.1717 139.677 70.7678 141.449L125.424 148.57C161.506 153.272 188.5 184.011 188.5 220.398V220.398";
    const gridFlow = PVMeterValue > 0 ? "M188.5 219.938C188.5 183.551 215.494 152.811 251.576 148.109L306.232 140.988C319.828 139.216 330 127.633 330 113.922" : "M330 113.922V113.922C330 127.633 319.828 139.216 306.232 140.988L251.576 148.109C215.494 152.811 188.5 183.551 188.5 219.938V219.938";

    return (
        <svg
            width={366}
            height={347}
            viewBox="0 0 366 347"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g filter="url(#filter0_f_612_17512)">
                <path
                    id="batteryPath"
                    d="M47 113.461V113.461C47 127.699 57.5629 139.728 71.682 141.568L125.424 148.57C161.506 153.272 188.5 184.011 188.5 220.398V220.398"
                    stroke="url(#paint0_linear_612_17512)"
                />
                <path
                    id="DGPath"
                    d="M330 113V113C330 127.238 319.437 139.267 305.318 141.107L251.576 148.109C215.494 152.811 188.5 183.551 188.5 219.938V219.938"
                    stroke="url(#paint3_linear_612_17512)"
                />
                <path d="M188.5 219.938L188.5 230.078" stroke="#CC7FFF" />
            </g>

            <path
                id="solarLine"
                d={SolarFlow}
                stroke="white"
            />
            {/* Animation Starts */}
            <circle r="5" stroke="white" fill={SolarValue > 0 ? "#6FD195" : "#00D9FF"} visibility={SolarValue > 0 || SolarValue < 0 ? "visible" : "hidden"}>
                <animateMotion repeatCount="indefinite" dur="5s">
                    <mpath href="#solarLine" />
                </animateMotion>
            </circle>
            <circle opacity="0.25" r="12" fill={SolarValue > 0 ? "#6FD195" : "#00D9FF"} visibility={SolarValue > 0 || SolarValue < 0 ? "visible" : "hidden"}>
                <animateMotion repeatCount="indefinite" dur="5s">
                    <mpath href="#solarLine" />
                </animateMotion>
            </circle>
            {/* Animation Ends */}

            <path
                id="gridLine"
                d={gridFlow}
                stroke="white"
            />
            {/* Animation Starts */}
            <circle r="5" stroke="white" fill={PVMeterValue > 0 ? "#6FD195" : "#FFBB32"} display={PVMeterValue < 0 || PVMeterValue > 0? "block" : "none"}>
                <animateMotion repeatCount="indefinite" dur="5s">
                    <mpath href="#gridLine" />
                </animateMotion>
            </circle>
            <circle opacity="0.25" r="12" fill={PVMeterValue > 0 ? "#6FD195" : "#FFBB32"} display={PVMeterValue < 0 || PVMeterValue > 0? "block" : "none"}>
                <animateMotion repeatCount="indefinite" dur="5s">
                    <mpath href="#gridLine" />
                </animateMotion>
            </circle>
            {/* Animation Ends */}

            <path d="M 320.5 84 L 320.9 86.214 C 320.966 86.648 320.926 87.089 320.781 87.51 L 316.5 100 M 326.5 84 L 326.1 86.214 C 326.034 86.648 326.074 87.089 326.219 87.51 L 330.5 100" stroke="#FFBB32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M 314.5 89 L 314.824 87.92 C 314.911 87.63 314.954 87.485 315.053 87.363 C 315.151 87.242 315.297 87.153 315.588 86.977 L 319.974 84.32 C 320.234 84.162 320.365 84.083 320.516 84.042 C 320.666 84 320.828 84 321.15 84 L 325.85 84 C 326.172 84 326.333 84 326.484 84.04 C 326.634 84.082 326.765 84.16 327.026 84.319 L 331.412 86.977 C 331.703 87.153 331.849 87.242 331.947 87.363 C 332.045 87.485 332.089 87.63 332.177 87.921 L 332.5 89 M 314.5 100 L 332.5 100 M 315.5 87 L 331 87" stroke="#FFBB32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M 321 88 L 327.5 92.5 L 316.5 100" stroke="#FFBB32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M 326 88 L 319.5 92.5 L 330.5 100 M 320.5 84 L 321.9 81.76 C 322.633 80.587 323 80 323.5 80 C 324 80 324.367 80.587 325.1 81.76 L 326.5 84" stroke="#FFBB32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <g filter="url(#filter2_f_612_17512)">
                <circle cx={323.5} cy={90} r={25.5} stroke="#FFBB32" />
            </g>
            <circle cx={323.5} cy={90} r={24.5} stroke="#FFBB32" />
            
            <path d="M 174.647 252.744 C 174.306 252.744 174.017 252.631 173.786 252.405 C 173.554 252.18 173.438 251.898 173.438 251.566 C 173.438 251.231 173.554 250.953 173.786 250.733 C 174.017 250.511 174.306 250.399 174.647 250.399 L 177.066 250.399 C 177.41 250.399 177.697 250.511 177.929 250.738 C 178.16 250.965 178.276 251.245 178.276 251.579 C 178.276 251.912 178.16 252.19 177.929 252.412 C 177.697 252.633 177.41 252.744 177.066 252.744 L 174.647 252.744 Z M 175.695 275.02 L 174.809 279.319 L 186.743 279.319 L 186.743 275.02 L 175.695 275.02 Z M 177.187 258.841 L 178.881 257.199 C 179.122 256.964 179.406 256.848 179.734 256.848 C 180.062 256.848 180.344 256.959 180.58 257.183 C 180.818 257.43 180.937 257.713 180.937 258.039 C 180.937 258.362 180.816 258.644 180.574 258.88 L 178.881 260.521 C 178.639 260.756 178.355 260.873 178.028 260.873 C 177.7 260.873 177.419 260.761 177.181 260.537 C 176.945 260.292 176.825 260.007 176.825 259.682 C 176.825 259.358 176.945 259.077 177.187 258.841 Z M 176.18 272.675 L 186.743 272.675 L 186.743 268.376 L 177.066 268.376 L 176.18 272.675 Z M 187.952 257.434 C 186.259 257.434 184.774 256.913 183.498 255.871 C 182.221 254.827 181.368 253.526 180.937 251.962 C 180.829 251.649 180.856 251.357 181.017 251.083 C 181.179 250.81 181.418 250.621 181.736 250.516 C 182.052 250.411 182.354 250.438 182.644 250.594 C 182.93 250.751 183.127 250.986 183.235 251.298 C 183.504 252.394 184.069 253.299 184.929 254.015 C 185.788 254.73 186.796 255.089 187.952 255.089 C 189.108 255.089 190.117 254.73 190.975 254.015 C 191.835 253.299 192.4 252.394 192.669 251.298 C 192.778 250.986 192.974 250.751 193.263 250.594 C 193.55 250.438 193.851 250.411 194.169 250.516 C 194.487 250.621 194.726 250.81 194.886 251.083 C 195.048 251.357 195.075 251.649 194.967 251.962 C 194.536 253.526 193.684 254.827 192.408 255.871 C 191.131 256.913 189.645 257.434 187.952 257.434 Z M 186.743 263.297 L 186.743 260.952 C 186.743 260.62 186.859 260.339 187.092 260.116 C 187.327 259.891 187.615 259.779 187.961 259.779 C 188.303 259.779 188.591 259.891 188.82 260.116 C 189.047 260.339 189.161 260.62 189.161 260.952 L 189.161 263.297 C 189.161 263.628 189.045 263.907 188.812 264.131 C 188.579 264.356 188.289 264.468 187.946 264.468 C 187.601 264.468 187.314 264.356 187.086 264.131 C 186.857 263.907 186.743 263.628 186.743 263.297 Z M 189.161 279.319 L 201.096 279.319 L 200.209 275.02 L 189.161 275.02 L 189.161 279.319 Z M 189.161 272.675 L 199.724 272.675 L 198.837 268.376 L 189.161 268.376 L 189.161 272.675 Z M 197.023 260.443 L 195.29 258.802 C 195.048 258.566 194.927 258.293 194.927 257.981 C 194.927 257.669 195.048 257.395 195.29 257.16 C 195.531 256.926 195.814 256.815 196.136 256.829 C 196.459 256.841 196.74 256.952 196.983 257.16 L 198.717 258.802 C 198.958 259.036 199.085 259.309 199.1 259.622 C 199.113 259.935 198.999 260.209 198.755 260.443 C 198.512 260.677 198.223 260.794 197.887 260.794 C 197.554 260.794 197.266 260.677 197.023 260.443 Z M 201.256 252.744 L 198.837 252.744 C 198.495 252.744 198.207 252.631 197.977 252.405 C 197.744 252.18 197.628 251.898 197.628 251.566 C 197.628 251.231 197.744 250.953 197.977 250.733 C 198.207 250.511 198.495 250.399 198.837 250.399 L 201.256 250.399 C 201.6 250.399 201.887 250.511 202.12 250.738 C 202.349 250.965 202.466 251.245 202.466 251.579 C 202.466 251.912 202.349 252.19 202.12 252.412 C 201.887 252.633 201.6 252.744 201.256 252.744 Z M 172.39 278.851 L 174.647 267.908 C 174.782 267.36 175.063 266.911 175.495 266.56 C 175.925 266.208 176.434 266.031 177.026 266.031 L 198.878 266.031 C 199.47 266.031 199.979 266.208 200.41 266.56 C 200.841 266.911 201.122 267.36 201.256 267.908 L 203.514 278.851 C 203.649 279.58 203.48 280.231 203.011 280.805 C 202.54 281.378 201.914 281.664 201.135 281.664 L 174.769 281.664 C 173.99 281.664 173.364 281.378 172.894 280.805 C 172.424 280.231 172.256 279.58 172.39 278.851 Z" fill="#CC7FFF"></path>

            <g filter="url(#filter3_f_612_17512)">
                <circle cx={187.5} cy={270} r={40.5} stroke="#CC7FFF" />
            </g>
            <circle cx={187.5} cy={270} r={40.5} stroke="#CC7FFF" />
            <g clipPath="url(#clip0_612_17512)">
                <path
                    d="M 38.906 83.093 C 38.694 83.093 38.515 83.021 38.372 82.876 C 38.228 82.732 38.156 82.552 38.156 82.339 C 38.156 82.125 38.228 81.947 38.372 81.806 C 38.515 81.664 38.694 81.593 38.906 81.593 L 40.406 81.593 C 40.619 81.593 40.797 81.665 40.941 81.81 C 41.084 81.955 41.156 82.134 41.156 82.348 C 41.156 82.561 41.084 82.739 40.941 82.881 C 40.797 83.022 40.619 83.093 40.406 83.093 L 38.906 83.093 Z M 39.556 97.343 L 39.006 100.093 L 46.406 100.093 L 46.406 97.343 L 39.556 97.343 Z M 40.481 86.993 L 41.531 85.943 C 41.681 85.793 41.857 85.718 42.06 85.718 C 42.263 85.718 42.438 85.79 42.585 85.933 C 42.732 86.09 42.806 86.272 42.806 86.48 C 42.806 86.687 42.731 86.867 42.581 87.018 L 41.531 88.068 C 41.381 88.218 41.205 88.293 41.002 88.293 C 40.799 88.293 40.624 88.221 40.477 88.078 C 40.33 87.921 40.256 87.739 40.256 87.531 C 40.256 87.324 40.331 87.144 40.481 86.993 Z M 39.856 95.843 L 46.406 95.843 L 46.406 93.093 L 40.406 93.093 L 39.856 95.843 Z M 47.156 86.093 C 46.106 86.093 45.185 85.76 44.394 85.093 C 43.602 84.426 43.073 83.593 42.806 82.593 C 42.739 82.393 42.756 82.206 42.856 82.031 C 42.956 81.856 43.104 81.735 43.301 81.668 C 43.498 81.601 43.685 81.618 43.864 81.718 C 44.042 81.818 44.164 81.968 44.231 82.168 C 44.398 82.869 44.748 83.448 45.281 83.906 C 45.814 84.364 46.439 84.593 47.156 84.593 C 47.873 84.593 48.498 84.364 49.031 83.906 C 49.564 83.448 49.914 82.869 50.081 82.168 C 50.148 81.968 50.27 81.818 50.449 81.718 C 50.627 81.618 50.814 81.601 51.011 81.668 C 51.208 81.735 51.356 81.856 51.456 82.031 C 51.556 82.206 51.573 82.393 51.506 82.593 C 51.239 83.593 50.71 84.426 49.919 85.093 C 49.127 85.76 48.206 86.093 47.156 86.093 Z M 46.406 89.843 L 46.406 88.343 C 46.406 88.131 46.478 87.952 46.623 87.809 C 46.768 87.665 46.947 87.593 47.161 87.593 C 47.374 87.593 47.552 87.665 47.694 87.809 C 47.835 87.952 47.906 88.131 47.906 88.343 L 47.906 89.843 C 47.906 90.056 47.834 90.234 47.689 90.377 C 47.545 90.521 47.365 90.593 47.152 90.593 C 46.938 90.593 46.76 90.521 46.619 90.377 C 46.477 90.234 46.406 90.056 46.406 89.843 Z M 47.906 100.093 L 55.306 100.093 L 54.756 97.343 L 47.906 97.343 L 47.906 100.093 Z M 47.906 95.843 L 54.456 95.843 L 53.906 93.093 L 47.906 93.093 L 47.906 95.843 Z M 52.781 88.018 L 51.706 86.968 C 51.556 86.818 51.481 86.643 51.481 86.443 C 51.481 86.243 51.556 86.068 51.706 85.918 C 51.856 85.768 52.031 85.697 52.231 85.706 C 52.431 85.714 52.606 85.785 52.756 85.918 L 53.831 86.968 C 53.981 87.118 54.06 87.293 54.069 87.493 C 54.077 87.693 54.006 87.868 53.855 88.018 C 53.704 88.168 53.525 88.243 53.317 88.243 C 53.11 88.243 52.931 88.168 52.781 88.018 Z M 55.406 83.093 L 53.906 83.093 C 53.694 83.093 53.515 83.021 53.372 82.876 C 53.228 82.732 53.156 82.552 53.156 82.339 C 53.156 82.125 53.228 81.947 53.372 81.806 C 53.515 81.664 53.694 81.593 53.906 81.593 L 55.406 81.593 C 55.619 81.593 55.797 81.665 55.941 81.81 C 56.084 81.955 56.156 82.134 56.156 82.348 C 56.156 82.561 56.084 82.739 55.941 82.881 C 55.797 83.022 55.619 83.093 55.406 83.093 Z M 37.506 99.793 L 38.906 92.793 C 38.989 92.443 39.164 92.156 39.431 91.931 C 39.698 91.706 40.014 91.593 40.381 91.593 L 53.931 91.593 C 54.298 91.593 54.614 91.706 54.881 91.931 C 55.148 92.156 55.323 92.443 55.406 92.793 L 56.806 99.793 C 56.889 100.26 56.785 100.676 56.494 101.043 C 56.202 101.41 55.814 101.593 55.331 101.593 L 38.981 101.593 C 38.498 101.593 38.11 101.41 37.819 101.043 C 37.527 100.676 37.423 100.26 37.506 99.793 Z"
                    fill="#02C25C"
                />
            </g>
            <g filter="url(#filter4_f_612_17512)">
                <circle cx={47.5} cy={90} r={25.5} stroke="#02C25C" />
            </g>
            <circle cx={47.5} cy={90} r={24.5} stroke="#02C25C" />

            <text fontSize={14} fontWeight={600} x={22} y={30} fill={useColorModeValue("#062D59", "#fff")}>
                {"Inverter"}
            </text>
            <text fontSize={12} x={25} y={50} fill="#9BABBD" >
                {combineResult[0] == "NA" || combineResult[0] == null ? "NA" : combineResult[0] + " kW"} {/**Solar */}
            </text>
            <text fontSize={14} fontWeight={600} x={308} y={30} fill={useColorModeValue("#062D59", "#fff")}>
                {"Grid"}
            </text>
            <text fontSize={12} x={302} y={50} fill="#9BABBD">
                {combineResult[1] == "NA" || combineResult[1] == null ? "NA" : combineResult[1] + " kW"} {/**GRID */}
            </text>
            <text fontSize={12} fontWeight={600} x={170.5} y={325} fill={useColorModeValue("#062D59", "#fff")}>
                {"Meter"}
            </text>
            <text fontSize={10} x={163.5} y={340} fill="#9BABBD">
                {combineResult[2] == "NA" || combineResult[2] == null ? "NA" : combineResult[2] + " kW"} {/**METER */}
            </text>
            <defs>
                <filter
                    id="filter0_f_612_17512"
                    x={39.5}
                    y={106}
                    width={298}
                    height={131.078}
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feGaussianBlur
                        stdDeviation={3.5}
                        result="effect1_foregroundBlur_612_17512"
                    />
                </filter>
                <filter
                    id="filter1_f_612_17512"
                    x={195.5}
                    y={54}
                    width={72}
                    height={72}
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feGaussianBlur
                        stdDeviation={5}
                        result="effect1_foregroundBlur_612_17512"
                    />
                </filter>
                <filter
                    id="filter2_f_612_17512"
                    x={287.5}
                    y={54}
                    width={72}
                    height={72}
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feGaussianBlur
                        stdDeviation={5}
                        result="effect1_foregroundBlur_612_17512"
                    />
                </filter>
                <filter
                    id="filter3_f_612_17512"
                    x={126.5}
                    y={221}
                    width={118}
                    height={118}
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feGaussianBlur
                        stdDeviation={4}
                        result="effect1_foregroundBlur_612_17512"
                    />
                </filter>
                <filter
                    id="filter4_f_612_17512"
                    x={11.5}
                    y={54}
                    width={72}
                    height={72}
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feGaussianBlur
                        stdDeviation={5}
                        result="effect1_foregroundBlur_612_17512"
                    />
                </filter>
                <filter
                    id="filter5_f_612_17512"
                    x={99.5}
                    y={54}
                    width={72}
                    height={72}
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity={0} result="BackgroundImageFix" />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                    />
                    <feGaussianBlur
                        stdDeviation={5}
                        result="effect1_foregroundBlur_612_17512"
                    />
                </filter>
                <linearGradient
                    id="paint0_linear_612_17512"
                    x1={42}
                    y1={106.547}
                    x2={178.841}
                    y2={227.627}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#02C25C" />
                    <stop offset={1} stopColor="#CC7FFF" />
                </linearGradient>
                <linearGradient
                    id="paint1_linear_612_17512"
                    x1={138.5}
                    y1={110.695}
                    x2={184.51}
                    y2={210.037}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#00D9FF" />
                    <stop offset={1} stopColor="#CC7FFF" />
                </linearGradient>
                <linearGradient
                    id="paint2_linear_612_17512"
                    x1={244}
                    y1={108.391}
                    x2={194.865}
                    y2={196.743}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#FF8800" />
                    <stop offset={1} stopColor="#CC7FFF" />
                </linearGradient>
                <linearGradient
                    id="paint3_linear_612_17512"
                    x1={335}
                    y1={106.086}
                    x2={198.159}
                    y2={227.166}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#FFC34C" />
                    <stop offset={1} stopColor="#CC7FFF" />
                </linearGradient>
                <linearGradient
                    id="paint4_linear_612_17512"
                    x1={110}
                    y1={146.648}
                    x2={137.208}
                    y2={154.161}
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#02C25C" />
                    <stop offset={0.462205} stopColor="#8796C7" />
                    <stop offset={1} stopColor="#CC7FFF" />
                </linearGradient>
                <clipPath id="clip0_612_17512">
                    <rect
                        width={24}
                        height={24}
                        fill="white"
                        transform="translate(35.5 78)"
                    />
                </clipPath>
            </defs>
        </svg>
    )
};
export default PVPowerFlowSvg;

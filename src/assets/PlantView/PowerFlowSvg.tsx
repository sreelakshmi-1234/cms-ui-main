import { useColorModeValue } from "@chakra-ui/react";


interface PowerFlowSvgProps {
    props?: any;
    SolarValue: number;
    GridValue: number;
    DGValue: number;
    BatteryValue: number;
    LoadValue: number;
    combineResult: any[];
}

const PowerFlowSvg: React.FC<PowerFlowSvgProps> = ({ props, SolarValue, GridValue, DGValue, BatteryValue, LoadValue, combineResult }) => {

    const batteryFlow = BatteryValue < 0 ? "M188.5 220.398V220.398C188.5 184.011 161.506 153.272 125.424 148.57L70.7678 141.449C57.1717 139.677 47 128.094 47 114.383V114.383" : "M47 114.383V114.383C47 128.094 57.1717 139.677 70.7678 141.449L125.424 148.57C161.506 153.272 188.5 184.011 188.5 220.398V220.398";
    const gridFlow = GridValue < 0 ? "M188.5 220.398V181.634C188.5 166.685 197.761 153.301 211.75 148.031C225.739 142.762 235 129.331 235 114.383" : "M235 114.383V114.383C235 129.331 225.739 142.762 211.75 148.031V148.031C197.761 153.301 188.5 166.685 188.5 181.634V220.398";

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
                    id="solarPath"
                    d="M138 113.461V113.461C138 128.408 147.341 141.762 161.381 146.888L163.25 147.57C178.413 153.106 188.5 167.528 188.5 183.669V220.398"
                    stroke="url(#paint1_linear_612_17512)"
                />
                <path
                    id="gridPath"
                    d="M236 114.383V114.383C236 129.339 226.482 142.783 212.45 147.958V147.958C198.179 153.22 188.5 166.892 188.5 182.102V220.398"
                    stroke="url(#paint2_linear_612_17512)"
                />
                <path
                    id="DGPath"
                    d="M330 113V113C330 127.238 319.437 139.267 305.318 141.107L251.576 148.109C215.494 152.811 188.5 183.551 188.5 219.938V219.938"
                    stroke="url(#paint3_linear_612_17512)"
                />
                <path d="M188.5 219.938L188.5 230.078" stroke="#CC7FFF" />
            </g>
            <path d="M188.5 219.938L188.5 231" stroke="white" />
            <path
                id="batteryLine"
                d={batteryFlow}
                stroke="white"
            />
            {/* Animation Starts */}
            <circle r="5" stroke="white" fill={BatteryValue > 0 ? "#6FD195" : "#00D9FF"} visibility={BatteryValue > 0 || BatteryValue < 0 ? "visible" : "hidden"}>
                <animateMotion repeatCount="indefinite" dur="5s">
                    <mpath href="#batteryLine" />
                </animateMotion>
            </circle>
            <circle opacity="0.25" r="12" fill={BatteryValue > 0 ? "#6FD195" : "#00D9FF"} visibility={BatteryValue > 0 || BatteryValue < 0 ? "visible" : "hidden"}>
                <animateMotion repeatCount="indefinite" dur="5s">
                    <mpath href="#batteryLine" />
                </animateMotion>
            </circle>
            {/* Animation Ends */}
            {/* <path
      d="M137.799 152.033C138.149 151.868 138.298 151.45 138.133 151.101L135.44 145.405C135.274 145.056 134.857 144.907 134.508 145.072C134.158 145.237 134.009 145.654 134.174 146.004L136.568 151.066L131.505 153.46C131.156 153.626 131.007 154.043 131.172 154.392C131.337 154.742 131.754 154.891 132.104 154.726L137.799 152.033ZM109.433 147.345C123.79 148.73 128.862 149.052 137.264 152.059L137.736 150.741C129.138 147.664 123.877 147.332 109.567 145.952L109.433 147.345Z"
      fill="url(#paint4_linear_612_17512)"
      /> */}
            <path
                id="solarLine"
                d="M138 114.383V114.383C138 128.776 146.995 141.635 160.515 146.572L163.25 147.57C178.413 153.106 188.5 167.528 188.5 183.669V220.398"
                stroke="white"
            />
            {/* Animation Starts */}
            <circle r="5" stroke="white" fill="#00D9FF" visibility={SolarValue > 0 ? "visible" : "hidden"}>
                <animateMotion repeatCount="indefinite" dur="5s">
                    <mpath href="#solarLine" />
                </animateMotion>
            </circle>
            <circle opacity="0.25" r="12" fill="#00D9FF" visibility={SolarValue > 0 ? "visible" : "hidden"}>
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
            <circle r="5" stroke="white" fill={GridValue > 0 ? "#FF8800" : "#00D9FF"} display={GridValue > 0 || GridValue < 0 ? "block" : "none"}>
                <animateMotion repeatCount="indefinite" dur="5s">
                    <mpath href="#gridLine" />
                </animateMotion>
            </circle>
            <circle opacity="0.25" r="12" fill={GridValue > 0 ? "#FF8800" : "#00D9FF"} display={GridValue > 0 || GridValue < 0 ? "block" : "none"}>
                <animateMotion repeatCount="indefinite" dur="5s">
                    <mpath href="#gridLine" />
                </animateMotion>
            </circle>
            {/* Animation Ends */}
            <path
                id="dgLine"
                d="M330 113.922V113.922C330 127.633 319.828 139.216 306.232 140.988L251.576 148.109C215.494 152.811 188.5 183.551 188.5 219.938V219.938"
                stroke="white"
            />
            {/* Animation Starts */}
            <circle r="5" stroke="white" fill="#FFBB32" visibility={DGValue > 0 ? "visible" : "hidden"}>
                <animateMotion repeatCount="indefinite" dur="5s">
                    <mpath href="#dgLine" />
                </animateMotion>
            </circle>
            <circle opacity="0.25" r="12" fill="#FFBB32" visibility={DGValue > 0 ? "visible" : "hidden"}>
                <animateMotion repeatCount="indefinite" dur="5s">
                    <mpath href="#dgLine" />
                </animateMotion>
            </circle>
            {/* Animation Ends */}
            <path
                d="M228.5 84L228.9 86.214C228.966 86.648 228.926 87.089 228.781 87.51L224.5 100M234.5 84L234.1 86.214C234.034 86.648 234.074 87.089 234.219 87.51L238.5 100"
                stroke="#FF8800"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M222.5 89L222.824 87.92C222.911 87.63 222.954 87.485 223.053 87.363C223.151 87.242 223.297 87.153 223.588 86.977L227.974 84.32C228.234 84.162 228.365 84.083 228.516 84.042C228.666 84 228.828 84 229.15 84H233.85C234.172 84 234.333 84 234.484 84.04C234.634 84.082 234.765 84.16 235.026 84.319L239.412 86.977C239.703 87.153 239.849 87.242 239.947 87.363C240.045 87.485 240.089 87.63 240.177 87.921L240.5 89M222.5 100H240.5M223.5 87H239"
                stroke="#FF8800"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M229 88L235.5 92.5L224.5 100"
                stroke="#FF8800"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M234 88L227.5 92.5L238.5 100M228.5 84L229.9 81.76C230.633 80.587 231 80 231.5 80C232 80 232.367 80.587 233.1 81.76L234.5 84"
                stroke="#FF8800"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <g filter="url(#filter1_f_612_17512)">
                <circle cx={231.5} cy={90} r={25.5} stroke="#FF8800" />
            </g>
            <circle cx={231.5} cy={90} r={24.5} stroke="#FF8800" />
            <path
                d="M314.5 88C314.5 87.709 314.563 87.4216 314.686 87.1577C314.808 86.8938 314.987 86.6598 315.209 86.472L322.209 80.473C322.57 80.1679 323.027 80.0005 323.5 80.0005C323.973 80.0005 324.43 80.1679 324.791 80.473L331.791 86.472C332.013 86.6598 332.192 86.8938 332.314 87.1577C332.437 87.4216 332.5 87.709 332.5 88V97C332.5 97.5304 332.289 98.0391 331.914 98.4142C331.539 98.7893 331.03 99 330.5 99H316.5C315.97 99 315.461 98.7893 315.086 98.4142C314.711 98.0391 314.5 97.5304 314.5 97V88Z"
                stroke="#FFBB32"
                strokeWidth={1.2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M327.407 89.1681H324.842L327.149 86.1564C327.196 86.0926 327.153 86 327.075 86H322.61C322.577 86 322.546 86.018 322.53 86.0481L319.513 91.4326C319.477 91.4964 319.521 91.577 319.593 91.577H321.624L320.583 95.8798C320.561 95.9737 320.67 96.0399 320.738 95.9725L327.471 89.333C327.532 89.274 327.491 89.1681 327.407 89.1681Z"
                fill="#FFBB32"
            />
            <g filter="url(#filter2_f_612_17512)">
                <circle cx={323.5} cy={90} r={25.5} stroke="#FFBB32" />
            </g>
            <circle cx={323.5} cy={90} r={24.5} stroke="#FFBB32" />
            <path
                d="M167.5 276C167.5 275.418 167.627 274.843 167.872 274.315C168.116 273.788 168.474 273.32 168.918 272.944L182.918 260.946C183.64 260.336 184.555 260.001 185.5 260.001C186.445 260.001 187.36 260.336 188.082 260.946L202.082 272.944C202.526 273.32 202.884 273.788 203.128 274.315C203.373 274.843 203.5 275.418 203.5 276V294C203.5 295.061 203.079 296.078 202.328 296.828C201.578 297.579 200.561 298 199.5 298H171.5C170.439 298 169.422 297.579 168.672 296.828C167.921 296.078 167.5 295.061 167.5 294V276Z"
                stroke="#CC7FFF"
                strokeWidth={2.4}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M193.314 278.336H188.184L192.797 272.313C192.893 272.185 192.806 272 192.65 272H183.72C183.655 272 183.592 272.036 183.559 272.096L177.526 282.865C177.453 282.993 177.542 283.154 177.686 283.154H181.748L179.666 291.76C179.621 291.947 179.84 292.08 179.975 291.945L193.442 278.666C193.563 278.548 193.482 278.336 193.314 278.336Z"
                fill="#CC7FFF"
            />
            <g filter="url(#filter3_f_612_17512)">
                <circle cx={185.5} cy={280} r={50.5} stroke="#CC7FFF" />
            </g>
            <circle cx={185.5} cy={280} r={50.5} stroke="#CC7FFF" />
            <g clipPath="url(#clip0_612_17512)">
                <path
                    d="M54.25 83.25H38.5C37.9033 83.25 37.331 83.4871 36.909 83.909C36.4871 84.331 36.25 84.9033 36.25 85.5V94.5C36.25 95.0967 36.4871 95.669 36.909 96.091C37.331 96.5129 37.9033 96.75 38.5 96.75H54.25C54.8467 96.75 55.419 96.5129 55.841 96.091C56.2629 95.669 56.5 95.0967 56.5 94.5V85.5C56.5 84.9033 56.2629 84.331 55.841 83.909C55.419 83.4871 54.8467 83.25 54.25 83.25ZM55 94.5C55 94.6989 54.921 94.8897 54.7803 95.0303C54.6397 95.171 54.4489 95.25 54.25 95.25H38.5C38.3011 95.25 38.1103 95.171 37.9697 95.0303C37.829 94.8897 37.75 94.6989 37.75 94.5V85.5C37.75 85.3011 37.829 85.1103 37.9697 84.9697C38.1103 84.829 38.3011 84.75 38.5 84.75H54.25C54.4489 84.75 54.6397 84.829 54.7803 84.9697C54.921 85.1103 55 85.3011 55 85.5V94.5ZM52.75 87V93C52.75 93.1989 52.671 93.3897 52.5303 93.5303C52.3897 93.671 52.1989 93.75 52 93.75C51.8011 93.75 51.6103 93.671 51.4697 93.5303C51.329 93.3897 51.25 93.1989 51.25 93V87C51.25 86.8011 51.329 86.6103 51.4697 86.4697C51.6103 86.329 51.8011 86.25 52 86.25C52.1989 86.25 52.3897 86.329 52.5303 86.4697C52.671 86.6103 52.75 86.8011 52.75 87ZM49 87V93C49 93.1989 48.921 93.3897 48.7803 93.5303C48.6397 93.671 48.4489 93.75 48.25 93.75C48.0511 93.75 47.8603 93.671 47.7197 93.5303C47.579 93.3897 47.5 93.1989 47.5 93V87C47.5 86.8011 47.579 86.6103 47.7197 86.4697C47.8603 86.329 48.0511 86.25 48.25 86.25C48.4489 86.25 48.6397 86.329 48.7803 86.4697C48.921 86.6103 49 86.8011 49 87ZM45.25 87V93C45.25 93.1989 45.171 93.3897 45.0303 93.5303C44.8897 93.671 44.6989 93.75 44.5 93.75C44.3011 93.75 44.1103 93.671 43.9697 93.5303C43.829 93.3897 43.75 93.1989 43.75 93V87C43.75 86.8011 43.829 86.6103 43.9697 86.4697C44.1103 86.329 44.3011 86.25 44.5 86.25C44.6989 86.25 44.8897 86.329 45.0303 86.4697C45.171 86.6103 45.25 86.8011 45.25 87ZM41.5 87V93C41.5 93.1989 41.421 93.3897 41.2803 93.5303C41.1397 93.671 40.9489 93.75 40.75 93.75C40.5511 93.75 40.3603 93.671 40.2197 93.5303C40.079 93.3897 40 93.1989 40 93V87C40 86.8011 40.079 86.6103 40.2197 86.4697C40.3603 86.329 40.5511 86.25 40.75 86.25C40.9489 86.25 41.1397 86.329 41.2803 86.4697C41.421 86.6103 41.5 86.8011 41.5 87ZM59.5 87V93C59.5 93.1989 59.421 93.3897 59.2803 93.5303C59.1397 93.671 58.9489 93.75 58.75 93.75C58.5511 93.75 58.3603 93.671 58.2197 93.5303C58.079 93.3897 58 93.1989 58 93V87C58 86.8011 58.079 86.6103 58.2197 86.4697C58.3603 86.329 58.5511 86.25 58.75 86.25C58.9489 86.25 59.1397 86.329 59.2803 86.4697C59.421 86.6103 59.5 86.8011 59.5 87Z"
                    fill="#02C25C"
                />
            </g>
            <g filter="url(#filter4_f_612_17512)">
                <circle cx={47.5} cy={90} r={25.5} stroke="#02C25C" />
            </g>
            <circle cx={47.5} cy={90} r={24.5} stroke="#02C25C" />
            <rect width={24} height={24} transform="translate(123.5 78)" fill="transparent" />
            <path
                d="M127.25 81.5C127.038 81.5 126.859 81.4277 126.716 81.283C126.572 81.1385 126.5 80.9593 126.5 80.7455C126.5 80.5318 126.572 80.3542 126.716 80.2125C126.859 80.0708 127.038 80 127.25 80H128.75C128.963 80 129.141 80.0723 129.285 80.217C129.428 80.3615 129.5 80.5407 129.5 80.7545C129.5 80.9682 129.428 81.1458 129.285 81.2875C129.141 81.4292 128.963 81.5 128.75 81.5H127.25ZM127.9 95.75L127.35 98.5H134.75V95.75H127.9ZM128.825 85.4L129.875 84.35C130.025 84.2 130.201 84.125 130.404 84.125C130.607 84.125 130.782 84.1968 130.929 84.3403C131.076 84.4967 131.15 84.6789 131.15 84.8868C131.15 85.0944 131.075 85.2738 130.925 85.425L129.875 86.475C129.725 86.625 129.549 86.7 129.346 86.7C129.143 86.7 128.968 86.6282 128.821 86.4847C128.674 86.3282 128.6 86.1461 128.6 85.9383C128.6 85.7306 128.675 85.5512 128.825 85.4ZM128.2 94.25H134.75V91.5H128.75L128.2 94.25ZM135.5 84.5C134.45 84.5 133.529 84.1666 132.738 83.5C131.946 82.8333 131.417 82 131.15 81C131.083 80.8 131.1 80.6125 131.2 80.4375C131.3 80.2625 131.448 80.1417 131.645 80.075C131.842 80.0083 132.029 80.025 132.208 80.125C132.386 80.225 132.508 80.375 132.575 80.575C132.742 81.2755 133.092 81.8548 133.625 82.313C134.158 82.771 134.783 83 135.5 83C136.217 83 136.842 82.771 137.375 82.313C137.908 81.8548 138.258 81.2755 138.425 80.575C138.492 80.375 138.614 80.225 138.793 80.125C138.971 80.025 139.158 80.0083 139.355 80.075C139.552 80.1417 139.7 80.2625 139.8 80.4375C139.9 80.6125 139.917 80.8 139.85 81C139.583 82 139.054 82.8333 138.263 83.5C137.471 84.1666 136.55 84.5 135.5 84.5ZM134.75 88.25V86.75C134.75 86.5375 134.822 86.3593 134.967 86.2155C135.112 86.0718 135.291 86 135.505 86C135.718 86 135.896 86.0718 136.038 86.2155C136.179 86.3593 136.25 86.5375 136.25 86.75V88.25C136.25 88.4625 136.178 88.6406 136.033 88.7843C135.889 88.9281 135.709 89 135.496 89C135.282 89 135.104 88.9281 134.963 88.7843C134.821 88.6406 134.75 88.4625 134.75 88.25ZM136.25 98.5H143.65L143.1 95.75H136.25V98.5ZM136.25 94.25H142.8L142.25 91.5H136.25V94.25ZM141.125 86.425L140.05 85.375C139.9 85.225 139.825 85.05 139.825 84.85C139.825 84.65 139.9 84.475 140.05 84.325C140.2 84.175 140.375 84.1042 140.575 84.1125C140.775 84.1209 140.95 84.1916 141.1 84.325L142.175 85.375C142.325 85.525 142.404 85.7 142.413 85.9C142.421 86.1 142.35 86.275 142.199 86.425C142.048 86.575 141.869 86.65 141.661 86.65C141.454 86.65 141.275 86.575 141.125 86.425ZM143.75 81.5H142.25C142.038 81.5 141.859 81.4277 141.716 81.283C141.572 81.1385 141.5 80.9593 141.5 80.7455C141.5 80.5318 141.572 80.3542 141.716 80.2125C141.859 80.0708 142.038 80 142.25 80H143.75C143.963 80 144.141 80.0723 144.285 80.217C144.428 80.3615 144.5 80.5407 144.5 80.7545C144.5 80.9682 144.428 81.1458 144.285 81.2875C144.141 81.4292 143.963 81.5 143.75 81.5ZM125.85 98.2L127.25 91.2C127.333 90.85 127.508 90.5625 127.775 90.3375C128.042 90.1125 128.358 90 128.725 90H142.275C142.642 90 142.958 90.1125 143.225 90.3375C143.492 90.5625 143.667 90.85 143.75 91.2L145.15 98.2C145.233 98.6667 145.129 99.0834 144.838 99.45C144.546 99.8167 144.158 100 143.675 100H127.325C126.842 100 126.454 99.8167 126.163 99.45C125.871 99.0834 125.767 98.6667 125.85 98.2Z"
                fill="#00D9FF"
            />
            <g filter="url(#filter5_f_612_17512)">
                <circle cx={135.5} cy={90} r={25.5} stroke="#00D9FF" />
            </g>
            <circle cx={135.5} cy={90} r={24.5} stroke="#00D9FF" />
            <text fontSize={14} fontWeight={600} x={22} y={30} fill={useColorModeValue("#062D59", "#fff")}>
                {"Battery"}
            </text>
            <text fontSize={12} x={32} y={50} fill="#9BABBD" >
                {combineResult[3] == "NA" || combineResult[3] == null ? "NA" : combineResult[3] + " kW"} {/**Battery / BESS */}
            </text>
            <text font-size="14" font-weight="600" x="120" y="30" fill={useColorModeValue("#062D59", "#fff")}>
                {"Solar"}
            </text>
            <text fontSize={12} x={115} y={50} fill={"#9BABBD"}>
                {combineResult[0] == "NA" || combineResult[0] == null ? "NA" : combineResult[0] + " kW"} {/**Solar */}
            </text>
            <text fontSize={14} fontWeight={600} x={218} y={30} fill={useColorModeValue("#062D59", "#fff")}>
                {"Grid"}
            </text>
            <text fontSize={12} x={215} y={50} fill="#9BABBD">
                {combineResult[1] == "NA" || combineResult[1] == null ? "NA" : combineResult[1] + " kW"} {/**GRID */}
            </text>
            <text fontSize={14} fontWeight={600} x={312} y={30} fill={useColorModeValue("#062D59", "#fff")}>
                {"DG"}
            </text>
            <text fontSize={12} x={310} y={50} fill="#9BABBD">
                {combineResult[2] == "NA" || combineResult[2] == null ? "NA" : combineResult[2] + " kW"}  {/**DG */}
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
export default PowerFlowSvg;

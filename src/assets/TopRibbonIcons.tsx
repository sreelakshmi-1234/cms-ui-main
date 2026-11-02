import { AiOutlineThunderbolt } from "react-icons/ai";
import { BsSpeedometer2 } from "react-icons/bs";
import { PiThermometerSimpleFill } from "react-icons/pi";
import { TbDeviceImac } from "react-icons/tb";
import { CalculateResponsiveValue } from "../Services/EnlargeWidget";

export const PowerIcon = () => {
    return ( 
        <AiOutlineThunderbolt size={CalculateResponsiveValue(20)} />
    );
};

export const ModeIcon = () => {
    return (
        <svg width={CalculateResponsiveValue(19)} height={CalculateResponsiveValue(18)} viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.12887 16.5H17.1672C17.5597 16.5 17.7564 16.5 17.8789 16.3783C18.0005 16.2558 18.0005 16.0583 18.0005 15.6667V4.83333L14.3672 7.86083C13.7755 8.35417 13.4805 8.6 13.2405 8.4875C13.0005 8.375 13.0005 7.99167 13.0005 7.22083V4.83333L9.29387 7.52917C8.85887 7.84583 8.6422 8.00333 8.39053 8.085C8.1397 8.16667 7.87053 8.16667 7.33387 8.16667H7.1672M3.00053 4H6.33387M9.6672 11.5H11.3339M13.8339 11.5H15.5005M1.38137 15.5617L3.0047 2.9175C3.15304 1.76167 3.44637 1.5 4.63053 1.5C5.8147 1.5 6.10887 1.76167 6.2572 2.91667L8.00053 16.5H2.2172C1.77137 16.5 1.54887 16.5 1.42304 16.3583C1.2972 16.2175 1.32554 15.9992 1.38137 15.5617Z" stroke="#062D59" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    );
};

export const PlantIcon = () => {
    return (
        <svg width={CalculateResponsiveValue(18)} height={CalculateResponsiveValue(20)} viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.74993 8.33329V12.5C2.74993 14.0716 2.74993 14.8566 3.23826 15.345C3.63076 15.7383 4.21659 15.815 5.24993 15.83M15.2499 8.33329V12.5C15.2499 14.0716 15.2499 14.8566 14.7616 15.345C14.3691 15.7383 13.7833 15.815 12.7499 15.83M9.83326 11.6666L7.67159 14.2225C7.40743 14.5641 7.27576 14.7358 7.35743 14.8683C7.43909 15 7.67659 15 8.15243 15H9.84743C10.3224 15 10.5608 15 10.6424 15.1316C10.7241 15.2641 10.5924 15.435 10.3283 15.7775L8.15326 18.3333M7.33326 1.66663L6.49993 8.33329M10.6666 1.66663L11.4999 8.33329M2.33326 4.99996H15.6666M2.30493 4.83163L2.80743 3.66413C3.22493 2.69496 3.43326 2.20996 3.84243 1.93913C4.25159 1.66663 4.77243 1.66663 5.81409 1.66663H12.1858C13.2274 1.66663 13.7483 1.66663 14.1574 1.93829C14.5658 2.20996 14.7749 2.69496 15.1924 3.66329L15.6949 4.83163C16.3758 6.41163 16.7158 7.20163 16.3516 7.76746C15.9874 8.33329 15.1383 8.33329 13.4399 8.33329H4.55909C2.86159 8.33329 2.01243 8.33329 1.64826 7.76746C1.28409 7.20163 1.62409 6.41163 2.30493 4.83163Z" stroke="#062D59" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );
};

export const MeterIcon = () => {
    return (
        <BsSpeedometer2 size={CalculateResponsiveValue(20)} />
    );
};

export const TempIcon = () => {
    return (
        <PiThermometerSimpleFill size={CalculateResponsiveValue(20)} />
    );
};

export const DeviceIcon = () => {
    return (
        <TbDeviceImac size={CalculateResponsiveValue(20)} />
    );
};


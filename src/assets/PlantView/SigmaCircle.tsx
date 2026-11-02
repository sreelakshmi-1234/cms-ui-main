// components/icons/SigmaCircle.tsx
import React from "react";

type Props = {
  size?: number;           // pixel size
  stroke?: string;         // stroke color
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Exact Σ-in-circle icon derived from the provided raw SVG.
 * Default stroke color: #2ca9bc
 */
const SigmaCircle: React.FC<Props> = ({
  size = 22,
  stroke = "#2ca9bc",
  className,
  style,
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      style={style}
      // same vertical flip as original: matrix(1,0,0,-1,0,0)
      transform="matrix(1,0,0,-1,0,0)"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline
        points="15 10 15 9 9 9 12 12 9 15 15 15 15 14"
        fill="none"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={0.744}
      />
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={0.744}
      />
    </svg>
  );
};

export default SigmaCircle;

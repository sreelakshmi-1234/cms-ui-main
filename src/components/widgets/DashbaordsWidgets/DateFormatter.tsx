import React from "react";
import { useColorModeValue } from "@chakra-ui/react";

interface DateFormatterProps {
    onDateChange: (start: string, end: string) => void;
    currentStartTs?: number; 

    // positioning control
    right?: number;
    top?: number;

    // size variants
    size?: "sm" | "md" | "lg";

    // optional overrides
    showShadow?: boolean;
}

const DateFormatter: React.FC<DateFormatterProps> = ({
    onDateChange,
    currentStartTs,
    right = 60,
    top = -40,
    size = "md",
    showShadow = true
}) => {
    const [uiDate, setUiDate] = React.useState(new Date());

    React.useEffect(() => {
        if (!currentStartTs) return;

        const newDate = new Date(currentStartTs);

        setUiDate(prev => {
            // unnecessary re-render avoid
            if (
                prev.getFullYear() === newDate.getFullYear() &&
                prev.getMonth() === newDate.getMonth() &&
                prev.getDate() === newDate.getDate()
            ) {
                return prev;
            }
            return newDate;
        });
    }, [currentStartTs]);

    const isNextDisabled = (() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const current = new Date(uiDate);
        current.setHours(0, 0, 0, 0);
        return current >= today;
    })();

    const changeDate = (dir: "prev" | "next") => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const newDate = new Date(uiDate);

        if (dir === "prev") newDate.setDate(newDate.getDate() - 1);

        if (dir === "next") {
            const current = new Date(uiDate);
            current.setHours(0, 0, 0, 0);

            if (current >= today) return;

            newDate.setDate(newDate.getDate() + 1);
        }

        setUiDate(newDate);

        const start = new Date(newDate);
        start.setHours(0, 0, 0, 0);

        const end = new Date(newDate);
        end.setHours(23, 59, 59, 999);

        const formatLocal = (date: Date) => {
            const pad = (n: number) => n.toString().padStart(2, "0");
            return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
                   `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.000`;
        };

        onDateChange(formatLocal(start), formatLocal(end));
    };

    const bg = useColorModeValue("#F8FAFC", "#151924");
    const border = useColorModeValue("#D9E1EA", "#091111");
    const text = useColorModeValue("#2F3E4D", "#E2E8F0");
    const arrow = useColorModeValue("#3B82F6", "#90CDF4");

    const sizeConfig = {
        sm: { fontSize: 12, padding: "1px 8px", arrowSize: 14 },
        md: { fontSize: 11, padding: "2px 10px", arrowSize: 16 },
        lg: { fontSize: 14, padding: "4px 12px", arrowSize: 18 }
    };

    const current = sizeConfig[size];

    return (
        <div
            style={{
                position: "absolute",
                top,
                right,
                zIndex: 10,

                display: "flex",
                alignItems: "center",
                gap: 6
            }}
        >
            {/* LEFT */}
            <span
                style={{
                    cursor: "pointer",
                    color: arrow,
                    fontSize: current.arrowSize,
                    fontWeight: 600
                }}
                onClick={() => changeDate("prev")}
            >
                ‹
            </span>

            {/* DATE BOX */}
            <div
                style={{
                    background: bg,
                    border: `1px solid ${border}`,
                    borderRadius: 12,

                    padding: current.padding,
                    lineHeight: "12px",

                    fontSize: current.fontSize,
                    fontWeight: 400,
                    color: text,

                    boxShadow: showShadow
                        ? "0 1px 2px rgba(0,0,0,0.06)"
                        : "none",

                    display: "inline-block",
                    whiteSpace: "nowrap"
                }}
            >
                {uiDate.toLocaleDateString("en-CA")}
            </div>

            {/* RIGHT */}
            <span
                style={{
                    cursor: isNextDisabled ? "not-allowed" : "pointer",
                    opacity: isNextDisabled ? 0.4 : 1,
                    color: arrow,
                    fontSize: current.arrowSize,
                    fontWeight: 600
                }}
                onClick={() => !isNextDisabled && changeDate("next")}
            >
                ›
            </span>
        </div>
    );
};

export default DateFormatter;

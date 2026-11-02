import { Box, HStack, VStack } from "@chakra-ui/react";
import HeatmapChart from "../../charts/HeatmapChart";
import { Select } from "chakra-react-select";
import { useEffect, useMemo, useRef, useState } from "react";
import DeviceKeysAPI from "../../../../api/DeviceKeysAPI";
import { useTimeHandle } from "../../../../Services/TimeWindowSetting";
import ManyDeviceSameKeyHeatmapAPI from "../../../../api/ManyDeviceSameKeyHeatmapAPI";
import { formatInTimeZone } from "date-fns-tz";

// Define the shape of the export functions
interface ExportFunctions {
  exportPNG: () => void;
  exportCSV: () => void;
}

type Props = {
  onExportReady: (functions: ExportFunctions) => void;
  /** Compact (non-fullscreen / small-height) view me top-N device rows show.
   *  Fullscreen / large-height me hamesha sab dikhaye. */
  visibleDeviceLimit?: number; // default 25
};

const CustomHeatmapGraph: React.FC<Props> = ({ onExportReady, visibleDeviceLimit = 20 }) => {
  const timeZone = localStorage.getItem("SelectedTimezone") || "Asia/Colombo";

  // Options
  const deviceOptions = [
    { label: "Inverter", value: "inverter" },
    { label: "DG", value: "dg" },
    { label: "PCS", value: "pcs" },
    { label: "BESS", value: "bess" },
  ];

  const [keyOptions, setKeyOptions] = useState<{ label: string; value: string }[] | []>([]);
  const [device, setDevice] = useState("inverter");
  const [key, setKey] = useState("");
  const [heatmapData, setHeatmapData] = useState<any | null>(null);

  // --- Fullscreen/large detection: fullscreen API OR large container height ---
  const [isFullscreen, setIsFullscreen] = useState<boolean>(!!document.fullscreenElement);
  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) setContainerHeight(e.contentRect.height);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);
  const isLarge = isFullscreen || containerHeight >= 500; // large == show ALL rows

  const searchTagHeatmap = useMemo(
    () => ({
      devName: device,
      keys: key
    }),
    [device, key]
  );

  const { timeWindow: timeWindowHeatmap, manualChanges } = useTimeHandle(1, "cdsf", "AVG", [30, "minute"]);

  async function handleKeyFetching(dev: string) {
    const res = await DeviceKeysAPI({ devName: dev + "-1" });
    if (res?.status === 200) {
      if (res.data.length > 0) {
        const responseData = res.data as string[];
        setKeyOptions(responseData.map((item: string) => ({ label: item, value: item })));
        if (responseData.includes("AC_Active_Power_Watt")) {
          setKey("AC_Active_Power_Watt");
        } else {
          setKey(responseData[0]);
        }
      } else {
        setKeyOptions([]);
      }
    }
  }
  useEffect(() => { handleKeyFetching(device); }, [device]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (key.length > 0) {
          const data = await ManyDeviceSameKeyHeatmapAPI(searchTagHeatmap, timeWindowHeatmap);
          setHeatmapData(data?.data);
        }
      } catch (error) {
        console.error("Error fetching heatmap data:", error);
        setHeatmapData(null);
      }
    };
    fetchData();
  }, [searchTagHeatmap, timeWindowHeatmap, key]);

  // sort categories like INV-1, INV-2, ...
  const sortedCategories: string[] | undefined = useMemo(() => {
    if (!heatmapData?.yAxisCategories) return undefined;
    return [...heatmapData.yAxisCategories].sort((a: string, b: string) => {
      const numA = parseInt(a.split("-")[1], 10);
      const numB = parseInt(b.split("-")[1], 10);
      return numA - numB;
    });
  }, [heatmapData?.yAxisCategories]);

  // Ensure categories array available for tick calculations
  const categories: string[] = (sortedCategories || heatmapData?.yAxisCategories || []) as string[];

  // Limit ONLY when not large
  const yAxisMax =
    !isFullscreen && typeof visibleDeviceLimit === "number" && visibleDeviceLimit > 0 && visibleDeviceLimit <= (sortedCategories?.length || visibleDeviceLimit)
      ? visibleDeviceLimit - 1
      : undefined;

  return (
    <VStack width={"100%"} height={"100%"}>
      <HStack width={"100%"} justify={"flex-end"}>
        <HStack>
          <Select
            isMulti={false}
            placeholder="Select Device"
            closeMenuOnSelect={true}
            variant="flushed"
            focusBorderColor="#062D59"
            size={"sm"}
            chakraStyles={{
              valueContainer: (provided) => ({ ...provided, fontSize: "10px", width: "120px" }),
              control: (prov) => ({ ...prov, height: "10px", minBlockSize: "20px" }),
              menuList: (prov) => ({ ...prov, padding: 0, fontSize: "10px", height: "100px" }),
              option: (prov) => ({ ...prov, height: "15px", fontSize: "10px" })
            }}
            options={deviceOptions || []}
            onChange={(e) => {
              setDevice(e?.value || "inverter-1");
              setKey("");
            }}
            selectedOptionColorScheme="green"
            value={deviceOptions?.find(option => option.value === device)}
          />
          <Select
            isMulti={false}
            placeholder="Select Parameter"
            closeMenuOnSelect={true}
            variant="flushed"
            focusBorderColor="#062D59"
            size={"sm"}
            chakraStyles={{
              valueContainer: (provided) => ({ ...provided, fontSize: "10px", width: "120px" }),
              control: (prov) => ({ ...prov, height: "10px", minBlockSize: "20px" }),
              menuList: (provided) => ({ ...provided, height: "100px" }),
              option: (prov) => ({ ...prov, height: "15px", fontSize: "10px" })
            }}
            options={keyOptions || []}
            onChange={(e) => setKey(e?.value || "AC_Active_Power_Watt")}
            selectedOptionColorScheme="green"
            value={keyOptions?.find(option => option.value === key)}
          />
        </HStack>
      </HStack>

      <Box width={"100%"} ref={containerRef}>
        {heatmapData && heatmapData.series && (
          <HeatmapChart
            height={340}
            apiData={heatmapData.series || [{}]}
            xAxisInterval={timeWindowHeatmap.interval}
            onExportReady={onExportReady}
            props={{
              yAxis: {
                title: null,
                crosshair: false,
                labels: {
                  step: 1,
                  enabled: true,
                  formatter: function (this: any) { return String(this.value); },
                  style: { color: "#062D59", fontSize: "8px" }
                },
                // Fullscreen/Large view me saare labels force:
                tickInterval: isLarge ? 1 : undefined,
                tickPixelInterval: isLarge ? 1 : undefined,
                tickAmount: isLarge ? categories.length : undefined,
                startOnTick: false,
                endOnTick: false,

                gridLineWidth: 0,
                categories,
                min: 0,
                max: yAxisMax, // fullscreen/large => undefined (show all), compact => limit
              },
              xAxis: {
                type: "datetime",
                crosshair: false,
                labels: {
                  enabled: true,
                  style: { color: "#062D59", fontSize: "8px" },
                  title: { text: "" },
                  dateTimeLabelFormats: { month: "%b %y", year: "%Y" },
                  tickLength: 0,
                },
                gridLineWidth: 0,
                tickLength: 0,
                min: !manualChanges
                  ? undefined
                  : new Date(
                      formatInTimeZone(
                        Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), 0, 0, 0, 0),
                        timeZone,
                        "yyyy-MM-dd HH:mm:ss.SSS"
                      )
                    ).getTime(),
                max: !manualChanges
                  ? undefined
                  : new Date(
                      formatInTimeZone(
                        Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), 23, 59, 59, 0),
                        timeZone,
                        "yyyy-MM-dd HH:mm:ss.SSS"
                      )
                    ).getTime(),
              },
            }}
          />
        )}
      </Box>
    </VStack>
  );
};

export default CustomHeatmapGraph;

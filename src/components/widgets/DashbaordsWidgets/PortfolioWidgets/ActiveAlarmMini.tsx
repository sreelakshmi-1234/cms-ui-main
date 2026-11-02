import React, { useState, useEffect } from "react";
import {
  Box, Text, VStack, HStack, Icon, useColorModeValue, Link, Flex,
} from "@chakra-ui/react";
import { MdNotifications, MdError, MdWarning, MdInfo } from "react-icons/md";
import UseAlarmLiveTable from "../../../../Services/Hooks/Alarm/UseAlarmLiveTable";
import { useTimeHandle } from "../../../../Services/TimeWindowSetting";
import { useNavigate } from "react-router";

type AlarmType = "critical" | "warning" | "info" | "major" | "indeterminate";
interface AlarmData { id: string; type: AlarmType; message: string; timestamp: string; }

const pillBg: Record<AlarmType, string> = { critical: "#FDE8E8", warning: "#FFF4E6", major: "#FFF4E6", info: "#E3F2FD", indeterminate: "#E3F2FD" };
const pillIcon: Record<AlarmType, any> = { critical: MdError, warning: MdWarning, major: MdWarning, info: MdInfo, indeterminate: MdInfo };
const pillIconColor: Record<AlarmType, string> = { critical: "#F44336", warning: "#FF9800", major: "#FF9800", info: "#2196F3", indeterminate: "#2196F3" };

export default function ActiveAlarmMini({ containerH = 344 }: { containerH?: number }) {
  const [alarms, setAlarms] = useState<AlarmData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalAlarms, setTotalAlarms] = useState(0); // count after filtering to ACTIVE

  const { timeWindow: timeWindowAlarm } = useTimeHandle(1, "day", "NONE", [1, "day"]);

  // Map API severities to UI types
  const mapSeverityToType = (severity: string): AlarmType => {
    const s = (severity || "").toLowerCase();
    if (s === "critical") return "critical";
    if (s === "major") return "major";
    // normalize intermediate/indeterminate/warning/minor/info
    if (s === "warning" || s === "intermediate") return "warning";
    if (s === "indeterminate") return "indeterminate";
    return "info"; // minor/info/others → info
  };

  // Priority for sorting: critical → major/warning → others
  const severityRank = (severity: string): number => {
    const s = (severity || "").toLowerCase();
    if (s === "critical") return 0;
    if (s === "major" || s === "warning" || s === "intermediate") return 1;
    if (s === "minor" || s === "info" || s === "indeterminate") return 2;
    return 3;
  };

  const formatTimestamp = (timestamp: string | number): string => {
    if (timestamp === undefined || timestamp === null || timestamp === "") return "";
    let ms: number;
    if (typeof timestamp === "string") {
      // string could be epoch millis or seconds; try parseInt
      const num = parseInt(timestamp, 10);
      // if seconds (10 digits), convert to ms
      ms = num < 1e12 ? num * 1000 : num;
    } else {
      ms = timestamp < 1e12 ? timestamp * 1000 : timestamp;
    }
    const date = new Date(ms);
    if (isNaN(date.getTime())) return "";
    // date + time for clarity
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // helper: normalize status for matching (also fix common typos)
  const normStatus = (s: any) =>
    String(s ?? "")
      .toUpperCase()
      .replace(/\s+/g, "_")
      .replace(/^CLEARD\b/, "CLEARED");

  // Extract plant/device/type/severity/status/timestamp from either array- or object-shaped rows
  const parseRow = (row: any) => {
    // Object-shaped (defensive)
    const plantFromObj = row?.plant || row?.plantName || row?.site || row?.siteName;
    const deviceFromObj = row?.device || row?.deviceName || row?.asset || row?.entityName;
    const typeFromObj = row?.type || row?.alarmType || row?.name;
    const sevFromObj = row?.severity || row?.alarmSeverity;
    const statusFromObj = row?.status || row?.state || row?.alarmStatus;
    const tsFromObj = row?.createdTime || row?.ts || row?.timestamp;

    // Array-shaped: support several orders we’ve seen
    // A) [plant, device, created, type, severity, status, ...]
    // B) [device, created, type, severity, status, ...]
    // (Older shapes may not include status.)
    let plantFromArr: string | undefined;
    let deviceFromArr: string | undefined;
    let createdFromArr: number | string | undefined;
    let typeFromArr: string | undefined;
    let sevFromArr: string | undefined;
    let statusFromArr: string | undefined;

    if (Array.isArray(row)) {
      const a = row;
      const looksLikeTime = (v: any) =>
        v !== null && v !== undefined && !isNaN(parseInt(String(v), 10)) && String(v).length >= 10;

      // Guess shape by checking index 1 as timestamp
      const isBShape = looksLikeTime(a?.[1]);

      if (isBShape) {
        // B) [device, created, type, severity, (status?)]
        deviceFromArr = a?.[2];
        createdFromArr = a?.[1];
        typeFromArr = a?.[2];
        sevFromArr = a?.[3];
        // if present, next index is status
        statusFromArr = a?.[4];
      } else {
        // A) [plant, device, created, type, severity, (status?)]
        plantFromArr = a?.[0];
        deviceFromArr = a?.[1];
        createdFromArr = a?.[2];
        typeFromArr = a?.[4];
        sevFromArr = a?.[5];
        statusFromArr = a?.[6];
      }

      // Heuristic: if status is missing but the "last" string looks like a status, capture it
      if (!statusFromArr) {
        const maybe = a?.[a.length - 1];
        const m = normStatus(maybe);
        if (/^(ACTIVE|CLEAR)/.test(m)) statusFromArr = maybe;
      }
    }

    const plant =
      plantFromObj ??
      plantFromArr ??
      // Fallback: sometimes device is "Plant/Device" or "Plant - Device"
      (typeof deviceFromArr === "string" && deviceFromArr.includes("/")
        ? deviceFromArr.split("/")[0].trim()
        : undefined);

    const device =
      deviceFromObj ??
      deviceFromArr ??
      (typeof deviceFromArr === "string" && deviceFromArr.includes("/")
        ? deviceFromArr.split("/")[1]?.trim()
        : undefined);

    const type = String(typeFromObj ?? typeFromArr ?? "Unknown");
    const severity = String(sevFromObj ?? sevFromArr ?? "MINOR");
    const status = String(statusFromObj ?? statusFromArr ?? "");
    const ts = tsFromObj ?? createdFromArr ?? 0;

    return {
      plant: plant || "Unknown Plant",
      device: device || "Unknown Device",
      type,
      severity,
      status,
      ts,
    };
  };

   const AlarmLiveTable = UseAlarmLiveTable({
    name: "Inverter",
    typeList: [],
    severityList: [],
    statusList: ["UNACK"],
    text: null,
    assigneeId: null
  }, timeWindowAlarm, 0) as any;

  useEffect(() => {
    setLoading(true);
    try {
      let apiData: any = null;

      // Try common shapes
      if (AlarmLiveTable && Array.isArray(AlarmLiveTable) && AlarmLiveTable.length > 0) {
        apiData = AlarmLiveTable[0]?.dataFromAPI ?? AlarmLiveTable;
      } else if (AlarmLiveTable?.data?.dataFromAPI) {
        apiData = AlarmLiveTable.data.dataFromAPI;
      } else if (AlarmLiveTable && Array.isArray(AlarmLiveTable)) {
        apiData = AlarmLiveTable;
      }

      if (apiData && Array.isArray(apiData) && apiData.length > 0) {
        // Parse rows first
        const parsed = apiData.map(parseRow);

        // ✅ Filter: only ACTIVE (ACTIVE_ACK or ACTIVE_UNACK); exclude CLEAR/CLEARED/CLEARD
        const onlyActive = parsed.filter(p => {
          const s = normStatus(p.status);
          if (/^CLEAR(?:ED|ING|D)?(?:_|$)/.test(s)) return false; // CLEAR* out
          return s.startsWith("ACTIVE");
        });

        setTotalAlarms(onlyActive.length); // header shows active count

        // Sort by severity priority then latest timestamp
        const sorted = [...onlyActive].sort((a, b) => {
          const rA = severityRank(a.severity);
          const rB = severityRank(b.severity);
          if (rA !== rB) return rA - rB;

          const tA = typeof a.ts === "string" ? parseInt(a.ts, 10) : Number(a.ts || 0);
          const tB = typeof b.ts === "string" ? parseInt(b.ts, 10) : Number(b.ts || 0);
          return tB - tA; // latest first
        });

        const top4 = sorted.slice(0, 4).map((alarm, index) => {
          const statusDisplay = normStatus(alarm.status).replace(/_/g, " "); // ACTIVE_UNACK -> ACTIVE UNACK
          return {
            id: (index + 1).toString(),
            type: mapSeverityToType(String(alarm.severity)),
            // 👇 Plant + Device + Type + Severity + " - STATUS"
            message: `${alarm.plant} • ${alarm.device} — ${alarm.type}: ${String(alarm.severity).toUpperCase()} - ${statusDisplay}`,
            timestamp: formatTimestamp(alarm.ts),
          } as AlarmData;
        });

        setAlarms(top4);
      } else {
        setAlarms([]);
        setTotalAlarms(0);
      }
    } catch (err) {
      console.error("Error mapping AlarmLiveTable to mini alarms:", err);
      setAlarms([]);
      setTotalAlarms(0);
    } finally {
      setLoading(false);
    }
  }, [AlarmLiveTable, timeWindowAlarm]);

  const cardBg = useColorModeValue("white", "#131512");
  const titleCol = useColorModeValue("#062D59", "white");
  const subCol = useColorModeValue("#6B7280", "#A0AEC0");

  // use Navigation
  const navigate = useNavigate()

  return (
    <Box height={`${containerH}px`} bg={cardBg} rounded="lg" p={4} mt={5}>
      <Flex direction="column" h="100%">
        <HStack justify="space-between" mb={3}>
          <HStack>
            <Icon as={MdNotifications} color="#1F7AEC" boxSize={5} />
            <Text fontWeight={800} color={titleCol}>Active Alarms</Text>
          </HStack>
          <Text fontSize="sm" color={subCol}>{loading ? 'Loading...' : `${totalAlarms} total`}</Text>
        </HStack>

        <VStack align="stretch" spacing={3} flex="1" overflowY="auto" pr={1}>
          {loading ? (
            <VStack align="center" justify="center" flex="1"><Text color={subCol}>Loading alarms...</Text></VStack>
          ) : alarms.length === 0 ? (
            <VStack align="center" justify="center" flex="1"><Text color={subCol}>No active alarms</Text></VStack>
          ) : (
            alarms.map(a => (
              <VStack key={a.id} bg={pillBg[a.type]} rounded="lg" px={3} py={3} align="stretch" spacing={0} minH="46px">
                <HStack spacing={3} align="flex-start">
                  <Icon as={pillIcon[a.type]} color={pillIconColor[a.type]} boxSize={5} />
                  <VStack flex="1" align="stretch" spacing={0}>
                    <Text fontWeight="400" pb={"2px"} color={titleCol} fontSize="sm" lineHeight="1.2">{a.message}</Text>
                    <Text fontSize="xs" color={subCol} textAlign="right">{a.timestamp}</Text>
                  </VStack>
                </HStack>
              </VStack>
            ))
          )}
        </VStack>

        <HStack mt={3} justify="flex-end"><Link fontSize="sm" color="#1F7AEC" onClick={() => navigate("/alarm")}>View More →</Link></HStack>
      </Flex>
    </Box>
  );
}

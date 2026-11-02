//React import with useRef-based IDs
import React, { useState, useEffect } from "react";
import {
  Box, Text, VStack, HStack, Icon, useColorModeValue, Divider, Link, Flex,
} from "@chakra-ui/react";
import {
  MdNotifications, MdError, MdWarning, MdInfo,
} from "react-icons/md";
import AlarmLiveTableAPI from "../../../../api/Alarm/AlarmLiveTableAPI";
import { useTimeHandle } from "../../../../Services/TimeWindowSetting";

// exact Σ + bolt + chain icons you already created
import SigmaCircle from "../../../../assets/PlantView/SigmaCircle";
import LightningBolt from "../../../../assets/PlantView/LightningBolt";
import BrokenChain from "../../../../assets/PlantView/BrokenChain";
import UseInverterStatus from "../../../../Services/Hooks/UseInverterStatus";
import { useNavigate } from "react-router";

type AlarmType = "critical" | "warning" | "info" | "major" | "indeterminate";
interface AlarmData { id: string; type: AlarmType; message: string; timestamp: string; }

const pillBg: Record<AlarmType, string> = { critical: "#FDE8E8", warning: "#FFF4E6", major: "#FFF4E6", info: "#E3F2FD", indeterminate: "#E3F2FD" };
const pillIcon: Record<AlarmType, any> = { critical: MdError, warning: MdWarning, major: MdWarning, info: MdInfo, indeterminate: MdInfo };
const pillIconColor: Record<AlarmType, string> = { critical: "#F44336", warning: "#FF9800", major: "#FF9800", info: "#2196F3", indeterminate: "#2196F3" };

type Props = { containerH?: string | number };

/* helpers: exact alignment for the three stats */
const SigmaStat: React.FC<{ value: number; size?: number }> = ({ value, size = 24 }) => (
  <HStack spacing={2} align="center">
    <Box as="span" display="inline-flex" alignItems="center" title="Total">
      <SigmaCircle size={size} stroke="#1F7AEC" />
    </Box>
    <Text lineHeight="1" fontWeight={600}>{value}</Text>
  </HStack>
);
const PowerStat: React.FC<{ value: number; size?: number }> = ({ value, size = 22 }) => (
  <HStack spacing={2} align="center">
    <Box as="span" display="inline-flex" alignItems="center" title="Running">
      <LightningBolt size={size} />
    </Box>
    <Text lineHeight="1" fontWeight={600}>{value}</Text>
  </HStack>
);
const LinkStat: React.FC<{ value: number; size?: number }> = ({ value, size = 20 }) => (
  <HStack spacing={2} align="center">
    <Box as="span" display="inline-flex" alignItems="center" title="Non-Commn.">
      <BrokenChain size={size} color="#E53935" />
    </Box>
    <Text lineHeight="1" fontWeight={600}>{value}</Text>
  </HStack>
);

export default function ActiveAlarm({ containerH = 403 }: Props) {
  const [alarms, setAlarms] = useState<AlarmData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalAlarms, setTotalAlarms] = useState(0); // ACTIVE-only count

  // Time window for API call
  const { timeWindow: timeWindowAlarm } = useTimeHandle(1, "day", "NONE", [1, "day"]);

  // Map severity to UI type
  const mapSeverityToType = (severity: string): AlarmType => {
    const s = (severity || "").toLowerCase();
    if (s === "critical") return "critical";
    if (s === "major") return "major";
    if (s === "warning" || s === "intermediate") return "warning";
    if (s === "indeterminate") return "indeterminate";
    return "info";
  };

  // Priority for sorting
  const severityRank = (sev: string): number => {
    const s = (sev || "").toLowerCase();
    if (s === "critical") return 0;
    if (s === "major" || s === "warning" || s === "intermediate") return 1;
    if (s === "minor" || s === "info" || s === "indeterminate") return 2;
    return 3;
  };

  // Timestamp format (handles sec or ms)
  const formatTimestamp = (timestamp: string | number): string => {
    if (timestamp === undefined || timestamp === null || timestamp === "") return "";
    const n = typeof timestamp === "string" ? parseInt(timestamp, 10) : Number(timestamp);
    const ms = n < 1e12 ? n * 1000 : n;
    const date = new Date(ms);
    return date.toLocaleString("en-IN", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit", hour12: true,
    });
  };

  // ---- ACTIVE filter helpers (robust) ----
  const normStatus = (s: any) =>
    String(s ?? "")
      .toUpperCase()
      .replace(/\s+/g, "_")
      .replace(/^CLEARD\b/, "CLEARED"); // common typo

  const isActiveStatus = (raw: any) => {
    const n = normStatus(raw);
    if (!n) return false;
    if (/^CLEAR(?:ED|ING|D)?(?:_|$)/.test(n)) return false; // CLEAR, CLEARED, CLEARING, CLEARD
    return /^ACTIVE(?:_|$)/.test(n); // ACTIVE, ACTIVE_ACK, ACTIVE_UNACK
  };

  // Pull status from row (works for array/object)
  const rowStatus = (row: any) => {
    if (Array.isArray(row)) {
      // typical shape: [Device, Timestamp, Type, Severity, Status, ...]
      return row?.[5] ?? row?.[6] ?? "";
    }
    if (row && typeof row === "object") {
      return row.status || row.alarmStatus || row.state || "";
    }
    return "";
  };

  useEffect(() => {
    const fetchAlarmData = async () => {
      setLoading(true);
      try {
        const response = await AlarmLiveTableAPI({
          name: "Inverter",
          typeList: [],
          severityList: [],
          statusList: ["UNACK"],
          text: null,
          assigneeId: null
        }, timeWindowAlarm, true); // plant = true
        let apiData: any = null;

        if (response?.data && Array.isArray(response.data) && response.data.length > 0 && response.data[0]?.dataFromAPI) {
          apiData = response.data[0].dataFromAPI;
        } else if (response?.data?.dataFromAPI) {
          apiData = response.data.dataFromAPI;
        } else if (response?.data && Array.isArray(response.data)) {
          apiData = response.data;
        }

        if (apiData && Array.isArray(apiData) && apiData.length > 0) {
          // ✅ Only ACTIVE rows
          const activeRows = apiData.filter((r: any) => isActiveStatus(rowStatus(r)));
          setTotalAlarms(activeRows.length);

          const sorted = [...activeRows].sort((a: any[], b: any[]) => {
            const rA = severityRank(a?.[4]);
            const rB = severityRank(b?.[4]);
            if (rA !== rB) return rA - rB;
            const tA = Number(a?.[1] ?? 0);
            const tB = Number(b?.[1] ?? 0);
            return tB - tA;
          });

          const apiAlarms = sorted.slice(0, 4).map((alarm: any[], index: number) => {
            const deviceName = alarm?.[0] || "Unknown Device";
            const timestamp = formatTimestamp(alarm?.[1]);
            const type = alarm?.[3] || "Unknown";
            const severity = String(alarm?.[4] || "MINOR").toUpperCase();
            const statusRaw = rowStatus(alarm);
            const statusDisplay = normStatus(statusRaw).replace(/_/g, " "); // e.g., ACTIVE_UNACK -> ACTIVE UNACK

            return {
              id: (index + 1).toString(),
              type: mapSeverityToType(severity),
              // 👇 severity ke baad " - STATUS"
              message: `${deviceName} ${type} : ${severity} - ${statusDisplay}`,
              timestamp,
            } as AlarmData;
          });

          setAlarms(apiAlarms);
        } else {
          setAlarms([]);
          setTotalAlarms(0);
        }
      } catch {
        setAlarms([]);
        setTotalAlarms(0);
      } finally {
        setLoading(false);
      }
    };

    fetchAlarmData();
  }, [timeWindowAlarm]);

  // Right-side stats (unchanged)
  const { timeWindow: timeWindowPCSStatus } = useTimeHandle(5, "minute", "NONE", [5, "minute"]);
  const searchObjPCS = { devName: "pcs", keys: "ESS_PCSOperation" };
  const PCSStatusData = UseInverterStatus(searchObjPCS, timeWindowPCSStatus) || [0, 0, 0];

  const { timeWindow: timeWindowInverterStatus } = useTimeHandle(5, "minute", "NONE", [5, "minute"]);
  const searchObjInv = { devName: "Inverter", keys: "AC_Active_Power_Watt" };
  const PVStatusData = UseInverterStatus(searchObjInv, timeWindowInverterStatus) || [0, 0, 0];

  const { timeWindow: timeWindowInverterStatusSMB } = useTimeHandle(5, "minute", "NONE", [5, "minute"]);
  const searchObjSMB = { devName: "smb", keys: "Total_Amps" };
  const SMBStatusData = UseInverterStatus(searchObjSMB, timeWindowInverterStatusSMB) || [0, 0, 0];

  const rightRows = [
    {
      label: "Inverters",
      link: (PCSStatusData[2] + PVStatusData[2]),
      power: (PCSStatusData[0] + PVStatusData[0]),
      sum: (PCSStatusData[0] + PCSStatusData[1] + PCSStatusData[2] + PVStatusData[0] + PVStatusData[1] + PVStatusData[2]),
    },
    {
      label: "SMBs",
      link: SMBStatusData[2],
      power: SMBStatusData[0],
      sum: (SMBStatusData[0] + SMBStatusData[1] + SMBStatusData[2]),
    },
    { label: "IoT Device", link: 0, power: 2, sum: 2 },
    { label: "ESS Bank",   link: 0, power: 0, sum: 0 },
  ];

  const cardBg   = useColorModeValue("white", "#131512");
  const titleCol = useColorModeValue("#062D59", "white");
  const subCol   = useColorModeValue("#6B7280", "#A0AEC0");
  const divider  = useColorModeValue("#E7EDF3", "#2D3748");
  const alarmMessageColor = useColorModeValue("#1A202C", "black");
  const alarmTimestampColor = useColorModeValue("#4A5568", "black");

  // use Navigation
  const navigate = useNavigate()

  return (
    <Box height="100%" width="100%" bg={cardBg} overflow="hidden">
      <Flex flexDirection="column" h="100%">
        {/* Content row */}
        <Flex h="100%" gap={4} p={3}>
          {/* LEFT panel (header + list + footer) */}
          <Flex direction="column" flex="2" bg={useColorModeValue("#F9FBFF", "transparent")} rounded="lg" p={4} minW={0}>
            {/* Header INSIDE LEFT with bell + title + total */}
            <HStack justify="space-between" mb={3}>
              <HStack>
                <Icon as={MdNotifications} color="#1F7AEC" boxSize={5} />
                <Text fontWeight={800} color={titleCol}>Active Alarms</Text>
              </HStack>
              <Text fontSize="sm" color={subCol}>
                {loading ? "Loading..." : `${totalAlarms} total`}
              </Text>
            </HStack>

            {/* list */}
            <VStack align="stretch" spacing={3} flex="1" overflowY="auto" pr={1}>
              {loading ? (
                <VStack align="center" justify="center" flex="1">
                  <Text color={subCol}>Loading alarms...</Text>
                </VStack>
              ) : alarms.length === 0 ? (
                <VStack align="center" justify="center" flex="1">
                  <Text color={subCol}>No active alarms</Text>
                </VStack>
              ) : (
                alarms.map(a => (
                  <VStack key={a.id} bg={pillBg[a.type]} rounded="lg" px={3} py={3} align="stretch" spacing={0} minH="46px">
                    <HStack spacing={3} align="flex-start">
                      <Icon as={pillIcon[a.type]} color={pillIconColor[a.type]} boxSize={5} />
                      <VStack flex="1" align="stretch" spacing={0}>
                        <Text fontWeight="400" color={alarmMessageColor} fontSize="xs" lineHeight="1.2">{a.message}</Text>
                        <Text fontSize="xs" color={alarmTimestampColor} textAlign="right">{a.timestamp}</Text>
                      </VStack>
                    </HStack>
                  </VStack>
                ))
              )}
            </VStack>

            {/* footer */}
            <HStack mt={3} justify="flex-end">
              <Link fontSize="sm" color="#1F7AEC" onClick={() => navigate("/plantalarm")}>View More →</Link>
            </HStack>
          </Flex>

          {/* divider between left & right */}
          <Divider orientation="vertical" borderColor={divider} />

          {/* RIGHT stats */}
          <Flex direction="column" flex="1.2" rounded="lg" p={3} minW={0}>
            <VStack align="stretch" spacing={0} justify="space-between" h="100%">
              {rightRows.map((r, i) => (
                <VStack key={i} align="stretch" spacing={3} py={i === 0 ? 0 : 1.5}>
                  <Text fontWeight="800" color={titleCol}>{r.label}</Text>
                  <HStack justify="space-between" align="center">
                    <LinkStat value={r.link} />
                    <PowerStat value={r.power} />
                    <SigmaStat value={r.sum} />
                  </HStack>
                </VStack>
              ))}
            </VStack>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

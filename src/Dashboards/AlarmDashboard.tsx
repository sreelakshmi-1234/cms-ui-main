import {
  Box,
  Button,
  Flex,
  GridItem,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaCaretRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import PlantViewTableLayout from '../components/Layouts/TableLayouts/PlantViewTableLayout'
import PlantTable from '../components/widgets/tables/PlantTable'
import { h, html } from 'gridjs'
import { useTimeHandle } from '../Services/TimeWindowSetting'
import UseAlarmLiveTable from '../Services/Hooks/Alarm/UseAlarmLiveTable'
import swal from 'sweetalert'
import AlarmAckClrAPI from '../api/Alarm/AlarmAckClrAPI'
import TopRibbon, { NewTopRibbon } from '../components/TopRibbon'
import { useEffect, useState } from 'react'
import TimeDisplay from '../components/TimeDisplay'
import LandingTimeService from '../Services/LandingTimeService'
import { EnlargeWidgetSize } from '../Services/EnlargeWidget'
import GlobalLoader from '../components/GlobalLoader'
import AlarmFilterPanel, { SearchDevParams } from '../components/Filter/AlarmFilterPanel';
import AlarmDetailModal from '../components/Filter/AlarmDetailModal';

const Papa = require('papaparse');

const AlarmDashboard = () => {

  // ************ Landing Time Process **********
  LandingTimeService();

  // Loading State for dashboard
  const [showLoader, setShowLoader] = useState(true);

  // Simulate minimum loading time (2 sec)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const [refresh, setRefresh] = useState<number>(0);

  const handleClick = async (id: string, eventName: string, event: string) => {
    const val = await swal(`Are you sure want to do ${eventName}?`, { buttons: ["No", true] });
    if ((val)) {
      const responseAlarmEvent = await AlarmAckClrAPI(id, event);
      if (responseAlarmEvent?.status == 200) {
        await swal("Acknowledged!", "Alarm Event Successfull!", "success");
        setRefresh(refresh + 1); // refresh API with selected time window
      } else {
        swal("Error!", "Alarm Event Unsuccessfull!", "error");
      }
    }
  }

  // ******************** Alarm Table ***********************
  const {
    timeWindow: timeWindowAlarmLiveTable,
    handleTimeWindowChange: handleTimeWindowAlarmLiveTableChange,
    handleReset: handleAlarmLiveTableReset
  } = useTimeHandle(1, "day", "NONE", [1, "day"]);

  // State for API search parameters
  const [searchDev, setSearchDev] = useState<SearchDevParams>({
    name: "Inverter",
    typeList: [],
    severityList: [],
    statusList: ["UNACK"],
    text: null,
    assigneeId: null
  });

  // helper to compute status class (same mapping as PlantAlarmDashboard)
  const computeStatusClass = (rawStatus: string, createdTs?: number) => {
    const lc = (rawStatus || "").toLowerCase();
    const hasAck = /\back\b/i.test(lc) && !/unack/i.test(lc);
    const isActive = /active/i.test(lc) && !/cleared/i.test(lc);

    let isToday = false;
    if (!isNaN(createdTs as any)) {
      const created = new Date(Number(createdTs));
      const start = new Date(); start.setHours(0, 0, 0, 0);
      const end = new Date(start); end.setDate(end.getDate() + 1);
      isToday = created >= start && created < end;
    }

    if (/cleared/i.test(lc)) return "cleared";            // GREEN
    if (isActive && hasAck) return "active-ack";          // YELLOW
    if (isActive && !hasAck && isToday) return "active-today"; // RED
    if (isActive && !hasAck && !isToday) return "active-prev"; // ORANGE
    if (!isActive && /unack/i.test(lc)) return "active-today"; // fallback
    return "neutral";
  };

  const AlarmColumn = [
    { name: "Name", formatter: (cell: any) => html(`<center>${cell}</center>`) },
    "Device",
    {
      name: "Created Time",
      formatter: (cell: any) =>
        cell && !isNaN(parseInt(cell))
          ? new Date(parseInt(cell)).toLocaleString().replace(",", "")
          : ""
    },
    {
      name: "Resolved Time",
      formatter: (cell: any, row: any) => {
        // read status + created time for coloring logic
        const statusRaw = row?.cells?.[5]?.data ?? ""; // index 5 -> "Status" as defined below
        const createdRaw = row?.cells?.[2]?.data ?? ""; // index 2 -> "Created Time" 
        const createdTs = parseInt(createdRaw);

        const clsKey = computeStatusClass(String(statusRaw), createdTs);
        const ts = parseInt(cell);
        const text = (!cell || isNaN(ts) || ts === 0)
          ? "-"
          : new Date(ts).toLocaleString().replace(",", "");

        // map to small color classes
        const classMap: any = {
          "cleared": "rt--cleared",
          "active-ack": "rt--active-ack",
          "active-today": "rt--active-today",
          "active-prev": "rt--active-prev",
          "neutral": "rt--neutral",
        };

        const spanCls = classMap[clsKey] || "rt--neutral";
        return html(`<span class="${spanCls}">${text}</span>`);
      }
    },
    "Type",
    "Severity",
    {
      name: "Status",
      formatter: (cell: any, row: any) => {
        const raw = cell ? String(cell) : "";
        const label = raw.replace(/_/g, " ");
        const createdRaw = row?.cells?.[2]?.data ?? ""; 
        const createdTs = parseInt(createdRaw);
        const clsKey = computeStatusClass(raw, createdTs);
        const statusClassMap: any = {
          "cleared": "status--cleared",
          "active-ack": "status--active-ack",
          "active-today": "status--active-today",
          "active-prev": "status--active-prev",
          "neutral": "status--neutral",
        };
        return html(`<span class="${statusClassMap[clsKey]}">${label}</span>`);
      }
    },
    {
      name: 'Assignee',
      formatter: (cell: any) => {
        if (cell === null || cell === undefined) return 'Unassigned';
        if (typeof cell === 'object') {
          const first = cell.firstName || '';
          const last = cell.lastName || '';
          return html(`<center>${`${first} ${last}`.trim() || 'Unassigned'}</center>`);
        }
        return html(`<center>${String(cell)}</center>`);
      }
    },
    {
      name: "ACK",
      formatter: (cell: any, row: any) => {
        const rowHasData = row.cells.some((c: any) => c.data !== null && c.data !== "");
        if (!rowHasData || cell === null) return "";

        return h('button', {
          style: {
            color: "white",
            background: "blue",
            padding: "5px",
            borderRadius: "10px",
            fontFamily: "inter",
            fontWeight: 600,
            letterSpacing: "1px",
            cursor: "pointer"
          },
          onClick: () => handleClick(cell, "send acknowledge", "ack")
        }, 'ACK');
      }
    },
    {
      name: "Clear",
      formatter: (cell: any, row: any) => {
        const rowHasData = row.cells.some((c: any) => c.data !== null && c.data !== "");
        if (!rowHasData || cell === null) return "";

        return h('button', {
          style: {
            color: "white",
            background: "red",
            padding: "5px",
            borderRadius: "10px",
            fontFamily: "inter",
            fontWeight: 600,
            letterSpacing: "1px",
            cursor: "pointer"
          },
          onClick: () => handleClick(cell, "clear alarm", "clear")
        }, 'CLR');
      }
    },
    {
      name: 'Detail',
      width: '64px',
      formatter: (_cell: any, row: any) =>
        h(
          'button',
          {
            title: 'Details',
            'aria-label': 'Details',
            style: {
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '20px',
              lineHeight: '1',
              padding: '2px 6px',
              borderRadius: '6px',
            },
            onClick: () => openDetails(row),
            onmouseover: (e: any) => (e.target.style.background = '#f1f5f9'),
            onmouseout:  (e: any) => (e.target.style.background = 'transparent'),
          },
          '⋮' // vertical ellipsis
        ),
    }
  ] as any[];

  // State for Alarm Detail modal
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailData, setDetailData] = useState<any | null>(null);

  const openDetails = (row: any) => {
    const cells = row?.cells ?? [];
    const createdRaw = cells?.[2]?.data;
    const resolvedRaw = cells?.[3]?.data;
    const mapped: any = {
      device: String(cells?.[1]?.data ?? ''),
      createdTs: !isNaN(parseInt(createdRaw)) ? parseInt(createdRaw) : undefined,
      resolvedTs: !isNaN(parseInt(resolvedRaw)) ? parseInt(resolvedRaw) : undefined,
      type: String(cells?.[4]?.data ?? ''),
      severity: String(cells?.[5]?.data ?? ''),
      status: String(cells?.[6]?.data ?? ''),
      assignee: cells?.[7]?.data ?? 'Unassigned',
      ackId: cells?.[8]?.data ?? null,
      clrId: cells?.[9]?.data ?? null,
    };
    setDetailData(mapped);
    setDetailOpen(true);
  };

  const AlarmLiveTable = UseAlarmLiveTable(searchDev, timeWindowAlarmLiveTable, refresh) as any;

  const downloadCSV = () => {
    let csvData: any[] = [];
    if (AlarmLiveTable) {
      csvData.push(["Name", "Device", "Created Time", "Resolved Time", "Type", "Severity", "Status", "Assignee", "ACK", "Clear"]);
      csvData.push(...AlarmLiveTable[0].dataFromAPI);
      const csv = Papa.unparse(csvData);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.setAttribute('download', `Alarms.csv`);
      downloadLink.click();
    }
  }

  // legend colors for light/dark
  const legendBg = useColorModeValue('white', 'gray.800');
  const legendBorder = useColorModeValue('#e5e7eb', 'rgba(255,255,255,0.18)');

  return (
    <>
      {showLoader && <GlobalLoader />}
      {/* Row highlight + ResolvedTime color classes */}
      <style>{`
        /* Row highlight via :has() on status span */
        .gridjs-tr:has(.status--cleared) {
          background: #dcfce7 !important;         /* green-100 */
          box-shadow: inset 4px 0 0 0 #22c55e;    /* green-500 */
        }
        .gridjs-tr:has(.status--active-today) {
          background: #fee2e2 !important;         /* red-100 */
          box-shadow: inset 4px 0 0 0 #ef4444;    /* red-500 */
        }
        .gridjs-tr:has(.status--active-prev) {
          background: #ffedd5 !important;         /* orange-100 */
          box-shadow: inset 4px 0 0 0 #f97316;    /* orange-500 */
        }
        .gridjs-tr:has(.status--active-ack) {
          background: #fef9c3 !important;         /* yellow-100 */
          box-shadow: inset 4px 0 0 0 #eab308;    /* yellow-500 */
        }

        /* Resolved Time inline text colors */
        .rt--cleared { color: #15803d; font-weight: 600; }      /* green-700 */
        .rt--active-today { color: #b91c1c; font-weight: 600; } /* red-700 */
        .rt--active-prev { color: #c2410c; font-weight: 600; }  /* orange-700 */
        .rt--active-ack { color: #a16207; font-weight: 600; }   /* yellow-700 */
        .rt--neutral { color: inherit; }
      `}</style>

      <Box display={showLoader ? "none" : "block"} mt={"87px"} minH={"1000px"} w="1816px" ml={10} px={{ base: 2, sm: 12, md: 17 }}>
        {/* ****************** TOP RIBBON ************ */}
        <NewTopRibbon />

        <SimpleGrid
          h={EnlargeWidgetSize(600)}
          minChildWidth={"full"}
          gap={1}
          mb={3}
        >
          <GridItem h={"max-content"} w={"1816px"} colSpan={1} rowSpan={1}>
            <PlantViewTableLayout
              title='Alarms'
              width={["full", "100%"]}
              height={"540px"}
              timeWindow={true}
              onTimeWindowChange={handleTimeWindowAlarmLiveTableChange}
              onReset={handleAlarmLiveTableReset}
              fullscreen={true}
            >
              {/* Legend inside the card */}
              <Box position="relative" pb="72px">
                <Box mb={2}>
                  <AlarmFilterPanel
                    compact
                    wrapperSx={{ ml: '4px' }}
                    offsetX={4}
                    offsetY={6}
                    onApply={params => {
                      setSearchDev(params);
                      setRefresh(r => r + 1);
                    }}
                  />
                </Box>
                <PlantTable
                  pagination={true}
                  column={AlarmColumn}
                  apiData={AlarmLiveTable || []}
                  autoWidth={false}
                  width='full'
                  fullScreen={false}
                  paginationLimitProps={8}
                />

                {/* Alarm detail modal (opened when user clicks a name) */}
                <AlarmDetailModal
                  isOpen={detailOpen}
                  onClose={() => setDetailOpen(false)}
                  data={detailData}
                  onAck={(id: string) => {
                    // reuse existing handleClick flow for ack
                    handleClick(id, 'send acknowledge', 'ack');
                    setDetailOpen(false);
                    setRefresh(r => r + 1);
                  }}
                  onClear={(id: string) => {
                    handleClick(id, 'clear alarm', 'clear');
                    setDetailOpen(false);
                    setRefresh(r => r + 1);
                  }}
                  plant={false}
                  setRefresh={() => setRefresh(prev => prev+1)}
                />

                {/* Legend: bottom-right, slightly lower */}
                <Box
                  width={'100%'}
                  bg={legendBg}
                  borderTop={`1px solid ${legendBorder}`}
                  px="12px"
                  py="8px"
                  zIndex={2}
                  as={Flex}
                  justify={'end'}
                  align={'baseline'}
                  mt={2}
                >
                  <Flex align="center" gap="14px" wrap="wrap">
                    <Flex align="center" gap="6px">
                      <Box w="10px" h="10px" borderRadius="2px" bg="#dcfce7" boxShadow="inset 10px 0 0 0 #22c55e" />
                      <Box as="span" fontSize="xs">Cleared</Box>
                    </Flex>
                    <Flex align="center" gap="6px">
                      <Box w="10px" h="10px" borderRadius="2px" bg="#fee2e2" boxShadow="inset 10px 0 0 0 #ef4444" />
                      <Box as="span" fontSize="xs">Active (Today) — UNACK</Box>
                    </Flex>
                    <Flex align="center" gap="6px">
                      <Box w="10px" h="10px" borderRadius="2px" bg="#ffedd5" boxShadow="inset 10px 0 0 0 #f97316" />
                      <Box as="span" fontSize="xs">Active (Previous) — UNACK</Box>
                    </Flex>
                    <Flex align="center" gap="6px">
                      <Box w="10px" h="10px" borderRadius="2px" bg="#fef9c3" boxShadow="inset 10px 0 0 0 #eab308" />
                      <Box as="span" fontSize="xs">Active — ACK</Box>
                    </Flex>
                  </Flex>
                </Box>
              </Box>
            </PlantViewTableLayout>

            <Flex justify={"center"} mt={5}>
              <Button
                fontFamily={"Open Sans, sans-serif"}
                fontSize={EnlargeWidgetSize(16) + "px"}
                h={"auto"}
                letterSpacing={2}
                color={"#000"}
                cursor={"pointer"}
                border={"2px solid"}
                p={["0.25em 0.75em", "0.25em 0.5em"]}
                boxShadow={"1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px"}
                userSelect={"none"}
                position={"relative"}
                _active={{
                  boxShadow: "0px 0px 0px 0px",
                  top: "5px",
                  left: "5px"
                }}
                onClick={downloadCSV}
              >
                Download CSV
              </Button>
            </Flex>
          </GridItem>
        </SimpleGrid>
      </Box>
    </>
  );
}

export default AlarmDashboard;

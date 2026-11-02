import {
  Box,
  Button,
  Flex,
  GridItem,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react'
import PlantViewTableLayout from '../components/Layouts/TableLayouts/PlantViewTableLayout'
import PlantTable from '../components/widgets/tables/PlantTable'
import { h, html } from 'gridjs'
import { useTimeHandle } from '../Services/TimeWindowSetting'
import UseAlarmLiveTable from '../Services/Hooks/Alarm/UseAlarmLiveTable'
import swal from 'sweetalert'
import AlarmAckClrAPI from '../api/Alarm/AlarmAckClrAPI'
import { NewTopRibbon } from '../components/TopRibbon'
import { useEffect, useState } from 'react'
import LandingTimeService from '../Services/LandingTimeService'
import GlobalLoader from '../components/GlobalLoader'
// Filter panel
import AlarmFilterPanel, { 
  AlarmFilterState, 
  AlarmSeverity, 
  AlarmStatus,
  SearchDevParams 
} from '../components/Filter/AlarmFilterPanel'
import AlarmDetailModal, { AlarmDetailData } from '../components/Filter/AlarmDetailModal'
const Papa = require('papaparse')


const PlantAlarmDashboard = () => {
  // ************ Landing Time Process **********
  LandingTimeService();

  // Loading State for dashboard
  const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const [refresh, setRefresh] = useState<number>(0);

  const handleClick = async (id: string, eventName: string, event: string) => {
    const val = await swal(`Are you sure want to do ${eventName}?`, { buttons: ['No', true] });
    if (val) {
      const responseAlarmEvent = await AlarmAckClrAPI(id, event);
      if (responseAlarmEvent?.status == 200) {
        await swal('Acknowledged!', 'Alarm Event Successfull!', 'success');
        setRefresh((r) => r + 1);
      } else {
        swal('Error!', 'Alarm Event Unsuccessfull!', 'error');
      }
    }
  }

  // ******************** Alarm Table ***********************
  const {
    timeWindow: timeWindowAlarmLiveTable,
    handleTimeWindowChange: handleTimeWindowAlarmLiveTableChange,
    handleReset: handleAlarmLiveTableReset
  } = useTimeHandle(1, 'day', 'NONE', [1, 'day']);

    // UI-only filter state
  const [filters, setFilters] = useState<AlarmFilterState>({
    statuses: ['Active'], // Default to Active status
    severities: [], // No default severity
    types: [], // No default types
    assignee: null, // No default assignee
    timeRange: { preset: 'all' },
  });
  
  // State for API search parameters
  const [searchDevParams, setSearchDevParams] = useState<SearchDevParams>({
    name: "Inverter",
    typeList: [],
    severityList: [],
    statusList: ["ACTIVE"],
    text: null,
    assigneeId: null
  });

  // -------- Details modal state --------
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected] = useState<AlarmDetailData | null>(null);

  const openDetails = (row: any) => {
    // map current gridjs row -> modal data
    const cells = row?.cells ?? [];
    const createdRaw = cells?.[1]?.data;
    const resolvedRaw = cells?.[2]?.data;
    const mapped: AlarmDetailData = {
      device: String(cells?.[0]?.data ?? ''),
      createdTs: !isNaN(parseInt(createdRaw)) ? parseInt(createdRaw) : undefined,
      resolvedTs: !isNaN(parseInt(resolvedRaw)) ? parseInt(resolvedRaw) : undefined,
      type: String(cells?.[3]?.data ?? ''),
      severity: String(cells?.[4]?.data ?? ''),
      status: String(cells?.[5]?.data ?? ''),
      assignee: cells?.[6]?.data ?? 'Unassigned',
      ackId: cells?.[7]?.data ?? null,
      clrId: cells?.[8]?.data ?? null,
    };
    setSelected(mapped);
    setDetailOpen(true);
  };

  // ---------- Columns ----------
  const AlarmColumn = [
    { name: 'Device', formatter: (cell: any) => html(`<center>${cell}</center>`) },
    {
      name: 'Created Time',
      formatter: (cell: any) =>
        cell && !isNaN(parseInt(cell))
          ? new Date(parseInt(cell)).toLocaleString().replace(',', '')
          : ''
    },
    {
      name: 'Resolved Time',
      formatter: (cell: any) => {
        const ts = parseInt(cell);
        if (!cell || isNaN(ts) || ts === 0) return '-';
        return new Date(ts).toLocaleString().replace(',', '');
      }
    },
    'Type',
    'Severity',
    {
      name: 'Status',
      formatter: (cell: any, row: any) => {
        const raw = cell ? String(cell) : '';
        const label = raw.replace(/_/g, ' ');
        const lc = raw.toLowerCase();

        const hasAck = /\back\b/i.test(lc) && !/unack/i.test(lc);
        const isActive = /active/i.test(lc) && !/cleared/i.test(lc);

        const createdRaw = row?.cells?.[1]?.data ?? '';
        const createdTs = parseInt(createdRaw);
        let isToday = false;
        if (!isNaN(createdTs)) {
          const created = new Date(createdTs);
          const start = new Date(); start.setHours(0, 0, 0, 0);
          const end = new Date(start); end.setDate(end.getDate() + 1);
          isToday = created >= start && created < end;
        }

        let cls = 'status--neutral';
        if (/cleared/i.test(lc)) {
          cls = 'status--cleared';
        } else if (isActive && hasAck) {
          cls = 'status--active-ack';
        } else if (isActive && !hasAck && isToday) {
          cls = 'status--active-today';
        } else if (isActive && !hasAck && !isToday) {
          cls = 'status--active-prev';
        } else if (!isActive && /unack/i.test(lc)) {
          cls = 'status--active-today';
        }

        return html(`<span class="${cls}">${label}</span>`);
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
      name: 'ACK',
      formatter: (cell: any, row: any) => {
        const rowHasData = row.cells.some((c: any) => c.data !== null && c.data !== '');
        if (!rowHasData || cell === null) return '';
        return h('button', {
          style: {
            color: 'white',
            background: 'blue',
            padding: '5px',
            borderRadius: '10px',
            fontFamily: 'inter',
            fontWeight: 600,
            letterSpacing: '1px',
            cursor: 'pointer'
          },
          onClick: () => handleClick(cell, 'send acknowledge', 'ack')
        }, 'ACK');
      }
    },
    {
      name: 'Clear',
      formatter: (cell: any, row: any) => {
        const rowHasData = row.cells.some((c: any) => c.data !== null && c.data !== '');
        if (!rowHasData || cell === null) return '';
        return h('button', {
          style: {
            color: 'white',
            background: 'red',
            padding: '5px',
            borderRadius: '10px',
            fontFamily: 'inter',
            fontWeight: 600,
            letterSpacing: '1px',
            cursor: 'pointer'
          },
          onClick: () => handleClick(cell, 'clear alarm', 'clear')
        }, 'CLR');
      }
    },
    // Detail column (vertical dots)
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
    },
  ];

  const AlarmLiveTable = UseAlarmLiveTable(searchDevParams, timeWindowAlarmLiveTable, refresh, true) as any;

  const downloadCSV = () => {
    var csvData: any[] = [];
    if (AlarmLiveTable) {
      csvData.push(['Device', 'Created Time', 'Resolved Time', 'Type', 'Severity', 'Status', 'Assignee', 'ACK', 'Clear']);
      csvData.push(...AlarmLiveTable[0].dataFromAPI);
      var csv = Papa.unparse(csvData);
      var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      var downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.setAttribute('download', 'Alarms.csv');
      downloadLink.click();
    }
  }

  // legend colors for light/dark
  const legendBg = useColorModeValue('white', 'gray.800');
  const legendBorder = useColorModeValue('#e5e7eb', 'rgba(255,255,255,0.18)');

  return (
    <>
      {showLoader && <GlobalLoader />}

      {/* Row highlight only Uses :has() on status span */}
      <style>{`
        .gridjs-tr:has(.status--cleared) {
          background: #dcfce7 !important;
          box-shadow: inset 4px 0 0 0 #22c55e;
        }
        .gridjs-tr:has(.status--active-today) {
          background: #fee2e2 !important;
          box-shadow: inset 4px 0 0 0 #ef4444;
        }
        .gridjs-tr:has(.status--active-prev) {
          background: #ffedd5 !important;
          box-shadow: inset 4px 0 0 0 #f97316;
        }
        .gridjs-tr:has(.status--active-ack) {
          background: #fef9c3 !important;
          box-shadow: inset 4px 0 0 0 #eab308;
        }
      `}</style>

      <Box display={showLoader ? 'none' : 'block'} mt={'87px'} minH={'1000px'} w="1816px" ml={10} px={{ base: 2, sm: 12, md: 17 }}>
        <NewTopRibbon />

        <SimpleGrid h={600} minChildWidth={'full'} gap={1} mb={3}>
          <GridItem h={'max-content'} w={'1816px'} colSpan={1} rowSpan={1}>
            <PlantViewTableLayout
              title='Alarms'
              width={['full', '100%']}
              height='540px'
              timeWindow={true}
              onTimeWindowChange={handleTimeWindowAlarmLiveTableChange}
              onReset={handleAlarmLiveTableReset}
              fullscreen={true}
            >
              <Box position="relative" pb="4">
                <Box mb={2}>
                  <AlarmFilterPanel
                    compact
                    initial={filters}
                    assignees={[]}
                    typeSuggestions={['Zero Generation', 'Overtemperature', 'Isolation Fault']}
                    wrapperSx={{ ml: '4px' }}
                    offsetX={4}
                    offsetY={6}
                    onApply={(searchParams) => {
                      // Update the search parameters for the API
                      setSearchDevParams(searchParams);
                      // Trigger a refresh
                      setRefresh(prev => prev + 1);
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

                {AlarmLiveTable && AlarmLiveTable.length > 0 ? (
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
                        <Box as="span" fontSize="xs">Active (Today)</Box>
                      </Flex>
                      <Flex align="center" gap="6px">
                        <Box w="10px" h="10px" borderRadius="2px" bg="#ffedd5" boxShadow="inset 10px 0 0 0 #f97316" />
                        <Box as="span" fontSize="xs">Active (History)</Box>
                      </Flex>
                      <Flex align="center" gap="6px">
                        <Box w="10px" h="10px" borderRadius="2px" bg="#fef9c3" boxShadow="inset 10px 0 0 0 #eab308" />
                        <Box as="span" fontSize="xs">Active — ACK</Box>
                      </Flex>
                    </Flex>
                  </Box>
                ) : null}
              </Box>
            </PlantViewTableLayout>

            <Flex justify={'center'} mt={5}>
              <Button
                fontFamily={'Open Sans, sans-serif'}
                fontSize={'16px'}
                letterSpacing={2}
                color={'#000'}
                cursor={'pointer'}
                border={'2px solid'}
                p={['0.25em 0.75em', '0.25em 0.5em']}
                boxShadow={'1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px'}
                userSelect={'none'}
                position={'relative'}
                _active={{
                  boxShadow: '0px 0px 0px 0px',
                  top: '5px',
                  left: '5px'
                }}
                onClick={downloadCSV}
              >
                Download CSV
              </Button>
            </Flex>
          </GridItem>
        </SimpleGrid>
      </Box>

      {/* Details Modal */}
      <AlarmDetailModal
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        data={selected}
        onAck={(id : string) => handleClick(id, 'send acknowledge', 'ack')}
        onClear={(id : string) => handleClick(id, 'clear alarm', 'clear')}
        plant={true}
        setRefresh={() => setRefresh(prev => prev+1)}
      />
    </>
  );
}

export default PlantAlarmDashboard;

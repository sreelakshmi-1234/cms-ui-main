import { useEffect, useMemo, useRef, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { MdDownload, MdFullscreen, MdOutlineLogin } from 'react-icons/md';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import useAuth from '../../../../Services/Hooks/UseAuth';
import UsePortfolioTable from '../../../../Services/Hooks/Portfolio/UsePortfolioTable';
import { useSelectedCustomerIDContext } from '../../../../Context/SelectedCustomerIDContext';
import { PlantTimeZoneSelection } from '../../../../Services/CustomerHandlingService';
import { useNavigate } from 'react-router';
import AssetTableSummary from './AssetTableSummary';
const Papa = require('papaparse');

type PortfolioTable = {
  name: string | null;
  createdTime: string | null;
  country : string | null;
  type: string | null;
  category: string | null;
  action? : string | null;
  isActive? : boolean | null;
  latestUpdateTime? : string | null;
  totalPower? : number | null;
  totalEnergy? : number | null;
  subRows?: PortfolioTable[]; //Each PortfolioTable can have sub rows of more people
};


const PortfolioTableContent = () => {
    const { selectedCustomerID, setSelectedCustomerID } = useSelectedCustomerIDContext();
    const navigate = useNavigate()
    const handleRedirectTOPlant = async (id : string) => {
        setSelectedCustomerID(id);
        localStorage.setItem("SelectedCustomerId", id || "");
        PlantTimeZoneSelection(id);
        navigate("/plantview")
        // window.location.reload();
    }

    // Full Screen Logic

    const fullscreenRef = useRef<HTMLDivElement>(null);
    const [isFullScreen, setFullScreen] = useState(false);

  const handleEnterFullscreen = () => {
    const elem = fullscreenRef.current;
    if (elem) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if ((elem as any).webkitRequestFullscreen) {
        (elem as any).webkitRequestFullscreen(); // Safari
      } else if ((elem as any).msRequestFullscreen) {
        (elem as any).msRequestFullscreen(); // IE/Edge
      }
    }
  };

  const handleExitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      handleEnterFullscreen();
      setFullScreen(true)
    } else {
      handleExitFullscreen();
      setFullScreen(false)
    }
  };

  useEffect(() => {
  const handleFullscreenChange = () => {
    const isFullscreen = !!document.fullscreenElement;
    setFullScreen(isFullscreen);
  };

  document.addEventListener("fullscreenchange", handleFullscreenChange);
  document.addEventListener("webkitfullscreenchange", handleFullscreenChange); // Safari
  document.addEventListener("mozfullscreenchange", handleFullscreenChange); // Firefox
  document.addEventListener("MSFullscreenChange", handleFullscreenChange); // IE/Edge

  return () => {
    document.removeEventListener("fullscreenchange", handleFullscreenChange);
    document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
    document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
  };
}, []);

    
    const data: PortfolioTable[] = UsePortfolioTable()
  const columns = useMemo<MRT_ColumnDef<PortfolioTable>[]>(
    //column definitions...
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'type',
        header: 'Type',
      },
      {
        accessorKey: 'isActive',
        header: 'Status',
        Cell : ({row}) => {
            const val = row.original.isActive
            const green = "#5EDA70"
            const red = "#FF4646"
            if(val) {
                return (<Flex width={"100%"} justify={"center"}><Text fontWeight={600} bg={"rgba(94, 218, 112, 0.3)"} width={"min-content"} p={1} rounded={"lg"} color={green}>Active</Text></Flex>) 
            } else if(val == false) {
                return (<Flex width={"100%"} justify={"center"}><Text fontWeight={600} bg={"rgba(255, 70, 70, 0.3)"} width={"min-content"} p={1} rounded={"lg"} color={red}>Inactive</Text></Flex>)
            } else {
                return null
            }
        }
      },
      {
        accessorKey: 'totalPower',
        header: 'Power kW',
        Cell : ({row}) => {
            return (row.original.totalPower)? (row.original.totalPower).toFixed(2) : (row.original.totalPower)
        }
      },
      {
        accessorKey: 'totalEnergy',
        header: 'Energy kWh',
        Cell : ({row}) => {
            return (row.original.totalEnergy)? (row.original.totalEnergy).toFixed(2) : (row.original.totalEnergy)
        }
      },
      {
      id: 'action', // Unique ID for the column
      header: 'Action',
      Cell: ({ row }) => {
        const userId = row.original.action; // Extract the user ID from the row data
        if(userId == undefined || userId == null) {
            return (<></>)
        } else {
            return (
              <button
                onClick={() => handleRedirectTOPlant(userId)} // Call the function with the user ID
                style={{ cursor: 'pointer', border: 'none', background: 'none' }}
              >
                {/* Render a login logo (e.g., an image or icon) */}
                <MdOutlineLogin size={15} />
              </button>
            );
        }
      },
    },
    {
    accessorKey: 'createdTime',
    header: 'Created Time',
    },
    {
    accessorKey: 'latestUpdateTime',
    header: 'Last Update Time',
    Cell : ({row}) => {
        return row.original.latestUpdateTime? row.original.latestUpdateTime.replace('T', ' ').replace('Z', '') : row.original.latestUpdateTime
    }
    },
    {
    accessorKey: 'category',
    header: 'Category',
    },
    {
    accessorKey: 'country',
    header: 'Country',
    },
    ],
    [],
    //end
  );

const flattenPortfolioData = (rows: any[], parentName: string = ''): any[] => {
  return rows.flatMap(row => {
    const {
      name,
      type,
      isActive,
      totalPower,
      totalEnergy,
      createdTime,
      latestUpdateTime,
      category,
      country,
    } = row;

    const flatRow = {
      name: parentName ? `${parentName} > ${name}` : name,
      type: type || '',
      status: typeof isActive === 'boolean' ? (isActive ? 'Active' : 'Inactive') : '',
      power_kW: totalPower?.toFixed(2) || '',
      energy_kWh: totalEnergy?.toFixed(2) || '',
      createdTime,
      lastUpdateTime: latestUpdateTime?.replace('T', ' ').replace('Z', '') || '',
      category: category || '',
      country: country || '',
    };

    const children = row.subRows?.length ? flattenPortfolioData(row.subRows, flatRow.name) : [];

    return [flatRow, ...children];
  });
};

const handleExportData = () => {
  const flatData = flattenPortfolioData(data); // data = your table's full data array

  const csv = Papa.unparse(flatData);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Assets.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};




  const table = useMaterialReactTable({
    columns,
    data,
    enableExpandAll: false, //hide expand all double arrow in column header
    enableStickyHeader : true,
    enableExpanding: true,
    filterFromLeafRows: true, //apply filtering to all rows instead of just parent rows
    getSubRows: (row) => row.subRows, //default
    // initialState: { expanded: true }, //expand all rows by default
    enableBottomToolbar: true,
    enableFullScreenToggle: false,
    enableDensityToggle : false,
    paginateExpandedRows: false, //When rows are expanded, do not count sub-rows as number of rows on the page towards pagination
     
    // style for table
    muiTableContainerProps : {
        sx : {
            textAlign : 'center',
            boxShadow : 'none',
            // border : 'none',
            height : isFullScreen ? "90vh" : "234px",
            fontFamily : "Montserrat",
            border : "5px solid white"
            // zIndex: 9000000000000000
        }
    },

    // Style for Header
    muiTableHeadProps : {
        sx : {
            height : '30px'
        }
    },
    muiTableHeadCellProps : {
        sx : {
            backgroundColor : "#DDE3E8",
            border : "1px solid #DDE3E8",
            height : "30px",
            fontFamily : "Montserrat",
            fontWeight : 600,
            fontSize : '12px',
            overflow : 'hidden',
            textAlign : 'center',
            // padding : 0,
            paddingLeft: '2rem'
        }
    },

    // Style for body

    muiTableBodyCellProps : {
        sx : {
            border : '1px solid #DDE3E8',
            color : '#062D59',
            fontFamily : "Montserrat",
            fontSize : '10px',
            fontWeight : 400,
            textAlign : 'center',
            textOverflow : 'unset',
            height : "40px",
            padding : 0
        }
    },


    muiBottomToolbarProps: {
    sx: {
      '& .MuiFormLabel-root .MuiInputBase-root' : {
        fontSize : "14px"
      }
    },
  },

  muiTopToolbarProps : {
    sx : {
        '& .MuiSvgIcon-root': {
        color: '#062D59',
        fontSize : 20
      },
    }
  },
  
  // ✅ Inject right-aligned title here
    renderTopToolbarCustomActions: () => (
        <Box display="flex" width={"100%"} justifyContent={"space-between"}>
            <Box display="flex" justifyContent="flex-start" width="100%" px={4}  mt={2}>
                <Text fontSize="18px" fontWeight="600" color="#062D59" pr={4}>
                    Assets
                </Text>
                <AssetTableSummary />
            </Box>
            <Box display={"flex"} dir='row' gap={"5px"} mt={"0px"}>
                <Button 
                    p={"5px"}
                    borderRadius={"50%"}
                    onClick={toggleFullscreen} 
                    _hover={{
                        bg : "rgba(0, 0, 0, 0.04)"
                    }}
                    cursor={"pointer"}
                    mt={"1px"}
                >
                    <MdFullscreen size={20} color="#062D59" />
                </Button>
                <Button
                    _hover={{
                        bg : "rgba(0, 0, 0, 0.04)"
                    }}
                    p={"5px"}
                    borderRadius={"50%"}
                    onClick={handleExportData}
                    cursor = 'pointer'
                    mt={"2px"}
                ><MdDownload size={20} color="#062D59" />
                </Button>
            </Box>
        </Box>
    ),
  });

  return (
    <Box
        w="100%" 
        h={"100%"}
        ref={fullscreenRef}
        bg={"white"}
    >
        <MaterialReactTable table={table} />
    </Box>
  );
};

export default PortfolioTableContent;

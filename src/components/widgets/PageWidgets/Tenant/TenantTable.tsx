import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { MdOutlineLogin } from 'react-icons/md';
import { Box, Flex, Text } from '@chakra-ui/react';
import useAuth from '../../../../Services/Hooks/UseAuth';
import UseTenantTable from '../../../../Services/Hooks/Tenant/UseTenantTable';

type TenantTable = {
  name: string | null;
  createdTime: string | null;
  country: string | null;
  type: string | null;
  category: string | null;
  action?: string | null;
  isActive?: boolean | null;
  latestUpdateTime?: string | null;
  totalPower?: number | null;
  totalEnergy?: number | null;
  subRows?: TenantTable[]; //Each TenantTable can have sub rows of more people
};

const TenantTable = ({ setTenantLoading }: { setTenantLoading: (v: boolean) => void }) => {
  const { loginByUserId } = useAuth();
  const handleLogin = async (id: string) => {
    try {
      setTenantLoading(true);   // loader start
      await loginByUserId(id);
    } finally {
      setTenantLoading(false);  // loader stop
    }
  }

  const data: TenantTable[] = UseTenantTable()
  const columns = useMemo<MRT_ColumnDef<TenantTable>[]>(
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
        Cell: ({ row }) => {
          const val = row.original.isActive
          const green = "#5EDA70"
          const red = "#FF4646"
          if (val) {
            return (<Flex width={"100%"} justify={"center"}><Text fontWeight={600} bg={"rgba(94, 218, 112, 0.3)"} width={"min-content"} p={1} rounded={"lg"} color={green}>Active</Text></Flex>)
          } else if (val == false) {
            return (<Flex width={"100%"} justify={"center"}><Text fontWeight={600} bg={"rgba(255, 70, 70, 0.3)"} width={"min-content"} p={1} rounded={"lg"} color={red}>Inactive</Text></Flex>)
          } else {
            return null
          }
        }
      },
      {
        accessorKey: 'totalPower',
        header: 'Power kW',
        Cell: ({ row }) => {
          return (row.original.totalPower) ? (row.original.totalPower).toFixed(2) : (row.original.totalPower)
        }
      },
      {
        accessorKey: 'totalEnergy',
        header: 'Energy kWh',
        Cell: ({ row }) => {
          return (row.original.totalEnergy) ? (row.original.totalEnergy).toFixed(2) : (row.original.totalEnergy)
        }
      },
      {
        id: 'action', // Unique ID for the column
        header: 'Action',
        Cell: ({ row }) => {
          const userId = row.original.action; // Extract the user ID from the row data
          if (userId == undefined || userId == null) {
            return (<></>)
          } else {
            return (
              <button
                onClick={() => handleLogin(userId)} // Call the function with the user ID
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
        Cell: ({ row }) => {
          return row.original.latestUpdateTime ? row.original.latestUpdateTime.replace('T', ' ').replace('Z', '') : row.original.latestUpdateTime
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
    [setTenantLoading], // Fix dependency
    //end
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableExpandAll: false, //hide expand all double arrow in column header
    enableStickyHeader: true,
    enableExpanding: true,
    filterFromLeafRows: true, //apply filtering to all rows instead of just parent rows
    getSubRows: (row) => row.subRows, //default
    // initialState: { expanded: true }, //expand all rows by default
    enableBottomToolbar: true,
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    paginateExpandedRows: false, //When rows are expanded, do not count sub-rows as number of rows on the page towards pagination

    // style for table
    muiTableContainerProps: {
      sx: {
        paddingRight: '5px !important',
        paddingLeft: '5px !important',
        textAlign: 'center',
        boxShadow: 'none',
        border: 'none',
        height: "600px",
        // zIndex: 9000000000000000
      }
    },

    // Style for Header
    muiTableHeadProps: {
      sx: {
        height: '30px'
      }
    },
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: "#DDE3E8",
        border: "1px solid #DDE3E8",
        height: "30px",
        fontFamily: "Montserrat",
        fontWeight: 600,
        fontSize: '12px',
        overflow: 'hidden',
        textAlign: 'center',
        // padding : 0,
        paddingLeft: '2rem'
      }
    },

    // Style for body
    muiTableBodyCellProps: {
      sx: {
        border: '1px solid #DDE3E8',
        color: '#062D59',
        fontFamily: "Montserrat",
        fontSize: '10px',
        fontWeight: 400,
        textAlign: 'center',
        textOverflow: 'unset',
        height: "40px",
        padding: 0
      }
    },


    muiBottomToolbarProps: {
      sx: {
        fontSize: '5px'
      },
    },

  });

  return (
    <Box
      maxW="1920px"
    >
      <MaterialReactTable table={table} />
    </Box>
  );
};

export default TenantTable;

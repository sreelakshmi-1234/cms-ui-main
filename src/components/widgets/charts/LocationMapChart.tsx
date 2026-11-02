import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Badge, Box, HStack, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { FaSolarPanel } from "react-icons/fa";
import { GiWindTurbine, GiPowerGenerator } from "react-icons/gi";
import { TbBattery4 } from "react-icons/tb";
import { renderToString } from 'react-dom/server';

interface dataType {
  country: string;
  broadType: string;
  PV: number;
  BESS: number;
  WIND: number;
  lat: number;
  long: number;
  name: string;
  type: string;
  capacity?: number;
  device_info?: Record<string, any>[];
}

interface LocationMapChartProps {
  apiData: dataType[];
}

const MAPTILER_API_KEY = '8plZSVfrtEFEQPLBRvw2';
const MAP_STYLES = {
  satellite: `https://api.maptiler.com/maps/hybrid/style.json?key=${MAPTILER_API_KEY}`,
  demo : `https://demotiles.maplibre.org/style.json?key=${MAPTILER_API_KEY}`,
  street : `https://api.maptiler.com/maps/streets/style.json?key=${MAPTILER_API_KEY}`,
  basic : `https://api.maptiler.com/maps/basic/style.json?key=${MAPTILER_API_KEY}`,
  hybrid : `https://api.maptiler.com/maps/hybrid/style.json?key=${MAPTILER_API_KEY}`,
  toner : `https://api.maptiler.com/maps/toner/style.json?key=${MAPTILER_API_KEY}`,
  omt : 'https://tiles.bettermaps.io/omt/style-streets.json',
};

const LocationMapChart: React.FC<LocationMapChartProps> = ({ apiData }) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const calculateCenter = (data: dataType[]): [number, number] => {
    if (data.length === 0) return [77.5946, 12.9716];
    const totalLat = data.reduce((sum, loc) => sum + loc.lat, 0);
    const totalLong = data.reduce((sum, loc) => sum + loc.long, 0);
    return [totalLong / data.length, totalLat / data.length];
  };

  const typeEnergyCap = getEnergyTypeSums(apiData);
  const processSummary = () => {
    const summary: { [type: string]: { count: number; capacity: number } } = {};
    apiData.forEach((item) => {
      const key = item.type;
      const cap = item.capacity || 0;
      if (!summary[key]) {
        summary[key] = { count: 0, capacity: 0 };
      }
      summary[key].count += 1;
      summary[key].capacity += cap;
    });


    const rows = Object.entries(summary).map(([type, { count, capacity }]) => ({
      type,
      count,
      capacity,
    }));

    const totalCount = rows.reduce((sum, row) => sum + row.count, 0);
    const totalCapacity = rows.reduce((sum, row) => sum + row.capacity, 0);

    rows.push({
      type: 'Total',
      count: totalCount,
      capacity: totalCapacity,
    });

    return rows;
  };

  const summaryData = processSummary();

  const formatDecimal = (value: string | number): string => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return !isNaN(numValue) ? numValue.toFixed(2) : value.toString();
  };

  useEffect(() => {
    if (!mapContainerRef.current || apiData.length === 0) return;

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const center = calculateCenter(apiData);

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: MAP_STYLES.demo,
      center: center,
      zoom: 2,
      // pitch: 45,
      bearing: 0,
    });

    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl(), 'top-right');

    map.on('load', () => {
      map.addSource('maptiler-dem', {
        type: 'raster-dem',
        url: `https://api.maptiler.com/tiles/terrain-rgb/tiles.json?key=${MAPTILER_API_KEY}`,
        // tileSize: 512,
        maxzoom: 14,
      });

      map.setTerrain({ source: 'maptiler-dem', exaggeration: 1.5 });

      map.addLayer({
        id: 'sky',
        type: 'sky',
        paint: {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 0.0],
          'sky-atmosphere-sun-intensity': 15,
        },
      } as any);

      apiData.forEach((location) => {
        const deviceInfoObj = location.device_info?.[0] || {};
        const deviceData = Object.values(deviceInfoObj)[0] || {};

        const {
          INV_Total_Power = 'N/A',
          PV_Total_Energy_kWh = 'N/A',
          active = 'N/A',
          lastActivityTime = 'N/A',
        } = deviceData;

        const formattedINVPower = formatDecimal(INV_Total_Power);
        const formattedEnergy = formatDecimal(PV_Total_Energy_kWh);

        // Border color logic based on active state
        let color = '#333333'; // default dark gray
        if (active === 'true') color = "#5EDA70"; // dark green
        else if (active === 'false') color = "#333"; // dark red

        const activeHtml = `
          <span style="
            font-weight: 600;
            background-color: rgba(94, 218, 112, 0.3);
            border-radius: 5px;
            width: min-content;
            padding: 4px; /* equivalent to Chakra's p={1} */
            padding-top : 0;
            padding-bottom : 0;
            margin-left : 2px;
            color: "#5EDA70";
            display: inline-block;
          ">
            Active
          </span>
        `

        const inactiveHtml = `
          <span style="
            font-weight: 600;
            background-color: rgba(255, 70, 70, 0.3);
            border-radius: 5px;
            width: min-content;
            padding: 4px; /* equivalent to Chakra's p={1} */
            padding-top : 0;
            padding-bottom : 0;
            margin-left : 2px;
            color: "#FF4646";
            display: inline-block;
          ">
            Inactive
          </span>
        `


        let status = ``;
        if (active === 'true') status = activeHtml;
        else if (active === 'false') status = inactiveHtml;

        const popupHTML = `
          <div style="
            background: white;
            padding: 10px;
            border-radius: 6px;
            font-family: Montserrat, sans-serif;
            color: #062D59;
            font-size: 10px;
          ">
            <div
              style="
                display : flex;
                justify-content : space-between;
                flex-direction : row;
              "
            >
              <strong>${location.name}</strong><br/>
              ${status}
            </div>
            Type: ${location.type}<br/>
            Country: ${location.country}<br/>
            Cap: ${location.capacity} kW<br/>
            Power: ${formattedINVPower} kW<br/>
            Energy: ${formattedEnergy} kWh<br/>
          </div>
          <style>
            .maplibregl-popup-close-button {
              border: none !important;
              background: transparent !important;
              box-shadow: none !important;
              outline: none !important;
              color: white;
              font-size: 16px;
              cursor: pointer;
            }
            .maplibregl-popup-content {
              background: none !important;
              box-shadow: none !important;
            }
          </style>
        `;

        let iconHTML = '';
        const isActive = parseFloat(formattedINVPower) > 0;
        const activeColor = isActive ? color : '#FF4646';

        switch (location.broadType) {
          case 'PV':
            iconHTML = `
  <div style="
    position: relative;
    width: 30px;
    height: 30px;
    background: ${activeColor};
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg) perspective(500px) rotateX(10deg);
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
  ">
    <div style="
      transform: rotate(45deg);
    ">
      ${renderToString(<FaSolarPanel size={18} color="#fff" />)}
    </div>
  </div>
`;

            break;

          case 'Wind':
            iconHTML = `
      <div style="
        position: relative;
    width: 30px;
    height: 30px;
    background: ${activeColor};
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg) perspective(500px) rotateX(10deg);
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
      ">
      <div style="
      transform: rotate(45deg);
    ">
        ${renderToString(<GiWindTurbine size={24} color="#fff" />)}
      </div>
      </div>
    `;
            break;

          case 'BESS':
            iconHTML = `
      <div style="
        position: relative;
    width: 30px;
    height: 30px;
    background: ${activeColor};
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg) perspective(500px) rotateX(10deg);
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
      ">
      <div style="
      transform: rotate(45deg);
    ">
        ${renderToString(<TbBattery4 size={24} color="#fff" />)}
      </div>
      </div>
    `;
            break;

          case 'Hybrid':
            iconHTML = `
      <div style="
        position: relative;
    width: 30px;
    height: 30px;
    background: ${activeColor};
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg) perspective(500px) rotateX(10deg);
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
      ">
      <div style="
      transform: rotate(45deg);
    ">
        <span style="color : #fff;
    font-weight : 600;">HYB</span>
        </div>
      </div>
    `;
            break;

          default:
            iconHTML = `
      <div style="
        width: 32px; 
        height: 32px; 
        border-radius: 50%; 
        background: #ccc; 
        border: 2px solid ${activeColor};
        box-shadow: inset -2px -2px 4px rgba(255,255,255,0.6),
                    inset 2px 2px 4px rgba(0,0,0,0.1),
                    0 4px 8px rgba(0,0,0,0.3);
        transform: perspective(400px) rotateX(10deg);
      ">
      </div>
    `;
        }


        const el = document.createElement('div');
        el.style.cursor = 'pointer';
        el.style.display = 'flex';
        el.style.flexDirection = 'column';
        el.style.alignItems = 'center';

        el.innerHTML = `
          <div>${iconHTML}</div>
          `;

        new maplibregl.Marker({ element: el })
          .setLngLat([location.long, location.lat])
          .setPopup(new maplibregl.Popup({ offset: 25 }).setHTML(popupHTML))
          .addTo(map);
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [apiData, isFullScreen]);

  useEffect(() => {
  const handleFullscreenChange = () => {
    const fsElement =
      document.fullscreenElement || (document as any).webkitFullscreenElement;
    const isFs = !!fsElement;
    setIsFullScreen(isFs);

    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.resize();  
        const center = calculateCenter(apiData); 
        mapRef.current.setCenter(center); 
        mapRef.current.setZoom(2); 
      }
    }, 300);
  };

  document.addEventListener('fullscreenchange', handleFullscreenChange);
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

  return () => {
    document.removeEventListener('fullscreenchange', handleFullscreenChange);
    document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
  };
}, [apiData]);


  return (
    <Box width="100%" zIndex={99999} bg={"#fff"} height={!isFullScreen ? { base: '300px', md: '400px', lg: '500px' } : "90vh"}>
      <Box
        ref={mapContainerRef}
        width="100%"
        height="100%"
        borderRadius="md"
        overflow="hidden"
        boxShadow="md"
        bg={"#fff"}
        zIndex={999}
      />
      {isFullScreen && (
        <Box
          position="absolute"
          bottom="80px"
          left="20px"
          backgroundColor="rgba(0, 0, 0, 0.4)"
          borderRadius="md"
          boxShadow="lg"
          padding={3}
          width="260px"
          zIndex={999}
        >
          <HStack mb={2} bg={"white"} justifyContent={"space-evenly"} p={2} w={"100%"} rounded={"md"}>
            <HStack>
              <FaSolarPanel size={18} />
              <Badge fontSize={"10px"}>{typeEnergyCap.PV} kW</Badge>
            </HStack>
            <HStack>
              <TbBattery4 size={18} />
              <Badge fontSize={"10px"}>{typeEnergyCap.BESS} kWh</Badge>
            </HStack>
            <HStack>
              <GiWindTurbine size={18} />
              <Badge fontSize={"10px"}>{typeEnergyCap.Wind} kW</Badge>
            </HStack>
          </HStack>
          <Table size="sm" width="100%" variant="unstyled">
            <Thead>
              <Tr>
                <Th fontSize="xs" color="white">Type</Th>
                <Th fontSize="xs" color="white">No.</Th>
                <Th fontSize="xs" isNumeric color="white">Cap kW</Th>
              </Tr>
            </Thead>
            <Tbody>
              {summaryData.map((row) => (
                <Tr key={row.type}>
                  <Td fontSize="xs" textAlign="center" padding={1} color="white">{row.type}</Td>
                  <Td fontSize="xs" textAlign="center" padding={1} color="white">{row.count}</Td>
                  <Td fontSize="xs" textAlign="center" padding={1} isNumeric color="white">{row.capacity}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default LocationMapChart;


function getEnergyTypeSums(assets: dataType[]) {
  return assets.reduce(
    (totals, asset) => {
      totals.PV += asset.PV || 0;
      totals.BESS += asset.BESS || 0;
      totals.Wind += asset.WIND || 0;
      return totals;
    },
    { PV: 0, BESS: 0, Wind: 0 }
  );
}

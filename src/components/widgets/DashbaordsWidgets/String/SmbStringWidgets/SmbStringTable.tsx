import { html } from "gridjs";
import PlantViewTableLayout from "../../../../Layouts/TableLayouts/PlantViewTableLayout";
import PlantTable from "../../../tables/PlantTable";
import { useEffect, useMemo, useState } from "react";
import DeviceKeysAPI from "../../../../../api/DeviceKeysAPI";
import PlantViewTableAPI from "../../../../../api/PlantView/PlantViewTableAPI";




const SmbStringTable = () => {
    // String Keys
    // defines
        const [device, setDevice] = useState('smb');
        const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    async function handleKeyFetching(device: string) {
        const res = await DeviceKeysAPI({ devName: device + "-1" });
        if (res?.status == 200) {
            if (res.data.length > 0) {
                const responseData = res.data as string[];
                const ampsMatch = responseData.filter(key => {
                    const pattern = /^DC_String\d+_Amps$/i;
                    return pattern.test(key);
                });
                console.log("AMPS: ", ampsMatch);
                setSelectedKeys(ampsMatch);
            } else {
                // setKeyOptions([])
            }
        }
    }

    useEffect(() => {
        handleKeyFetching(device)
    }, []);

    // ******************** InvString Table ***********************

    var searchSmbStringTable = useMemo(() => (
        {
            SMB: ["Total_Amps", ...selectedKeys].join(",")
        }
    ), [selectedKeys]);
    var NameFormat = { name: "Name", formatter: (cell: any) => html(`<b"><center>${cell}</center></b>`) };
    var PowerFormat = {
        name: "State",
        formatter: (cell: any, row: any) => row.cells[1].data ? parseFloat(row.cells[1].data) > 0 ? html(`<div style="width:100%; display: flex; justify-content: center; align-items: center;"><div style="background:green; height:15px; width:15px; border-radius:50%;"></div></div>`) : html(`<div style="width:100%; display: flex; justify-content: center; align-items: center;"><div style="background:red; height:15px; width:15px; border-radius:50%;"></div></div>`) : ""
    }
    var InvStringFormat = selectedKeys.map((key) => ({name : key.replace("DC_String", "St").replace("_Amps",  ".Amps")}));
    const [SmbStringTableData, setSmbStringTableData] = useState<any | null>(null);

    useEffect(() => {

        let intervalId: NodeJS.Timeout;
        let timeoutId: NodeJS.Timeout;

        const fetchData = async () => {
            try {
                if(selectedKeys.length > 0) {
                    const response = await PlantViewTableAPI(searchSmbStringTable) as any;
                    setSmbStringTableData(response?.data);
                }
            } catch (error) {
                console.error("Error Fetching Inv Str Table Data: ", error);
                setSmbStringTableData(null);
            }
        }
        fetchData();

        const startHourlyFetch = () => {
            fetchData(); // Fetch at top of hour
            intervalId = setInterval(fetchData, 60 * 60 * 1000); // Repeat every 1 hour
        };

        // Calculate ms until next top of hour
        const now = new Date();
        const msUntilNextHour =
            (60 - now.getMinutes()) * 60 * 1000 -
            now.getSeconds() * 1000 -
            now.getMilliseconds();

        // Set timeout to align hourly fetch
        timeoutId = setTimeout(startHourlyFetch, msUntilNextHour);

        // Cleanup
        return () => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        };
    }, [searchSmbStringTable])
    // console.log("SmbStringTableData", SmbStringTableData);

    return (
        <PlantViewTableLayout
            title='String'
            width={["100%", "100%"]}
            height={"100%"}
            fullscreen={true}
        >
            <PlantTable
                paginationLimitProps={8}
                column={[NameFormat, PowerFormat, ...InvStringFormat]}
                apiData={SmbStringTableData || []}
                autoWidth={true}
                width='100%'
                customColumn={false}
                customColumnCount={10}
                fullScreen={false}
                search={false}
            />
        </PlantViewTableLayout>
    );
};


export default SmbStringTable
import { background, Box, Checkbox, HStack, Icon, Input, InputGroup, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Portal, PortalManagerProps, Select, SimpleGrid, Text, Tooltip } from "@chakra-ui/react";
import { Select as SelectLib } from "chakra-react-select";
import { useEffect, useState } from "react";
import swal from 'sweetalert';
import { TiMinus } from "react-icons/ti";
import { FaChevronDown, FaInfoCircle, FaPlus } from "react-icons/fa";
import { CustomerGroupAPI, CustomerGroupWithTZAPI } from "../../../../../api/Authentication/CustomerGroupAPI";
import AllAssetsWithModelsAPI from "../../../../../api/Analytics/AllAssetsWithModelsAPI";
import { MdKeyboardArrowDown } from "react-icons/md";
import ClassPopoverBody from "./ClassPopoverBody";
import { AssetWiseParams } from "../../../../../Constants/Parameters";
import DeviceKeysAPI from "../../../../../api/DeviceKeysAPI";
import { ReportFieldsType } from "../../../../../Dashboards/CreateReport";
import { components } from "chakra-react-select";

interface PortfolioTypeEntries {
    value : string;
    label : string;
    timeZone? : string;
  }

interface CachedPlantsType {
    [GroupId : string] : PortfolioTypeEntries[];
}

interface AssetClassType {
    inverter : PortfolioTypeEntries[];
    dg : PortfolioTypeEntries[];
    bess : PortfolioTypeEntries[];
    pcs : PortfolioTypeEntries[];
    meter : PortfolioTypeEntries[];
    wms : PortfolioTypeEntries[];
    plant : PortfolioTypeEntries[];
}

interface AssetsMakeModelType {
    [assetType: string]: {
      [make: string]: {
        [model: string]: {
          label: string;
          value: string;
        }[];
      };
    };
  };

interface CachedAssetClasssType {
    [plantId : string] : AssetClassType;
}

interface CachedAssetMakeModelType {
    [plantId : string] : AssetsMakeModelType;
}

interface SelectionAssetIds {
    [asset : string] : PortfolioTypeEntries[];
}

interface TempSelectionAssetIds {
    value : SelectionAssetIds;
    row : number;
}

interface ConfigurationFieldsType {
    setFields : ([] : ReportFieldsType[]) => void;
    isUpdate? : boolean;
    fields? : ReportFieldsType[];
}

const ConfigurationFields : React.FC<ConfigurationFieldsType> = ({setFields, isUpdate, fields}) => {
    // Storage
    const storageName = "config1";

    // Defines of Fields
    const [configurationCompleteStatus, setConfigurationCompleteStatus] = useState<boolean>(false);
    const [count, setCount] = useState<number[]>([1]);
    const [portfolio, setPortfolio] = useState<string[]>([]);
    const [rowPlant, setRowPlant] = useState<string[][]>([]);
    const [plants, setPlants] = useState<string[][]>([]);
    const [plantsTimeZone, setPlantsTimeZone] = useState<string[][]>([]);
    const [AssetClass, setAssetClass] = useState<SelectionAssetIds[]>([]);
    const [rowAsset, setRowAsset] = useState<string[]>([]);
    const [params, setParams] = useState<string[][]>([]);
    const [aggType, setAggType] = useState<string[]>([]);
    // const [chartType, setChartType] = useState<string[]>([]);

    // Defines Temp Fields
    const [tempAssetClass, setTempAssetClass] = useState<TempSelectionAssetIds>({value : {"" : []}, row : 0});

    // Options of Fields
    const PortfolioTypeOption: PortfolioTypeEntries[] = JSON.parse(localStorage.getItem("PortfolioType") || '[{"value" : "-1", "label" : "No Options"}]');
    let [PlantOptions, setPlantOptions] = useState<PortfolioTypeEntries[][]>([]);
    let [AssetClassOptions, setAssetClassOptions] = useState<AssetClassType[][]>([]);
    let [AssetMakeModelOptions, setAssetMakeModelOptions] = useState<AssetsMakeModelType[][]>([]);
    const AssetTypes = ['inverter', 'dg', 'bess', 'pcs', 'meter', "wms", 'calculation', "na"].map((opt) => ({label : opt.toUpperCase(), value : opt}));
    let [paramsOption, setParamsOption] = useState<PortfolioTypeEntries[][]>([]);
    const aggOption = ['AVG', 'SUM', 'MIN', 'MAX', 'NONE', "Cumulative"].map((opt) => ({label : opt, value : opt}));
    const chartLabels = ['Line', 'Spline', 'Area','Area Spline', 'Bar', 'Column']
    const chartOption = ['line', 'spline', 'area', 'areaspline', 'bar', 'column'].map((opt, i) => ({label : chartLabels[i], value : opt}));

    // Cached Options Fields
    const [PlantOptionCached, setPlantOptionCached] = useState<CachedPlantsType>({});
    const [AssetClassOptionCached, setAssetClassOptionCached] = useState<CachedAssetClasssType>({});
    const [AssetMakeModelOptionCached, setAssetMakeModelOptionCached] = useState<CachedAssetMakeModelType>({});
    

    /**************** Options Fetching Logics */
    const FetchingPlantOptions = async (GroupId : string, index : number) => {
        if(PlantOptionCached.hasOwnProperty(GroupId)) {
            PlantOptions[index] = PlantOptionCached[GroupId];
            setPlantOptions([...PlantOptions]);
        } else {
            var tempAssets : PortfolioTypeEntries[] = [];
            // const CustomersOfGroupAPI = await CustomersofGroupAPI(GroupId);
            // if(CustomersOfGroupAPI && CustomersOfGroupAPI.length > 0) {
            //     for(var i = 0; i < CustomersOfGroupAPI.length; i++) {
            
                    tempAssets.push(await CustomerGroupWithTZAPI(GroupId, "ASSET"));
                // }
                PlantOptions[index] = tempAssets.flat(1);
                setPlantOptions([...PlantOptions]);

                // Store in Cached Array as Well
                setPlantOptionCached((prev) => ({
                    ...prev,
                    [GroupId] : tempAssets.flat(1)
                })); 
            // }
        }
    }

    const FetchingAssetsClassOptions = async (plantIds: string[], index: number) => {
        const assetClassList: AssetClassType[] = [];
        const makeModelList: AssetsMakeModelType[] = [];

        for (const plantId of plantIds) {
            let assetClass: AssetClassType;
            let makeModel: AssetsMakeModelType;

            if (AssetClassOptionCached.hasOwnProperty(plantId) && AssetMakeModelOptionCached.hasOwnProperty(plantId)) {
                assetClass = AssetClassOptionCached[plantId];
                makeModel = AssetMakeModelOptionCached[plantId];
            } else {
                const response = await AllAssetsWithModelsAPI(plantId);
                assetClass = response[0];
                makeModel = response[1];

                setAssetClassOptionCached((prev) => ({
                    ...prev,
                    [plantId]: assetClass,
                }));

                setAssetMakeModelOptionCached((prev) => ({
                    ...prev,
                    [plantId]: makeModel,
                }));
            }

            assetClassList.push(assetClass);
            makeModelList.push(makeModel);
        }

        AssetClassOptions[index] = assetClassList;
        setAssetClassOptions([...AssetClassOptions]);

        AssetMakeModelOptions[index] = makeModelList;
        setAssetMakeModelOptions([...AssetMakeModelOptions]);

        // For multiple plant auto asset pickup
        if(plantIds.length > 1) {
            // handleMultiPlantAssetClass(rowAsset[index] as keyof AssetClassType, index)
            rowAsset[index] = "na"
            setRowAsset(rowAsset)
        }
    };



    // Fields Event Handle
    function handleIncreament() {
        if (count.length < 8) {
            setCount([...count, count.length + 1]);
            
            // Set Status False When New Configuration Added
            setConfigurationCompleteStatus(false);
        } else {
            swal({ title: "Error", text: "Only 8 Filters can be applied!", icon: "error" });
        }
    }

    function handleDecreament(index: number) {
        // Values
        setPortfolio((prev) => prev.filter((_, i) => i !== index));
        setRowPlant((prev) => prev.filter((_, i) => i !== index));
        setPlants((prev) => prev.filter((_, i) => i !== index));
        setPlantsTimeZone((prev) => prev.filter((_, i) => i !== index));
        setAssetClass((prev) => prev.filter((_, i) => i !== index));
        setRowAsset((prev) => prev.filter((_, i) => i !== index));
        setParams((prev) => prev.filter((_, i) => i !== index));
        setAggType((prev) => prev.filter((_, i) => i !== index));
        // setChartType((prev) => prev.filter((_, i) => i !== index));
        setCount((prev) => prev.filter((_, i) => i !== index));

        // Options
        setPlantOptions((prev) => prev.filter((_, i) => i !== index));
        setAssetClassOptions((prev) => prev.filter((_, i) => i !== index));
        setAssetMakeModelOptions((prev) => prev.filter((_, i) => i !== index));
        setParamsOption((prev) => prev.filter((_, i) => i !== index));

        // Set Status True For Configuration Adding
        setConfigurationCompleteStatus(true);
    }

    function handlePortfolioTypeSelection(id: string, index : number) : void {
        portfolio[index] = id;
        setPortfolio([...portfolio]);
        
        FetchingPlantOptions(id, index);
    }
    
    function handlePlantsSelection(e: PortfolioTypeEntries[], index : number) {
        plants[index] = e.map((e) => e.value);
        setPlants([...plants]);

        rowPlant[index] = e.map((e) => e.label);
        setRowPlant([...rowPlant]);

        plantsTimeZone[index] = e.map((e) => e?.timeZone || "Asia/Kolkata");
        setPlantsTimeZone([...plantsTimeZone]);

        FetchingAssetsClassOptions(plants[index], index);
    }

    async function handleKeyFetching(device: string, index : number) {

        const plantId = plants[index] || undefined;
        if(device) {
            if(plantId) {
                const keys = plantId.map( async (id, i) => {
                    
                    const requestDevice = device == "plant" ? "calculation" : device === "meter" ? "meter." : device;
                    const res = await DeviceKeysAPI({ devName: requestDevice }, id || undefined);
                    if (res?.status == 200) {
                        if (res.data.length > 0) {
                            const responseData = res.data as string[];
                            const plantPrefix = rowPlant[index][i].substring(0, 5);
                            return responseData.map((keys : any) => ({label :  plantPrefix + "_" + keys, value :  plantPrefix + "_" + keys}));;
                        } else {
                            return [];
                        }
                    } else {
                        return [];
                    }
                })

                return await Promise.all(keys);
            } else {
                return [];
            }
        } else {
            return [];
        }
    }
    
    async function handleAssetClassSelection(Assets: SelectionAssetIds, index : number) {
        AssetClass[index] = Assets;
        setAssetClass([...AssetClass]);


        const fetchedKeys = await handleKeyFetching(rowAsset[index], index)
        paramsOption[index] = fetchedKeys.flat();
        setParamsOption([...paramsOption]);

        // console.log("Calling From Asset")
        // handleSettingFields(index);
    }

    const handleMultiPlantAssetClass = async (assetType: keyof AssetClassType, index: number) => {
        if (!assetType || !AssetClassOptions[index]) return;

        // Keep per-plant separation — don't merge
        const selectedAssets = AssetClassOptions[index]
            .map((assetClassObj) => assetClassObj[assetType] || []);

        AssetClass[index] = {
            [assetType]: selectedAssets
        } as any
        setAssetClass(AssetClass);

        const fetchedKeys = await handleKeyFetching(rowAsset[index], index)
        paramsOption[index] = fetchedKeys.flat();
        setParamsOption([...paramsOption]);
    };



    function handleParamsSelection(values: string[], index : number) {
        params[index] = values;
        setParams([...params]);

        // Set Status True On Last Selection
        setConfigurationCompleteStatus(true);
    }

    // Handle Temp Assign Functions
    useEffect(() => {
        rowAsset[tempAssetClass.row] = Object.keys(tempAssetClass.value)[0];
        setRowAsset(rowAsset);
        handleAssetClassSelection(tempAssetClass.value, tempAssetClass.row);
    }, [tempAssetClass]);

    // Handle Aggregation Selection
    function handleAggSelection(agg : string, index : number) {
        aggType[index] = agg;
        setAggType([...aggType]);
    }

    // Handle Chart Selection
    // function handleChartSelection(chart : string, index : number) {
    //     chartType[index] = chart;
    //     setChartType([...chartType]);
    // }

    // Setting Fields in Parent Component
    function handleSettingFields(index : number) {
        setFields(
            aggType.map((_, i) => (
                {
                    portfolio : portfolio[i],
                    plantName : rowPlant[i],
                    plant : plants[i],
                    plantTimeZone : plantsTimeZone[i],
                    assetType : rowAsset[i],
                    ids : (plants[i]?.length < 2 ? [AssetClass[i][rowAsset[i]]] : AssetClass[i][rowAsset[i]]),
                    params : params[i],
                    agg : aggType[i],
                    // chart : chartType[i]
                }
            ))
        );
    }


    /** -------------------UPDATE----------------- */
    useEffect(() => {
    
        if (isUpdate && fields) {
    
            // console.log("Fields:", fields)
            const rowLength = fields.length;
            fields.forEach((field, i) => {

                //  Row Count
                count[i] = 1;
                setCount([...count]);
                
                // Row Asset
                const assetType = field.assetType as keyof AssetClassType;
                rowAsset[i] = assetType;
                setRowAsset([...rowAsset]);
                
                // Plants
                plants[i] = field.plant as string[];
                setPlants([...plants]);

                rowPlant[i] = field.plantName as string[];
                setRowPlant([...rowPlant]);

                plantsTimeZone[i] = field.plantTimeZone as string[];
                setPlantsTimeZone([...plantsTimeZone]);


                // Assets

                if(field.plant && field.plant.length > 1) {
                    handleMultiPlantAssetClass(assetType, i)
                } else {
                    field.ids?.forEach((AssetIds) => {
                        const value = {[assetType] : [AssetIds].flat()}
                        handleAssetClassSelection( value , i);
                    })
                }

                
                // Customer
                const portfolioId = field.portfolio as string;
                if(portfolioId) {
                    handlePortfolioTypeSelection(portfolioId, i);
                }
            

                // Params
                params[i] = field?.params as string[];
                setParams([...params]);
                
                // Aggregation
                aggType[i] = field.agg as string;
                setAggType([...aggType]);

                handleIncreament();
                setConfigurationCompleteStatus(true);
                // console.log("Field: b ", i)
            });

            handleDecreament(rowLength);
            // Rehydrate options
            // PlantOptions[i] = parsedConfig.options[i].plantOptions;
            // AssetClassOptions[i] = parsedConfig.options[i].assetClassOptions;
            // AssetMakeModelOptions[i] = parsedConfig.options[i].assetMakeModelOptions;
            // paramsOption[i] = parsedConfig.options[i].paramsOption;

            // // Rehydrate values
            // portfolio[i] = parsedConfig.values[i].portfolio;
            // rowPlant[i] = parsedConfig.values[i].plantName;
            // plants[i] = parsedConfig.values[i].plant;
            // rowAsset[i] = parsedConfig.values[i].assetType;

            // // Rehydrate AssetClass
            // const assetType = parsedConfig.values[i].assetType;
            // AssetClass[i] = { [assetType]: parsedConfig.values[i].ids };

            // params[i] = parsedConfig.values[i].params;
            // aggType[i] = parsedConfig.values[i].agg;
            // chartType[i] = parsedConfig.values[i].chart;
    
            // Rehydrate tempAssetClass
            // setTempAssetClass(parsedConfig.tempAssetClass);
    
            // Update states
            // setPlantOptions([...PlantOptions]);
            // setAssetClassOptions([...AssetClassOptions]);
            // setAssetMakeModelOptions([...AssetMakeModelOptions]);
            // setParamsOption([...paramsOption]);
    
            // setPortfolio([...portfolio]);
            // setRowPlant([...rowPlant]);
            // setPlants([...plants]);
            // setAssetClass([...AssetClass]);
            // setParams([...params]);
            // setAggType([...aggType]);
            // setChartType([...chartType]);
    
            // Mark configuration as complete
        }
    }, [isUpdate, fields]);


    // Customs Component
    const CustomOption = (props: any) => {
        const { label, isSelected, innerRef, innerProps } = props;
        return (
            <div ref={innerRef} {...innerProps}>
                <Checkbox
                    isChecked={isSelected}
                    size="sm"
                    colorScheme="blue"
                    pointerEvents="none"
                    px={2}
                    py={1}
                >
                    {label}
                </Checkbox>
            </div>
        );
    };


    const CustomMenuList = (props: any) => {
        const { children, options, selectProps, setValue } = props;
        const allSelected = selectProps.value?.length === options.length;

        const handleSelectAll = () => {
            if (allSelected) {
                setValue([], "deselect-option");
            } else {
                setValue(options, "select-option");
            }
        };
        return (
            <components.MenuList {...props}>
                <Box px={3} py={2} borderBottom="1px solid #e2e8f0" cursor="pointer" onClick={handleSelectAll}>
                    <Checkbox isChecked={allSelected} size="sm" colorScheme="blue">
                        Select All
                    </Checkbox>
                </Box>
                {children}
            </components.MenuList>
        );
    };

    const customerOptions = JSON.parse(
        localStorage.getItem("customerOptions") || "[]"
    );

    return (
        <Box width={"100%"}>
            {count.map((value, i) => (
                <HStack>
                    <Text mr={3} height={"auto"} textAlign={"center"} alignSelf={"center"} width={"180px"}>
                        Configuration {i + 1}:
                    </Text>
                    <SimpleGrid
                        key={i}
                        mt={4}
                        px={2}
                        fontWeight={200}
                        h={"100%"}
                        w={"100%"}
                        minChildWidth={"200px"}
                        textAlign={"left"}
                        gap={2}
                    >
                    <InputGroup display={ localStorage.getItem("authority")?.toLowerCase() == "customer users" ? "none" : "block"} flexDirection={"column"} _focusWithin={{zIndex : 100}} fontSize={"10px"}>
                        <Text color={"#777"} fontSize={"10px"}>Customers<span style={{ color: "red" }}>*</span></Text>
                        <SelectLib 
                            isMulti = {false}
                            placeholder = "Select Portfolio"
                            closeMenuOnSelect={true}
                            variant="outline"
                            focusBorderColor="#062D59"
                            size={"sm"}
                            menuPortalTarget={document.body}
                            menuPosition="fixed"
                            chakraStyles={{
                                valueContainer : (provided) => ({
                                    ...provided,
                                    fontSize: "12px"
                                }),
                                menuList : (p) => ({
                                    ...p,
                                    maxH : "170px"
                                })
                            }}
                            options={PortfolioTypeOption || []}
                            onChange={(e) => {
                                handlePortfolioTypeSelection(e?.value || "", i)
                                handleSettingFields(i)
                            }}
                            selectedOptionColorScheme="gray"
                            value={PortfolioTypeOption?.find(option => option.value == portfolio[i])}
                        />
                    </InputGroup>
                    <InputGroup flexDirection={"column"} visibility={"visible"} _focusWithin={{zIndex : 100}}>
                        <Text color={"#777"} fontSize={"10px"}>Plants<span style={{ color: "red" }}>*</span></Text>
                        <SelectLib 
                            isMulti = {true}
                            placeholder = "Select Plant"
                            variant="outline"
                            focusBorderColor="#062D59"
                            size={"sm"}
                            menuPortalTarget={document.body}
                            menuPosition="fixed"
                            chakraStyles={{
                                valueContainer : (provided) => ({
                                    ...provided,
                                    fontSize: "12px"
                                })
                            }}
                            options={PlantOptions[i] || customerOptions}
                            onChange={(opt) => {
                                handlePlantsSelection(opt.map((e) => e) || {label : "", value : ''} , i)
                                handleSettingFields(i)
                            }}
                                value={
                                    (PlantOptions[i] || customerOptions)
                                        ?.filter((option) => plants[i]?.includes(option.value))
                                        .map((option) => ({ label: option.label, value: option.value })) || []
                                }
                            selectedOptionColorScheme="gray"
                        />
                    </InputGroup>
                    <InputGroup flexDirection={"column"} visibility={"visible"} _focusWithin={{zIndex : 100}}>
                        <Text color={"#777"} fontSize={"10px"}>Asset Classes<span style={{ color: "red" }}>*</span></Text>
                        {plants[i]?.length > 1 ? (
                                <SelectLib
                                    isMulti={false}
                                    placeholder="Select Plant"
                                    variant="outline"
                                    focusBorderColor="#062D59"
                                    size={"sm"}
                                    menuPortalTarget={document.body}
                                    menuPosition="fixed"
                                    chakraStyles={{
                                        valueContainer: (provided) => ({
                                            ...provided,
                                            fontSize: "12px"
                                        })
                                    }}
                                    options={AssetTypes}
                                    onChange={(e) => {
                                        const assetType = (e?.value || "inverter") as keyof AssetClassType;
                                        rowAsset[i] = assetType;
                                        setRowAsset(rowAsset);
                                        handleMultiPlantAssetClass(assetType, i);
                                        handleSettingFields(i);
                                    }}
                                    value={
                                        AssetTypes
                                            ?.filter((option) => rowAsset[i]?.includes(option.value))
                                            .map((option) => ({ label: option.label, value: option.value })) || []
                                    }
                                    selectedOptionColorScheme="gray"
                                />
                        ) : (
                            <Popover>
                                <PopoverTrigger>
                                    {/* <Select  placeholder="Select Class"  onChange={(e) => handleAssetClassSelection(e.target.value, i)} value={AssetClass[i]}>
                                    </Select> */}
                                    <Box _active={{borderColor : "#062D59"}} _focusWithin={{borderColor : "#062D59"}} border={"1px solid #e2e8f0"} height={"32px"} fontSize={"12px"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                                        <Text px={3}>{AssetClass[i] ? Object.values(AssetClass[i])[0] ? Object.values(AssetClass[i])[0].length + " Item Selected" : "Select Class" : "Select Class"}</Text>
                                        <Icon 
                                            as={MdKeyboardArrowDown}
                                            border={"1px solid #e2e8f0"}
                                            fontSize={"12px"}
                                            height={"full"}
                                            bg={"#edf2f7"}
                                            width={10}
                                            px={3}
                                        />
                                    </Box>
                                </PopoverTrigger>
                                <Portal>
                                    <PopoverContent>
                                        <PopoverArrow />
                                        {/* <PopoverHeader>Header</PopoverHeader> */}
                                        <PopoverCloseButton />
                                        <PopoverBody mt={5} zIndex={9999999999}>
                                                    <ClassPopoverBody
                                                        keys={Object.keys(AssetClassOptions[i]?.[0] || {})}
                                                        options={Object.values(AssetClassOptions[i]?.[0] || {})}
                                                        makeModelKey={Object.keys(AssetMakeModelOptions[i]?.[0] || {})}
                                                        makeModelOption={Object.values(AssetMakeModelOptions[i]?.[0] || {})}
                                                        setTempAssetClass={setTempAssetClass}
                                                        row={i}
                                                    />
                                        </PopoverBody>
                                    </PopoverContent>
                                </Portal>
                            </Popover>
                        )}
                    </InputGroup>
                    <InputGroup flexDirection={"column"} visibility={"visible"} _focusWithin={{ zIndex: 100 }}>
                        <Text color={"#777"} fontSize={"10px"}>Params<span style={{ color: "red" }}>*</span></Text>
                        <Popover>
                            <PopoverTrigger>
                                {/* Display the number of selected params or placeholder */}
                                <Box
                                    _active={{ borderColor: "#062D59" }}
                                    border={"1px solid #e2e8f0"}
                                    height={"32px"}
                                    fontSize={"12px"}
                                    display={"flex"}
                                    alignItems={"center"}
                                    justifyContent={"space-between"}
                                >
                                    <Text px={3}>
                                        {params[i]?.length > 0 ? `${params[i].length} params selected` : "Select Params"}
                                    </Text>
                                    <Icon
                                        as={MdKeyboardArrowDown}
                                        border={"1px solid #e2e8f0"}
                                        fontSize={"10px"}
                                        height={"full"}
                                        bg={"#edf2f7"}
                                        width={10}
                                        px={3}
                                    />
                                </Box>
                            </PopoverTrigger>
                            <Portal>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverBody mt={5} zIndex={9999999999}>
                                        {/* Multi-select dropdown for params */}
                                        <SelectLib
                                            isMulti={true}
                                            placeholder="Select Params"
                                            variant="outline"
                                            focusBorderColor="#062D59"
                                            size={"sm"}
                                            options={paramsOption[i]}
                                            components={{
                                                Option: CustomOption,
                                                MenuList: CustomMenuList,
                                            }}
                                            closeMenuOnSelect={false}
                                            hideSelectedOptions={false}
                                            
                                            onChange={(opt) => {
                                                handleParamsSelection(opt.map((e) => e.value), i)
                                                handleSettingFields(i)
                                            }}
                                                value={
                                                    paramsOption[i]
                                                        ?.filter((option) => params[i]?.includes(option.value))
                                                        .map((option) => ({ label: option.label, value: option.value })) || []
                                                }
                                            selectedOptionColorScheme="gray"
                                            chakraStyles={{
                                                valueContainer : (p) => ({
                                                    ...p,
                                                    maxHeight : "100px",
                                                    overflowY : "auto",
                                                    flexWrap: 'wrap',
                                                    '&::-webkit-scrollbar': {
                                                        width: '5px',
                                                    },
                                                    '&::-webkit-scrollbar-track': {
                                                        background: 'transparent',
                                                    },
                                                    '&::-webkit-scrollbar-thumb': {
                                                        backgroundColor: '#aaa', // or your preferred color
                                                        borderRadius: '10px',
                                                    },
                                                    '&::-webkit-scrollbar-thumb:hover': {
                                                        backgroundColor: '#888',
                                                    },
                                                })
                                            }}
                                        />
                                    </PopoverBody>
                                </PopoverContent>
                            </Portal>
                        </Popover>
                        </InputGroup>
                        <InputGroup flexDirection={"column"} visibility={"visible"} _focusWithin={{ zIndex: 100 }}>
                            <HStack>
                                <Text color={"#777"} fontSize={"10px"}>Aggregation<span style={{ color: "red" }}>*</span></Text>
                                <Tooltip
                                    hasArrow
                                    placement="right"
                                    fontSize="12px"
                                    label={
                                        "Cumulative is typically used for energy and revenue-type values. " +
                                        "NONE means no aggregation is applied and raw data is returned."
                                    }
                                >
                                    <span>
                                        <Icon
                                            as={FaInfoCircle}
                                            boxSize={3}
                                            color="gray.500"
                                            cursor="pointer"
                                        />
                                    </span>
                                </Tooltip>
                            </HStack>
                        <SelectLib 
                            isMulti = {false}
                            placeholder = "Select Agg Type"
                            variant="outline"
                            focusBorderColor="#062D59"
                            size={"sm"}
                            menuPortalTarget={document.body}
                            menuPosition="fixed"
                            chakraStyles={{
                                valueContainer : (provided) => ({
                                    ...provided,
                                    fontSize: "12px"
                                }),
                            }}
                            options={aggOption || []}
                            onChange={(e) => {
                                handleAggSelection(e?.value || "", i)
                                handleSettingFields(i)
                            }}
                            value={aggOption?.find(option => option.value == aggType[i])}
                            selectedOptionColorScheme="gray"
                        />
                    </InputGroup>
                    {/* <InputGroup flexDirection={"column"} visibility={"visible"} _focusWithin={{zIndex : 100}}>
                        <Text color={"#777"} fontSize={"10px"}>Charts<span style={{ color: "red" }}>*</span></Text>
                        <SelectLib 
                            isMulti = {false}
                            placeholder = "Select Chart Type"
                            variant="outline"
                            focusBorderColor="#062D59"
                            size={"sm"}
                            menuPortalTarget={document.body}
                            menuPosition="fixed"
                            chakraStyles={{
                                valueContainer : (provided) => ({
                                    ...provided,
                                    fontSize: "12px"
                                })
                            }}
                            options={chartOption || []}
                            onChange={(e) => {
                                handleChartSelection(e?.value || "", i)
                                handleSettingFields(i)
                            }}
                            value={chartOption?.find(option => option.value == chartType[i])}
                            selectedOptionColorScheme="gray"
                        />
                    </InputGroup> */}
                    <Text
                        ml={5}
                        mt={3}
                        cursor={"pointer"}
                        border={"1px solid red"}
                        bg={"red"}
                        fontSize={"14px"}
                        fontWeight={900}
                        width={4}
                        height={4}
                        borderRadius={"50%"}
                        textAlign={"center"}
                        alignSelf={"center"}
                        onClick={() => handleDecreament(i)}
                    >
                        <TiMinus color="white" title={`Delete Configuration ${i+1}`} />
                    </Text>
                </SimpleGrid>
                </HStack>
            ))}
            <Text cursor={"pointer"} bg={"gray"} color={"white"} mt={3} fontSize={"12px"} fontWeight={900} width={5} height={5} p={1} borderRadius={"50%"} textAlign={"center"} onClick={configurationCompleteStatus ? handleIncreament : () => {swal({ title: "Cancelled Request!", text: " Please complete/delete the previous Configuration.", icon: "error" })}}>
                <FaPlus title="Add New Configuration" />
            </Text>
        </Box>
    );
};

export default ConfigurationFields;

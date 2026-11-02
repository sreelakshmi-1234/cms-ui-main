type SeriesType = {
  type: string;
  name: string; // e.g. "INV kW - 1" or "INV kVA - 2"
  data: [number, number][];
  marker?: { enabled: boolean };
};

// Many Device Many Keys Covered
export function appendAutoUpdateData(
  prevSeries: SeriesType[],
  autoUpdateData: any,
  keys: string // e.g. "AC_Active_Power_Watt,AC_Apparant_Power_VA"
): SeriesType[] {
  const keyList = keys.split(",").map(k => k.trim());

  return prevSeries.map(series => {
    const devName = series.name; // e.g. "INV kW - 1"

    // Find this device inside autoUpdateData
    const deviceData = autoUpdateData?.data?.[devName];
    if (!deviceData) return series;

    // Ensure correct key is matched
    const newPoints: [number, number][] = [];

    keyList.forEach(k => {
      const values = deviceData.values?.[k];
      if (values && values.length === 2) {
        newPoints.push([values[0], values[1]]);
      }
    });

    if (newPoints.length === 0) return series;

    return {
      ...series,
      data: [...series.data, ...newPoints]
    };
  });
}


export function mergeSeriesFromDB(prevSeries: SeriesType[], autoUpdateData: SeriesType[]): SeriesType[] {
  const seriesMap = new Map<string, SeriesType>();

  // 1. Add all previous series to map (with null safety)
  prevSeries.forEach(s => {
    // Ensure data is always an array
    const safeData = Array.isArray(s.data) ? [...s.data] : [];
    seriesMap.set(s.name, { 
      ...s, 
      data: safeData
    });
  });

  // 2. Merge autoUpdateData (with null safety)
  autoUpdateData.forEach(newSeries => {
    // Ensure newSeries.data is an array
    const newData = Array.isArray(newSeries.data) ? newSeries.data : [];
    
    if (seriesMap.has(newSeries.name)) {
      const existingSeries = seriesMap.get(newSeries.name)!;
      
      // Create Set of existing timestamps (only if data exists)
      const existingTimestamps = new Set(
        existingSeries.data.map(point => point?.[0]).filter(ts => ts !== undefined)
      );
      
      // Filter new points (only valid [timestamp, value] pairs)
      const newUniquePoints = newData.filter(point => 
        Array.isArray(point) && 
        point.length >= 2 && 
        typeof point[0] === 'number' && 
        !existingTimestamps.has(point[0])
      );
      
      if (newUniquePoints.length > 0) {
        const mergedData = [...existingSeries.data, ...newUniquePoints]
          .sort((a, b) => (a?.[0] ?? 0) - (b?.[0] ?? 0))
          .filter(point => Array.isArray(point) && point.length >= 2);
        
        seriesMap.set(newSeries.name, { ...existingSeries, data: mergedData });
      }
    } else {
      // New series - add it with safe data
      const safeNewData = newData
        .filter(point => Array.isArray(point) && point.length >= 2)
        .sort((a, b) => (a?.[0] ?? 0) - (b?.[0] ?? 0));
      
      seriesMap.set(newSeries.name, { 
        ...newSeries, 
        data: safeNewData 
      });
    }
  });

  return Array.from(seriesMap.values());
}
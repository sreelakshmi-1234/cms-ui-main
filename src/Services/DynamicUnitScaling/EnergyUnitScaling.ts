

export const valueFormat = (val : string | number | undefined | null) : number => {
  return typeof val == "string" ? parseFloat(parseFloat(val).toFixed(2)) : typeof val == "number" ? parseFloat(val.toFixed(2)) : 0;
};

export const energyUnitScaling = (value: number) => {
    let ScaledValue = valueFormat(value);
    let scaledUnit = "";
    if (ScaledValue >= 100_000_000) {
        ScaledValue = valueFormat(ScaledValue / 1_000_000);
        scaledUnit = "GWh";
    } else if (ScaledValue >= 10000) {
        ScaledValue = valueFormat(ScaledValue / 1000);
        scaledUnit = "MWh";
    } else {
        scaledUnit = "kWh";
    }

    return { value: ScaledValue, unit: scaledUnit };
}
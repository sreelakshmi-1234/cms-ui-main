

const ComparisonMatrixSevice = (data : [number | null | undefined, number | null | undefined]) => {
    // console.log(data)
    return (    
        {
            value : parseFloat((data[0] || 0).toFixed(1)),
            differenceValue : "",
            // differenceValue : parseFloat((Math.abs((data[0] || 0) - (data[1] || 0))).toFixed(1)),
            differencePercentage : (data[1] == undefined || data[1] == 0) ? 0 : parseFloat(((((data[0] || 0) - data[1]) / data[1])*100).toFixed(1))
        }
    )
};

export default ComparisonMatrixSevice;
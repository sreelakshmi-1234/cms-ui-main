import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { Fragment } from "react/jsx-runtime";

const styles = StyleSheet.create({
  table: {
    width: "100%",
    flexDirection: "column",
    marginTop: 10,
    borderBottomWidth: 1, // Outer table border
    borderBottomColor: "#03045e",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1, // Bottom border for each row
    borderColor: "#D4D4D4",
  },
  tableHeader: {
    fontSize: 10,
    paddingTop: 4,
    paddingLeft: 10,
    height: 20,
    // backgroundColor: "#f0f0f0", // Light background for header
    // borderRightWidth: 1, // Right border for each header cell
    borderColor: "#03045e",
    textAlign: "left",
    fontWeight: "bold",
  },
  tableCell: {
    fontSize: 9,
    paddingVertical: 4,
    paddingLeft: 10,
    // borderRightWidth: 1, // Right border for each body cell
    // borderColor: "#D4D4D4",
    textAlign: "left",
  },
  tableFooter: {
    fontSize: 9,
    paddingVertical: 4,
    paddingLeft: 10,
    // borderRightWidth: 1, // Right border for footer cells
    // borderColor: "#03045e",
    textAlign: "left",
    fontWeight: "bold",
    backgroundColor: "#f9f9f9", // Light background for footer
  },
  col1: { width: "20%" }, // Day
  col2: { width: "30%" }, // Daily Energy
  col3: { width: "30%" }, // Energy Consumption
  col4: { width: "20%" }, // Total
});

export const TableHead = () => (
    <View style={[styles.tableRow, {borderColor : "#03045e"}]}>
      <Text style={[styles.tableHeader, styles.col1]}>Day</Text>
      <Text style={[styles.tableHeader, styles.col2]}>Daily Energy kWh</Text>
      <Text style={[styles.tableHeader, styles.col3]}>Energy Consumption kWh</Text>
      <Text style={[styles.tableHeader, styles.col4]}>Total kWh</Text>
    </View>
  );

const reciept_data = [
    {
        date : "Mon",
        daily : 21359.4,
        cunsumption : 13599
    },
    {
        date : "Tue",
        daily : 23196.4,
        cunsumption : 13981
    },
    {
        date : "Wed",
        daily : 23196.4,
        cunsumption : 13981
    },
    {
        date : "Thu",
        daily : 23196.4,
        cunsumption : 13981
    },
    {
        date : "Fri",
        daily : 23196.4,
        cunsumption : 13981
    },
    {
        date : "Sat",
        daily : 3161.4,
        cunsumption : 12176
    },
    {
        date : "Sun",
        daily : 7910.48,
        cunsumption : 12373
    }
]

 
export const TableBody = () => (
    <View>
      {reciept_data.map((receipt, i) => (
        <View key={i} style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.col1]}>{receipt.date}</Text>
          <Text style={[styles.tableCell, styles.col2]}>{receipt.daily}</Text>
          <Text style={[styles.tableCell, styles.col3]}>{receipt.cunsumption}</Text>
          <Text style={[styles.tableCell, styles.col4]}>
            {(receipt.daily + receipt.cunsumption).toFixed(2)}
          </Text>
        </View>
      ))}
    </View>
  );


export const TableTotal = () => {
const total = reciept_data
    .reduce((sum, item) => sum + (item.daily + item.cunsumption), 0)
    .toFixed(2);

return (
    <View style={[styles.tableRow, { borderTopWidth: 2 }]}> {/* Thicker top border for emphasis */}
    <Text style={[styles.tableFooter, styles.col1]}></Text> {/* Empty cell */}
    <Text style={[styles.tableFooter, styles.col2]}></Text> {/* Empty cell */}
    <Text style={[styles.tableFooter, styles.col3]}>Total</Text>
    <Text style={[styles.tableFooter, styles.col4]}>{total}</Text>
    </View>
);
};

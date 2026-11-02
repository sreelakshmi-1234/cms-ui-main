import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import TestReportLayout from './TetsReportLayout';

interface IndexPageProps {
  topics: string[];
  pageNumbers: number[];
}

const Indexpg: React.FC<IndexPageProps> = ({ topics, pageNumbers }) => {
  return (
    <TestReportLayout>
      <View style={styles.container}>
        <Text style={styles.heading}>Index</Text>
        {/* Table Header */}
        <View style={styles.row}>
          {/* <Text style={[styles.cell, styles.header]}>Sr. No.</Text> */}
          <Text style={[styles.cell, styles.header]}>Content</Text>
          <Text style={[styles.cell, styles.header]}>Page</Text>
        </View>

        {/* Table Data */}
        {topics.map((topic, index) => (
          <View style={styles.row} key={index}>
            {/* <Text style={styles.cell}>{index + 1}</Text> */}
            <Text style={styles.cell}>{topic}</Text>
            <Text style={styles.cell}>{pageNumbers[index]}</Text>
          </View>
        ))}
      </View>
    </TestReportLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    borderBottom: '1px solid #ccc', // Add borders between rows
    marginBottom: 5,
  },
  cell: {
    flex: 1, // Equal width for each column
    padding: 5,
    textAlign: 'center',
    fontSize: 12,
  },
  header: {
    fontWeight: 'bold',
    borderBottom: '2px solid black', // Bold border for header row
    backgroundColor: '#f0f0f0',
  },
});

export default Indexpg;
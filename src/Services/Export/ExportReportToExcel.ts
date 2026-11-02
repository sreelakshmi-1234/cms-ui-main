import ExcelJS from "exceljs";
import { CognetaBase64, EtaFluxLogoBase64 } from "../../assets/Base64/CognetaLogo";
const saveAs = require("file-saver")

// Accept your data format
interface ReportData {
  title: string;
  createdAt : string;
  data: {
    [plant: string]: Array<{
      timestamp: string;
      [key: string]: string | number;
    }>;
  };
}

// Optional logo (base64) if needed

export const ExportReportToExcel = async (report: ReportData) => {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "ETAFlux.Cogneta.Cloud";
  workbook.created = new Date();

  for (const plant in report.data) {
      const worksheet = workbook.addWorksheet(plant);
      
      // --- Extract headers
    const sample = report.data[plant][0];
    // const headers = Object.keys(sample);
    // const headers = Object.entries(sample).map(([key]) => key);
    // const headers = Object.keys(sample).sort((a, b) => {
    //   // Extract inverter number (e.g., "Energy_Daily_kWh_inverter_10" → 10)
    //   const getNum = (key: string) => {
    //     const match = key.match(/(\d+)$/);
    //     return match ? parseInt(match[1]) : 0;
    //   };
    //   return getNum(a) - getNum(b);
    // });

    const headers = Object.keys(sample).sort((a, b) => {
      // Always keep Time_Stamp first (case-insensitive)
      if (a.toLowerCase() === "time_stamp") return -1;
      if (b.toLowerCase() === "time_stamp") return 1;

      const getNum = (key: string) => {
        const match = key.match(/(\d+)$/); // capture number at the END of key
        return match ? parseInt(match[1]) : Number.MAX_SAFE_INTEGER; // non-number keys go last
      };

      const numA = getNum(a);
      const numB = getNum(b);

      // If both have numbers, sort numerically
      if (numA !== Number.MAX_SAFE_INTEGER || numB !== Number.MAX_SAFE_INTEGER) {
        return numA - numB;
      }

      // Otherwise sort alphabetically
      return a.localeCompare(b);
    });

    // console.log("Excel column order:", headers);

    const colCount = headers.length < 5 ? 7 : headers.length;

    // --- Logo (optional, place at top-left corner)
    if (CognetaBase64) {
      const imageId1 = workbook.addImage({
        base64: CognetaBase64,
        extension: "png",
      });
      const imageId2 = workbook.addImage({
        base64: EtaFluxLogoBase64,
        extension: "png",
      });

      worksheet.addImage(imageId1, {
        tl: { col: 0, row: 0.1 },
        ext: { width: 180, height: 80 },
      });

      worksheet.addImage(imageId2, {
        tl: { col: (headers.length < 5 ? 7 - 3 : headers.length - 1), row: 1 },
        ext: { width: 160, height: 40 },
      });
    }
    

    // Finding Max Width
    // const arrLen = headers.map((elem) => elem.length)


    // Find first and last column letter
    const startCol = 1;
    const endCol = colCount;
    const startCell = worksheet.getRow(1).getCell(startCol).address.replace(/\d+/, '');
    const endCell = worksheet.getRow(1).getCell(endCol).address.replace(/\d+/, '');
    // const mergedRange = `${startCell}1:${endCell}1`;
    // const mergedRange2 = `${startCell}2:${endCell}2`;
    // const mergedRange3 = `${startCell}3:${endCell}3`;

    worksheet.mergeCells(startCol, startCol, startCol+3, endCol);

    // Merge title row (Row 1)
    // worksheet.mergeCells(mergedRange);
    worksheet.getCell(`${startCell}1`).value = report.title;
    worksheet.getCell(`${startCell}1`).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell(`${startCell}1`).font = { bold: true, size: 16 };

    // Merge plant + date row (Row 2)
    worksheet.mergeCells(`${startCell}5:${endCell}5`);
    worksheet.getCell(`${endCell}5`).value = `Plant Name: ${plant} | Created At: ${report.createdAt}`;
    worksheet.getCell(`${endCell}5`).alignment = { vertical: 'bottom', horizontal: 'center' };
    worksheet.getCell(`${endCell}5`).font = { italic: true, size: 12 };


    // Merge spacer/info row (Row 3)
    // worksheet.mergeCells(mergedRange3);
    // worksheet.getCell(`${startCell}3`).value = ""; // Optional placeholder or note

    // Merge and add report title
    // worksheet.mergeCells('C1:F1');
    // worksheet.getCell('C1').value = report.title;
    // worksheet.getCell('C1').alignment = { vertical: 'middle', horizontal: 'center' };
    // worksheet.getCell('C1').font = { bold: true, size: 16 };

    // Merge and add plant info and created date
    // worksheet.mergeCells('C2:F2');
    // worksheet.getCell('C2').value = `Plant Name: ${Object.keys(plant)} | Created At: ${report.createdAt}`;
    // worksheet.getCell('C2').alignment = { vertical: 'middle', horizontal: 'center' };
    


    // --- Add Table Headers
    // worksheet.addRow([]);
    worksheet.mergeCells(`${startCell}6:${endCell}6`);

    const headerRow = worksheet.addRow(headers);
    headerRow.eachCell((cell) => {
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FF87CEFA' }, // sky blue
        };
        cell.font = { bold: true };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
    });
    

    // --- Add data rows
    report.data[plant].forEach((entry) => {
      const row = headers.map((key) => entry[key]);
      worksheet.addRow(row);
    });

    worksheet.columns = headers.map((header) => ({
        // header,
        // key: header,
        width: Math.max(
            header.length,
            ...report.data[plant].map((row) => String(row[header] || '').length)
        ) + 4
    }));

    worksheet.eachRow((row) => {
      row.alignment = { vertical: "middle", horizontal: "center" };
      row.border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      };
    });
  }

  // Generate buffer
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

  saveAs(blob, `${report.title}-${new Date().toISOString().split("T")[0]}.xlsx`);
};

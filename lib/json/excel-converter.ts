import * as XLSX from 'xlsx';

export interface ExcelToJSONOptions {
  sheetName?: string;
  headerRow?: number;
  skipEmptyLines?: boolean;
}

export interface ExcelToJSONResult {
  success: boolean;
  data?: any[];
  sheetNames?: string[];
  error?: string;
  rowsProcessed?: number;
}

export interface JSONToExcelResult {
  success: boolean;
  buffer?: ArrayBuffer;
  error?: string;
}

export function excelToJson(
  fileBuffer: ArrayBuffer,
  options: ExcelToJSONOptions = {}
): ExcelToJSONResult {
  try {
    const workbook = XLSX.read(fileBuffer, { type: 'array' });
    
    if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
      return {
        success: false,
        error: 'No sheets found in Excel file',
      };
    }

    const { sheetName, headerRow = 1, skipEmptyLines = true } = options;
    
    const targetSheetName = sheetName || workbook.SheetNames[0];
    const worksheet = workbook.Sheets[targetSheetName];

    if (!worksheet) {
      return {
        success: false,
        error: `Sheet "${targetSheetName}" not found`,
        sheetNames: workbook.SheetNames,
      };
    }

    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      header: headerRow,
      defval: null,
      blankrows: !skipEmptyLines,
    });

    if (!jsonData || jsonData.length === 0) {
      return {
        success: false,
        error: 'No data found in Excel sheet',
        sheetNames: workbook.SheetNames,
      };
    }

    return {
      success: true,
      data: jsonData,
      sheetNames: workbook.SheetNames,
      rowsProcessed: jsonData.length,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to parse Excel file',
    };
  }
}

export function jsonToExcel(
  jsonData: any[],
  sheetName: string = 'Sheet1'
): JSONToExcelResult {
  try {
    if (!Array.isArray(jsonData) || jsonData.length === 0) {
      return {
        success: false,
        error: 'Input must be a non-empty array',
      };
    }

    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    const excelBuffer = XLSX.write(workbook, {
      type: 'array',
      bookType: 'xlsx',
    });

    return {
      success: true,
      buffer: excelBuffer,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create Excel file',
    };
  }
}

export function getExcelSheetNames(fileBuffer: ArrayBuffer): string[] {
  try {
    const workbook = XLSX.read(fileBuffer, { type: 'array' });
    return workbook.SheetNames || [];
  } catch {
    return [];
  }
}


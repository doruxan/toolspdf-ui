import Papa from 'papaparse';

export interface CSVToJSONOptions {
  delimiter?: string;
  hasHeaders?: boolean;
  skipEmptyLines?: boolean;
  trimFields?: boolean;
}

export interface CSVToJSONResult {
  success: boolean;
  data?: any[];
  error?: string;
  rowsProcessed?: number;
}

export interface JSONToCSVResult {
  success: boolean;
  csv?: string;
  error?: string;
}

export function csvToJson(
  csvContent: string,
  options: CSVToJSONOptions = {}
): CSVToJSONResult {
  try {
    const {
      delimiter = ',',
      hasHeaders = true,
      skipEmptyLines = true,
      trimFields = true,
    } = options;

    const result = Papa.parse(csvContent, {
      delimiter,
      header: hasHeaders,
      skipEmptyLines,
      dynamicTyping: true,
      transform: trimFields ? (value) => value.trim() : undefined,
    });

    if (result.errors.length > 0) {
      const criticalErrors = result.errors.filter(
        (error) => error.type === 'Quotes' || error.type === 'FieldMismatch'
      );
      if (criticalErrors.length > 0) {
        return {
          success: false,
          error: `CSV parsing error: ${criticalErrors[0].message}`,
        };
      }
    }

    if (!result.data || result.data.length === 0) {
      return {
        success: false,
        error: 'No data found in CSV file',
      };
    }

    return {
      success: true,
      data: result.data,
      rowsProcessed: result.data.length,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export function jsonToCsv(
  jsonData: any[],
  options: CSVToJSONOptions = {}
): JSONToCSVResult {
  try {
    if (!Array.isArray(jsonData) || jsonData.length === 0) {
      return {
        success: false,
        error: 'Input must be a non-empty array',
      };
    }

    const { delimiter = ',', hasHeaders = true } = options;

    const csv = Papa.unparse(jsonData, {
      delimiter,
      header: hasHeaders,
      skipEmptyLines: true,
    });

    return {
      success: true,
      csv,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export function detectDelimiter(csvContent: string): string {
  const delimiters = [',', ';', '\t', '|'];
  let maxCount = 0;
  let detectedDelimiter = ',';

  const firstLine = csvContent.split('\n')[0];

  for (const delimiter of delimiters) {
    const count = (firstLine.match(new RegExp(`\\${delimiter}`, 'g')) || []).length;
    if (count > maxCount) {
      maxCount = count;
      detectedDelimiter = delimiter;
    }
  }

  return detectedDelimiter;
}


///<reference path='cfb.d.ts'/>

interface Cell {
  v: string;
  w?: string;
  t?: string;
  f?: string;
  r?: string;
  h?: string;
  c?: any;
  z?: string;
  ixfe?: number;
}

interface CellAddress {
  c: number;
  r: number;
}

interface CellRange {
  s: CellAddress;
  e: CellAddress;
}

interface WorksheetBase {
  '!range':CellRange;
  '!ref':string;
}

interface Worksheet extends WorksheetBase {
  [key: string]: Cell|CellRange|string; // Sorry, that's better than "any"
}

interface Worksheets {
  [key: string]: Worksheet;
}

interface Workbook {
  SheetNames: string[];
  Sheets: Worksheets;
}

interface XLSX {
  parse_xlscfb(cfb:CFBContainer): Workbook;
  read(data: any, opts: {[opt: string]: any}): Workbook;
  readFile(filename: string): Workbook; 
  write(wb: Workbook, opts: {[opt: string]: any}): string;
  utils: {
    encode_col(col: number): string;
    encode_row(row: number): string;
    encode_cell(cell: CellAddress): string;
    encode_range(cs: CellAddress, ce: CellAddress): string;
    decode_col(col: string): number;
    decode_row(row: string): number;
    split_cell(cell: string): string[];
    decode_cell(cell: string): CellAddress;
    decode_range(cell: string): CellRange;
    sheet_to_csv(worksheet: Worksheet): string;
    get_formulae(worksheet: Worksheet): string[];
    make_csv(worksheet: Worksheet): string;
    sheet_to_row_object_array(worksheet: Worksheet): Object[];
  };
  verbose: Number;
  CFB:CFB;
}

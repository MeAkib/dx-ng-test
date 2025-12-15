export type ColumnType =
  | 'text'
  | 'number'
  | 'date'
  | 'boolean'
  | 'currency'
  | 'actions'
  | 'link'
  | 'mask';
export type AlignType = 'left' | 'center' | 'right';

export type MaskType =
  | 'dob-year' // hide year: xx/xx/1995 → xx/xx/xxxx
  | 'prefix'; // hide first N chars: ABCD1234 → ****1234

  export interface MaskConfig {
  type: MaskType;
  visibleChars?: number; // for prefix mask
}

export interface TableColumn {
  key: string;
  label: string;
  align?: AlignType;
  type: ColumnType;
  mask?: MaskConfig;
}

export interface TableAction {
  icon?: string;
  label: string;
  class?: string;
}

export interface TableConfig {
  title: string;
  key: string;
  columns: TableColumn[];
  actions?: TableAction[];
}

export type ColumnType = 'text' | 'number' | 'date' | 'boolean' | 'currency' | 'actions' | 'link' | MaskType;
export type AlignType = 'left' | 'center' | 'right';
export type MaskType = 'phone' | 'zip' | 'custom';

export interface TableColumn {
  key: string;
  label: string;
  align?: AlignType;
  type: ColumnType;
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

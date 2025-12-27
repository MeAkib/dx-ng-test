import { Component, input, output, signal } from '@angular/core';
import {
  AlignType,
  ColumnType,
  MaskType,
  TableAction,
  TableColumn,
  TableConfig,
} from './table.types';

import { CurrencyPipe, DatePipe, JsonPipe } from '@angular/common';
import { formatDate } from '../../utils/date-formater.utils';

@Component({
  selector: 'app-dynamic-table',
  imports: [DatePipe, CurrencyPipe, JsonPipe],
  templateUrl: './dynamic-table.html',
  styleUrl: './dynamic-table.scss',
})
export class DynamicTableComponent<T extends Record<string, any> = Record<string, any>> {
  data = input.required<T[]>();
  config = input.required<TableConfig>();

  private revealedCells = new Set<string>();

  cellKey(row: any, field: string) {
    return `${row.id}:${field}`;
  }
  // Outputs
  rowClick = output<unknown>();

  mapAlign(align?: AlignType) {
    return align ?? 'left';
  }

  toggleReveal(row: any, field: string) {
    const key = this.cellKey(row, field);
    this.revealedCells.has(key) ? this.revealedCells.delete(key) : this.revealedCells.add(key);
  }

  isRevealed(row: any, field: string) {
    return this.revealedCells.has(this.cellKey(row, field));
  }

  onAction(action: TableAction, rowData: any) {
    this.rowClick.emit({ action, rowData });
  }

  getColumnType(dataField: string): ColumnType {
    return this.config().columns.find((c) => c.key === dataField)?.type ?? 'text';
  }

  // onCellClick(row: any, col: TableColumn) {
  //   if (col.type !== 'mask') return;

  //   const key = this.cellKey(row, col.key);
  //   this.revealedCells.has(key) ? this.revealedCells.delete(key) : this.revealedCells.add(key);
  // }

  maskValue(value: any, col: TableColumn): string {
    if (value == null) return '';

    switch (col.mask?.type) {
      case 'dob-year': {
        const formatted = formatDate(value); // 🔑 reuse
        // 20/03/2023 → 20/03/xxxx
        return formatted.replace(/\d{4}$/, 'xxxx');
      }

      case 'prefix': {
        const str = String(value);
        const visible = col.mask.visibleChars ?? 4;
        return '*'.repeat(Math.max(0, str.length - visible)) + str.slice(-visible);
      }

      default:
        return String(value);
    }
  }

  formatValue(value: any, col: TableColumn): string {
    if (value == null) return '';

    switch (col.type) {
      case 'date':
        return formatDate(value);

      case 'currency':
        return new Intl.NumberFormat('en-GB', {
          style: 'currency',
          currency: 'BDT',
        }).format(value);

      case 'mask':
        // 🔑 IMPORTANT: reveal original value
        return String(value);

      default:
        return String(value);
    }
  }

  cellTemplateName(type: ColumnType) {
    return type;
  }

  getColumnConfig(field: string): TableColumn {
    return this.config().columns.find((c) => c.key === field)!;
  }
}

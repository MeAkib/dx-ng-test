import { Component, input, output, signal } from '@angular/core';
import { AlignType, ColumnType, MaskType, TableAction, TableColumn, TableConfig } from './table.types';
import { DxDataGridComponent, DxiDataGridColumnComponent } from 'devextreme-angular/ui/data-grid';
import { DxCheckBoxModule } from 'devextreme-angular';

import { CurrencyPipe, DatePipe, NgTemplateOutlet } from '@angular/common';
import { DxiColumnComponent } from "devextreme-angular/ui/nested";

@Component({
  selector: 'app-dynamic-table',
  imports: [
    DxDataGridComponent,
    DxiDataGridColumnComponent,
    DatePipe,
    CurrencyPipe,
    NgTemplateOutlet,
    DxCheckBoxModule,
],
  templateUrl: './dynamic-table.html',
  styleUrl: './dynamic-table.scss',
})
export class DynamicTableComponent<T = any> {
  data = input.required<T[]>();
  config = input.required<TableConfig>();

  tasks = [
        { id: 1, task: "Buy groceries", dueDate: new Date(), done: false },
        { id: 2, task: "Write a blog post", dueDate: new Date(), done: true }
    ];

  // Outputs
  rowClick = output<unknown>();

  mapAlign(align?: AlignType) {
    return align ?? 'left';
  }

  onAction(action: TableAction, rowData: any) {
    this.rowClick.emit({ action, rowData });
  }

  mask(value: string, type: MaskType) {
    if (type === 'phone') {
      return value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    } else if (type === 'zip') {
      return value.replace(/(\d{5})(\d{4})?/, '$1-$2');
    }
    return value;
  }

  cellTemplateName(type: ColumnType) {
    return type;
  }
}

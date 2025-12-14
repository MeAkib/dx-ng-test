import { Component, signal } from '@angular/core';
import { DynamicTableComponent } from './shared/components/dynamic-table/dynamic-table';
import {
  TableConfig,
  TableColumn,
  TableAction,
} from './shared/components/dynamic-table/table.types';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  salary: number;
  joinDate: string;
  isActive: boolean;
}

@Component({
  selector: 'app-root',
  imports: [DynamicTableComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  tableConfig = signal<TableConfig>({
    title: 'User Management',
    key: 'id',
    columns: [
      { key: 'id', label: 'ID', align: 'center', type: 'number' },
      { key: 'name', label: 'Name', align: 'left', type: 'text' },
      { key: 'email', label: 'Email', align: 'left', type: 'text' },
      { key: 'role', label: 'Role', align: 'left', type: 'text' },
      { key: 'salary', label: 'Salary', align: 'right', type: 'currency' },
      { key: 'joinDate', label: 'Join Date', align: 'center', type: 'date' },
      { key: 'isActive', label: 'Active', align: 'center', type: 'boolean' },
      // { key: 'actions', label: 'Actions', align: 'center', type: 'actions' },
    ],
  });

  users = signal<User[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      salary: 75000,
      joinDate: '2023-01-15',
      isActive: true,
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      salary: 65000,
      joinDate: '2023-03-20',
      isActive: true,
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: 'Manager',
      salary: 85000,
      joinDate: '2022-11-10',
      isActive: false,
    },
    {
      id: 4,
      name: 'Alice Brown',
      email: 'alice@example.com',
      role: 'User',
      salary: 60000,
      joinDate: '2024-02-01',
      isActive: true,
    },
  ]);
}

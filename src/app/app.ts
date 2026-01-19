import { Component, signal } from '@angular/core';
import { DynamicTableComponent } from './shared/components/dynamic-table/dynamic-table';
import { TableConfig } from './shared/components/dynamic-table/table.types';
import { ModalComponent, ModalConfig } from './shared/components/modal/modal.component';

interface Client {
  id: number;
  name: string;
  numberOfAccounts: number;
  totalAUM: number;
  dateOfBirth: string;
  SSN: string;
  homeAddress: string;
  mobileNumber: string;
  businessName: string;
  email: string;
}

@Component({
  selector: 'app-root',
  imports: [DynamicTableComponent, ModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  
  clientTableConfig = signal<TableConfig>({
    title: 'Client Management',
    key: 'id',
    columns: [
      { key: 'id', label: 'ID', align: 'center', type: 'number' },
      { key: 'name', label: 'Name', align: 'left', type: 'text' },
      { key: 'numberOfAccounts', label: 'Accounts', align: 'center', type: 'number' },
      { key: 'totalAUM', label: 'Total AUM', align: 'right', type: 'currency' },
      {
        key: 'dateOfBirth',
        label: 'Date of Birth',
        align: 'center',
        type: 'mask',
        mask: { type: 'dob-year' },
      },
      {
        key: 'SSN',
        label: 'SSN',
        align: 'center',
        type: 'mask',
        mask: { type: 'prefix', visibleChars: 4 },
      },
      { key: 'homeAddress', label: 'Address', align: 'left', type: 'text' },
      { key: 'mobileNumber', label: 'Mobile', align: 'center', type: 'text' },
      { key: 'businessName', label: 'Business', align: 'left', type: 'text' },
      { key: 'email', label: 'Email', align: 'left', type: 'link' },
    ],
  });

  clients = signal<Client[]>([
    {
      id: 1,
      name: 'Michael Scott',
      numberOfAccounts: 3,
      totalAUM: 1500000,
      dateOfBirth: '1975-03-15',
      SSN: '123-45-6789',
      homeAddress: '1725 Slough Avenue, Scranton, PA',
      mobileNumber: '555-1234',
      businessName: 'Dunder Mifflin',
      email: 'michael @dundermifflin.com',
    },
    {
      id: 2,
      name: 'Pam Beesly',
      numberOfAccounts: 2,
      totalAUM: 800000,
      dateOfBirth: '1980-03-25',
      SSN: '987-65-4321',
      homeAddress: '1725 Slough Avenue, Scranton, PA',
      mobileNumber: '555-5678',
      businessName: 'Art by Pam',
      email: 'pam@artbypam.com',
    },
    {
      id: 3,
      name: 'Jim Halpert',
      numberOfAccounts: 4,
      totalAUM: 1200000,
      dateOfBirth: '1978-10-01',
      SSN: '555-66-7777',
      homeAddress: '1725 Slough Avenue, Scranton, PA',
      mobileNumber: '555-8765',
      businessName: 'Halpert Motors',
      email: 'jim@halpertmotors.com',
    },
  ]);

  isOpen = signal(false)

  modalConfig: ModalConfig = {
    title: 'Delete item',
    content: 'Are you sure you want to delete?',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    data: { id: 1 },
  };

  onCancel(): void {
    this.isOpen.set(false)

  }

  onClose(): void {
    this.isOpen.set(false)
  }

  onConfirm(data: any): void {
    console.log(data)
  }
}

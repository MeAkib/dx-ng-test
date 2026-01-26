import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  imports: [FormsModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {
  totalItems = signal(222);
  currentPage = signal(1);
  itemsPerPage = signal(10);

  totalPages = computed(() => {
    return Math.ceil(this.totalItems() / this.itemsPerPage());
  });

  pageOptions = computed(() => {
    const options = [];
    // Generate page numbers based on current page + 5
    const current = this.currentPage();
    for (let i = current; i <= current + 4 && i <= this.totalPages(); i++) {
      options.push(i);
    }
    return options;
  });

  goToPreviousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
    }
  }

  goToNextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.set(this.currentPage() + 1);
    }
  }

  toToLastPage(): void {
    this.currentPage.set(this.totalPages());
  }

  toFirstPage(): void {
    this.currentPage.set(1);
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
  }
}

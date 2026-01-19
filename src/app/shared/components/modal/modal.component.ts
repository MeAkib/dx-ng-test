import { Component, Input, Output, EventEmitter } from "@angular/core";


export interface ModalConfig {
    title?: string;
    content?: string;

    width?: string;
    maxWidth?: string;

    closable?: boolean;        // show close (×) button
    closeOnBackdrop?: boolean;

    confirmText?: string;
    cancelText?: string;

    showConfirm?: boolean;
    showCancel?: boolean;

    data?: any;                // pass arbitrary data to modal
}

export const DEFAULT_MODAL_CONFIG: Required<ModalConfig> = {
    title: '',
    content: '',
    width: '500px',
    maxWidth: '90vw',
    closable: true,
    closeOnBackdrop: true,
    confirmText: 'OK',
    cancelText: 'Cancel',
    showConfirm: true,
    showCancel: true,
    data: null,
};



@Component({
    selector: 'modal',
    templateUrl: './modal.component.html',
    styleUrl: './style.css',
})
export class ModalComponent {
    @Input() config!: ModalConfig;

    @Output() confirm = new EventEmitter<any>();
    @Output() cancel = new EventEmitter<void>();
    @Output() close = new EventEmitter<void>();

    get mergedConfig() {
        return { ...DEFAULT_MODAL_CONFIG, ...this.config };
    }

    onConfirm() {
        this.confirm.emit(this.mergedConfig.data);
    }

    onCancel() {
        this.cancel.emit();
    }

    onClose() {
        this.close.emit();
    }

    onBackdropClick() {
        if (this.mergedConfig.closeOnBackdrop) {
            this.onClose();
        }
    }
}

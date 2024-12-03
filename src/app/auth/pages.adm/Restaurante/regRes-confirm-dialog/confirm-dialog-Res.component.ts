import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Restaurante } from '../restaurante.interface';


@Component({
  selector: 'app-confirm-dialog-Res',
  templateUrl: './confirm-dialog-Res.component.html',
  styleUrls: ['./confirm-dialog-Res.component.css'] 
})
export class ConfirmDialogResComponent {
  message: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogResComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Restaurante,
  ) {
    this.message = '¿Estás seguro de que deseas guardar estos datos?';
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}

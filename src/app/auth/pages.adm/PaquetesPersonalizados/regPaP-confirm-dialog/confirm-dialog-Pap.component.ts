import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaquetePersonalizado } from '../Paquetespersonalizados.interface';


@Component({
  selector: 'app-confirm-dialog-Pap',
  templateUrl: './confirm-dialog-Pap.component.html',
  styleUrls: ['./confirm-dialog-Pap.component.css'] 
})
export class ConfirmDialogPapComponent {
  message: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogPapComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PaquetePersonalizado,
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

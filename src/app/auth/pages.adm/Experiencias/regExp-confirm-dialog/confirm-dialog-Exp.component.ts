import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Experiencias } from '../experiencias.interface';


@Component({
  selector: 'app-confirm-dialog-Exp',
  templateUrl: './confirm-dialog-Exp.component.html',
  styleUrls: ['./confirm-dialog-Exp.component.css'] 
})
export class ConfirmDialogExpComponent {
  message: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogExpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Experiencias,
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

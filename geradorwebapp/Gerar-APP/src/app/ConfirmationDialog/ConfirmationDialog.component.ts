import { Component, Inject } from '@angular/core';
import { VERSION, MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-ConfirmationDialog',
  templateUrl: './ConfirmationDialog.component.html',
  styleUrls: ['./ConfirmationDialog.component.css']
})
export class ConfirmationDialogComponent {

  message: string = '';
  newButtonText = '';
  cancelButtonText = '';
  editButtonText = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>) {
      if(data){
        this.message = data.message || this.message;
        if (data.buttonText) {
          this.newButtonText = data.buttonText.new || this.newButtonText;
          this.editButtonText = data.buttonText.edit || this.editButtonText;
          this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
        }
      }
    }

    onConfirmClick(): void {
      this.dialogRef.close('new');
    }
    onEditClick(): void {
      this.dialogRef.close('edit');
    }
    onCancelClick(): void {
      this.dialogRef.close();
    }
  }

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './error.dialog.html',
  styleUrls: ['./error.dialog.scss'],
})
export class ErrorDialog {
  constructor(
    public readonly dialogRef: MatDialogRef<ErrorDialog>,
    @Inject(MAT_DIALOG_DATA)
    public readonly config: {
      title: string;
      content: string;
    }
  ) {}

  public static width: string = '320px';
}

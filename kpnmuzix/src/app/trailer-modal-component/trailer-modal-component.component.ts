import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-trailer-modal-component',
  templateUrl: './trailer-modal-component.component.html',
  styleUrl: './trailer-modal-component.component.css'
})
export class TrailerModalComponentComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TrailerModalComponentComponent>
  ) { }
}

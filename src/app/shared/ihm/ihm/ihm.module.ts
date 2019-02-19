import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatProgressSpinnerModule,
  MatDialogModule,
  MatButtonModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule
  ],
  exports: [
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule
  ]
})
export class IhmModule { }

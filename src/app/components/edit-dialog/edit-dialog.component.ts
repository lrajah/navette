import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TourneeInterface } from 'src/app/shared/interfaces/tournee';
import * as moment from 'moment';
@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {
  public paymentForm: FormGroup;

  public validationMessages: any;

  public monthes: Map<string, string> = new Map<string, string>();
  public years: Array<string> = new Array<string>();

  editForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public tour: TourneeInterface
  ) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

  get f() { return this.editForm.controls; }
  dateLessThanToday(from: string) {

    console.log(from);
    return (group: FormGroup): { [key: string]: any } => {
      if (moment().isAfter(moment(from, "DD/MM/YYYY"))) {
        return {
          dates: "Baaaack to the fuuutur"
        };
      }
      return {};
    }
  }

  ngOnInit() {

    this.editForm = this.formBuilder.group({
      priority: ['', Validators.required],
      date: ['', Validators.required],
      project: ['', Validators.required],
      desc: ['', Validators.required],
    },
      {
        validator: Validators.compose([
          this.dateLessThanToday('date')
        ])
      })
  }



  // public cancel() {
  //   this.edit = false;
  //   this.editTaskId=null;
  // }
}

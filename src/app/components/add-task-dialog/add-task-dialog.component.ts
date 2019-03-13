import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TaskDto } from 'src/app/_models/task-dto';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/_services/alert.service';

export interface DialogData {
  label: string;
  deadline: string;
  priority: string;
}

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.scss']
})

export class AddTaskDialogComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  taskDto: TaskDto;

  constructor(

    private userService: UserService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    public dialogRef: MatDialogRef<AddTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      label: ['', Validators.required],
      deadline: ['', Validators.required],
      priority: ['', Validators.required]
    });
  }

  public onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.taskDto.label = this.registerForm.value.label;
    this.taskDto.deadline = this.registerForm.value.deadline;
    this.taskDto.priority = this.registerForm.value.priority;
    this.loading = true;
    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Task create with success', true);

        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}

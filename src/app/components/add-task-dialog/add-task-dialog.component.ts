import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TaskDto } from 'src/app/_models/task-dto';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/_services/alert.service';
import { CategoryDto } from 'src/app/_models/category-dto';
import * as moment from 'moment';
import { ConnectedUserService } from 'src/app/_services/connected-user.service';
export interface Priority {
  value: string;
  viewValue: string;
}
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
  user: any;
  addForm: FormGroup;
  loading = false;
  submitted = false;
  taskDto: TaskDto;
  projects:Array<CategoryDto>;
  cat:CategoryDto;
  priorities: Priority[] = [
    { value: 'Low', viewValue: 'Low' },
    { value: 'Medium', viewValue: 'Medium' },
    { value: 'High', viewValue: 'High' }
  ];
  constructor(

    private userService: UserService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    
    private connectedUser: ConnectedUserService,
    public dialogRef: MatDialogRef<AddTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { 

      this.taskDto=new TaskDto();
      this.cat=new CategoryDto();
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  get f() { return this.addForm.controls; }
  ngOnInit() {
    this.connectedUser.currentUser.subscribe(user => this.user = user)
    this.loadUserProjects();
    this.addForm = this.formBuilder.group({
      priority: ['', Validators.required],
      date: ['', Validators.required],
      label: ['', Validators.required],
      project: ['', Validators.required],
    })
  }
private loadUserProjects() {
    this.userService.getUserProjects().pipe(first()).subscribe(project => {
      this.projects = project;
      // console.log(JSON.stringify(project));

    });
  }
  public onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addForm.invalid) {
      return;
    }

    this.taskDto.label = this.addForm.value.label;
    this.taskDto.deadline =  moment(this.addForm.controls['date'].value, "YYYY-MM-DD").format('DD/MM/YYYY');
   
    this.taskDto.priority = this.addForm.value.priority;

    this.cat.category=this.addForm.value.project;
    this.cat.user=this.user.nickname;
    this.taskDto.category=this.cat;
    this.taskDto.users=this.user;
    this.taskDto.state=0;
    this.loading = true;
    this.userService.addUserTask(this.taskDto).pipe(first()).subscribe(task => {
      this.loadUserTasks();

   },
   error => {
       this.alertService.error(error);
       this.loading = false;
   });
  
  }
  private loadUserTasks() {
    this.userService.getTasks().pipe(first()).subscribe(task => {
      const tasks = task.sort((c1,c2) => moment(c1.deadline,"DD/MM/YYYY").valueOf()-moment(c2.deadline,"DD/MM/YYYY").valueOf())
                        .filter(c1 => c1.state==0);
      this.connectedUser.changeProject(tasks);            
      //  console.log(JSON.stringify(this.tasks));

    });
  }
}

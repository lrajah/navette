import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskDto } from 'src/app/_models/task-dto';
import * as moment from 'moment';
import { ConnectedUserService } from 'src/app/_services/connected-user.service';
import { MatDialog } from '@angular/material';
import { AddTaskDialogComponent } from 'src/app/components/add-task-dialog/add-task-dialog.component';

export interface Priority {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  panelOpenState = false;
  user: any;

  tasks: Array<any>;
  finishedTasks:Array<TaskDto>;
  edit: boolean = false;

  editForm: FormGroup;
  loading = false;
  submitted = false;
  currentTask: TaskDto;

  priorities: Priority[] = [
    { value: 'Low', viewValue: 'Low' },
    { value: 'Medium', viewValue: 'Medium' },
    { value: 'High', viewValue: 'High' }
  ];
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private connectedUser: ConnectedUserService,
    public dialog: MatDialog
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.currentTask = new TaskDto();

    });

  }

  ngOnInit() {
    this.connectedUser.currentUser.subscribe(user => this.user = user)
    this.connectedUser.currentProject.subscribe(task => this.tasks = task)
    // this.loadLoggedUser();
    this.loadUserTasks();
    this.editForm = this.formBuilder.group({
      priority: ['', Validators.required],
      date: ['', Validators.required],
    }
      // {
      //   validator: Validators.compose([
      //     this.dateLessThanToday('date')
      //   ])
      // }
    )


    //  this.loadAllUsers();
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

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

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      width: '70%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  private loadUserTasks() {
    this.userService.getTasks().pipe(first()).subscribe(task => {
      let tasks = task.sort((c1,c2) => moment(c1.deadline,"DD/MM/YYYY").valueOf()-moment(c2.deadline,"DD/MM/YYYY").valueOf())
                        .filter(c1 => c1.state==0);
      this.connectedUser.changeProject(tasks);                 
      this.finishedTasks=task.filter(c1 => c1.state>0)
      //  console.log(JSON.stringify(this.tasks));

    });
  }
  private editUserTask(task: TaskDto) {
    this.userService.editUserTask(task).pipe(first()).subscribe(task => {
      // this.loadUserTasks();

    });
  }

  get f() { return this.editForm.controls; }
  public editTask(task: TaskDto) {
    this.edit = !this.edit;
    this.panelOpenState = true;
    this.currentTask = task;
    console.log(this.currentTask.id);
  }
  public editTaskSubmit() {
    // stop here if form is invalid
    this.submitted = true;

    if (this.editForm.invalid) {
      return;
    }
    this.currentTask.priority = this.editForm.controls['priority'].value;
    this.currentTask.deadline = this.editForm.controls['date'].value;
    this.currentTask.deadline = moment(this.currentTask.deadline, "YYYY-MM-DD").format('DD/MM/YYYY')
    this.editUserTask(this.currentTask);
    this.cancel();
  }
  public taskDone(task: TaskDto) {
    this.currentTask = task;
    this.currentTask.state = 1;
    this.userService.editUserTask(this.currentTask).pipe(first()).subscribe(task => {
     this.loadUserTasks();

    });
  }
  public taskDelete(task: TaskDto){

    this.userService.deleteUserTask(task).pipe(first()).subscribe(task => {
      this.loadUserTasks();
      this.cancel();

    });
  }

  public cancel() {
    this.edit = false;
    this.currentTask = null;
  }
}
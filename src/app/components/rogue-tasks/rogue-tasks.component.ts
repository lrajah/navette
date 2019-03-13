import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { Subscription } from 'rxjs';
import { CategoryDto } from 'src/app/_models/category-dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskDto } from 'src/app/_models/task-dto';
import { Priority } from 'src/app/home/home/home.component';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_services/alert.service';
import { ConnectedUserService } from 'src/app/_services/connected-user.service';
import * as moment from 'moment';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-rogue-tasks',
  templateUrl: './rogue-tasks.component.html',
  styleUrls: ['./rogue-tasks.component.scss']
})
export class RogueTasksComponent implements OnInit {
  panelOpenState = false;
  currentUser: User;
  currentUserSubscription: Subscription;
  user: any;
  tasks: Array<any>;
  projects: Array<CategoryDto>;
  selectedProjectTasks: Array<any>;
  selectedProjectTitle: String;
  currentProject: CategoryDto;
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
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private connectedUser: ConnectedUserService

  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.currentTask = new TaskDto();

    });
  }

  ngOnInit() {
    // this.loadLoggedUser();
    this.connectedUser.currentProject.subscribe(task => this.selectedProjectTasks = task)
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

  // private loadLoggedUser() {
  //   this.userService.getLoggedUser().pipe(first()).subscribe(user => {
  //     this.user = user;


  //   });
  // }

  private loadUserTasks() {
    this.userService.getTasks().pipe(first()).subscribe(task => {
      this.tasks=task.filter(c1=> c1.category==null)
                      .sort((c1, c2) => moment(c1.deadline, "DD/MM/YYYY").valueOf() - moment(c2.deadline, "DD/MM/YYYY").valueOf())
                      .sort(c1=> c1.state);
      this.connectedUser.changeProject(this.tasks);
      if(this.selectedProjectTitle) this.selectedProject();
      
      

    });
  }
  

  public selectedProject() {

    this.connectedUser.changeProject(this.tasks.filter(c => c.category.category == this.selectedProjectTitle));
  }

  private editUserTask(task: TaskDto) {
    this.userService.editUserTask(task).pipe(first()).subscribe(task => {
      this.loadUserTasks();
      



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
  public taskDelete(task: TaskDto) {

    this.userService.deleteUserTask(task).pipe(first()).subscribe(task => {
      this.loadUserTasks();
      this.cancel();

    });
  }

  public cancel() {
    this.edit = false;
    this.currentTask = null
  }
}
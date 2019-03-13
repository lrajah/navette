import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDto } from '../_models/user-dto';
import { TaskData } from '@angular/core/src/testability/testability';
import { TaskDto } from '../_models/task-dto';

@Injectable({
  providedIn: 'root'
})
export class ConnectedUserService {

  private userSource = new BehaviorSubject({});
  currentUser = this.userSource.asObservable();

  private projectSource = new BehaviorSubject(new Array<any>());
  currentProject = this.projectSource.asObservable();

  constructor() { }

  changeUser(user: UserDto) {
    this.userSource.next(user);
  }
  changeProject(tasks: Array<any>) {
    console.log(tasks)
    this.projectSource.next(tasks);
  }
}

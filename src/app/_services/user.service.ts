import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { UserDto } from '../_models/user-dto';
import { environment } from 'src/environments/environment';
import { TaskDto } from '../_models/task-dto';


@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${config.apiUrl}/users`);
    }
    getLoggedUser() {
      const uri: string = environment.apiRoot + 'api/client';
      return this.http.get<UserDto>(uri);
  }


    getById(id: number) {
        return this.http.get(`${config.apiUrl}/users/${id}`);
    }

    register(user: User) {
        return this.http.post(`${config.apiUrl}/users/register`, user);
    }

    // update(user: User) {
    //     return this.http.put(`${config.apiUrl}/users/${user.id}`, user);
    // }

    deleteUserTask(task: TaskDto) {
      const uri: string = environment.apiRoot + 'api/client/task/delete';
        return this.http.post(uri,task);
    }

    getTasks(){
      const uri: string = environment.apiRoot + 'api/client/task';
      return this.http.get<Array<TaskDto>>(uri);
    }
    editUserTask(task:TaskDto){
      const uri: string = environment.apiRoot + 'api/client/task/modify';
      return this.http.put<TaskDto>(uri,task);
    }

}
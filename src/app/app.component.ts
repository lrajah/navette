
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from './_models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services/authentication.service';
import { UserDto } from './_models/user-dto';
import { ConnectedUserService } from './_services/connected-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  // tslint:disable-next-line:no-inferrable-types
  public title: string = 'Todoist';
  currentUser: User;
  user: any;
  public constructor(
    private toastr: ToastrService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private connectedUser: ConnectedUserService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    console.log('Constructeur de AppComponent !');
  }

  public ngOnInit() {
    this.connectedUser.currentUser.subscribe(user => this.user = user);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}

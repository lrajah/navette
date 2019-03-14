
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from './_models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services/authentication.service';
import { UserDto } from './_models/user-dto';
import { ConnectedUserService } from './_services/connected-user.service';
import { UserService } from './_services/user.service';
import { first } from 'rxjs/operators';
import { AddTaskDialogComponent } from './components/add-task-dialog/add-task-dialog.component';
import { MatDialog } from '@angular/material';

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
  
  disabledButton = false;
  public constructor(
    private toastr: ToastrService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private connectedUser: ConnectedUserService,
    private userService: UserService,
    
    public dialog: MatDialog
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    console.log('Constructeur de AppComponent !');
  }

  public ngOnInit() {
    if (this.currentUser) this.loadLoggedUser();
    this.connectedUser.currentUser.subscribe(user => this.user = user)

  }
  private loadLoggedUser() {
    this.userService.getLoggedUser().pipe(first()).subscribe(user => {
      this.connectedUser.changeUser(user);



    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  

  openDialog(): void {
    this.disabledButton = true;
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      width: '70%',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.disabledButton = false;
    });
  }
}

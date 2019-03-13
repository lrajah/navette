

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { IhmModule } from './shared/ihm/ihm/ihm.module';

import { AppComponent } from './app.component';
import { MomentPipe } from './shared/pipes/moment-pipe.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyTasksByProjectComponent } from './components/my-tasks-by-project/my-tasks-by-project.component';
import { AlertComponent } from './_components/alert/alert.component';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register/register.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { PriorityManagerDirective } from './shared/directives/priority-manager.directive';

@NgModule({
  declarations: [
    AppComponent,
    MomentPipe,
    MyTasksByProjectComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    EditDialogComponent,
    PriorityManagerDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true
      }
    ),
    ReactiveFormsModule,
    IhmModule,
    AppRoutingModule,
    HttpClientModule,
  ],

    
  providers: [
      {
        provide: LOCALE_ID,
        useValue: 'fr'
      },
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  entryComponents: [
    // PaymentDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

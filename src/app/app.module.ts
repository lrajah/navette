import { ResaService } from './shared/services/resa.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyComponentComponent } from './components/my-component/my-component.component';
import { MomentPipe } from './shared/pipes/moment-pipe.pipe';
import { ResaAutoDirective } from './shared/directives/resa-auto.directive';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TourListComponent } from './components/tour-list/tour-list.component';

@NgModule({
  declarations: [
    ResaAutoDirective,
    AppComponent,
    MyComponentComponent,
    MomentPipe,
    TourListComponent
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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

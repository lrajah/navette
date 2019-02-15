
import { ResaService } from './shared/services/resa.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { IhmModule } from './ihm/ihm.module';

import { AppComponent } from './app.component';
import { MyComponentComponent } from './components/my-component/my-component.component';
import { MomentPipe } from './shared/pipes/moment-pipe.pipe';
import { ResaAutoDirective } from './shared/directives/resa-auto.directive';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MyResaComponent } from './components/my-resa/my-resa.component';

@NgModule({
  declarations: [
    ResaAutoDirective,
    AppComponent,
    MyComponentComponent,
    MomentPipe,
    MyResaComponent
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
    IhmModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

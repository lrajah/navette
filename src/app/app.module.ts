import { ResaService } from './shared/services/resa.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import localFr from '@angular/common/locales/fr';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MyComponentComponent } from './components/my-component/my-component.component';
import { MomentPipe } from './shared/pipes/moment-pipe.pipe';
import { ResaAutoDirective } from './shared/directives/resa-auto.directive';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TourListComponent } from './components/tour-list/tour-list.component';
import { IhmModule } from './shared/ihm/ihm/ihm.module';
import { PaymentDialogComponent } from './components/payment-dialog/payment-dialog.component';
import { GetValuesPipe } from './shared/pipes/get-values.pipe';
import { MyResaComponent } from './components/my-resa/my-resa.component';

@NgModule({
  declarations: [
    ResaAutoDirective,
    AppComponent,
    MyComponentComponent,
    MomentPipe,
    TourListComponent,
    PaymentDialogComponent,
    GetValuesPipe,
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
    ReactiveFormsModule,
    IhmModule,
    AppRoutingModule
  ],
  providers: [
      {
        provide: LOCALE_ID,
        useValue: 'fr'
      }
  ],
  entryComponents: [
    PaymentDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

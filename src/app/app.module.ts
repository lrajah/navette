
import { ResaService } from './shared/services/resa.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import localFr from '@angular/common/locales/fr';
import { AppRoutingModule } from './app-routing.module';
import { IhmModule } from './shared/modules/ihm/ihm.module';

import { AppComponent } from './app.component';
import { MyComponentComponent } from './components/my-component/my-component.component';
import { MomentPipe } from './shared/pipes/moment-pipe.pipe';
import { ResaAutoDirective } from './shared/directives/resa-auto.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MyResaComponent } from './components/my-resa/my-resa.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ResaAutoDirective,
    AppComponent,
    MyComponentComponent,
    MomentPipe,
    MyResaComponent,
    PaymentFormComponent
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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TourListComponent } from './components/tour-list/tour-list.component';

const routes: Routes = [
  {
    path: 'tours',
    component: TourListComponent,
    data: { title: 'Tournées du jour' }
  },
  { path: '',
    redirectTo: '/tours',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConnectionListComponent } from './connection-list/connection-list.component';
// import { ConnectionChartComponent } from './connection-chart/connection-chart.component';

const routes: Routes = [
  { path: 'connections', component: ConnectionListComponent },
  //  { path: 'charts', component: ConnectionChartComponent },
  // { path: '', redirectTo: '/connections', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

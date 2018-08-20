import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {OverviewComponent} from './overview/overview.component';
import {InformationComponent} from './information/information.component';
import {RegisterComponent} from './register/register.component';
import {ResultComponent} from './result/result.component';

const routes: Routes = [
  {
    path: '', // home path
    component: OverviewComponent
  },
  {
    path: 'information',
    component: InformationComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'result',
    component: ResultComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

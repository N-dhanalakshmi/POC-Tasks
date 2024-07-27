import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { LoginComponent } from './login/login.component';
import { CanDeactivateGuard } from '../Guards/can-deactivate-component.guard';

const routes: Routes = [
  {
    path : 'view-employee',
    component : ViewEmployeeComponent
  },
  {
    path : 'edit-password',
    component : EditPasswordComponent,
    canDeactivate : [CanDeactivateGuard]
  },
  {
    path : 'login',
    component : LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }

import { DynamicEditorComponent } from './dynamic-editor/dynamic-editor.component';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreviewComponent } from './preview/preview.component';
import { EditorComponent } from './editor/editor.component';
import { TemplatesComponent } from './templates/templates.component';
import { CardDragAndDropComponent } from './card-drag-and-drop/card-drag-and-drop.component';

const routes: Routes = [
  // { path: '' , component:EditorComponent},
  // {path: '' , component:DynamicEditorComponent},
  { path: '' , component:CardDragAndDropComponent},
  { path: 'Preview' , component:PreviewComponent},
  {path:'Templates' , component:TemplatesComponent},
  { path: 'Employer', loadChildren: () => import('./employer/employer.module').then(m => m.EmployerModule) },
  { path: 'Employee', loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

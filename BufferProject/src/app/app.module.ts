import { CardDragAndDropComponent } from './card-drag-and-drop/card-drag-and-drop.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeModule } from './employee/employee.module';
import { EmployerModule } from './employer/employer.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CanDeactivateGuard } from './Guards/can-deactivate-component.guard';
import { AuthService } from './interceptors/auth.service';
import { CanvasEditorComponent } from './canvas-editor/canvas-editor.component';
import { EditorComponent } from './editor/editor.component';
import { WordEditorComponent } from './word-editor/word-editor.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PreviewComponent } from './preview/preview.component';
import { TextBoxComponent } from './text-box/text-box.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { DropDownComponent } from './drop-down/drop-down.component';
import { TableComponent } from './table/table.component';
import { DynamicEditorComponent } from './dynamic-editor/dynamic-editor.component';
import { TemplatesComponent } from './templates/templates.component';
import { PreviewLibraryComponent } from 'preview-tool/src/lib/preview-tool/preview-library/preview-library.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasEditorComponent,
    EditorComponent,
    WordEditorComponent,
    PreviewComponent,
    TextBoxComponent,
    TextAreaComponent,
    DatePickerComponent,
    DropDownComponent,
    TableComponent,
    DynamicEditorComponent,
    TemplatesComponent,
    PreviewLibraryComponent,
    CardDragAndDropComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EmployeeModule,
    EmployerModule,
    HttpClientModule,
    DragDropModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [CanDeactivateGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

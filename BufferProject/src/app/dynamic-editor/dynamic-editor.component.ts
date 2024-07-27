import { Component  , ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MasterServiceService } from '../services/master-service.service';
import { TextBoxComponent } from '../text-box/text-box.component';
import { TextAreaComponent } from '../text-area/text-area.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { DropDownComponent } from '../drop-down/drop-down.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-dynamic-editor',
  templateUrl: './dynamic-editor.component.html',
  styleUrl: './dynamic-editor.component.css',
  encapsulation : ViewEncapsulation.None
})
export class DynamicEditorComponent {

  templateId : number = 2;
  canvasElements: any[] = [];

  constructor(
    private router : Router,
    private service : MasterServiceService
    ) {}

  onDragStart(event: DragEvent, type: string) {
    event.dataTransfer?.setData('text', type);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const type = event.dataTransfer?.getData('text');
    if (type) {
      this.insertElement(type);
    }
  }

  insertElement(type: string) {
      let newComponent;
      switch (type) {
        case 'textbox':
          newComponent = TextBoxComponent;
        break;

        case 'textarea':
          newComponent = TextAreaComponent;
        break;

        case 'datepicker':
          newComponent = DatePickerComponent;
        break;

        case 'dropdown':
          newComponent = DropDownComponent;
        break;

        case 'table':
          newComponent = TableComponent;
        break;

        default:
        break;
      }
      this.canvasElements.push(newComponent);
  }

  saveTemplate(){
    let template = document.getElementById('canvas');
    template?.removeAttribute('contenteditable');
    if(template)
    {const buttons = Array.from(template.getElementsByTagName('button'));
    buttons.forEach(button => button.remove());
    if(template?.innerHTML)
    {this.templateId = this.templateId+1;
    this.service.saveTemplate({templateId : this.templateId,templateContent : template?.innerHTML }).subscribe();
    }
    template?.setAttribute('contenteditable','true');
    alert('Template Saved successfully');
    }
  }

  showPreview() {
    let template = document.getElementById('canvas');
    template?.removeAttribute('contenteditable');
    if(template)
      {const buttons = Array.from(template.getElementsByTagName('button'));
      buttons.forEach(button => button.remove());
      this.service.setContent(template);
      this.router.navigate(['Preview']);
      }
  }

  cancelEditing(){
    alert('Are you sure to cancel editing this template. It will not be saved');
    this.service.setContent(null);
    this.router.navigate(['Templates']);
  }

}

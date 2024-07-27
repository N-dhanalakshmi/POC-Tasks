import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MasterServiceService } from '../services/master-service.service';
import { PreviewService } from 'preview-tool/src/lib/preview.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'] ,
  encapsulation : ViewEncapsulation.None
})
export class EditorComponent implements OnInit{

  canvasElements: any[] = [];
  selectedElementIndex : number =-1 ;
  templateId = 2;

  constructor(private router : Router,
    private service : MasterServiceService,
    private previewService : PreviewService
    ) {}

  ngOnInit(): void {
  this.service.getContent().subscribe((data:HTMLElement) => {
    if(data)
    {
    let canvas = document.getElementById('canvas')
    canvas?.setAttribute('contenteditable','true');
    let canvasNode = canvas as Node;
    let container = document.getElementById('canvas-container');
    container?.removeChild(canvasNode);
    container?.appendChild(data);}
  }
  );
  }

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
      this.insertElementAtCursor(type);
    }
  }

  insertElementAtCursor(type: string) {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      switch (type) {
        case 'textbox':
          const textBoxCount = this.canvasElements.filter(el => el.type === 'textbox').length + 1;
          const textBoxNode = document.createElement('input');
          textBoxNode.setAttribute('type', 'text');
          textBoxNode.setAttribute('placeholder', 'Textbox');
          textBoxNode.setAttribute('id', `textbox-${textBoxCount}`);
          textBoxNode.setAttribute('class', 'canvas-dynamic-element');
          textBoxNode.addEventListener('click', () => this.selectElement(`textbox-${textBoxCount}`));
          range.insertNode(textBoxNode);
          this.canvasElements.push({ id: `textbox-${textBoxCount}`, type: 'textbox' });
        break;

        case 'textarea':
          const textAreaCount = this.canvasElements.filter(el => el.type === 'textarea').length + 1;
          const textAreaNode = document.createElement('textarea');
          textAreaNode.setAttribute('placeholder', 'Textarea');
          textAreaNode.setAttribute('id', `textarea-${textAreaCount}`);
          textAreaNode.setAttribute('class', 'canvas-dynamic-element');
          textAreaNode.addEventListener('click', () => this.selectElement(`textarea-${textAreaCount}`));
          range.insertNode(textAreaNode);
          this.canvasElements.push({ id: `textarea-${textAreaCount}`, type: 'textarea' });
        break;

        case 'datepicker':
          const datePickerCount = this.canvasElements.filter(el => el.type === 'datepicker').length + 1;
          const datePickerNode = document.createElement('input');
          datePickerNode.setAttribute('type', 'date');
          datePickerNode.setAttribute('placeholder', 'dd/MM/yyyy');
          datePickerNode.setAttribute('id', `datepicker-${datePickerCount}`);
          datePickerNode.setAttribute('class', 'canvas-dynamic-element');
          datePickerNode.addEventListener('click', () => this.selectElement(`datepicker-${datePickerCount}`));
          range.insertNode(datePickerNode);
          this.canvasElements.push({ id: `datepicker-${datePickerCount}`, type: 'datepicker' });
        break;

        case 'dropdown':
          const dropDownCount = this.canvasElements.filter(el => el.type === 'dropdown').length + 1;
          const dropDownNode = document.createElement('select');
          dropDownNode.setAttribute('id', `dropdown-${dropDownCount}`);
          dropDownNode.setAttribute('class', 'canvas-dynamic-element');
          const defaultOption = document.createElement('option');
          defaultOption.setAttribute('value', 'Default');
          defaultOption.textContent = 'Select Item';
          dropDownNode.appendChild(defaultOption);
          dropDownNode.addEventListener('click', () => this.selectElement(`dropdown-${dropDownCount}`));
          range.insertNode(dropDownNode);
          this.canvasElements.push({ id: `dropdown-${dropDownCount}`, type: 'dropdown' });
        break;

        case 'table':
          const tableCount = this.canvasElements.filter(el => el.type === 'table').length + 1;
          const tableNode = document.createElement('table');
          tableNode.setAttribute('id', `table-${tableCount}`);
          tableNode.setAttribute('class', 'canvas-dynamic-element');
          const headers = parseInt(prompt('Enter number of columns:') || '0' , 10);
          const rows = parseInt(prompt('Enter number of rows:') || '0' , 10);
          // Create thead with two headers
          const thead = tableNode.createTHead();
          const headerRow = thead.insertRow(0);
          for(let header=1;header<=headers ; header++)
          {
          const header1 = document.createElement('th');
          header1.setAttribute('contenteditable','true')
          header1.textContent = 'Header '+header;
          headerRow.appendChild(header1);
          }
          // Create tbody with a single row and two cells
          const tbody = tableNode.createTBody();
          for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
          const row = tbody.insertRow(rowIndex);
          for (let colIndex = 0; colIndex < headers; colIndex++) {
          const cell = row.insertCell(colIndex);
          cell.setAttribute('contenteditable', 'true');
          cell.textContent = 'Cell ' + (rowIndex + 1) + (colIndex + 1);
          }
          }

          tableNode.addEventListener('click', () => this.selectElement(`table-${tableCount}`));
          range.insertNode(tableNode);
          this.canvasElements.push({ id: `table-${tableCount}`, type: 'table' });
        break;

        case 'h-ruler':
          const ruler = document.createElement('hr');
          ruler.addEventListener('click',() => ruler.remove());
          range.insertNode(ruler);
        break;

        default:
        break;
      }
    }
  }

  selectElement(id: string) {
    const elementIndex = this.canvasElements.findIndex(el => el.id === id);
    if (elementIndex !== -1) {
      this.selectedElementIndex = elementIndex;
    }
  }

  removeElement(id: string) {
    const elementIndex = this.canvasElements.findIndex(el => el.id === id);
    if (elementIndex !== -1) {
      this.canvasElements.splice(elementIndex, 1);
      const element = document.getElementById(id);
      if (element) {
        element.remove();
      }
    }
    this.selectedElementIndex = -1 ;
  }

  addOption(id : string) {
    const elementIndex = this.canvasElements.findIndex(el => el.id === id);
    if (elementIndex !== -1) {
      const element = document.getElementById(id);
      if (element) {
        const label = prompt('Enter option label:');
        const value = prompt('Enter option value:');
        if (label && value) {
        const optionNode = document.createElement('option');
        optionNode.setAttribute('value', value);
        optionNode.textContent = label;
        element.appendChild(optionNode);
      }
    }
    this.selectedElementIndex = -1 ;
    }
  }

  removeOption(id : string) {
    const elementIndex = this.canvasElements.findIndex(el => el.id === id);
    if (elementIndex !== -1) {
      const element = document.getElementById(id) as HTMLSelectElement;
      if (element) {
        const optionIndex = parseInt(prompt('Enter option index to remove:') || '0', 10);
        if (!isNaN(optionIndex) && optionIndex >= 0 ) {
           element.remove(optionIndex-1);
        }
      }
    }
    this.selectedElementIndex = -1 ;
  }

  addRow(id : string) {
    const elementIndex = this.canvasElements.findIndex(el => el.id === id);
    if (elementIndex !== -1) {
      const element = document.getElementById(id) as HTMLTableElement;
      if (element) {
      const rows = element.rows.length;
      const columns = element.rows[0].cells.length; // Get the number of columns from the first row
      const newRow = element.insertRow(); // Insert a new row at the end
      for (let i = 0; i < columns; i++) {
        const newCell = newRow.insertCell(i); // Insert new cells in the row
        newCell.textContent = 'Cell'+rows+(i+1); // Set cell content to empty string
        newCell.setAttribute('contenteditable','true')
      }
    }
    this.selectedElementIndex = -1 ;
    }
  }

  addColumn(id : string) {
    const elementIndex = this.canvasElements.findIndex(el => el.id === id);
    if (elementIndex !== -1) {
      const element = document.getElementById(id) as HTMLTableElement;
      if (element) {
        const thead = element.tHead; // Insert a new header at the end
        const headerCell = document.createElement('th');
        headerCell.textContent = `Header ${element.rows[0].cells.length+1}`;
        thead?.rows[0].appendChild(headerCell);
        const tbody = element.tBodies[0];
        for (let i = 0; i < tbody.rows.length; i++) {
          const cell = tbody.rows[i].insertCell();
          cell.setAttribute('contenteditable','true')
          cell.textContent = `Cell ${i+1}${element.rows[0].cells.length}`;
        }
    }
    this.selectedElementIndex = -1 ;
    }
  }

  removeRow(id : string) {
    const elementIndex = this.canvasElements.findIndex(el => el.id === id);
    if (elementIndex !== -1) {
      const element = document.getElementById(id) as HTMLTableElement;
      if (element) {
        const rowIndex = parseInt(prompt('Enter option index to remove:') || '0', 10);
        if(rowIndex>=1)
        element.deleteRow(rowIndex);
      }
    this.selectedElementIndex = -1 ;
    }
  }

  removeColumn(id : string) {
    const elementIndex = this.canvasElements.findIndex(el => el.id === id);
  if (elementIndex !== -1) {
    const element = document.getElementById(id) as HTMLTableElement;
    if (element) {
      const colIndex = parseInt(prompt('Enter column index to remove:') || '0', 10);

      // Remove from thead
      const thead = element.tHead;
      if (thead && thead.rows[0].cells[colIndex-1]) {
        thead.rows[0].deleteCell(colIndex-1);
      }

      // Remove from tbody
      const tbody = element.tBodies[0];
      for (let i = 0; i < tbody.rows.length; i++) {
        if (tbody.rows[i].cells[colIndex-1]) {
          tbody.rows[i].deleteCell(colIndex-1);
        }
      }
    }
    this.selectedElementIndex = -1 ;
  }
  }

  saveTemplate(){
    console.log('hello')
    var template = document.getElementById('canvas');
    template?.removeAttribute('contenteditable');
    if(template?.innerHTML)
    {this.templateId = this.templateId+1;
    this.service.saveTemplate({templateId : this.templateId,templateContent : template?.innerHTML }).subscribe();}
    template?.setAttribute('contenteditable','true');
    alert('Template Saved successfully');
  }

  showPreview() {
    var template = document.getElementById('canvas');
    template?.removeAttribute('contenteditable');
    this.previewService.setContent(template);
  }

  cancelEditing(){
    // alert('Are you sure to cancel editing this template. It will not be saved');
    this.service.setContent(null);
    this.router.navigate(['Templates']);
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-word-editor',
  templateUrl: './word-editor.component.html',
  styleUrl: './word-editor.component.css'
})
export class WordEditorComponent {
  onDragStart(event: DragEvent, type: string) {
    event.dataTransfer!.setData('text', type);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const type = event.dataTransfer!.getData('text');
    this.addElementAtCursor(type);
  }

  addElementAtCursor(type: string) {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    range.deleteContents();

    const element = this.createElement(type);
    range.insertNode(element);

    // Move the cursor after the inserted element
    range.setStartAfter(element);
    range.setEndAfter(element);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  createElement(type: string): HTMLElement {
    let element: HTMLElement;

    if (type === 'textbox') {
      element = document.createElement('input') as HTMLInputElement;
      (element as HTMLInputElement).type = 'text';
      (element as HTMLInputElement).placeholder = 'Textbox';
    } else if (type === 'textarea') {
      element = document.createElement('textarea') as HTMLTextAreaElement;
      (element as HTMLTextAreaElement).placeholder = 'Textarea';
    } else if (type === 'dropdown') {
      element = document.createElement('select') as HTMLSelectElement;
      const option = document.createElement('option');
      option.text = 'Option';
      (element as HTMLSelectElement).add(option);
    } else if (type === 'datepicker') {
      element = document.createElement('input') as HTMLInputElement;
      (element as HTMLInputElement).type = 'date';
    } else if (type === 'table') {
      element = this.createTable();
    } else {
      element = document.createElement('div');
    }

    element.contentEditable = 'false';
    element.className = 'canvas-element';
    return element;
  }

  createTable(): HTMLTableElement {
    const table = document.createElement('table') as HTMLTableElement;
    table.style.borderCollapse = 'collapse';
    const headerRow = table.insertRow();
    const headerCell = headerRow.insertCell();
    headerCell.innerText = 'Header';
    const row = table.insertRow();
    const cell = row.insertCell();
    cell.innerText = 'Cell';

    // Add remove button for table
    const removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="fas fa-trash"></i>';
    removeButton.className = 'remove-button';
    removeButton.addEventListener('click', () => {
      table.parentElement?.removeChild(table);
    });
    table.appendChild(removeButton);

    return table;
  }

  addOption(index: number) {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedElement = range.commonAncestorContainer.parentElement;
    if (selectedElement instanceof HTMLSelectElement) {
      const option = document.createElement('option');
      option.text = 'New Option';
      selectedElement.add(option);
    }
  }

  removeOption(index: number) {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedElement = range.commonAncestorContainer.parentElement;
    if (selectedElement instanceof HTMLSelectElement) {
      const selectedIndex = (selectedElement as HTMLSelectElement).selectedIndex;
      if (selectedIndex !== -1) {
        selectedElement.remove(selectedIndex);
      }
    }
  }

  addRow(table: HTMLTableElement) {
    const newRow = table.insertRow();
    const cell = newRow.insertCell();
    cell.innerText = 'New Row';

    // Add remove button for row
    const removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="fas fa-trash"></i>';
    removeButton.className = 'remove-button';
    removeButton.addEventListener('click', () => {
      table.deleteRow(newRow.rowIndex);
    });
    cell.appendChild(removeButton);
  }

  addColumn(table: HTMLTableElement) {
    const rows = Array.from(table.rows);
    for (const row of rows) {
      const newRowCell = row.insertCell();
      newRowCell.innerText = 'New Column';

      // Add remove button for column
      const removeButton = document.createElement('button');
      removeButton.innerHTML = '<i class="fas fa-trash"></i>';
      removeButton.className = 'remove-button';
      removeButton.addEventListener('click', () => {
        row.deleteCell(newRowCell.cellIndex);
      });
      newRowCell.appendChild(removeButton);
    }
  }

  onRemoveElement(element: HTMLElement) {
    if (element.parentElement) {
      element.parentElement.removeChild(element);
    }
  }
}

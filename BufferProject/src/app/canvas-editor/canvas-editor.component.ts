import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-canvas-editor',
  templateUrl: './canvas-editor.component.html',
  styleUrls: ['./canvas-editor.component.css']
})
export class CanvasEditorComponent implements AfterViewInit {

  ngAfterViewInit() {
    const lists = document.getElementsByClassName("list");
    const editor = document.getElementById("Editor");

    let selected: HTMLElement | null = null;

    for (let i = 0; i < lists.length; i++) {
      const list = lists[i] as HTMLElement;
      list.addEventListener("dragstart", function (event: DragEvent) {
        selected = event.target as HTMLElement;
        event.dataTransfer?.setData("text/plain", selected.id);
        console.log('Drag started:', selected.id);
      });
    }

    if (editor) {
      editor.addEventListener("dragover", function (event: DragEvent) {
        event.preventDefault();
        console.log('Drag over');
      });

      editor.addEventListener("drop", function (event: DragEvent) {
        event.preventDefault();
        const id = event.dataTransfer?.getData("text/plain");
        console.log('Drop event:', id);
        if (id) {
          const selectedElement = document.getElementById(id);
          if (selectedElement && editor) {
            if (selectedElement.id === "textBox") {
              const textBox = document.createElement('input');
              textBox.type = 'text';
              textBox.placeholder = 'Enter text here';
              textBox.style.position = 'absolute';
              textBox.style.left = '10px';
              textBox.style.top = '10px';
              textBox.style.backgroundColor = 'white';
              editor.appendChild(textBox);
            } else if (selectedElement.id === "textArea") {
              const textArea = document.createElement('textarea');
              textArea.placeholder = 'Enter text here';
              textArea.style.position = 'absolute';
              textArea.style.left = '10px';
              textArea.style.top = '50px';
              textArea.style.backgroundColor = 'white';
              editor.appendChild(textArea);
            } else if (selectedElement.id === "dropDown") {
              const dropdown = document.createElement('select');
              const option1 = document.createElement('option');
              option1.text = 'Option 1';
              dropdown.add(option1);
              const option2 = document.createElement('option');
              option2.text = 'Option 2';
              dropdown.add(option2);
              dropdown.style.position = 'absolute';
              dropdown.style.left = '10px';
              dropdown.style.top = '90px';
              dropdown.style.backgroundColor = 'white';
              editor.appendChild(dropdown);
            } else if (selectedElement.id === "table") {
              const table = document.createElement('table');
              const row = table.insertRow();
              const cell1 = row.insertCell();
              const cell2 = row.insertCell();
              cell1.textContent = 'Cell 1';
              cell2.textContent = 'Cell 2';
              table.style.position = 'absolute';
              table.style.left = '10px';
              table.style.top = '130px';
              table.style.backgroundColor = 'white';
              editor.appendChild(table);
            } else if (selectedElement.id === "datePicker") {
              const datePicker = document.createElement('input');
              datePicker.type = 'date';
              datePicker.style.position = 'absolute';
              datePicker.style.left = '10px';
              datePicker.style.top = '170px';
              datePicker.style.backgroundColor = 'white';
              editor.appendChild(datePicker);
            }
            selected = null;
            console.log('Element dropped:', selectedElement.id);
          }
        }
      });
    }
  }
}

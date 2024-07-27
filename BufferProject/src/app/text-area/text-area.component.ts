import { Component } from '@angular/core';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.css'
})
export class TextAreaComponent {

  removeTextArea(textarea : HTMLElement) {
  document.getElementById(textarea.id)?.remove();
  }
  
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrl: './text-box.component.css'
})
export class TextBoxComponent {

removeTextBox(textbox : HTMLElement) {
document.getElementById(textbox.id)?.remove();
}

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.css'
})
export class DropDownComponent {

  showOptions : boolean = false;

  showMenu(){
    this.showOptions = true;
  }

  toggleOptions(){
    this.showOptions = !this.showOptions;
  }

  addOption(dropdown: HTMLElement) {
    const selectElement = dropdown.querySelector('select');
    if (selectElement) {
      const newOption = document.createElement('option');
      const label = prompt('Enter option label:');
      const value = prompt('Enter option value:')
      if(label && value)
      {newOption.value = value;
      newOption.text = label;
      selectElement.appendChild(newOption);
      }
    }
    this.showOptions = !this.showOptions;
  }

  removeOption(dropdown: HTMLElement) {
    const selectElement = dropdown.querySelector('select');
    if (selectElement && selectElement.options.length > 0) {
      const optionIndex = parseInt(prompt('Enter option index to remove:') ?? '0', 10);
      if (!isNaN(optionIndex) && optionIndex >= 0 ) {
      selectElement.remove(optionIndex - 1);
    }
    }
    this.showOptions = !this.showOptions;
  }

  removeDropDown(dropdown : HTMLElement) {
  document.getElementById(dropdown.id)?.remove();
  }
}

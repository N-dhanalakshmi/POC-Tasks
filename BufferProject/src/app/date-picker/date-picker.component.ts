import { Component } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.css'
})
export class DatePickerComponent {

  removeDatePicker(datepicker: HTMLElement) {
  document.getElementById(datepicker.id)?.remove();
  }
  
}

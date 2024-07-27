import { Component } from '@angular/core';
import { last } from 'rxjs';
import { MasterServiceService } from '../services/master-service.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  showOptions : boolean = false;

  toggleOptions(){
    this.showOptions = !this.showOptions;
  }

  showMenu(){
    this.showOptions = true;
  }

  addRow(table : HTMLElement) {
    const element = document.getElementById(table.id)?.querySelector('table') as HTMLTableElement;
    const columnCount = element.tHead?.rows[0].cells?.length;
    let tableData = '';
    if(columnCount){
    for (let length = 1; length <= columnCount; length++) {
        tableData += `<td>Cell ${length}</td>`;
    }
    const htmlContent = `<tr>${tableData}</tr>`;
    element.tBodies[0].insertAdjacentHTML('afterend', htmlContent);}
    this.showOptions = !this.showOptions;
  }

  addColumn(table : HTMLElement) {
    const element = document.getElementById(table.id)?.querySelector('table') as HTMLTableElement;
    const rowCount = element.rows.length;
      const newHeaderCell = document.createElement('th');
      let headerCount = element.tHead?.rows[0].cells.length
      if(headerCount)
      newHeaderCell.textContent = `Header ${headerCount+1}`;
      element.tHead?.rows[0].appendChild(newHeaderCell);
      for (let row = 1; row <= rowCount; row++) {
      const newRowCell = document.createElement('td');
      newRowCell.textContent = `Cell ${element.rows[row].cells?.length + 1}`;
      element.rows[row].appendChild(newRowCell);
    }
    this.showOptions = !this.showOptions;
  }

  removeRow(table : HTMLElement) {
    const element = document.getElementById(table.id)?.querySelector('table') as HTMLTableElement;
    const rowIndex = parseInt(prompt('Enter row place to remove') ?? '0' , 10 );
    if(rowIndex>0)
    element.deleteRow(rowIndex);
    this.showOptions = !this.showOptions;
  }

  removeColumn(table : HTMLElement) {
    const element = document.getElementById(table.id)?.querySelector('table') as HTMLTableElement;
    const colIndex = parseInt(prompt('Enter column index to remove:') ?? '0', 10);
    const rowCount = element.rows.length;
    for (let i = 0; i < rowCount; i++) {
        element.rows[i].deleteCell(colIndex-1);
    }
    this.showOptions = !this.showOptions;
  }

  removeTable(table : HTMLElement) {
  document.getElementById(table.id)?.remove();
  }

}

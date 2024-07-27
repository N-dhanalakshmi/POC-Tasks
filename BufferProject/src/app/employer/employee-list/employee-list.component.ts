import { Component, OnInit } from '@angular/core';
import { MasterServiceService } from '../../services/master-service.service';
import { Employees } from '../../interfaces/employee-list';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit{

employees !: Employees[];
specificEmployees !: Employees[];
searchKey !: string;

constructor(private service:MasterServiceService) {
}
ngOnInit(): void {
    this.getEmployees();
}

getEmployees(){
  this.service.showAllEmployees().subscribe(result => this.employees = result);
}

getEmployeeBySearch(){
  this.service.showEmployeesBySearch(this.searchKey).subscribe(result => this.specificEmployees=result);
}

}

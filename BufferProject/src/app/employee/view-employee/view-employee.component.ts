import { Component } from '@angular/core';
import { Users } from '../../interfaces/user';
import { MasterServiceService } from '../../services/master-service.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.css'
})
export class ViewEmployeeComponent {
  user !: Users;
  constructor(private service:MasterServiceService) {
  }
  ngOnInit(): void {
      this.getUser();
  }

  getUser(){
    this.service.viewEmployee('john.doe@example.com').subscribe(result => this.user = result);
  }
}

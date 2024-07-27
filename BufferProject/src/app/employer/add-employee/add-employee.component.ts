import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterServiceService } from '../../services/master-service.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit{

  addUserForm !: FormGroup;

  constructor(private formBuilder : FormBuilder , private service:MasterServiceService) {
  }
  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      EmployeeId: [''],
      Name: ['', [Validators.required, Validators.minLength(3)]],
      Email: ['', [Validators.required, Validators.email]],
      Designation: ['', Validators.required],
      Department: ['', Validators.required],
      PhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      Password: ['', [Validators.required, Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=.{8,})')]],
      DOB: ['', Validators.required],
      Salary: [''],
      DOJ: ['', Validators.required],
      Address: ['']
    })
  }

  onSubmit() {
    if(this.addUserForm.valid){
      this.service.addUser(this.addUserForm.value).subscribe();
    }
    alert('Check form inputs');
    }

}

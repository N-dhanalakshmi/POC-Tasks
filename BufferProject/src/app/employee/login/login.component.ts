import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterServiceService } from '../../services/master-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup;

  constructor(private formBuilder : FormBuilder,
    private service : MasterServiceService
  ) {  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=.{8,})'
          ),
        ],
      ],
    });
  }

  onSubmit() {
      console.log(this.loginForm.value)
       this.service.loginUser(this.loginForm.value).subscribe(
      { next : (token : string) => {
          localStorage.setItem("token",token);
          console.log(token)
      },
        error : (error) => {
          console.log(error);
          alert("Please chechk the credentials")
        }
      }
     );
  }
}

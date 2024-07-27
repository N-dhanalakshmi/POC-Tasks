import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterServiceService } from '../../services/master-service.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrl: './edit-password.component.css',
})
export class EditPasswordComponent implements OnInit {
  UpdatePasswordForm!: FormGroup;
  response = 'Page is closed/changed';

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event): void {
    this.sendResponseOnWindowClose();
  }

  constructor(
    private formBuilder: FormBuilder,
    private service: MasterServiceService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.UpdatePasswordForm = this.formBuilder.group({
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
      confirmPassword: ['', [Validators.required]],
    });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.UpdatePasswordForm.get('email')?.value) {
      return window.confirm('Do you really want to leave?');
    }
    return true;
  }

  //on closing or leaving the page
  sendResponseOnWindowClose() {
    this.service.handleRequest();
  }

  //onSubmitting edit password form
  onSubmit() {
    if (
      this.UpdatePasswordForm.get('password')?.value ==
      this.UpdatePasswordForm.get('confirmPassword')?.value
    ) {
      this.service
        .updatePassword(
          this.UpdatePasswordForm.get('email')?.value,
          this.UpdatePasswordForm.get('password')?.value
        )
        .subscribe();
      this.route.navigate(['view-employee']);
    } else alert('Please check passwords');
  }
}

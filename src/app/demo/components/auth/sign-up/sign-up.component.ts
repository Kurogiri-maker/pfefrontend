import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisteryRequest } from 'src/app/shared/registeryRequest';
import { RegisterService } from './service/register-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
  register = new RegisteryRequest();
  userExists: boolean = false;
  invalidForm: boolean = false;

  constructor(private registeryService: RegisterService, private router: Router) { }

  onSubmit() {
    if (this.registerForm.valid && this.registerForm.get('password')?.value === this.registerForm.get('confirmPassword')?.value) {
      this.register.fistName = this.registerForm.get('firstName')?.value,
        this.register.lastName = this.registerForm.get('lastName')?.value,
        this.register.email = this.registerForm.get('email')?.value,
        this.register.password = this.registerForm.get('password')?.value
      this.registeryService.signUp(this.register).subscribe(
        (response) => {
          if (response.success) {
            console.log("Sign Up Successful");
            this.router.navigate(['']);
          }
          else {
            if (response.exists) {
              this.userExists = true;
              console.log("User Already Exists");
            }
            else {
              console.log("Sign Up Failed");
            }
          }
        }
      );
    }
    else {
      console.log("Invalid Form");
      this.invalidForm = true;
    }

  }
}

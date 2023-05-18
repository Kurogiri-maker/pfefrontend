import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtClientService } from './service/jwt-client.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthRequest } from 'src/app/shared/authRequest';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
  :host ::ng-deep .pi-eye,
  :host ::ng-deep .pi-eye-slash {
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
  }
`]
})


export class LoginComponent {
  failedLogin: boolean = false;
  disabled: boolean = false;
  signinForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  authRequest: AuthRequest = new AuthRequest();
  constructor(private jwtClientService: JwtClientService, private router: Router) { }

  onSubmit() {
    this.failedLogin = false;
    this.disabled = false;
    this.authRequest.email = this.signinForm.get('email')?.value;
    this.authRequest.password = this.signinForm.get('password')?.value;
    console.log(this.authRequest);
    this.jwtClientService.login(this.authRequest).subscribe(
      (response) => {
        if (response.success) {
          console.log("Login Successful");
          this.router.navigate(['']);
        }
        else {
          if (response.error === "Bad credentials") {
            this.failedLogin = true;
            console.log("Bad Credentials");
            console.log("123");
          }
          else if (response.error === "User is disabled") {
            this.disabled = true;
            console.log("User is disabled");
          }
          console.log(response);
        }
      }
    );
    //console.log(this.failedLogin);


  }

}

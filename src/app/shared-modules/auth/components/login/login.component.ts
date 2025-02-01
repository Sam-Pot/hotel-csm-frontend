import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../api-http/api.service';
import { UserApi } from '../../api/user.api';
import { JwtService } from '../../services/jwt.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Helpers } from '../../../utils/helpers';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent {

  loginForm = new FormGroup({
    emailAddress: new FormControl<string>('', [Validators.email, Validators.required]),
    saltedPassword: new FormControl<string>('', [Validators.minLength(8), Validators.required]),
  });

  signinForm = new FormGroup({
    emailAddress: new FormControl<string>('', [Validators.email, Validators.required]),
    name: new FormControl<string>('', [Validators.required]),
    surname: new FormControl<string>('', [Validators.required]),
    saltedPassword: new FormControl<string>('', [Validators.minLength(8), Validators.required]),
  });

  existingUser: boolean = true;
  private readonly PAYLOAD_JWT_KEY = "access_token";

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService,
    private router: ActivatedRoute,
  ) { }

  displayForm(){
    this.existingUser = !this.existingUser;
  }

  login(loginForm: FormGroup) {
    if (loginForm.value) {
      this.apiService.post(UserApi.LOGIN_URL, loginForm.value).subscribe({
        next: (data) => {
          if (data) {
            let payload = JSON.parse(JSON.stringify(data));
            this.jwtService.storeJwt(payload[this.PAYLOAD_JWT_KEY]);
            window.location.reload();
          } else {
            console.log("INVALID DATA");
          }
        },
        error: (error) => {
          console.log(error.message);
          alert("CREDENZIALI ERRATE");
        }
      });
    } else {
      alert("Compila tutti i campi!");
    }
  }

  signin(signinForm: FormGroup) {
    if (signinForm) {
      this.apiService.post(UserApi.SIGNIN_URL, signinForm.value).subscribe({
        next: (data) => {
          if (data) {
            alert("Registrazione effettuata!");
            window.location.reload();
          } else {
            console.log("DATI NON VALIDI!");
          }
        },
        error: (error) => {
          alert(error.message);
        }
      });
    }
  }
}

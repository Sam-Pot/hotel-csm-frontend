import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared-modules/api-http/api.service';
import { UserApi } from '../../../shared-modules/auth/api/user.api';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { JwtService } from '../../../shared-modules/auth/services/jwt.service';
import { UpdateUserDto } from '../../../shared-modules/dtos/user-manager/user.dto';
import { UpdatePasswordDto } from '../../../shared-modules/dtos/user-manager/update-password.dto';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.less'
})
export class ProfileComponent implements OnInit {

  userData: any = {};
  id!: string;
  showUpdatePassword: boolean = false;

  profileForm = new FormGroup({
    name: new FormControl<string>('', []),
    surname: new FormControl<string>('', []),
    email: new FormControl<string>('', [Validators.email, Validators.required]),
    saltedPassword: new FormControl<string>('', [])
  });

  passwordForm = new FormGroup({
    oldPassword: new FormControl<string>('', [Validators.required]),
    newPassword: new FormControl<string>('', [Validators.required])
  });

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService,
  ) {

  }

  ngOnInit(): void {
    this.id = this.jwtService.getId();
    this.apiService.get(UserApi.FIND_ONE_URL + "/" + this.id).subscribe({
      next: (data) => {
        if (data) {
          let user = JSON.parse(JSON.stringify(data));
          this.userData = user;
        } else {
          console.log("INVALID DATA");
        }
      },
      error: (error) => {
        console.log(error);
        alert("Impossibile raggiungere il server!");
      }
    });
  }

  update(dataForm: any) {
    let updateUserDto: UpdateUserDto = {
      name: dataForm.value.name ? dataForm.value.name : this.userData.name,
      surname: dataForm.value.surname ? dataForm.value.surname : this.userData.surname,
      emailAddress: dataForm.value.email ? dataForm.value.email : this.userData.email,
    };
    this.apiService.put(UserApi.UPDATE_URL + "/" + this.id, updateUserDto).subscribe({
      next: (data) => {
        if (data) {
          let user = JSON.parse(JSON.stringify(data));
          this.userData = user;
          window.location.reload();
        } else {
          alert("DATI NON VALIDI");
        }
      },
      error: (error) => {
        console.log(error.message);
        alert("Si è verificato un errore");
      }
    });
  }

  delete() {
    this.apiService.delete(UserApi.DELETE_URL + "/" + this.id).subscribe({
      next: (data) => {
        if (data) {
          alert("Account eliminato!");
          this.logout();
        } else {
          console.log("SOMETHING WENT WRONG DURING THE DELETE OF PROFILE!");
        }
      },
      error: (error) => {
        alert(error.message);
      }
    })
  }

  updatePassword(passwordForm: any) {
    let updatePasswordDto: UpdatePasswordDto = {
      oldPassword: passwordForm.value.oldPassword,
      newPassword: passwordForm.value.newPassword
    };
    this.apiService.put(UserApi.UPDATE_PASSWORD_URL + "/" + this.id, updatePasswordDto).subscribe({
      next: (data) => {
        if (data) {
          this.logout();
        } else {
          console.log("SOMETHING WENT WRONG DURING THE DELETE OF PROFILE!");
        }
      },
      error: (error) => {
        console.log(error.message);
        alert("Password errata");
      }
    })
  }

  showUpdatePasswordField() {
    this.showUpdatePassword = !this.showUpdatePassword;
  }

  logout() {
    this.jwtService.removeJwt();
    window.location.reload();
  }
}

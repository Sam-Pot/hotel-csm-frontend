import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../../shared-modules/api-http/api.service';
import { CommonModule } from '@angular/common';
import { UserApi } from '../../../../shared-modules/auth/api/user.api';
import { ActivatedRoute } from '@angular/router';
import { LocationUtils } from '../../../../shared-modules/utils/location.utils';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.less'
})
export class UserDetailComponent {

  userData: any = {};
  id!: string | null;

  userForm = new FormGroup({
    role: new FormControl<string>('', [])
  });

  roles: any = {
    ADMIN: "Amministratore",
    COOK: "Cuoco",
    RECEPTIONIST: "Receptionist",
    STOCKMAN: "Magazziniere",
    RESTAURANT_STAFF: "Staff ristorante",
    ROOM_STAFF: "Staff camere",
    CUSTOMER: "Cliente"
  }

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get("userId");
    this.apiService.get(UserApi.FIND_ONE_BY_ADMIN_URL + "/" + this.id).subscribe({
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

  previousPage() {
    LocationUtils.reloadPreviousLocation(this.route);
  }

  updateRole(dataForm: any) {
    let updateRoleDto = {
      role: dataForm.value.role ? dataForm.value.role : this.userData.role,
    };
    this.apiService.put(UserApi.UPDATE_ROLE_URL + "/" + this.id, updateRoleDto).subscribe({
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
    this.apiService.delete(UserApi.DELETE_BY_ADMIN_URL + "/" + this.id).subscribe({
      next: (data) => {
        if (data) {
          alert("Account eliminato!");
        } else {
          console.log("SOMETHING WENT WRONG DURING THE DELETE OF PROFILE!");
        }
      },
      error: (error) => {
        alert(error.message);
      }
    });
    this.previousPage();
  }
}


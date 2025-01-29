import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../shared-modules/api-http/api.service';
import { UserApi } from '../../../../shared-modules/auth/api/user.api';
import { LocationUtils } from '../../../../shared-modules/utils/location.utils';

@Component({
  selector: 'app-users-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './users-panel.component.html',
  styleUrl: './users-panel.component.less'
})
export class UsersPanelComponent implements OnInit {

  users: any;
  roles: any = {
    0: "Amministratore",
    1: "Cuoco",
    2: "Receptionist",
    3: "Magazziniere",
    4: "Staff ristorante",
    5: "Staff camere",
    6: "Cliente"
  }
  selectOpt: string[] = Object.values(this.roles);

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    this.apiService.get(UserApi.FIND_URL).subscribe({
      next: (data) => {
        if (data) {
          this.users = JSON.parse(JSON.stringify(data)).data;
        } else {
          console.log("Errore durante la ricerca delle tariffe");
        }
      },
      error: (error) => {
      }
    });
  }

  deleteUser(userId: string) {
    if (userId) {
      this.apiService.delete(UserApi.DELETE_BY_ADMIN_URL + "/" + userId).subscribe({
        next: (data) => {
          if (data) {
            alert("Dati utente eliminati!");
            window.location.reload();
          } else {
            console.log("Si è verificato un errore...");
          }
        },
        error: (error) => {
          console.log("Si è verificato un errore...");
        }
      });
    } else {
      alert("Si è verificato un errore...");
    }
  }
  previousPage(){
    LocationUtils.reloadPreviousLocation(this.route);
  }

}

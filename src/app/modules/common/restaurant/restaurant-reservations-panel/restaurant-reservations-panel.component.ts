import { Component } from '@angular/core';
import { ApiService } from '../../../../shared-modules/api-http/api.service';
import { ActivatedRoute } from '@angular/router';
import { RestaurantReservationApi } from '../../../../shared-modules/auth/api/restaurant-reservation.api';
import { Helpers } from '../../../../shared-modules/utils/helpers';
import { UserApi } from '../../../../shared-modules/auth/api/user.api';
import { JwtService } from '../../../../shared-modules/auth/services/jwt.service';
import { Role } from '../../../../shared-modules/dtos/user-manager/role';

@Component({
  selector: 'app-restaurant-reservations-panel',
  standalone: true,
  imports: [],
  templateUrl: './restaurant-reservations-panel.component.html',
  styleUrl: './restaurant-reservations-panel.component.less'
})
export class RestaurantReservationsPanelComponent {

  reservations: any;
  reservationState: any = {
    SENT: "Inviata",
    CONFIRMED: "Confermata",
    CLOSED: "Chiusa"
  };
  isReservationManager: boolean = false;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private jwtService: JwtService
  ) {

  }

  ngOnInit(): void {
    let role = this.jwtService.getRole() as unknown as Role;
    this.isReservationManager = (role == Role.ADMIN || role == Role.COOK || role == Role.RESTAURANT_STAFF);
    let FIND_API = this.isReservationManager ? RestaurantReservationApi.FIND_URL : RestaurantReservationApi.FIND_BY_USER_URL;
    this.apiService.get(FIND_API).subscribe({
      next: (data) => {
        if (data) {
          this.reservations = JSON.parse(JSON.stringify(data)).data;
          for (let reservation of this.reservations) {
            reservation.dateTime = Helpers.formatDate(new Date(reservation.dateTime));
          }
        } else {
          console.log("Errore durante la ricerca delle prenotazioni");
        }
      },
      error: (error) => {
        alert(error.message);
      }
    });
  }

  previousPage() {
    Helpers.reloadPreviousLocation(this.route);
  }

  delete(id: string) {
    if (id) {
      let DELETE_API = this.isReservationManager ? RestaurantReservationApi.DELETE_URL : RestaurantReservationApi.DELETE_BY_USER_URL;
      this.apiService.delete(DELETE_API + "/" + id).subscribe(
        {
          next: (data) => {
            if (data) {
              alert("Prenotazione eliminata!");
              let filteredList = this.reservations.filter((i: any) => i.id != id);
              this.reservations = filteredList;
            } else {
              console.log("SOMETHING WENT WRONG DURING THE DELETE!");
            }
          },
          error: (error) => {
            console.log(error.message);
          }
        }
      );
    }
  }
}

import { Component } from '@angular/core';
import { ApiService } from '../../../../shared-modules/api-http/api.service';
import { ActivatedRoute } from '@angular/router';
import { RestaurantReservationApi } from '../../../../shared-modules/auth/api/restaurant-reservation.api';
import { Helpers } from '../../../../shared-modules/utils/helpers';
import { RestaurantReservationDto } from '../../../../shared-modules/dtos/restaurant-manager/restaurant-reservation.dto';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReservationState } from '../../../../shared-modules/dtos/restaurant-manager/reservation-state';
import { CommonModule } from '@angular/common';
import { TableApi } from '../../../../shared-modules/auth/api/table.api';
import { JwtService } from '../../../../shared-modules/auth/services/jwt.service';
import { Role } from '../../../../shared-modules/dtos/user-manager/role';
import { DishApi } from '../../../../shared-modules/auth/api/dish.api';
import { DrinkApi } from '../../../../shared-modules/auth/api/drink.api';

@Component({
  selector: 'app-restaurant-reservation-detail',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './restaurant-reservation-detail.component.html',
  styleUrl: './restaurant-reservation-detail.component.less'
})
export class RestaurantReservationDetailComponent {

  id: string | null = null;
  reservation: any;
  loggedUserId!: string;
  isReservationManager!: boolean;

  reservationForm: FormGroup = new FormGroup({
    tableId: new FormControl<string>('string', []),
    userId: new FormControl<string>('string', []),
    dateTime: new FormControl<Date>({} as Date, []),
    totalCost: new FormControl<number>(0, []),
    numberOfPeople: new FormControl<number>(0, []),
    state: new FormControl<ReservationState>(ReservationState.SENT, []),
  });

  tableList!: any[];
  totalCost: number = 0;
  reservationState: any = {
    SENT: "Inviata",
    CONFIRMED: "Confermata",
    CLOSED: "Chiusa"
  };
  drinkRequest_and_Controls: any = [];
  dishRequest_and_Controls: any = [];
  dishList: any = [];
  drinkList: any = [];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private jwtService: JwtService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get("reservationId");
    this.loggedUserId = this.jwtService.getId();
    let loggedUserRole = this.jwtService.getRole() as unknown as Role;
    this.isReservationManager = loggedUserRole == Role.ADMIN || loggedUserRole == Role.COOK || loggedUserRole == Role.RESTAURANT_STAFF
    let FIND_ONE_API = this.isReservationManager ? RestaurantReservationApi.FIND_ONE_URL : RestaurantReservationApi.FIND_ONE_BY_USER_URL;
    if (this.id) {
      this.apiService.get(FIND_ONE_API + "/" + this.id).subscribe({
        next: (data) => {
          if (data) {
            this.reservation = data;
            let parsedDate = new Date(this.reservation.dateTime).toLocaleDateString().split('/').reverse().join('-');
            let parsedTime = new Date(this.reservation.dateTime).toLocaleTimeString().slice(0,5);
            this.reservation.dateTime = parsedDate+"T"+parsedTime;
            this.totalCost = this.reservation.totalCost;
            if (this.reservation.state != ReservationState.SENT) {
              this.reservationForm.get('numberOfPeople')?.disable();
              this.reservationForm.get('dateTime')?.disable();
              this.reservationForm.get('tableId')?.disable();
            }
            for (let dishRequest of this.reservation.dishRequest) {
              this.dishRequest_and_Controls.push({
                dishQuantity: {
                  dishName: dishRequest.dish.name,
                  quantity: dishRequest.quantity,
                  state: dishRequest.state
                },
                controls: {
                  dishName: new FormControl<string>(''),
                  quantity: new FormControl<number>(1),
                  state: new FormControl<string>(''),
                }
              });
            }
            for (let drinkRequest of this.reservation.drinkRequest) {
              this.drinkRequest_and_Controls.push({
                drinkQuantity: {
                  drinkName: drinkRequest.drink.name,
                  drinkId: drinkRequest.drink.id,
                  state: drinkRequest.state,
                  quantity: drinkRequest.quantity,
                },
                controls: {
                  drinkName: new FormControl<string>(''),
                  quantity: new FormControl<number>(1),
                  state: new FormControl<string>(''),
                }
              });
            }
          } else {
            console.log("Errore durante il caricamento");
          }
        },
        error: (error) => {
          alert("Errore durante il caricamento");
          console.log(error.message);
        }
      });
    }
    //GETTING TABLES
    this.apiService.get(TableApi.FIND_URL).subscribe({
      next: (data) => {
        if (data) {
          this.tableList = (data as any).data;
        } else {
          console.log("Errore durante il caricamento");
        }
      },
      error: (error) => {
        alert("Errore durante il caricamento");
        console.log(error.message);
      }
    });
    //GETTING DISHES
    this.apiService.get(DishApi.FIND_URL).subscribe({
      next: (data) => {
        if (data) {
          this.dishList = JSON.parse(JSON.stringify(data)).data;

        } else {
          console.log("Errore durante la ricerca dei tavoli");
        }
      },
      error: (error) => {
        alert(error.message);
      }
    });
    //GETTING DRINKS
    this.apiService.get(DrinkApi.FIND_URL).subscribe({
      next: (data) => {
        if (data) {
          this.drinkList = JSON.parse(JSON.stringify(data)).data;
        } else {
          console.log("Errore durante la ricerca dei tavoli");
        }
      },
      error: (error) => {
        alert(error.message);
      }
    });
  }

  discard() {
    Helpers.reloadPreviousLocation(this.route);
  }

  refreshTotalCost() {
    let tot = 0;
    for (let elem of this.dishRequest_and_Controls) {
      let dishName = elem.controls.dishName.value;
      let dishQuantity = elem.controls.quantity.value;
      let dishPrice = this.dishList.filter((dish: any) => dish.name == dishName)[0]?.price;
      tot += dishPrice * dishQuantity;
    }
    for (let elem of this.drinkRequest_and_Controls) {
      let drinkName = elem.controls.drinkName.value;
      let drinkQuantity = elem.controls.quantity.value;
      let drinkPrice = this.drinkList.filter((drink: any) => drink.name == drinkName)[0]?.price;
      tot += drinkPrice * drinkQuantity;
    }
    this.totalCost = tot;
  }

  addDish() {
    this.dishRequest_and_Controls.push({
      dishQuantity: {
        dishName: '',
        quantity: 0
      },
      controls: {
        dishName: new FormControl<string>(''),
        state: new FormControl<string>(''),
        quantity: new FormControl<number>(1)
      }
    });
  }
  addDrink() {
    this.drinkRequest_and_Controls.push({
      drinkQuantity: {
        drinkName: '',
        drinkId: '',
        quantity: 0
      },
      controls: {
        drinkName: new FormControl<string>(''),
        state: new FormControl<string>(''),
        quantity: new FormControl<number>(1)
      }
    });
  }

  deleteDish(index: number) {
    this.dishRequest_and_Controls.splice(index, 1);
    this.refreshTotalCost();
  }

  deleteDrink(index: number) {
    this.drinkRequest_and_Controls.splice(index, 1);
    this.refreshTotalCost();
  }

  delete() {
    if (this.id) {
      let DELETE_API = this.isReservationManager ? RestaurantReservationApi.DELETE_URL : RestaurantReservationApi.DELETE_BY_USER_URL;
      this.apiService.delete(DELETE_API + "/" + this.id).subscribe(
        {
          next: (data) => {
            if (data) {
              alert("Prenotazione eliminata!");
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
    this.discard();
  }

  update(reservationForm: any) {
    let UPDATE_API = this.isReservationManager ? RestaurantReservationApi.UPDATE_URL : RestaurantReservationApi.UPDATE_BY_USER_URL;
    if (reservationForm) {
      if (new Date(reservationForm.value.dateTime) < new Date()) {
        alert("La data di prenotazione non può essere una data passata");
        return;
      }
      let dishRequests = [];
      let drinkRequests = [];
      for (let elem of this.dishRequest_and_Controls) {
        dishRequests.push({
          dish: elem.controls.dishName.value,
          quantity: elem.controls.quantity.value,
          state: elem.controls.state.value?elem.controls.state.value: elem.dishQuantity.state?elem.dishQuantity.state: ReservationState.SENT
        });
      }
      for (let elem of this.drinkRequest_and_Controls) {
        let drinkName = elem.controls.drinkName.value;
        let drinkId = this.drinkList.filter((drink: any) => drink.name == drinkName)[0].id;
        drinkRequests.push({
          drink: drinkId,
          quantity: elem.controls.quantity.value,
          state: elem.controls.state.value?elem.controls.state.value: elem.drinkQuantity.state?elem.drinkQuantity.state: ReservationState.SENT
        });
      }
      let saveReservation: RestaurantReservationDto = {
        userId: this.loggedUserId,
        tableId: reservationForm.value.tableId ? reservationForm.value.tableId : this.reservation.tableId,
        numberOfPeople: reservationForm.value.numberOfPeople ? reservationForm.value.numberOfPeople : this.reservation.numberOfPeople,
        dateTime: reservationForm.value.dateTime ? new Date(reservationForm.value.dateTime).getTime() : undefined,
        dishRequest: dishRequests,
        drinkRequest: drinkRequests,
        state: reservationForm.value.state ? reservationForm.value.state : this.reservation.state,
        totalCost: this.totalCost
      };
      this.apiService.put(UPDATE_API + "/" + this.reservation.id, saveReservation).subscribe(
        {
          next: (data) => {
            if (data) {
              alert("Prenotazione Salvata!");
              this.discard();
            } else {
              alert("Il tavolo selezionato è già occupato! Scegli un'altra fascia oraria!");
              console.log("SOMETHING WENT WRONG DURING THE UPDATE!");
            }
          },
          error: (error) => {
            alert("Il tavolo selezionato è già occupato! Scegli un'altra fascia oraria!");
            console.log(error.message);
          }
        }
      );
    }
  }

  save(reservationForm: any) {
    if (reservationForm) {
      if (new Date(reservationForm.value.dateTime) < new Date()) {
        alert("La data di prenotazione non può essere una data passata");
        return;
      }
      let dishRequests = [];
      let drinkRequests = [];
      for (let elem of this.dishRequest_and_Controls) {
        dishRequests.push({
          dish: elem.controls.dishName.value,
          quantity: elem.controls.quantity.value,
          state: elem.controls.state.value ? elem.controls.state.value : ReservationState.SENT,
        });
      }
      for (let elem of this.drinkRequest_and_Controls) {
        let drinkName = elem.controls.drinkName.value;
        let drinkId = this.drinkList.filter((drink: any) => drink.name == drinkName)[0].id;
        drinkRequests.push({
          drink: drinkId,
          state: elem.controls.state.value ? elem.controls.state.value : ReservationState.SENT,
          quantity: elem.controls.quantity.value
        });
      }
      let saveReservation: RestaurantReservationDto = {
        userId: this.loggedUserId,
        tableId: reservationForm.value.tableId ? reservationForm.value.tableId : this.reservation.tableId,
        numberOfPeople: reservationForm.value.numberOfPeople ? reservationForm.value.numberOfPeople : this.reservation.numberOfPeople,
        dateTime: reservationForm.value.dateTime ? new Date(reservationForm.value.dateTime).getTime() : this.reservation.dateTime,
        dishRequest: dishRequests,
        state: reservationForm.value.state ? reservationForm.value.state : ReservationState.SENT,
        drinkRequest: drinkRequests,
        totalCost: this.totalCost
      };
      this.apiService.post(RestaurantReservationApi.SAVE_URL, saveReservation).subscribe(
        {
          next: (data) => {
            if (data) {
              alert("Prenotazione Salvata!");
              this.discard();
            } else {
              alert("Il tavolo selezionato è già occupato! Scegli un'altra fascia oraria!");
              console.log("SOMETHING WENT WRONG DURING THE UPDATE!");
            }
          },
          error: (error) => {
            alert("Il tavolo selezionato è già occupato! Scegli un'altra fascia oraria!");
            console.log(error.message);
          }
        }
      );
    }
  }
}

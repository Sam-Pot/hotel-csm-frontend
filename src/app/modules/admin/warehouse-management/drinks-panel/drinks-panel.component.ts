import { Component } from '@angular/core';
import { ApiService } from '../../../../shared-modules/api-http/api.service';
import { DrinkApi } from '../../../../shared-modules/auth/api/drink.api';
import { ActivatedRoute } from '@angular/router';
import { Helpers } from '../../../../shared-modules/utils/helpers';
import { JwtService } from '../../../../shared-modules/auth/services/jwt.service';
import { Role } from '../../../../shared-modules/dtos/user-manager/role';

@Component({
  selector: 'app-drinks-panel',
  standalone: true,
  imports: [],
  templateUrl: './drinks-panel.component.html',
  styleUrl: './drinks-panel.component.less'
})
export class DrinksPanelComponent {

  drinks: any;
  isDrinkManager: boolean = false;
  readonly productType: string = "drink";

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private jwtService: JwtService
  ) {

  }
  ngOnInit(): void {
    let role = this.jwtService.getRole() as unknown as Role;
    this.isDrinkManager = (role == Role.ADMIN || role == Role.STOCKMAN);
    let GET_AVAILABLE_DRINKS = DrinkApi.FIND_URL + "?filter[isActiveInMenu]=$eq:1";
    let FIND_API = this.isDrinkManager ? DrinkApi.FIND_URL : GET_AVAILABLE_DRINKS;
    this.apiService.get(FIND_API).subscribe({
      next: (data) => {
        if (data) {
          this.drinks = JSON.parse(JSON.stringify(data)).data;
          for (let drink of this.drinks) {
            switch (drink.unitOfMeasurement) {
              case "GRAMS": drink.unitOfMeasurement = "Grammi"; break;
              case "LITERS": drink.unitOfMeasurement = "Litri"; break;
              case "PIECES": drink.unitOfMeasurement = "Pezzi"; break;
            }
            drink.isActiveInMenu = drink.isActiveInMenu ? "Si" : "No";
          }
        } else {
          console.log("Errore durante la ricerca delle bevande");
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

  delete(drinkId: string) {
    if (drinkId) {
      this.apiService.delete(DrinkApi.DELETE_URL + "/" + drinkId).subscribe(
        {
          next: (data) => {
            if (data) {
              alert("Prodotto eliminato!");
              let filteredList = this.drinks.filter((i: any) => i.id != drinkId);
              this.drinks = filteredList;
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

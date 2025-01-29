import { Component } from '@angular/core';
import { ApiService } from '../../../../shared-modules/api-http/api.service';
import { DrinkApi } from '../../../../shared-modules/auth/api/drink.api';
import { ActivatedRoute } from '@angular/router';
import { LocationUtils } from '../../../../shared-modules/utils/location.utils';

@Component({
  selector: 'app-drinks-panel',
  standalone: true,
  imports: [],
  templateUrl: './drinks-panel.component.html',
  styleUrl: './drinks-panel.component.less'
})
export class DrinksPanelComponent {

  drinks: any;
  readonly productType:string = "drink";
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    this.apiService.get(DrinkApi.FIND_URL).subscribe({
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

  previousPage(){
    LocationUtils.reloadPreviousLocation(this.route);
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

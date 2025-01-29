import { Component } from '@angular/core';
import { ApiService } from '../../../../shared-modules/api-http/api.service';
import { IngredientApi } from '../../../../shared-modules/auth/api/ingredient.api';
import { ActivatedRoute } from '@angular/router';
import { LocationUtils } from '../../../../shared-modules/utils/location.utils';

@Component({
  selector: 'app-ingredients-panel',
  standalone: true,
  imports: [],
  templateUrl: './ingredients-panel.component.html',
  styleUrl: './ingredients-panel.component.less'
})
export class IngredientsPanelComponent {

  ingredients: any;
  readonly productType:string = "ingredient";

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    this.apiService.get(IngredientApi.FIND_URL).subscribe({
      next: (data) => {
        if (data) {
          this.ingredients = JSON.parse(JSON.stringify(data)).data;
          for (let ingredient of this.ingredients) {
            switch (ingredient.unitOfMeasurement) {
              case "GRAMS": ingredient.unitOfMeasurement = "Grammi"; break;
              case "LITERS": ingredient.unitOfMeasurement = "Litri"; break;
              case "PIECES": ingredient.unitOfMeasurement = "Pezzi"; break;
            }
          }
        } else {
          console.log("Errore durante la ricerca degli ingredienti");
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

  delete(ingredientId: string) {
    if (ingredientId) {
      this.apiService.delete(IngredientApi.DELETE_URL + "/" + ingredientId).subscribe(
        {
          next: (data) => {
            if (data) {
              alert("Prodotto eliminato!");
              let filteredList = this.ingredients.filter((i: any) => i.id != ingredientId);
              this.ingredients = filteredList;
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

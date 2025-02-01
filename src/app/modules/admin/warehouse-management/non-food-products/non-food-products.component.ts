import { Component } from '@angular/core';
import { ApiService } from '../../../../shared-modules/api-http/api.service';
import { NonFoodProductApi } from '../../../../shared-modules/auth/api/non-food-product.api';
import { ActivatedRoute } from '@angular/router';
import { Helpers } from '../../../../shared-modules/utils/helpers';

@Component({
  selector: 'app-non-food-products',
  standalone: true,
  imports: [],
  templateUrl: './non-food-products.component.html',
  styleUrl: './non-food-products.component.less'
})
export class NonFoodProductsComponent {
  
  nonFoodProducts: any;
  readonly productType:string = "nonFoodProduct";

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    this.apiService.get(NonFoodProductApi.FIND_URL).subscribe({
      next: (data) => {
        if (data) {
          this.nonFoodProducts = JSON.parse(JSON.stringify(data)).data;
          for (let product of this.nonFoodProducts) {
            switch (product.unitOfMeasurement) {
              case "GRAMS": product.unitOfMeasurement = "Grammi"; break;
              case "LITERS": product.unitOfMeasurement = "Litri"; break;
              case "PIECES": product.unitOfMeasurement = "Pezzi"; break;
            }
          }
        } else {
          console.log("Errore durante la ricerca degli producti");
        }
      },
      error: (error) => {
        alert(error.message);
      }
    });
  }

  previousPage(){
    Helpers.reloadPreviousLocation(this.route);
  }

  delete(productId: string) {
    if (productId) {
      this.apiService.delete(NonFoodProductApi.DELETE_URL + "/" + productId).subscribe(
        {
          next: (data) => {
            if (data) {
              alert("Prodotto eliminato!");
              let filteredList = this.nonFoodProducts.filter((i: any) => i.id != productId);
              this.nonFoodProducts = filteredList;
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

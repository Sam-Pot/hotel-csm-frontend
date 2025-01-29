import { Component } from '@angular/core';
import { ApiService } from '../../../../shared-modules/api-http/api.service';
import { ActivatedRoute } from '@angular/router';
import { DrinkApi } from '../../../../shared-modules/auth/api/drink.api';
import { IngredientApi } from '../../../../shared-modules/auth/api/ingredient.api';
import { NonFoodProductApi } from '../../../../shared-modules/auth/api/non-food-product.api';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UpdateProductDto } from '../../../../shared-modules/dtos/warehouse-manager/update-product.dto';
import { Position } from '../../../../shared-modules/dtos/warehouse-manager/position';
import { LocationUtils } from '../../../../shared-modules/utils/location.utils';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.less'
})
export class ProductDetailComponent {

  product: UpdateProductDto = {};
  id: string | null = null;
  type: string | null = null;
  LOAD_API: any;
  DELETE_API: any;
  SAVE_API: any;
  UPDATE_API: any;

  productForm = new FormGroup({
    name: new FormControl<string>('', []),
    quantity: new FormControl<number>(0, [Validators.min(0), Validators.required]),
    minQuantity: new FormControl<number>(0, [Validators.min(0), Validators.required]),
    quantityToOrder: new FormControl<number>(0, [Validators.min(0), Validators.required]),
    unitOfMeasurement: new FormControl<string>('', []),
    isActiveInMenu: new FormControl<boolean>(false, []),
    price: new FormControl<number>(0, [Validators.min(0), Validators.required]),
    hallway: new FormControl<string>('', []),
    rack: new FormControl<string>('', []),
    tier: new FormControl<string>('', []),
  });

  convertedUnitOfMeasurements: any = {
    GRAMS: "Grammi",
    LITERS: "Litri",
    PIECES: "Pezzi"
  }

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    console.log(this.route);
    this.id = this.route.snapshot.queryParamMap.get("productId");
    this.type = this.route.snapshot.queryParamMap.get("productType");
    switch (this.type) {
      case 'drink':
        this.LOAD_API = DrinkApi.FIND_ONE_URL;
        this.DELETE_API = DrinkApi.DELETE_URL;
        this.SAVE_API = DrinkApi.SAVE_URL;
        this.UPDATE_API = DrinkApi.UPDATE_URL;
        break;
      case 'ingredient':
        this.LOAD_API = IngredientApi.FIND_ONE_URL;
        this.DELETE_API = IngredientApi.DELETE_URL;
        this.SAVE_API = IngredientApi.SAVE_URL;
        this.UPDATE_API = IngredientApi.UPDATE_URL;
        break;
      case 'nonFoodProduct':
        this.LOAD_API = NonFoodProductApi.FIND_ONE_URL;
        this.DELETE_API = NonFoodProductApi.DELETE_URL;
        this.SAVE_API = NonFoodProductApi.SAVE_URL;
        this.UPDATE_API = NonFoodProductApi.UPDATE_URL;
        break;
      default:
        console.log("Invalid product type!");
        break;
    }

    if (this.id) {
      this.apiService.get(this.LOAD_API + "/" + this.id).subscribe({
        next: (data) => {
          if (data) {
            this.product = data as any;
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
  }

  discard(){
    LocationUtils.reloadPreviousLocation(this.route);
  }

  delete() {
    if (this.id) {
      this.apiService.delete(DrinkApi.DELETE_URL + "/" + this.id).subscribe(
        {
          next: (data) => {
            if (data) {
              alert("Prodotto eliminato!");
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

  update(productForm: any) {
    if (productForm) {
      let position: Position = {
        hallway: productForm.value.hallway ? productForm.value.hallway : this.product.position?.hallway,
        rack: productForm.value.rack ? productForm.value.rack : this.product.position?.rack,
        tier: productForm.value.tier ? productForm.value.tier : this.product.position?.tier
      };
      let updateProductDto: UpdateProductDto = {
        name: productForm.value.name ? productForm.value.name : this.product.name,
        quantity: productForm.value.quantity ? productForm.value.quantity : this.product.quantity,
        minQuantity: productForm.value.minQuantity ? productForm.value.minQuantity : this.product.minQuantity,
        quantityToOrder: productForm.value.quantityToOrder ? productForm.value.quantityToOrder : this.product.quantityToOrder,
        unitOfMeasurement: productForm.value.unitOfMeasurement ? productForm.value.unitOfMeasurement : this.product.unitOfMeasurement,
        price: this.type == 'drink' && productForm.value.price ? productForm.value.price : this.product.price,
        isActiveInMenu: this.type == 'drink' && productForm.value.isActiveInMenu ? productForm.value.isActiveInMenu : this.product.isActiveInMenu,
        position: position
      };
      this.apiService.put(this.UPDATE_API + "/" + (this.id ? this.id : ''), updateProductDto).subscribe(
        {
          next: (data) => {
            if (data) {
              alert("Prodotto Salvato!");
              this.discard();
            } else {
              console.log("SOMETHING WENT WRONG DURING THE UPDATE!");
            }
          },
          error: (error) => {
            console.log(error.message);
          }
        }
      );
    }
  }

  save(productForm: any) {
    if (productForm) {
      let position: Position = {
        hallway: productForm.value.hallway ? productForm.value.hallway : this.product.position?.hallway,
        rack: productForm.value.rack ? productForm.value.rack : this.product.position?.rack,
        tier: productForm.value.tier ? productForm.value.tier : this.product.position?.tier
      };
      let updateProductDto: UpdateProductDto = {
        name: productForm.value.name ? productForm.value.name : this.product.name,
        quantity: productForm.value.quantity ? productForm.value.quantity : this.product.quantity,
        minQuantity: productForm.value.minQuantity ? productForm.value.minQuantity : this.product.minQuantity,
        quantityToOrder: productForm.value.quantityToOrder ? productForm.value.quantityToOrder : this.product.quantityToOrder,
        unitOfMeasurement: productForm.value.unitOfMeasurement ? productForm.value.unitOfMeasurement : this.product.unitOfMeasurement,
        price: this.type == 'drink' && productForm.value.price ? productForm.value.price : this.product.price,
        isActiveInMenu: this.type == 'drink' && productForm.value.isActiveInMenu ? productForm.value.isActiveInMenu : this.product.isActiveInMenu,
        position: position
      };
      this.apiService.post(this.SAVE_API, updateProductDto).subscribe(
        {
          next: (data) => {
            if (data) {
              alert("Prodotto Salvato!");
              this.discard();
            } else {
              console.log("SOMETHING WENT WRONG DURING THE UPDATE!");
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



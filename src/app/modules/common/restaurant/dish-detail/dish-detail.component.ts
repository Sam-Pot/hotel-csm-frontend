import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DishDto } from '../../../../shared-modules/dtos/restaurant-manager/dish.dto';
import { RecipeDto } from '../../../../shared-modules/dtos/restaurant-manager/recipe.dto';
import { ApiService } from '../../../../shared-modules/api-http/api.service';
import { ActivatedRoute } from '@angular/router';
import { DishApi } from '../../../../shared-modules/auth/api/dish.api';
import { Role } from '../../../../shared-modules/dtos/user-manager/role';
import { JwtService } from '../../../../shared-modules/auth/services/jwt.service';
import { Helpers } from '../../../../shared-modules/utils/helpers';
import { IngredientQuantity } from '../../../../shared-modules/dtos/restaurant-manager/ingredient-quantity.dto';
import { IngredientApi } from '../../../../shared-modules/auth/api/ingredient.api';

@Component({
  selector: 'app-dish-detail',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './dish-detail.component.html',
  styleUrl: './dish-detail.component.less'
})
export class DishDetailComponent {

  dish: any = {};
  id: string | null = null;
  isCook: boolean = false;
  isAdmin:boolean = false;
  formShow: boolean = true;

  ingredients_dataAndControls: any = [];

  dishForm: FormGroup = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', []),
    price: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
    isActiveInMenu: new FormControl<boolean>(false, []),
    type: new FormControl<string>('', []),
    recipeDescription: new FormControl<string>('', []),
  });

  convertedDishType: any = {
    FIRST: "Primo",
    SECOND: "Secondo",
    APPETIZER: "Antipasto",
    DESSERT: "Dessert"
  };

  ingredientList: any = [];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private jwtService: JwtService
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get("dishId");
    let role = this.jwtService.getRole() as unknown as Role;
    this.isCook = (role==Role.COOK);
    this.isAdmin = (role==Role.ADMIN);
    if(!this.isAdmin){
      for(let elem of Object.keys(this.dishForm.controls)){
        this.dishForm.get(elem)?.disable();
      }
    }
    if (this.id) {
      let FIND_ONE_API = (this.isCook || this.isAdmin)? DishApi.FIND_ONE_WITH_RECIPE_URL: DishApi.FIND_ONE_URL;
      this.apiService.get(FIND_ONE_API + "/" + this.id).subscribe({
        next: (data) => {
          if (data) {
            this.dish = data as any;
            for (let elem of this.dish.recipe.ingredients) {
              this.ingredients_dataAndControls.push({
                ingredientQuantity: {
                  ingredientId: elem.ingredient.id,
                  ingredientName: elem.ingredient.name,
                  quantity: elem.quantity
                },
                controls: {
                  name: new FormControl<string>(''),
                  quantity: new FormControl<number>(0)
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
    //GET INGREDIENTS
    if(this.isAdmin || this.isCook){
      this.apiService.get(IngredientApi.FIND_URL).subscribe({
        next: (data) => {
          if (data) {
            this.ingredientList = JSON.parse(JSON.stringify(data)).data;
          } else {
            console.log("Errore durante la ricerca dei tavoli");
          }
        },
        error: (error) => {
          alert(error.message);
        }
      });
    }
  }

  addRow() {
    this.ingredients_dataAndControls.push({
      ingredientQuantity: {
        ingredientId: '',
        ingredientName: '',
        quantity: 0
      },
      controls: {
        name: new FormControl<string>(''),
        quantity: new FormControl<number>(0)
      }
    });
  }

  deleteRow(index: number) {
    this.ingredients_dataAndControls.splice(index, 1);
    console.log(this.ingredients_dataAndControls);
  }

  discard() {
    Helpers.reloadPreviousLocation(this.route);
  }

  delete() {
    if (this.id) {
      this.apiService.delete(DishApi.DELETE_URL + "/" + this.id).subscribe(
        {
          next: (data) => {
            if (data) {
              alert("Piatto eliminato!");
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

  async update(dishForm: any) {
    if (dishForm) {
      let ingredientsToSave: any[] = [];
      for (let contr of this.ingredients_dataAndControls) {
        let ingredientId: any = this.ingredientList.filter((elem: any) => elem.name == contr.controls.name.value)[0].id;
        ingredientsToSave.push(
          {
            ingredient: ingredientId,
            quantity: contr.controls.quantity.value
          }
        );
      }
      let recipe: RecipeDto = {
        id: this.dish.recipe.id? this.dish.recipe.id: undefined,
        description: dishForm.value.recipeDescription ? dishForm.value.recipeDescription : this.dish.recipe?.description,
        ingredients: ingredientsToSave,
      };
      let dishDto: DishDto = {
        name: dishForm.value.name ? dishForm.value.name : this.dish.name,
        description: dishForm.value.description ? dishForm.value.description : this.dish.description,
        price: dishForm.value.price ? dishForm.value.price : this.dish.price,
        type: dishForm.value.type ? dishForm.value.type : this.dish.type,
        isActiveInMenu: dishForm.value.isActiveInMenu ? dishForm.value.isActiveInMenu : false,
        recipe: recipe
      };
      this.apiService.put(DishApi.UPDATE_URL + "/" +this.id, dishDto).subscribe(
        {
          next: (data) => {
            if (data) {
              alert("Piatto Salvato!");
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

  save(dishForm: any) {
    let ingredientsToSave: any[] = [];
      for (let contr of this.ingredients_dataAndControls) {
        let ingredientId: any = this.ingredientList.filter((elem: any) => elem.name == contr.controls.name.value)[0].id;
        ingredientsToSave.push(
          {
            ingredient: ingredientId,
            quantity: contr.controls.quantity.value
          }
        );
      }
      let recipe: RecipeDto = {
        id: this.dish.recipe?.id? this.dish.recipe.id: undefined,
        description: dishForm.value.recipeDescription ? dishForm.value.recipeDescription : this.dish.recipe?.description,
        ingredients: ingredientsToSave,
      };
      let dishDto: DishDto = {
        name: dishForm.value.name ? dishForm.value.name : this.dish.name,
        description: dishForm.value.description ? dishForm.value.description : this.dish.description,
        price: dishForm.value.price ? dishForm.value.price : this.dish.price,
        type: dishForm.value.type ? dishForm.value.type : this.dish.type,
        isActiveInMenu: dishForm.value.isActiveInMenu ? dishForm.value.isActiveInMenu : false,
        recipe: recipe
      };
      this.apiService.post(DishApi.UPDATE_URL, dishDto).subscribe(
        {
          next: (data) => {
            if (data) {
              alert("Piatto Salvato!");
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

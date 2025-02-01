import { Component } from '@angular/core';
import { ApiService } from '../../../../shared-modules/api-http/api.service';
import { ActivatedRoute } from '@angular/router';
import { DishApi } from '../../../../shared-modules/auth/api/dish.api';
import { Helpers } from '../../../../shared-modules/utils/helpers';
import { JwtService } from '../../../../shared-modules/auth/services/jwt.service';
import { Role } from '../../../../shared-modules/dtos/user-manager/role';

@Component({
  selector: 'app-dishes-panel',
  standalone: true,
  imports: [],
  templateUrl: './dishes-panel.component.html',
  styleUrl: './dishes-panel.component.less'
})
export class DishesPanelComponent {

  dishes: any;
  dishType: any = {
    FIRST: "Primo",
    SECOND: "Secondo",
    APPETIZER: "Antipasto",
    DESSERT: "Dessert"
  };

  isAdmin: boolean = false;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private jwtService: JwtService
  ) {

  }
  ngOnInit(): void {
    let role = this.jwtService.getRole() as unknown as Role;
    this.isAdmin = (role==Role.ADMIN);
    let GET_MENU = DishApi.FIND_URL+"?filter[isActiveInMenu]=$eq:1";
    let FIND_API = (role==Role.ADMIN || role==Role.COOK || role==Role.RESTAURANT_STAFF)?DishApi.FIND_URL:GET_MENU;
    this.apiService.get(FIND_API).subscribe({
      next: (data) => {
        if (data) {
          this.dishes = JSON.parse(JSON.stringify(data)).data;
        } else {
          console.log("Errore durante la ricerca dei tavoli");
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

  delete(name: string) {
    if (name) {
      this.apiService.delete(DishApi.DELETE_URL + "/" + name).subscribe(
        {
          next: (data) => {
            if (data) {
              alert("Piatto eliminato!");
              let filteredList = this.dishes.filter((i: any) => i.name != name);
              this.dishes = filteredList;
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

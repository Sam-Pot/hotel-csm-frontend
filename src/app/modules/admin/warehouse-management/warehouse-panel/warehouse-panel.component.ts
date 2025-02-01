import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { IngredientsPanelComponent } from '../ingredients-panel/ingredients-panel.component';
import { DrinksPanelComponent } from '../drinks-panel/drinks-panel.component';
import { NonFoodProductsComponent } from '../non-food-products/non-food-products.component';
import { Helpers } from '../../../../shared-modules/utils/helpers';

@Component({
  selector: 'app-warehouse-panel',
  standalone: true,
  imports: [CommonModule, NgbNavModule, IngredientsPanelComponent, DrinksPanelComponent, NonFoodProductsComponent],
  templateUrl: './warehouse-panel.component.html',
  styleUrl: './warehouse-panel.component.less'
})
export class WarehousePanelComponent {
  
  constructor(
    private route: ActivatedRoute
  ) { }

  previousPage(){
    Helpers.reloadPreviousLocation(this.route);
  }
}

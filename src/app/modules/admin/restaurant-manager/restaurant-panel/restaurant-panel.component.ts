import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Helpers } from '../../../../shared-modules/utils/helpers';
import { DishesPanelComponent } from '../../../common/restaurant/dishes-panel/dishes-panel.component';
import { TablesPanelComponent } from '../tables-panel/tables-panel.component';
import { RestaurantReservationsPanelComponent } from '../../../common/restaurant/restaurant-reservations-panel/restaurant-reservations-panel.component';
import { Role } from '../../../../shared-modules/dtos/user-manager/role';
import { JwtService } from '../../../../shared-modules/auth/services/jwt.service';

@Component({
  selector: 'app-restaurant-panel',
  standalone: true,
  imports: [CommonModule, NgbNavModule, DishesPanelComponent, TablesPanelComponent, RestaurantReservationsPanelComponent],
  templateUrl: './restaurant-panel.component.html',
  styleUrl: './restaurant-panel.component.less'
})
export class RestaurantPanelComponent {

  isRestaurantManager: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private jwtService: JwtService
  ) { }

  ngOnInit(): void {
    let role = this.jwtService.getRole() as unknown as Role;
    this.isRestaurantManager = (role == Role.ADMIN || role == Role.COOK || role == Role.RESTAURANT_STAFF);
  }

  previousPage() {
    Helpers.reloadPreviousLocation(this.route);
  }
}

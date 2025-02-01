import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Helpers } from '../../../shared-modules/utils/helpers';
import { ActivatedRoute } from '@angular/router';
import { JwtService } from '../../../shared-modules/auth/services/jwt.service';
import { Role } from '../../../shared-modules/dtos/user-manager/role';

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [],
  templateUrl: './administration.component.html',
  styleUrl: './administration.component.less'
})
export class AdministrationComponent {

  isAdmin: boolean = false;
  isStockman: boolean = false;
  isRestaurantStaffOrCook = false;

  constructor(
    private route: ActivatedRoute,
    private jwtService: JwtService
  ) { }

  ngOnInit(): void {
    let role = this.jwtService.getRole() as unknown as Role;
    this.isAdmin = (role == Role.ADMIN);
    this.isStockman = (role == Role.STOCKMAN);
    this.isRestaurantStaffOrCook = (role == Role.RESTAURANT_STAFF || role == Role.COOK);
  }

  previousPage() {
    Helpers.reloadPreviousLocation(this.route);
  }
}

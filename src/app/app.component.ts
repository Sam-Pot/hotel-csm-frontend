import { afterNextRender, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JwtService } from './shared-modules/auth/services/jwt.service';
import { HomeComponent } from "./modules/home/home.component";
import { Role } from './shared-modules/dtos/user-manager/role';
import { LoginComponent } from './shared-modules/auth/components/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {

  isLogged: boolean;
  isAdmin: boolean = false;
  isRestaurantStaffOrCook: boolean = false;
  isStockman: boolean = false;

  constructor(
    private jwtService: JwtService,
  ) {
    let role = this.jwtService.getRole() as unknown as Role;
    this.isAdmin = (role == Role.ADMIN);
    this.isRestaurantStaffOrCook = (role == Role.RESTAURANT_STAFF || role == Role.COOK);
    this.isStockman = (role == Role.STOCKMAN);
    this.isLogged = this.jwtService.isLogged();
  }
}

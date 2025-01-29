import { CommonModule } from '@angular/common';
import { afterNextRender, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../shared-modules/auth/components/login/login.component';
import { ProfileComponent } from '../common/profile/profile.component';
import { JwtService } from '../../shared-modules/auth/services/jwt.service';
import { AdministrationComponent } from '../admin/administration/administration.component';
import { Role } from '../../shared-modules/dtos/user-manager/role'
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoginComponent, CommonModule, NgbNavModule, ProfileComponent, AdministrationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {

  readonly ADMIN: Role = Role.ADMIN;
  role: Role;
  isLogged: boolean;

  constructor(
    private jwtService: JwtService,
  ) {
    this.role = this.jwtService.getRole() as any;
    this.isLogged = this.jwtService.isLogged();
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../shared-modules/auth/components/login/login.component';
import { JwtService } from '../../shared-modules/auth/services/jwt.service';
import { Role } from '../../shared-modules/dtos/user-manager/role'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgbNavModule, LoginComponent],
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

  changeLocation(path: string) {
    window.location.assign(path);
  }
}

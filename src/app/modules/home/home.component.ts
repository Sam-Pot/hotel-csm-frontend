import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../shared-modules/auth/components/login/login.component';
import { JwtService } from '../../shared-modules/auth/services/jwt.service';
import { Role } from '../../shared-modules/dtos/user-manager/role'
import { UpdateUserDto } from '../../shared-modules/dtos/user-manager/update-user.dto';
import { ApiService } from '../../shared-modules/api-http/api.service';
import { UserApi } from '../../shared-modules/auth/api/user.api';

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
  user: any;
  
  constructor(
    private jwtService: JwtService,
    private apiService: ApiService
  ) {
    this.role = this.jwtService.getRole() as any;
    this.isLogged = this.jwtService.isLogged();
  }

  ngOnInit(): void {
    let id = this.jwtService.getId();
    if(id){
      this.apiService.get(UserApi.FIND_ONE_URL + "/" + id).subscribe({
        next: (data) => {
          if (data) {
            let user = JSON.parse(JSON.stringify(data));
            this.user = user;
          } else {
            console.log("INVALID DATA");
          }
        },
        error: (error) => {
          console.log(error);
          alert("Impossibile raggiungere il server!");
        }
      });
    }
  }

  changeLocation(path: string) {
    window.location.assign(path);
  }
}

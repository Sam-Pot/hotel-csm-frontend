import { afterNextRender, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JwtService } from './shared-modules/auth/services/jwt.service';
import { HomeComponent } from "./modules/home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
}

import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { LogoutComponent } from '../logout/logout.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink, LogoutComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  constructor(public authService: AuthService) {}

}

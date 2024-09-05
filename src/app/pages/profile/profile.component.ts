import { Component } from '@angular/core';
import { LoginServicesService } from '../../services/login-services.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  user: any = null;
  userRole: string = '';

  constructor(private loginService: LoginServicesService) { }

  ngOnInit() {

    this.user = this.loginService.getUser();

    this.loginService.getCurrentUser().subscribe(
      (user: any) => {
        this.user = user;
        this.userRole = this.getUserRoleFromToken();
      },
      (error: any) => {
        console.error('Error fetching user data', error);
      }
    );
  }

  private getUserRoleFromToken(): string {
    const roles = this.loginService.getUserRole();
    console.log('User Roles:', roles);
    return roles.length > 0 ? roles[0] : 'Rol no disponible';
  }

}

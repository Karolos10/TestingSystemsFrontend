import { Component, OnInit } from '@angular/core';
import { LoginServicesService } from '../../services/login-services.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  constructor(public login: LoginServicesService) { }

  ngOnInit(): void {
  }

  public logout() {
    this.login.logout();
    window.location.reload();
  }

}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { navBarData } from './nav-data';
import { environment } from 'src/environments/environment';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed: boolean;
  screenWidth: number;
  navData: any;
  role:any;
  constructor(private router: Router, private cookie: CookieService) {
    this.collapsed = true
    
    this.screenWidth =0
  }

  closeSideNav():void {
      this.collapsed = true
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
  }

  toggleCollapse():void {
      this.collapsed = !this.collapsed
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth})
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth 
    this.role=localStorage.getItem("role")
    console.log(this.role)
    this.navData = navBarData
  }

  logout() {
    this.cookie.delete('jwt');
    this.router.navigate(['']);
    localStorage.clear();
  }
}

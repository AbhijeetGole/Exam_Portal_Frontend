import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { navBarData } from './nav-data';

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
  constructor(private router: Router, private cookie: CookieService) {
    this.collapsed = true
    this.navData = navBarData
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
  }

  logout() {
    this.cookie.delete('jwt');
    this.router.navigate(['']);
  }
}

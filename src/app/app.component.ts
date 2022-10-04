import { Component, OnInit } from '@angular/core';
// import { environment } from '../environments/environment';
import { Router } from '@angular/router';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'exam_portal_ui';
  router: string;
  render = false;
  
  constructor(private _router: Router) {
    this.router = _router.url;
  }
  ngOnInit(): void {
    // console.log(environment.apiUrl)
  }
  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle) {
    this.screenWidth = data.screenWidth
    this.isSideNavCollapsed = data.collapsed
  }

  isLanding(){
    return this._router.url === "/";
  }
}

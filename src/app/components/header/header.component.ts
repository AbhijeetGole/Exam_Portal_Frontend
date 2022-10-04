import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() sideNavToggle = new EventEmitter<boolean>();
  menuStatus: boolean = false;

  username:string = 'Prasenjit'

  constructor() { }

  ngOnInit(): void {
  }

  toggleSideNav(){
    console.log('Toggle');
    this.menuStatus = !this.menuStatus;
    this.sideNavToggle.emit(this.menuStatus);
  }

}

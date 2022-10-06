import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userData: any = {}
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    this.getUser();
  }
  getUser() {
    this.apiService.getUserInfo().subscribe((res: any) => {

      this.userData = res

    })
  }
}

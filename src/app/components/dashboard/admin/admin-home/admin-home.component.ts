import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ResultService } from 'src/app/services/result.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  uservalue: any;
  constructor(private cookie: CookieService, private http: HttpClient, private router: Router
    ,private reportService: ResultService) { }

  ngOnInit(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'jwt': this.cookie.get('jwt')
    });

    this.http.get(environment.userUrl + 'exam-portal/token/validate', { headers: headers, withCredentials: true })
      .subscribe((data: any) => {
        this.uservalue = data
        if (this.uservalue != 'admin') {
          Swal.fire("Alert","You are not LoggedIn","warning")
          this.router.navigate([''])
        }
      },(error: any) => {
        Swal.fire("Alert","You are not LoggedIn","warning")
        this.router.navigate([''])
      })

      
    this.reportService.getAllResult().subscribe((response: any) => {
      this.results = response;
      console.log(this.results);
      this.results.forEach(res=>{
        
      })
      this.createChart();
      this.TopfiveChart();
    }, (error: any) => {
      console.log(error.message);
    })
  }
  public results: any[] = [];
  public userId: any;
  public resultId: any;
  public chart: any = [];
  public barChart: any = [];
  public badRange: any[] = [];
  public averageRange: any[] = [];
  public goodRange: any[] = [];




  defineRange() {
    this.results.forEach(result => {
      if (result.result <= 30) {
        this.badRange.push(result._id);
      } else if (result.result > 30 && result.result <= 70) {
        this.averageRange.push(result._id);
      } else {
        this.goodRange.push(result._id);
      }
    })

    console.log('bad -> ', this.badRange);
    console.log('average -> ', this.averageRange);
    console.log('good -> ', this.goodRange);
  }

  getTopFiveStudents() {

    let scores: any = [];
    this.results.forEach(result => {
      scores.push({ result: result.result, userName: result.userName });
    })

    scores.sort((n1: any, n2: any) => n2.result - n1.result);
    return scores;
  }

  createChart() {

    this.defineRange();

    this.chart = new Chart("MyChart", {
      type: 'doughnut', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['good', 'average', 'bad'],
        datasets: [
          {
            label: "result",
            data: [this.goodRange.length, this.averageRange.length, this.badRange.length],
            backgroundColor: ['#009933', '#4d94ff', ' #ff4d4d'],
          },

        ]
      },
      options: {
        aspectRatio: 1.6
      }

    });
  }

  TopfiveChart() {
    let topFive: any[] = this.getTopFiveStudents();

    this.barChart = new Chart("BarChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: [topFive[0].userName, topFive[1].userName, topFive[2].userName, topFive[3].userName, topFive[4].userName],
       
        datasets: [
          {
            label: "result",
            data: [topFive[0].result, topFive[1].result, topFive[2].result, topFive[3].result, topFive[4].result],
            backgroundColor: ['#b3b3ff', '#c6b3ff', '#ffecb3', '#c6ffb3', ' #b3ecff'],
          },
          

        ]
      },
      options: {
        aspectRatio: 1
      }
    });


  }

  resultPage(data: any) {
    this.reportService.result(data).subscribe(res => {
      console.log(res)
    })
  }
}



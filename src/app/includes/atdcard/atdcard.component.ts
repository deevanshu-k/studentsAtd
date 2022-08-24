import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

export interface Attendence {
  subject_code: string;
  status: boolean;
  atd: number;
  totalAtd: number
}


@Component({
  selector: 'app-atdcard',
  templateUrl: './atdcard.component.html',
  styleUrls: ['./atdcard.component.css']
})
export class AtdcardComponent implements OnInit {

  enrollement_no: string;
  displayedColumns: string[] = ['subject_code', 'atd', 'status', 'totalAtd']; //change
  dataSource : Attendence[] = new Array; //change
  
  constructor(private http: HttpClient, private ls: LocalstorageService, private authservices: AuthService) {
    let token: any = this.ls.get('token');
    let data = this.authservices.getDecodedAccessToken(token);
    this.enrollement_no = data.id;
    
    this.fetchAttendence().subscribe(async (d: any) => {
      console.log(d);
      console.log(this.filterData(d.attendences));
      this.dataSource = this.filterData(d.attendences);

    })
  }
  
  ngOnInit() {

  }

  fetchAttendence() {
    let token = this.ls.get('token');

    return this.http.get(`http://127.0.0.1:8080/api/v1/student/attendences?enrollement_no=${this.enrollement_no}`, {
      headers: {
        'Authorization': `${token}`
      },
      observe: "body"
    });
  }

  fetchSubjectCode() {
    let token = this.ls.get('token');

    return this.http.get(`http://127.0.0.1:8080/api/v1/student/scodebyeno`, {
      headers: {
        'Authorization': `${token}`
      },
      observe: "body"
    });
  }


  filterData(data: any) {
    let filteredArray: Attendence[] = [];
    this.fetchSubjectCode().subscribe({
      next: (s: any) => {
        if (s[0] == undefined) {
          let a: Attendence = {
            subject_code: 'Error',
            atd: 0,
            status: false,
            totalAtd: 0
          };
          filteredArray.push(a);
        }
        s.forEach((code: any) => {
          let a: Attendence = {
            subject_code: code,
            atd: 0,
            status: false,
            totalAtd: 0
          };
          filteredArray.push(a);
        });
        // console.log(filteredArray);

      },
      error: (e) => { },
      complete: () => {

        data.forEach((item: any) => {
          var a: any = filteredArray.find((d) => d.subject_code == item.subject_code);
          // console.log(a);

          let index = filteredArray.indexOf(a)
          filteredArray[index].atd += 1;
          filteredArray[index].status = true;
        });

        // console.log(filteredArray);
      }

    });

    return filteredArray;



  }


}
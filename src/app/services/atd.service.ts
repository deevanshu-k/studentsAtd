import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AtdService {

  constructor(private ls : LocalstorageService,private http : HttpClient) { }

  fetchSubjectCode() {
    let token = this.ls.get('token');

    return this.http.get(`http://127.0.0.1:8080/api/v1/student/scodebyeno`, {
      headers: {
        'Authorization': `${token}`
      },
      observe: "body"
    });
  }

}

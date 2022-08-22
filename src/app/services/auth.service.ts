import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import jwt_decode from 'jwt-decode';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient,private ls :LocalstorageService) { }

  studentLogin(enrollement_no : any) {
    return this.http.post(`${environment.url}api/v1/student/login`,{
      enrollement_no : enrollement_no
    });
  }
  teacherLogin(subject_code : any,password : any) {
    return this.http.post(`${environment.url}api/v1/teacher/login`,{
      subject_code : subject_code,
      password : password
    });
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  getAuthStatus(){
    if (this.ls.get('token') == null && this.ls.get('exp') == null) {
      // console.log("1");
      return false;

    }
    else if (Number(this.ls.get('exp')) > Date.now()) {
      // console.log("2");
      console.log('Exp => ', Number(this.ls.get('exp')));
      console.log('Current Date => ', Date.now());
      // var a = Number(this.ls.get('exp') - Date.now();
      // console.log('Seconds Left => ',);

      return true;
    }
    else {
      // console.log("3");
      console.log('Exp => ', Number(this.ls.get('exp')));
      console.log('Current Date => ', Date.now());

      return false;
    }
  }

}

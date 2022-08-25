import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userisStudent: boolean;
  student = new FormGroup({
    enrollementno: new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]),
    password: new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(12)])
  });
  teacher = new FormGroup({
    subjectcode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(7)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)])
  });

  constructor(private authServices: AuthService , private _snackBar: MatSnackBar,private ls:LocalstorageService,private route:Router,private authService:AuthService) {
    this.userisStudent = true;
  }

  ngOnInit(): void {
  }

  userToggle() {
    this.userisStudent = !this.userisStudent;
  }

  openSnackBar(message:string,action:string) {
    this._snackBar.open(message, action, {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration : 2500
    });
  }

  onSubmit() {
    if (this.userisStudent && this.student.valid) {
      this.authServices.studentLogin(this.student.value.enrollementno).subscribe({
        next: (data:any) => {
          this.ls.set('token',data.data.token);
          var a = this.authServices.getDecodedAccessToken(data.data.token);
          console.log(a.exp - a.iat);
          
          var exp = Date.now() + (a.exp - a.iat)*1000; // *1000 as Date.now return ms and jwt is in second
          this.ls.set('exp', `${exp}`);
          this.route.navigate(['/student']);
        },
        error: (err) => {
          this.openSnackBar(err.error.error.code,'Ok');
        },
        complete: () => {
          this.openSnackBar('Logged in successfully','Ok');
        }
      })
    }
    else if (!this.userisStudent && this.teacher.valid) {
      console.log(this.teacher.value);
      this.authService.teacherLogin(this.teacher.value.subjectcode,this.teacher.value.password).subscribe({
        next: (data:any) => {
          this.ls.set('token',data.data.token);
          var a = this.authServices.getDecodedAccessToken(data.data.token);
          var exp = Date.now() + (a.exp - a.iat)*1000; // *1000 as Date.now return ms and jwt is in second
          this.ls.set('exp', `${exp}`);
          this.route.navigate(['/teacher']);
        },
        error: (err) => {
          this.openSnackBar(err.error.error.code,'Ok');
        },
        complete: () => {
          this.openSnackBar('Logged in successfully','Ok');
        }
      })
    }
  }

}

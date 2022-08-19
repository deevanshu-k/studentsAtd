import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userisStudent : boolean;
  student = new FormGroup({
    enrollementno: new FormControl('', [Validators.required, Validators.minLength(12),Validators.maxLength(12)]),
    password: new FormControl('', [Validators.required, Validators.minLength(12),Validators.maxLength(12)])
  });
  teacher = new FormGroup({
    subjectcode: new FormControl('', [Validators.required, Validators.minLength(6),Validators.maxLength(7)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6),Validators.maxLength(12)])
  });

  constructor() {
    this.userisStudent = true;
   }

  ngOnInit(): void {
  }

  userToggle() {
    this.userisStudent = !this.userisStudent;
  }

}

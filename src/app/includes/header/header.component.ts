import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  enrollement_no:string;
  name:string;
  @Input() user? : string;
  @Output() toggle : EventEmitter<any> = new EventEmitter;

  constructor(private ls :LocalstorageService,private route:Router,private authService : AuthService) { 
    let token:any = this.ls.get('token');
    let data = this.authService.getDecodedAccessToken(token);
    this.enrollement_no = data.id;
    this.name = data.user;
    
  }

  ngOnInit(): void {
  }
  logOut() {
    this.ls.remove('token');
    this.ls.remove('exp');
    this.route.navigate(['/auth']);
  }
  Drawer(){
    this.toggle.emit();
  }
}

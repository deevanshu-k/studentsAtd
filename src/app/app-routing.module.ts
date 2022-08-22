import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { StudentdashComponent } from './dashboard/studentdash/studentdash.component';
import { TeacherdashComponent } from './dashboard/teacherdash/teacherdash.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'student', component: StudentdashComponent,canActivate : [AuthGuard] },
  { path: 'teacher', component: TeacherdashComponent,canActivate : [AuthGuard] },
  { path: 'auth', component: LoginComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
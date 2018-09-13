import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http'
import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './users/registration/registration.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { NavigateComponent } from './navigate/navigate.component';
import {CookieService} from 'ngx-cookie-service';
import { PostsComponent } from './posts/posts/posts.component';
import { NewpostComponent } from './newpost/newpost/newpost.component';
import { LoginService } from 'src/app/auth/login.service';
import { AuthGuard } from './auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './auth/http-interceptor.service';
import { CommentsComponent } from './comments/comments/comments.component';
import { EditpostComponent } from './editpost/editpost/editpost.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    WelcomeComponent,
    NavigateComponent,
    PostsComponent,
    NewpostComponent,
    CommentsComponent,
    EditpostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path:'home',
        component:WelcomeComponent,
        canActivate:[AuthGuard]
      },
      {
          path:'login',
          component:LoginComponent
      },
      {
          path:'register',
          component:RegistrationComponent
      },
      {
        path:'posts',
        component:PostsComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'newpost',
        component:NewpostComponent,
        canActivate:[AuthGuard]
      },
      {
        path:'',
        redirectTo:"login",
        pathMatch:"full"
      },
      {
        path:'**',
        redirectTo:"login"
      }
    ])
  ],
  providers: [CookieService,LoginService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

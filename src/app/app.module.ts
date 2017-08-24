import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {appRoutingProviders, routing} from 'route';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { KendrickComponent } from './kendrick/kendrick.component';
import { AboutAudioDeadlineComponent } from './about-audio-deadline/about-audio-deadline.component';
import { CommunityComponent } from './community/community.component';
import { AffiliateComponent } from './affiliate/affiliate.component';
import { ContactusComponent } from './contactus/contactus.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { UsherComponent } from './usher/usher.component';
import { SevynstreeterComponent } from './sevynstreeter/sevynstreeter.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    KendrickComponent,
    AboutAudioDeadlineComponent,
    CommunityComponent,
    AffiliateComponent,
    ContactusComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    UsherComponent,
    SevynstreeterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
      ModalModule.forRoot()
  ],
  providers: [appRoutingProviders, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

/**
 * Created by kta pc on 6/1/2017.
 */
/**
 * Created by ipsita on 7/4/17.
 */

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HeaderComponent} from 'app/header/header.component';
import {HomeComponent} from 'app/home/home.component';
import {FooterComponent} from 'app/footer/footer.component';
import {AboutAudioDeadlineComponent} from 'app/about-audio-deadline/about-audio-deadline.component';
import {CommunityComponent} from 'app/community/community.component';
import {AffiliateComponent} from 'app/affiliate/affiliate.component';
import {ContactusComponent} from 'app/contactus/contactus.component';
import {SignupComponent} from 'app/signup/signup.component';
import {LoginComponent} from 'app/login/login.component';
import {DashboardComponent} from 'app/dashboard/dashboard.component';
import {KendrickComponent} from 'app/kendrick/kendrick.component';
import {UsherComponent} from 'app/usher/usher.component';
import {SevynstreeterComponent} from 'app/sevynstreeter/sevynstreeter.component';




const appRoutes: Routes = [

    { path: 'header', component: HeaderComponent},
    { path: '', component: HomeComponent},
    { path: 'footer', component: FooterComponent},
    { path: 'aboutaudiodeadline', component: AboutAudioDeadlineComponent},
    { path: 'community', component: CommunityComponent},
    { path: 'affiliate', component: AffiliateComponent},
    { path: 'contactus', component: ContactusComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'login', component: LoginComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'kendrick', component: KendrickComponent},
    { path: 'usher', component: UsherComponent},
    { path: 'sevynstreeter', component: SevynstreeterComponent},



];


export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes,{ useHash: true });
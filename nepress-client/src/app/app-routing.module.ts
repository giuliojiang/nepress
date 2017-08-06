import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import components
import {HomeComponent} from './view/home.component';
import {RegisterComponent} from './view/register.component';
import {LoginComponent} from './view/login.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}

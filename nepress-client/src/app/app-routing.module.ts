import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import components
import {HomeComponent} from './view/home.component';
import {RegisterComponent} from './view/register.component';

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

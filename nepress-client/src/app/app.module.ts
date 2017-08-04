import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

// Modules
import {AppRoutingModule} from './app-routing.module';

// Components
import {AppComponent} from './app.component';
import {HomeComponent} from './view/home.component';

// Services
import {GlobalutilService} from './data/globalutil.service';
import {SocketService} from './data/socket.service';

@NgModule({
  // Here go all the component declarations
  declarations: [
    AppComponent,
    HomeComponent
  ],
  // Here go all the other imported modules
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  // Here go all the injectable providers
  providers: [
    GlobalutilService, 
    SocketService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

// Modules
import {AppRoutingModule} from './app-routing.module';

// Components
import {AppComponent} from './app.component';
import {HomeComponent} from './view/home.component';
import {HeaderComponent} from './view/header.component';
import {RegisterComponent} from './view/register.component';
import {ToastComponent} from './view/toast.component';
import {LoginComponent} from './view/login.component';
import {WriteComponent} from './view/write.component';
import {FooterComponent} from './view/footer.component';

// Services
import {GlobalutilService} from './data/globalutil.service';
import {SocketService} from './data/socket.service';
import {GlobalcommService} from './data/globalcomm.service';
import {UserdataService} from './data/userdata.service';

@NgModule({
  // Here go all the component declarations
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    RegisterComponent,
    ToastComponent,
    LoginComponent,
    WriteComponent,
    FooterComponent
  ],
  // Here go all the other imported modules
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  // Here go all the injectable providers
  providers: [
    GlobalutilService, 
    SocketService,
    GlobalcommService,
    UserdataService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }

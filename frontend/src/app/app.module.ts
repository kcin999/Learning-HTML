import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from 'src/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RobinhoodComponent } from './robinhood/robinhood.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    RobinhoodComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { UsersDetailComponent } from './components/users-detail/users-detail.component';
import { UsersService } from './services/users.service';



//Routes

import { ROUTES } from './app.routes';

// Pipes
import { NameCountryPipe } from './pipes/name-country.pipe';




@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UsersDetailComponent,
    NameCountryPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forRoot(ROUTES),
  ],
  providers: [
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { EntityDetailsComponent } from './entity-details/entity-details.component';
import { SupplyListItemComponent } from './supply-list-item/supply-list-item.component';
import { MenuRegisterComponent } from './menu-register/menu-register.component';
import { ApiService } from './api.service';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ListItemComponent,
    EntityDetailsComponent,
    SupplyListItemComponent,
    MenuRegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    ApiService, HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

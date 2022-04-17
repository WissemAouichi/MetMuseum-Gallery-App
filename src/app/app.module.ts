import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentsHttpService } from './service/departments.http.service';
import { ArtworkCarouselComponent } from './artwork-carousel/artwork-carousel.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ArtworkCarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [DepartmentsHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }

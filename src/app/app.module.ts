import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentsHttpService } from './service/departments.http.service';
import { ArtworkCarouselComponent } from './artwork-carousel/artwork-carousel.component';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ArtworkModalComponent } from './artwork-modal/artwork-modal.component';

@NgModule({
  declarations: [AppComponent, ArtworkCarouselComponent, ArtworkModalComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CarouselModule,
    ButtonModule,
    ToastModule,
    DialogModule,
  ],
  providers: [DepartmentsHttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}

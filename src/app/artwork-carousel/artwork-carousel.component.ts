import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-artwork-carousel',
  templateUrl: './artwork-carousel.component.html',
  styleUrls: ['./artwork-carousel.component.scss'],
})
export class ArtworkCarouselComponent implements OnInit {
  @Input() department: any;
  constructor() {}

  ngOnInit(): void {
  }
}

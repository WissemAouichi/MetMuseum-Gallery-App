import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-artwork-carousel',
  templateUrl: './artwork-carousel.component.html',
  styleUrls: ['./artwork-carousel.component.scss'],
})
export class ArtworkCarouselComponent implements OnInit {
  @Input() department: any;
  responsiveOptions: { breakpoint: string; numVisible: number; numScroll: number; }[];
  constructor() {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit(): void {
  }
}

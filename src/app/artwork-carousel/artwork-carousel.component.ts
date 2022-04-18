import { Component, Input, OnInit } from '@angular/core';
import { DepartmentsHttpService } from '../service/departments.http.service';

@Component({
  selector: 'app-artwork-carousel',
  templateUrl: './artwork-carousel.component.html',
  styleUrls: ['./artwork-carousel.component.scss'],
})
export class ArtworkCarouselComponent implements OnInit {
  @Input() department: any;

  responsiveOptions: {
    breakpoint: string;
    numVisible: number;
    numScroll: number;
  }[];
  displayModal: any;

  constructor(private departmentsHttpService: DepartmentsHttpService) {
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

  ngOnInit(): void {}

  showModalDialog(artworkID: number) {
    this.departmentsHttpService.displayModals.next({
      displayModal: true,
      itemID: artworkID,
    });
    this.displayModal = true;
  }

  onDialogClose(event: any) {
    this.displayModal = false;
  }
}

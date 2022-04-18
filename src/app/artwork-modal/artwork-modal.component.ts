import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DepartmentsHttpService } from '../service/departments.http.service';

@Component({
  selector: 'app-artwork-modal',
  templateUrl: './artwork-modal.component.html',
  styleUrls: ['./artwork-modal.component.scss'],
})
export class ArtworkModalComponent implements OnInit {
  @Input() displayModals: any;
  @Input() artwork: any;
  @Output() displayChange = new EventEmitter();

  displayModal: any;
  constructor(private departmentsHttpService: DepartmentsHttpService) {}

  ngOnInit(): void {
    this.departmentsHttpService.displayModals.subscribe(
      (modalParameters: any) => {
        if (modalParameters.itemID === this.artwork.objectID) {
          this.displayModal = modalParameters.displayModal;
        }
      }
    );
  }

  onClose(event: any) {
    this.displayChange.emit(false);
  }

  // Work against memory leak if component is destroyed
  ngOnDestroy() {
    this.displayChange.unsubscribe();
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IArtworkObject } from '../models/artwork.model';
import { DepartmentsHttpService } from '../service/departments.http.service';

@Component({
  selector: 'app-artwork-modal',
  templateUrl: './artwork-modal.component.html',
  styleUrls: ['./artwork-modal.component.scss'],
})
export class ArtworkModalComponent implements OnInit {
  @Input() displayModals: any;
  @Input() artwork: IArtworkObject | undefined;
  @Output() displayChange = new EventEmitter();
  private readonly onDestroy = new Subject<void>();

  displayModal: any;
  constructor(private departmentsHttpService: DepartmentsHttpService) {}

  ngOnInit(): void {
    this.departmentsHttpService.displayModals
      .pipe(takeUntil(this.onDestroy))
      .subscribe((modalParameters: any) => {
        if (modalParameters.itemID === this.artwork?.objectID) {
          this.displayModal = modalParameters.displayModal;
        }
      });
  }

  onClose(event: any) {
    this.displayChange.emit(false);
  }

  // Work against memory leak if component is destroyed
  ngOnDestroy() {
    this.displayChange.unsubscribe();
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}

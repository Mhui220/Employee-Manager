import { Component, Input } from '@angular/core';
import { NgbModalModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee-remove-modal',
  imports: [NgbModalModule],
  templateUrl: './employee-remove-modal.component.html',
  styleUrl: './employee-remove-modal.component.css',
})
export class EmployeeRemoveModalComponent {
  @Input() passData : any;

  constructor(public activeModal: NgbActiveModal) {}

}

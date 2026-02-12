import { Component, OnInit, signal } from '@angular/core';
import { ApiService } from '../../services/api.services';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgbDropdown, NgbDropdownButtonItem, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeRemoveModalComponent } from './employee-remove-modal/employee-remove-modal.component';

@Component({
  selector: 'app-employee-management',
  imports: [CommonModule, NgbDropdown, NgbDropdownToggle, NgbDropdownButtonItem, NgbDropdownMenu, NgbDropdownItem],
  templateUrl: './employee-management.component.html',
  styleUrl: './employee-management.component.css',
})
export class EmployeeManagementComponent implements OnInit {
  recordList: any[] | undefined;
  isloading = signal<boolean>(false);

  constructor(
    private apiService: ApiService,
    private readonly toastr: ToastrService,
    private readonly router: Router,
    private readonly modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getRecordList();
  }

  getRecordList() {
    this.isloading.set(true);
    this.apiService.employeeList().subscribe({
      next: (res: any)=> {
        this.recordList = res;
        this.isloading.set(false);
      },
      error: () => {
        this.toastr.error('failed');
        this.isloading.set(false);
      },
    })
  }

  addRecord() {
    this.router.navigate(['/employee-list/add']);
  }

  editRecord(id: string) {
    this.router.navigate(['/employee-list/edit', id]);
  }

  removeRecord(record: any) {
    const modalRef = this.modalService.open(EmployeeRemoveModalComponent, {centered: true, size: 'lg'});
    modalRef.componentInstance.passData = record;

    modalRef.result.then((x: any)=> {
      if(x === 'Save click') {
        this.apiService.removeEmployee(record.id).subscribe({
          next:() => {
            this.toastr.success('Employee successfully Remove');
            this.getRecordList();
          },
          error: () => {
            this.toastr.error('Remove Employee Failed');
          }
        })
      }
    })
  }

}


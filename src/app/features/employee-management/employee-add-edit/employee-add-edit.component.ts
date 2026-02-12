import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-add-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './employee-add-edit.component.html',
  styleUrl: './employee-add-edit.component.css',
})
export class EmployeeAddEditComponent implements OnInit {
  addLoading = signal<boolean>(false);
  isEditAction = false;
  selectedData : any;

  employeeAddForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/), Validators.required]),
    salary: new FormControl('', [Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.required]),
    phoneNumber: new FormControl('', [Validators.pattern(/^[0-9]+$/), Validators.required]),
  })

  constructor(
    private readonly router: Router,
    private apiService: ApiService,
    private readonly toastr: ToastrService,
    private readonly route: ActivatedRoute,){}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.isEditAction = true;
      this.apiService.viewEmployee(id).subscribe({
        next: (data: any)=> {
          this.selectedData = data;
          this.passData();
        },
        error: () => {
        this.toastr.error('failed');
        },
      })
    }
  }

  passData() {
    this.employeeAddForm.patchValue({
      name: this.selectedData.name,
      email: this.selectedData.email,
      salary: this.selectedData.salary,
      phoneNumber: this.selectedData.phone
    })
  }

  onSubmit() {
    console.log('this.employeeAddForm.valid', this.employeeAddForm.valid)
    if(this.employeeAddForm.valid) {
      this.addLoading.set(true);
      const reqdto = {
        name: this.employeeAddForm.controls.name.value,
        email: this.employeeAddForm.controls.email.value,
        phone: this.employeeAddForm.controls.phoneNumber.value,
        salary: this.employeeAddForm.controls.salary.value,
      }

      if(!this.isEditAction) {
        this.apiService.addEmployee(reqdto).subscribe({
          next: () => {
            this.addLoading.set(false);
            this.toastr.success('Employee successfully Added');
            this.router.navigate(['/employee-list']);
          },
          error: () => {
            this.addLoading.set(false);
            this.toastr.error('Add Employee Failed');
          },
        })
      } else {
        this.apiService.editEmployee(reqdto, this.selectedData.id).subscribe({
          next: () => {
            this.addLoading.set(false);
            this.toastr.success('Employee successfully Updated');
            this.router.navigate(['/employee-list']);
          },
          error: () => {
            this.addLoading.set(false);
            this.toastr.error('Updated Employee Failed');
          },
        })
      }
    }
  }

  cancel() {
    this.router.navigate(['/employee-list']);
  }

}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feedback',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './feedback.html',
  styleUrl: './feedback.css',
})
export class Feedback {
  feedbackForm : FormGroup;
  submitted = false;
  name = "";
  message =  "";

  constructor(
    private readonly fb: FormBuilder, 
    ) {
    this.feedbackForm = this.fb.group({
      name: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.maxLength(500)]]
    })
  }

  get f() {
    return this.feedbackForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.name = '';
    this.message = '';

    if(this.feedbackForm.invalid) {
      return;
    }

    this.name = this.feedbackForm.value.name;
    this.message = this.feedbackForm.value.message;

  }

}

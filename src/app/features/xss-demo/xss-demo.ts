import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-xss-demo',
  imports: [CommonModule, FormsModule],
  templateUrl: './xss-demo.html',
  styleUrl: './xss-demo.css',
})
export class XssDemo {
  userInput: string = '';
  safeOutput: string = '';
  sanitizedOutput: SafeHtml | null = null;

  constructor(private readonly sanitizer: DomSanitizer) {}

  renderSafe() {
    this.safeOutput = this.userInput;
  }

  renderUnsafe() {
    const target =document.getElementById('unsafeBox');
    if(target) {
      target.innerHTML = this.userInput;
    }
  }

  renderSanitized() {
    this.sanitizedOutput = this.sanitizer.bypassSecurityTrustHtml(this.userInput);
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  downloadResume(){
    const link  = document.createElement('a');
    link.href = 'assets/resume/SohailResume-Portfolio.pdf';
    link.download = 'SohailResume-Portfolio.pdf';
    link.click();
  }
}
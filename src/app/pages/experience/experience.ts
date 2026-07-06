import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-experience',
  imports: [],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience  implements OnInit {

  private http = inject(HttpClient);

  experiences: any[] = [];

  ngOnInit(): void {

    this.http.get<any[]>('assets/data/experience.json')
      .subscribe({
        next: data => this.experiences = data,
        error: err => console.error(err)
      });

  }

}

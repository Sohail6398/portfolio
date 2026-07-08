import { TitleCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  imports: [TitleCasePipe],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills implements OnInit {
skills: any = {};
  skillCategories: string[] = []; // Property variable stores static keys safely

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('assets/data/skills.json').subscribe({
      next: (data) => {
        this.skills = data;
        this.skillCategories = Object.keys(data);
      },
      error: (err) => console.error('Error loading skills data:', err)
    });
  }
}

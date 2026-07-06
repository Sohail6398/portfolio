import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Project } from '../../core/models/project.model';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {
  private http = inject(HttpClient);

  projects: Project[] = [];
  filteredProjects: Project[] = [];
  categories = ['All', 'Angular', '.NET', 'AI'];
  selectedCategory = 'All';

  ngOnInit() {
    this.http.get<Project[]>('assets/data/projects.json')
      .subscribe({
        next: (data) => {
          this.projects = data;
          this.filteredProjects = data;
        },
        error: (err) => console.error('Error loading projects data:', err)
      });
  }

  filter(category: string) {
    this.selectedCategory = category;

    if (category === 'All') {
      this.filteredProjects = this.projects;
      return;
    }

    // Dynamic Normalization ensures accurate structural lookup checks
    this.filteredProjects = this.projects.filter(x => {
      const targetCategory = x.category ? x.category.trim().toLowerCase() : '';
      const selectedFilter = category.trim().toLowerCase();
      
      // Handles technical matching logic strings like .NET or dot-net values
      if (selectedFilter === '.net') {
        return targetCategory === '.net' || targetCategory === 'net' || targetCategory === 'asp.net core';
      }
      return targetCategory === selectedFilter;
    });
  }
}

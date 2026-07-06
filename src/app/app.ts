import { Component, signal } from '@angular/core';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Navbar } from './layout/navbar/navbar';
import { Skills } from './pages/skills/skills';
import { Experience } from './pages/experience/experience';
import { Projects } from './pages/projects/projects';
import { Footer } from './layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Navbar,Home,About,Skills,Experience,Projects,Contact, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portfolio');
}

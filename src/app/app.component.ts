import { Component } from '@angular/core';
import { TodoComponent } from './components/todo/todo.component'; // Import TodoComponent

@Component({
  selector: 'app-root',
  standalone: true, // Tambahkan ini
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [TodoComponent] // Tambahkan TodoComponent di sini
})
export class AppComponent {
  title = 'angular-project';
}

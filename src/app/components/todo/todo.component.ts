import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Tambahkan FormsModule
import { HttpClientModule } from '@angular/common/http';
import { TodoService, TodoItem } from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule], // ✅ Tambahkan FormsModule
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  todos: TodoItem[] = [];
  newTodo: string = ''; // ✅ Tambahkan variabel untuk input Todo baru

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos(): void {
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data;
    });
  }

  addTodo(): void { // ✅ Tambahkan fungsi addTodo
    if (!this.newTodo.trim()) return; // Cegah input kosong

    const newTodoItem: TodoItem = {
      id: 0, // ID akan di-generate oleh backend
      name: this.newTodo,
      isComplete: false
    };

    this.todoService.addTodo(newTodoItem).subscribe((todo) => {
      this.todos.push(todo);
      this.newTodo = ''; // Reset input
    });
  }

  deleteTodo(id: number): void { // ✅ Pastikan deleteTodo ada
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter(todo => todo.id !== id);
    });
  }

  toggleComplete(todo: TodoItem): void { // ✅ Tambahkan toggleComplete
    const updatedTodo = { ...todo, isComplete: !todo.isComplete };

    this.todoService.updateTodo(todo.id, updatedTodo).subscribe(() => {
      todo.isComplete = !todo.isComplete; // Update UI
    });
  }
}

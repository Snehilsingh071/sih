// Selectors
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const clearAllBtn = document.getElementById('clear-all');

// Load todos from local storage
function loadTodos() {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  return todos;
}

// Save todos to local storage
function saveTodos(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Render todos
function renderTodos() {
  todoList.innerHTML = '';
  const todos = loadTodos();
  todos.forEach((todo, idx) => {
    const li = document.createElement('li');
    li.className = 'todo-item';

    const span = document.createElement('span');
    span.textContent = todo.text;
    span.className = 'todo-text' + (todo.completed ? ' completed' : '');
    span.addEventListener('click', () => toggleComplete(idx));
    li.appendChild(span);

    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', () => deleteTodo(idx));
    li.appendChild(delBtn);

    todoList.appendChild(li);
  });
}

// Add todo
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (!text) return;
  const todos = loadTodos();
  todos.push({ text, completed: false });
  saveTodos(todos);
  todoInput.value = '';
  renderTodos();
});

// Delete todo
function deleteTodo(idx) {
  const todos = loadTodos();
  todos.splice(idx, 1);
  saveTodos(todos);
  renderTodos();
}

// Toggle complete
function toggleComplete(idx) {
  const todos = loadTodos();
  todos[idx].completed = !todos[idx].completed;
  saveTodos(todos);
  renderTodos();
}

// Clear all todos
clearAllBtn.addEventListener('click', () => {
  if (confirm('Clear all tasks?')) {
    localStorage.removeItem('todos');
    renderTodos();
  }
});

// Initial render
renderTodos();

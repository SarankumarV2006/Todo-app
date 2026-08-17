let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo() {
  const input = document.getElementById("todoInput");
  const text = input.value.trim();

  if (text === "") {
    alert("Please enter a task");
    return;
  }

  const todo = {
    id: Date.now(),
    text: text,
    completed: false
  };

  todos.push(todo);

  input.value = "";

  saveTodos();
  displayTodos();
}

function displayTodos() {
  const list = document.getElementById("todoList");
  list.innerHTML = "";

  let filteredTodos = todos;

  if (currentFilter === "active") {
    filteredTodos = todos.filter(todo => !todo.completed);
  }

  if (currentFilter === "completed") {
    filteredTodos = todos.filter(todo => todo.completed);
  }

  filteredTodos.forEach(todo => {

    const li = document.createElement("li");
    li.className = "todo";

    li.innerHTML = `
      <input
        type="checkbox"
        ${todo.completed ? "checked" : ""}
        onchange="toggleTodo(${todo.id})"
      >

      <span class="${todo.completed ? "completed" : ""}">
        ${todo.text}
      </span>

      <div class="actions">
        <button onclick="editTodo(${todo.id})">Edit</button>
        <button onclick="deleteTodo(${todo.id})">Delete</button>
      </div>
    `;

    list.appendChild(li);
  });

  updateCount();
}

function toggleTodo(id) {
  todos = todos.map(todo => {
    if (todo.id === id) {
      todo.completed = !todo.completed;
    }

    return todo;
  });

  saveTodos();
  displayTodos();
}

function editTodo(id) {
  const todo = todos.find(todo => todo.id === id);

  const newText = prompt("Edit your task:", todo.text);

  if (newText !== null && newText.trim() !== "") {
    todo.text = newText.trim();

    saveTodos();
    displayTodos();
  }
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);

  saveTodos();
  displayTodos();
}

function filterTodos(filter) {
  currentFilter = filter;
  displayTodos();
}

function clearCompleted() {
  todos = todos.filter(todo => !todo.completed);

  saveTodos();
  displayTodos();
}

function updateCount() {
  const activeTodos = todos.filter(todo => !todo.completed);

  document.getElementById("count").textContent =
    `${activeTodos.length} tasks remaining`;
}

displayTodos();
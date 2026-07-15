const API_URL = 'http://localhost:5000/api/tasks';

const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

async function fetchTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();
  renderTasks(tasks);
}

function renderTasks(tasks) {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = `${task.title} ${task.completed ? '✅' : ''}`;
    taskList.appendChild(li);
  });
}

taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = taskInput.value.trim();
  if (!title) return;

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });

  taskInput.value = '';
  fetchTasks();
});

fetchTasks();

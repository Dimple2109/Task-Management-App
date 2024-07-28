document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('due-date-input');
    const categoryInput = document.getElementById('category-input');
    const priorityInput = document.getElementById('priority-input');
    const searchInput = document.getElementById('search-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Display tasks on initial load
    displayTasks(tasks);

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addTask(taskInput.value, dueDateInput.value, categoryInput.value, priorityInput.value);
        taskInput.value = '';
        dueDateInput.value = '';
        categoryInput.value = '';
        priorityInput.value = '';
    });

    searchInput.addEventListener('input', function() {
        const filteredTasks = tasks.filter(task => 
            task.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
            task.category.toLowerCase().includes(searchInput.value.toLowerCase())
        );
        displayTasks(filteredTasks);
    });

    function addTask(name, dueDate, category, priority) {
        const task = { name, dueDate, category, priority, completed: false };
        tasks.push(task);
        saveTasks();
        displayTasks(tasks);
    }

    function displayTasks(taskArray) {
        taskList.innerHTML = '';
        taskArray.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = `list-group-item ${getPriorityClass(task.priority)}`;
            li.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">
                    ${task.name} 
                    <small class="text-muted">${task.dueDate} ${task.category}</small>
                </span>
                <div>
                    <button class="complete-btn btn btn-sm mr-2"><i class="fas fa-check"></i></button>
                    <button class="delete-btn btn btn-sm"><i class="fas fa-trash"></i></button>
                </div>
            `;
            taskList.appendChild(li);

            li.querySelector('.complete-btn').addEventListener('click', function() {
                task.completed = !task.completed;
                saveTasks();
                displayTasks(tasks);
            });

            li.querySelector('.delete-btn').addEventListener('click', function() {
                tasks.splice(index, 1);
                saveTasks();
                displayTasks(tasks);
            });
        });
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function getPriorityClass(priority) {
        if (priority === 'High') return 'priority-high';
        if (priority === 'Medium') return 'priority-medium';
        if (priority === 'Low') return 'priority-low';
        return '';
    }
});

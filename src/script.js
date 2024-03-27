const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

taskForm.addEventListener('submit', addTask);

function addTask(event) {
    event.preventDefault();

    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const prioritySelect = document.getElementById('priority');

    const title = titleInput.value;
    const description = descriptionInput.value;
    const priority = prioritySelect.value;

    if (title.trim() === '' || description.trim() === '') {
        alert('Please fill in all fields');
        return;
    }

    const task = {
        title,
        description,
        priority,
        completed: false
    };

    createTaskElement(task);

    titleInput.value = '';
    descriptionInput.value = '';
}

function createTaskElement(task) {
    const taskItem = document.createElement('li');
    taskItem.className = 'task';
    if (task.completed) {
        taskItem.classList.add('completed');
    }

    taskItem.innerHTML = `
        <strong>${task.title}</strong> - ${task.description} - Priority: ${task.priority}
        <div class="task-actions">
            <button onclick="toggleTaskCompletion(this)">Mark ${task.completed ? 'Pending' : 'Complete'}</button>
            <button onclick="editTask(this)">Edit</button>
            <button onclick="deleteTask(this)">Delete</button>
        </div>
    `;

    taskList.appendChild(taskItem);
}

function toggleTaskCompletion(button) {
    const taskItem = button.parentElement.parentElement;
    taskItem.classList.toggle('completed');
}

function editTask(button) {
    const taskItem = button.parentElement.parentElement;
    const taskTitle = taskItem.querySelector('strong').innerText;
    const taskDescription = taskItem.innerText.split('-')[1].trim();
    const taskPriority = taskItem.innerText.split('Priority: ')[1].trim();

    const titleInput = prompt('Enter new title:', taskTitle);
    const descriptionInput = prompt('Enter new description:', taskDescription);
    const priorityInput = prompt('Enter new priority:', taskPriority);

    if (titleInput && descriptionInput && priorityInput) {
        const newTask = {
            title: titleInput,
            description: descriptionInput,
            priority: priorityInput,
            completed: taskItem.classList.contains('completed')
        };

        taskItem.remove();
        createTaskElement(newTask);
    }
}

function deleteTask(button) {
    const taskItem = button.parentElement.parentElement;
    taskItem.remove();
}

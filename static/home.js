let content = document.getElementsByTagName('body')[0];
let darkMode = document.getElementById('dark-change');
let logout = document.getElementById('logout');
let viewButton = document.getElementById('view');
let addButton = document.getElementById('add');
let isViewClicked = false;
let cardArea = document.getElementById('card-area');
let addForm = document.getElementById('add-form');
let addTaskButton = document.getElementById('add-task-button');
let taskName = document.getElementById('task-name').value;
let taskDescription = document.getElementById('task-description').value;
let dueDate = document.getElementById('due-date').value;

const isDarkMode = localStorage.getItem("darkMode") === "true";
if (isDarkMode) {
    content.classList.add("night");
    darkMode.classList.add("active");
    darkMode.src = '../static/night-mode.png';
}

darkMode.addEventListener('click', function run() {
    darkMode.classList.toggle('active');
    content.classList.toggle('night');

    if (darkMode.src.match('../static/sun.png')) {
        darkMode.src = '../static/night-mode.png';
        localStorage.setItem("darkMode", "true");
    } else {
        darkMode.src = '../static/sun.png';
        localStorage.setItem("darkMode", "false");
    }
});

logo.addEventListener('click', () => {
    window.location.href = '/';
});

addButton.addEventListener('click', () => {
    cardArea.style.display = 'none';
    addForm.style.display = 'flex';
});

viewButton.addEventListener('click', () => {
    cardArea.style.display = 'flex';
    addForm.style.display = 'none';
    if (!isViewClicked) {
        isViewClicked = true;
        const taskList = document.querySelector('.box2');

        // Make an HTTP request to fetch the tasks
        fetch('/api/tasks')
            .then(response => response.json())
            .then(tasks => {
                const todos = tasks[0].todos;
                console.log(todos);
                // Iterate over the tasks data and create cards
                todos.forEach(task => {
                    const card = document.createElement('div');
                    card.className = 'card';

                    const title = document.createElement('h2');
                    title.innerHTML = `${task.title}`;

                    const description = document.createElement('p');
                    description.innerHTML = `<b>Description:</b> ${task.description}`;

                    const dueDate = document.createElement('p');
                    dueDate.textContent = `Due Date: ${new Date(task.dateToFinish).toLocaleDateString('en-US')}`;

                    card.appendChild(title);
                    card.appendChild(description);
                    card.appendChild(dueDate);

                    taskList.appendChild(card);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

});

addTaskButton.addEventListener('click', () => {
    console.log(taskName + ' ' + taskDescription + ' ' + dueDate);
    const taskCompleted = false;
    fetch('/api/addTask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            taskName,
            taskDescription,
            taskCompleted,
            password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Login successful, redirect to dashboard
            window.location.href = '/home';
        } else {
            // Login failed, display error message
            errorContainer.textContent = data.message;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
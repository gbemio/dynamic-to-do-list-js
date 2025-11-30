// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Load tasks from Local Storage and render them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Save tasks array to Local Storage
    function saveTasks(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to add a new task (optionally save to Local Storage)
    function addTask(taskText, save = true) {
        const text = typeof taskText === "string" ? taskText.trim() : taskInput.value.trim();

        // Validate input
        if (text === "") {
            alert("Please enter a task.");
            return;
        }

        // Create new list item
        const li = document.createElement("li");
        li.textContent = text;

        // Create remove button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");

        // Assign onclick event to remove the task (and update Local Storage)
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
            const index = storedTasks.indexOf(text);
            if (index !== -1) {
                storedTasks.splice(index, 1);
                saveTasks(storedTasks);
            }
        };

        // Append remove button to list item, then list item to task list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // If requested, save the task to Local Storage
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
            storedTasks.push(text);
            saveTasks(storedTasks);
        }

        // Clear input field
        taskInput.value = "";
    }

    // Event listener for Add Task button
    addButton.addEventListener("click", function () {
        addTask();
    });

    // Event listener for Enter key in input field
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Initialize: load tasks from Local Storage
    loadTasks();
});

// -------------------------
// DATA STRUCTURES
// -------------------------
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let xp = Number(localStorage.getItem("xp")) || 0;
let level = Number(localStorage.getItem("level")) || 1;

const XP_PER_TASK = 20;
const XP_TO_LEVEL = 100;

// -------------------------
// DOM ELEMENTS
// -------------------------
const taskList = document.getElementById("task-list");
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const xpFill = document.getElementById("xp-fill");
const levelDisplay = document.getElementById("level-display");
const resetBtn = document.getElementById("reset-data");

// -------------------------
// RENDER FUNCTIONS
// -------------------------
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const div = document.createElement("div");
        div.className = "task" + (task.completed ? " completed" : "");

        div.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button onclick="toggleTask(${index})">✔</button>
                <button onclick="deleteTask(${index})">✖</button>
            </div>
        `;

        taskList.appendChild(div);
    });
}

function renderXP() {
    const percent = (xp / XP_TO_LEVEL) * 100;
    xpFill.style.width = percent + "%";
    levelDisplay.textContent = `Level ${level}`;
}

// -------------------------
// TASK FUNCTIONS
// -------------------------
function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;

    tasks.push({ text, completed: false });
    taskInput.value = "";

    save();
    renderTasks();
}

function toggleTask(index) {
    const task = tasks[index];

    if (!task.completed) {
        xp += XP_PER_TASK;
        if (xp >= XP_TO_LEVEL) {
            xp -= XP_TO_LEVEL;
            level++;
        }
    }

    task.completed = !task.completed;

    save();
    renderTasks();
    renderXP();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    save();
    renderTasks();
}

// -------------------------
// SAVE SYSTEM
// -------------------------
function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("xp", xp);
    localStorage.setItem("level", level);
}

// -------------------------
// RESET
// -------------------------
resetBtn.onclick = () => {
    if (confirm("Reset all data?")) {
        tasks = [];
        xp = 0;
        level = 1;
        save();
        renderTasks();
        renderXP();
    }
};

// -------------------------
// INIT
// -------------------------
renderTasks();
renderXP();

addTaskBtn.onclick = addTask;
taskInput.addEventListener("keypress", e => {
    if (e.key === "Enter") addTask();
});

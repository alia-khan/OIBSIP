
// =====================
// ELEMENTS
// =====================

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");

const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");

const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");

const pendingEmpty = document.getElementById("pendingEmpty");
const completedEmpty = document.getElementById("completedEmpty");

const themeBtn = document.getElementById("themeBtn");


// =====================
// DATA
// =====================

let tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];


// =====================
// THEME
// =====================

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️";
}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const isDark =
        document.body.classList.contains("dark");

    themeBtn.textContent =
        isDark ? "☀️" : "🌙";

    localStorage.setItem(
        "theme",
        isDark ? "dark" : "light"
    );
});


// =====================
// SAVE TASKS
// =====================

function saveTasks() {

    localStorage.setItem(
        "todoTasks",
        JSON.stringify(tasks)
    );
}


// =====================
// ADD TASK
// =====================

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {

        id: Date.now(),

        text: text,

        completed: false,

        createdAt:
            new Date().toLocaleString(),

        completedAt: null
    };

    tasks.push(task);

    saveTasks();

    taskInput.value = "";

    renderTasks();
}


addTaskBtn.addEventListener(
    "click",
    addTask
);


taskInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {
            addTask();
        }
    }
);


// =====================
// DELETE
// =====================

function deleteTask(id) {

    tasks = tasks.filter(
        task => task.id !== id
    );

    saveTasks();

    renderTasks();
}


// =====================
// COMPLETE / UNDO
// =====================

function toggleTask(id) {

    tasks.forEach(task => {

        if (task.id === id) {

            task.completed =
                !task.completed;

            task.completedAt =
                task.completed
                    ? new Date().toLocaleString()
                    : null;
        }
    });

    saveTasks();

    renderTasks();
}


// =====================
// INLINE EDIT
// =====================

function editTask(id, textElement) {

    const task =
        tasks.find(
            item => item.id === id
        );

    const input =
        document.createElement("input");

    input.type = "text";

    input.value = task.text;

    input.className = "edit-input";

    textElement.replaceWith(input);

    input.focus();
    input.select();


    function saveEdit() {

        const newText =
            input.value.trim();

        if (newText !== "") {

            task.text = newText;

            saveTasks();
        }

        renderTasks();
    }


    input.addEventListener(
        "blur",
        saveEdit
    );


    input.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {
                saveEdit();
            }

            if (event.key === "Escape") {
                renderTasks();
            }
        }
    );
}


// =====================
// CREATE TASK CARD
// =====================

function createTaskElement(task) {

    const li =
        document.createElement("li");

    li.className =
        task.completed
            ? "task-item completed"
            : "task-item";


    const timeText =
        task.completed
            ? `
                Added: ${task.createdAt}<br>
                Completed: ${task.completedAt}
              `
            : `
                Added: ${task.createdAt}
              `;


    li.innerHTML = `

        <div class="task-top">

            <div class="task-content">

                <div class="task-text">
                    ${task.text}
                </div>

                <div class="task-time">
                    ${timeText}
                </div>

            </div>


            <div class="task-actions">

                <button class="complete-btn">

                    ${
                        task.completed
                        ? "↩ Undo"
                        : "✔ Complete"
                    }

                </button>


                <button class="edit-btn">
                    ✏ Edit
                </button>


                <button class="delete-btn">
                    🗑 Delete
                </button>

            </div>

        </div>

    `;


    const textElement =
        li.querySelector(".task-text");


    li.querySelector(".complete-btn")
        .addEventListener(
            "click",
            () => toggleTask(task.id)
        );


    li.querySelector(".edit-btn")
        .addEventListener(
            "click",
            () => editTask(
                task.id,
                textElement
            )
        );


    li.querySelector(".delete-btn")
        .addEventListener(
            "click",
            () => deleteTask(task.id)
        );


    return li;
}


// =====================
// COUNTERS
// =====================

function updateCounts() {

    const pending =
        tasks.filter(
            task => !task.completed
        ).length;


    const completed =
        tasks.filter(
            task => task.completed
        ).length;


    pendingCount.textContent =
        `${pending} Pending`;


    completedCount.textContent =
        `${completed} Completed`;
}


// =====================
// EMPTY STATES
// =====================

function updateEmptyStates() {

    const pending =
        tasks.filter(
            task => !task.completed
        );

    const completed =
        tasks.filter(
            task => task.completed
        );


    pendingEmpty.style.display =
        pending.length === 0
            ? "block"
            : "none";


    completedEmpty.style.display =
        completed.length === 0
            ? "block"
            : "none";
}


// =====================
// RENDER
// =====================

function renderTasks() {

    pendingList.innerHTML = "";
    completedList.innerHTML = "";


    tasks.forEach(task => {

        const card =
            createTaskElement(task);

        if (task.completed) {

            completedList.appendChild(card);

        } else {

            pendingList.appendChild(card);
        }
    });


    updateCounts();

    updateEmptyStates();
}


// =====================
// INITIAL LOAD
// =====================

renderTasks();


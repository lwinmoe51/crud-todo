let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

//form validations
form.addEventListener("submit", (e) => {
    e.preventDefault();
    formvalidation();
});


let formvalidation = () => {
    if (textInput.value === "") {
        console.log("failure");
        msg.innerHTML = "Task cannot be blank";
    } else {
        acceptData();
        //to close modal after add button click automatically
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();
        (() => {
            add.setAttribute("data-bs-dismiss", "");
        })();
        console.log("success");
        msg.innerHTML = "";
    }
}


let data = [];
let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
    });
    //stringify convert data to json format
    localStorage.setItem("data", JSON.stringify(data));
    createTasks();
    console.log(data);
}

let createTasks = () => {
    tasks.innerHTML = "";
    // x is current element of array; y is index of current element
    data.map((x, y) => {
        return (tasks.innerHTML += `
        <div id=${y}>
            <span class="fw-bold">${x.text}</span>
            <span class="small text-secondary">${x.date}</span>
            <p>${x.description}</p>
    
            <span class="options">
              <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
              <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
            </span>
        </div>
      `);
    });

    resetForm();
};

let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
};

let deleteTask = (e) => {
    //delete html element from the screen
    e.parentElement.parentElement.remove();
    //remove targetted task from the data array
    data.splice(e.parentElement.parentElement.id, 1);
    //update the local storage with the new data
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
}

let editTask = (e) => {
    //selecting the target task to edit
    let selectedTask = e.parentElement.parentElement;
    //targetting values
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
    //deleting old task
    deleteTask(e);
}

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    createTasks();
})();

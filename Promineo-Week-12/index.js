let form = document.getElementById('form');
let textInput = document.getElementById('text-input');
let msg = document.getElementById('msg');
let dateInput = document.getElementById('date-input');
let extraInput = document.getElementById('extra-input');
let tasks = document.getElementById('tasks');
let add = document.getElementById('add');

let data = [];

//These calls allow me to open and close the form using the submit button and will not close the window if nothing valid is inputed.
form.addEventListener('submit', (j) => {
    j.preventDefault();
    formValidation();
});

let formValidation = () => {
    if (textInput.value === '') {
        console.log('failure');
        msg.innerHTML = 'Tasks are blank';
    } else {
        console.log('success');
        msg.innerHTML = '';
        acceptData();
        add.setAttribute('data-dismiss', 'modal');
        add.click();

        (() => {
            add.setAttribute('data-dismiss', '');
        })()
    }
};

//this takes the data that is inputed and stores the values to each variable respectfully in the order they are entered in. Text will be for the title, date will always be date and extra is the comment box. Then it is all pushed to the local storage.
let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        extra: extraInput.value,
    });

    localStorage.setItem('data', JSON.stringify(data));


    console.log(data);
    createTasks();
};

//Created a new div with everything needed to create a new box for whatever task is entered by the user.
let createTasks = () => {
    tasks.innerHTML = "";
    data.map((x, y) => {
        return (tasks.innerHTML += 
        `<div id=${y}>
        <span>${x.text}</span>
        <span class="small text-secondary">${x.date}</span>
        <p>${x.extra}</p>
    
        <span class="options">
            <span onClick="updateTask(this)" data-toggle="modal" data-target="#form" id="edit-sign">&#9998;</span>
            <span onClick="deleteTask(this);createTasks()" id="delete-sign">&#10007;</span>
        </span>
        
    </div>`);
    });
    

resetForm();
};

//splicing out an inputed object is the easiest way since I can splice the full parent of seleceted object and delete 1 at a time with 1 button.
let deleteTask = (del) => {
    del.parentElement.parentElement.remove();
    data.splice(del.parentElement.parentElement.id, 1);
    localStorage.setItem('data', JSON.stringify(data));
    //delTask(data);
};

// take the input values and store the new ones over top of the old and delete the original in the process so the new can take it's place.
let updateTask = (update) => {
    let selectedTask = update.parentElement.parentElement;

    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    extraInput.value = selectedTask.children[2].innerHTML;

    //deleteTask(editTask(update));
    deleteTask(update);
};

// sets the form back to empty for entering text.
let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    extraInput.value = "";
};

//IIFE function here that gets the stored items in the local storage and is automatically called. 
(() => {

    data = JSON.parse(localStorage.getItem('data')) || [];
    createTasks();
    console.log(data);
})();

const makeTasks = (data) => {
    return $.post(this.url, data);
}

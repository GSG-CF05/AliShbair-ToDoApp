// declaration
let inputTodo = document.querySelector(".inputTodo");
let buttonTodo = document.querySelector(".btnTodo");
let tasksList = document.querySelector(".tasksList");
let tasks = []; // 72
let localData = localStorage.getItem("tasksKey");

// add events
buttonTodo.addEventListener("click", addTask); // 12 , {once:true}
document.addEventListener("DOMContentLoaded", getTasksOnLoad); // 76

// the main function: to get task and set it into new div as an array
function addTask(e) {
  e.preventDefault();

  // if input is empty return nothing
  if (inputTodo.value == "") {
    return;
  }
  let el = document.createElement("div");
  tasksList.appendChild(el);

  let task = document.createElement("li");
  task.className="task";
  el.appendChild(task);
  task.textContent = inputTodo.value;

  // let options = document.createElement("section");
  // el.appendChild(options);

  // creating Remove Button and the function after clicking.
  let removeBtn = document.createElement("i");
  removeBtn.classList="far fa-trash-alt delete"
  el.appendChild(removeBtn);
  


  // save user data to local storage
  function saveToLocal() {
    tasks.push(inputTodo.value);
    // convert array to string so it can be read by local.
    localStorage.setItem("tasksKey", JSON.stringify(tasks));
  }
  saveToLocal();


  removeBtn.addEventListener("click", removeElement);
  function removeElement() {
    el.remove(); // just removed from screen not local yet.
    // bring values from local as an array
    let taskValue = JSON.parse(localStorage.getItem("tasksKey"));
    // get the index of removed value, will be the same as .textContent
    let taskIndex = taskValue.indexOf(task.textContent);
    // delete its value from the brought array
    taskValue.splice(taskIndex, 1);
    // send the modified array back to local as a string.
    localStorage.setItem("tasksKey", JSON.stringify(taskValue));
  } // end of remove function


  // creating Edit Button and the function after clicking.
  let editBtn = document.createElement("i");
  editBtn.classList="fas fa-pen edit"
  el.appendChild(editBtn);

  el.addEventListener("click", editElement);
  function editElement(e) {
    if (e.target.classList.contains("edit")) {
    let taskText = e.target.parentNode.innerText;
    e.target.parentNode.classList.contains("task");
    tasks.forEach(task=>{
      let currentTask= document.getElementsByClassName("task")
      if(currentTask.textContent==task){
        currentTask.setAttribute("contenteditable", "true")
      }
    
    })
    // console.log(document.getElementsByClassName("task")[0])

    // console.log(taskText);
    }

    // task.remove();
    // editBtn.textContent = "save";
    // editBtn.addEventListener("click", changeTask);
    //   function changeTask(){
    //     let newInput = document.createElement("input");
    //     el.appendChild(task);
    //     el.appendChild(newInput);

    //   }
  } // end of Edit function

  

  inputTodo.value = "";
  //end of else } all cases that have a real value.
} // end of function addTasks




//  ---------- On LOAD ---------- //

// save on Load, get copy of data from local storage to page on reload.
function getTasksOnLoad() {
  if (localData) {
    tasks = JSON.parse(localData);
  }

  tasks.forEach((ele) => {
    let el = document.createElement("div");
    tasksList.appendChild(el);

    let task = document.createElement("li");
    el.appendChild(task);
    task.textContent = ele;

    // let options = document.createElement("section");
    // el.appendChild(options);

    let removeBtn = document.createElement("button");
    el.appendChild(removeBtn);
    removeBtn.textContent = "remove";

    //  we get remove button on local, we gonna need it again because it's
    //  event are activated inside the screen div only.
    removeBtn.addEventListener("click", removeElement);
    function removeElement() {
      el.remove(); // just removed from screen not local yet.
      console.log(task.textContent);
      // bring values from local as an array
      let taskValue = JSON.parse(localData);
      // get the index of removed value, will be the same as .textContent
      let taskIndex = taskValue.indexOf(task.textContent);
      // delete its value from the brought array
      taskValue.splice(taskIndex, 1);
      // send the modified array back to local as a string.
      localStorage.setItem("tasksKey", JSON.stringify(taskValue));
    } // end of remove function


    // creating Edit Button and the function after clicking.
  let editBtn = document.createElement("button");
  editBtn.className = "edit";
  el.appendChild(editBtn);
  editBtn.textContent = "edit";


  }); //end of insider function} > end of forEach)
} // end of function getTasksOnLoad

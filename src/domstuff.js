import { control, Todolist, Todo } from "./index";
function addtasktodom(i) {
  const task = Todolist.lis[i].lis[Todolist.lis[i].lis.length - 1];
  const ul = document.querySelector(`#project${i}>ul`);
  const li = document.createElement("li");
  li.id = `project${i}task${Todolist.lis[i].lis.length - 1}`;
  li.addEventListener("click", () => {
    showhidetask(li.id);
  });
  li.innerText = task.title;
  ul.appendChild(li);
}
function removeprojectfromdom(i) {
  const el = document.querySelector(`#project${i}`);
  el.remove();
}
function showhidetask(taskid) {
  const task = document.querySelector(`#${taskid}`);
  const task_ = Todolist.lis[taskid[7]].lis[taskid[taskid.length - 1]]; //this might cause problems
  if (task.innerHTML == task_.title) {
    const markasfinishedbtn = document.createElement("button");
    markasfinishedbtn.className = "markasfinishedbtn";
    const removetaskbtn = document.createElement("button");
    removetaskbtn.className = "removetaskbtn";
    removetaskbtn.innerText = "remove task";
    removetaskbtn.addEventListener("click", () => {
      Todolist.lis[taskid[7]].removeTodo(`#${taskid[taskid.length - 1]}`);
      task.remove();
    });
    markasfinishedbtn.innerText = "mark as finished";
    markasfinishedbtn.addEventListener("click", () => {
      if (task_.status == "not done") {
        task_.status = "done";
        const task = document.querySelector(`#${taskid}`);
        task.style.textDecoration = "line-through";
        task.style.listStyle = "--";
      }
    });
    task.innerHTML += `<div>Due Date: ${task_.dueDate} Description: ${task_.description}</div>`;
    task.appendChild(markasfinishedbtn);
    task.appendChild(removetaskbtn);
  } else {
    task.innerHTML = task_.title;
  }
}
function addprojecttodom() {
  const proj = Todolist.lis[Todolist.lis.length - 1];
  const container = document.querySelector(".project-container");
  let div = document.createElement("div");
  div.className = "project";
  div.id = `project${Todolist.lis.length - 1}`;
  let projecttitle = document.createElement("div");
  projecttitle.className = "projecttitle";
  projecttitle.innerText = proj.title;
  div.appendChild(projecttitle);
  const ul = document.createElement("ul");
  for (const todo of proj.lis) {
    ul.innerHTML += `<li>${todo.title} </li>`;
  }
  div.appendChild(ul);
  const addtaskbtn = document.createElement("button");
  addtaskbtn.innerText = "Add Task";
  addtaskbtn.className = "addtaskbtn";
  addtaskbtn.id = `addtaskbtn${Todolist.lis.length - 1}`;
  addtaskbtn.addEventListener("click", () => {
    handleaddtaskform(addtaskbtn.id.slice(10));
  });
  div.appendChild(addtaskbtn);
  const removebtn = document.createElement("button");
  removebtn.innerText = "Remove Project";
  removebtn.className = "removebtn";

  removebtn.id = `removebtn${Todolist.lis.length - 1}`;
  removebtn.addEventListener("click", () => {
    let conf = confirm("are you sure, remove project ?");
    if (conf) {
      control.removeproject(removebtn.id.slice(9));
      removeprojectfromdom(removebtn.id.slice(9));
    }
  });
  div.appendChild(removebtn);
  container.appendChild(div);
}

const buttonhandler = (() => {
  const addprojbtn = document.querySelector(".nav > div:nth-child(3) > button");
  addprojbtn.addEventListener("click", () => {
    let title = document.querySelector("input").value;
    document.querySelector("input").value = "";
    control.addproject(title);
    addprojecttodom();
  });
})();

function handleaddtaskform(i) {
  const ul = document.querySelector(`#project${i}>ul`);
  const div = document.createElement("div");
  div.id = `addtaskform${i}`;
  div.className = "addtaskform";
  div.innerHTML = `<input type='text' placeholder='title'> </input> <input type='text' placeholder='description'> </input> <input type='Date' placeholder='dueDate'> </input> <input type='text' placeholder='priority'> </input>`;
  const addtaskformbtn = document.createElement("button");
  addtaskformbtn.id = `addtaskformbtn${i}`;
  addtaskformbtn.innerText = "save";
  const addtaskcancelbtn = document.createElement("button");
  addtaskcancelbtn.id = `addtaskcancelbtn${i}`;
  addtaskcancelbtn.innerText = "cancel";
  addtaskformbtn.addEventListener("click", () => {
    const title = document.querySelector(
      `#addtaskform${addtaskformbtn.id.slice(14)}>input:nth-child(1)`
    ).value;
    const description = document.querySelector(
      `#addtaskform${addtaskformbtn.id.slice(14)}>input:nth-child(2)`
    ).value;
    const dueDate = document.querySelector(
      `#addtaskform${addtaskformbtn.id.slice(14)}>input:nth-child(3)`
    ).value;
    const priority = document.querySelector(
      `#addtaskform${addtaskformbtn.id.slice(14)}>input:nth-child(4)`
    ).value;
    const form = document.querySelector(
      `#addtaskform${addtaskformbtn.id.slice(14)}`
    );
    let todo = Todo(title, description, dueDate, priority);
    Todolist.lis[Todolist.lis.length - 1].addTodo(todo);
    addtasktodom(addtaskformbtn.id.slice(14));
    form.remove();
  });
  div.appendChild(addtaskcancelbtn);
  div.appendChild(addtaskformbtn);
  ul.appendChild(div);
}

export { buttonhandler, addprojecttodom };

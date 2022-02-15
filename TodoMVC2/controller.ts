import Todo from "./model.js";
import render, {changeStyle} from "./view.js";

const todo = new Todo([]);

document.querySelector(".selectAll")?.addEventListener("click", ()=>{
    todo.selectAll();
    render(todo.getTodo(), todo.getState(), todo.itemsActive());
})

let todoInputField = document.querySelector(".todoInputField") as HTMLInputElement;

function addNewTask(task: string):void{
    let id = todo.getLastId();
    todo.add({
        id: id,
        task: task,
        status: false,
    })
    todoInputField.value = "";
    let popup = document.querySelector(".popup") as HTMLElement;
    popup.style.display = "none";
    render(todo.getTodo(), todo.getState(), todo.itemsActive());
}

todoInputField?.addEventListener("keydown", (e)=>{
    if(e.keyCode === 13 && e.target.value.trim()){
        addNewTask(e.target.value.trim());
    }
})

function debouncing(func, timeout = 300) : object{
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(()=>{func.apply(this, args)}, timeout);
    }
}

function popup() : void{
    let popup = document.querySelector(".popup") as HTMLElement;
    let value = todo.searchInTodo(todoInputField.value);
    if(value){
        popup.innerHTML = `"${value}" already exists in todos`;
        popup.style.display = "block";
    }
    else popup.style.display = "none";
}

const inputDebounce = debouncing(()=>popup());
todoInputField.addEventListener("input", inputDebounce);

let addButton = document.querySelector(".add") as HTMLElement
addButton.addEventListener("click", ()=>{
    if(todoInputField.value.trim())
    addNewTask(todoInputField.value.trim());
})

let todoList = document.querySelector(".todoList") as HTMLElement;

function checkedToggle(e){
    todo.changeState((e.target.parentNode.id).slice(4));
    changeStyle(e.target.parentNode.id, todo.itemsActive());
}

todoList.addEventListener("change", (e)=>{checkedToggle(e)})

todoList.addEventListener("click", (e)=>{
    if(e.target.nodeName === "BUTTON"){
        todo.destroy(e.target.parentNode.id.slice(4));
        render(todo.getTodo(), todo.getState(), todo.itemsActive());
    }
    else if(e.target.nodeName === "P"){
        e.target.parentNode.querySelector(".toggle").checked = !e.target.parentNode.querySelector(".toggle").checked;
        checkedToggle(e);
        // render(todo.getTodo, todo.itemsActive());
    }
})

let footer = document.querySelector("footer") as HTMLElement;
footer.addEventListener("click", (e)=>{
    if(e.target.nodeName === "A"){
        document.querySelector("."+todo.getState().toLowerCase())?.classList.toggle("selected");
        todo.filterState(e.target.textContent);
        document.querySelector("."+todo.getState().toLowerCase())?.classList.toggle("selected");
        render(todo.getTodo(), todo.getState(), todo.itemsActive());
    }
    else if(e.target.nodeName === "BUTTON"){
        todo.clearCompleted();
        render(todo.getTodo(), todo.getState(), todo.itemsActive());
    }
})

render(todo.getTodo(), todo.getState(), 0);

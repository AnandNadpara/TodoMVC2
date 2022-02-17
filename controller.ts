import Todo from "./model.js";
import render, {changeStyle, addItem, destroyItem, destroySelected, everyToggleSelected} from "./view.js";

const todo = new Todo([]);

document.querySelector(".selectAll")?.addEventListener("click", ()=>{
    todo.selectAll();
    everyToggleSelected(todo.getTodo());
})

let todoInputField = document.querySelector(".todoInputField") as HTMLInputElement;

function addNewTask(task: string):void{
    let id = todo.getLastId();
    let item = {    
        id: id,
        task: task,
        status: false,
    }
    todo.add(item);
    todoInputField.value = "";
    let popup = document.querySelector(".popup") as HTMLElement;
    popup.style.display = "none";
    addItem(item, todo.itemsActive());
}

todoInputField.addEventListener("keydown", <K extends KeyboardEvent>(e:K)=>{
    if(e && e.keyCode === 13 && todoInputField.value.trim()){
        addNewTask(todoInputField.value.trim());
    }
})

function debouncing(func:any, timeout = 300){
    let timer: number;
    return (...args:any) => {
        clearTimeout(timer);
        timer = setTimeout(()=>{func.apply(args)}, timeout);
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

function checkedToggle(e: Event){
    todo.changeState(((e.target as Element).parentNode as HTMLElement).id.slice(4) as any as number);
    changeStyle(((e.target as Element).parentNode as HTMLElement).id, todo.itemsActive());
}

todoList.addEventListener("change", (e)=>{checkedToggle(e)})

todoList.addEventListener("click", (e)=>{
    if((e.target as Element).nodeName === "BUTTON"){
        let elementId = ((e.target as Element).parentNode as HTMLElement).id;
        todo.destroy(elementId.slice(4) as any as number);
        destroyItem(elementId, todo.itemsActive());
    }
    else if((e.target as Element).nodeName === "LI"){
        (((e.target as HTMLElement).parentNode as HTMLElement).querySelector(".toggle") as HTMLInputElement).checked = !(((e.target as Element).parentNode as Element).querySelector(".toggle") as HTMLInputElement).checked;
        checkedToggle(e);
    }
})

let footer = document.querySelector("footer") as HTMLElement;
footer.addEventListener("click", (e)=>{
    if((e.target as Element).nodeName === "A"){
        document.querySelector("."+todo.getState().toLowerCase())?.classList.toggle("selected");
        todo.filterState((e.target as Element).textContent as string);
        document.querySelector("."+todo.getState().toLowerCase())?.classList.toggle("selected");
        render(todo.getTodo(), todo.getState(), todo.itemsActive());
    }
    else if((e.target as Element).nodeName === "BUTTON"){
        destroySelected(todo.getTodo());
        todo.clearCompleted();
    }
})


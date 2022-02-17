import {todo} from "./model.js";

function render(todoArr : todo[], state : string, items : number) : void{
    let todoList : HTMLElement | null = document.querySelector(".todoList");
    if(todoList)
    todoList.innerHTML = ``;

    todoArr.map(item => {
        if(
            state === "All" ||
            (state === "Active" && !item.status) ||
            (state === "Completed" && item.status)
        ){
            let div = getSectionNode(item);
            todoList?.appendChild(div);
        }
    })

    let selectAll = document.querySelector(".selectAll");
    if(selectAll)
    selectAll.innerHTML = todoArr.length ? "V" : "";    

    let itemsLeft: HTMLElement | null = document.querySelector(".itemsLeft")
    if(itemsLeft)
    itemsLeft.textContent = items + " items left";
}

function changeStyle(id : string, items: number){
    let task : HTMLElement | null = document.querySelector("#"+id);
    if(task){
        let para = task.querySelector("li");
        setTimeout(()=>para?.classList.toggle("bold"), 20);
        let span = task.querySelector("span")
        if(span)
        span.textContent = span.textContent === "Active" ? "Completed" : "Active";
    }
    let itemsLeft = document.querySelector(".itemsLeft")
    if(itemsLeft)
    itemsLeft.textContent = items + " items left";
}

function everyToggleSelected(todoArr: todo[]){
    let itemsLeft : HTMLElement | null = document.querySelector(".itemsLeft");
    todoArr.map( item => {
        let section : HTMLElement | null = document.querySelector("#task"+item.id);
        let para = section?.querySelector("li");
        let span = section?.querySelector("span");
        let input = (section?.firstChild as HTMLInputElement);
        if(item.status){
            para?.classList.add("bold");
            input.checked = true;  
            if(span)
            span.textContent = "Completed";
            if(itemsLeft) itemsLeft.textContent = "0 items left";
        }
        else{
            para?.classList.remove("bold");
            input.checked = false;
            if(span)
            span.textContent = "Active";
            if(itemsLeft) itemsLeft.textContent = todoArr.length+" items left";
        }
    })
}

function getSectionNode(item: todo):HTMLElement{
    let section = document.createElement("section");
    section.setAttribute("id","task"+item.id);
    
    let input = document.createElement("input");
    input.setAttribute("type","checkbox");
    input.checked = item.status;
    input.classList.add("toggle");
    section.appendChild(input);

    let p  = document.createElement("li");
    if(item.status)p.classList.add("lineThrough");
    p.innerHTML = `${item.task}`;
    section.appendChild(p);
    
    let span = document.createElement("span");
    span.innerHTML = item.status ? "Completed" : "Active";
    section.appendChild(span);

    let button = document.createElement("button");
    button.classList.add("destroy");
    button.textContent = "X";
    section.appendChild(button);
    let div = document.createElement("div");
    div.appendChild(section);
    setTimeout(()=>{
        div.classList.add("show");
        section.classList.add("show");
    }, 15);
    return div;
}

function addItem(item:todo, activeItems:number){
    const k = getSectionNode(item);
    const todoList = document.querySelector(".todoList");
    todoList?.append(k);

    let itemsLeft: HTMLElement | null = document.querySelector(".itemsLeft")
    if(itemsLeft) itemsLeft.textContent = activeItems + " items left";
}

function destroyItem(elementId: string, activeItems?:number){
    let element = document.querySelector("#"+elementId) as HTMLElement;
    let parent = element?.parentNode as HTMLElement;
    element.classList.remove("show");
    parent.classList.remove("show");
    element.ontransitionend = function(){
        parent.remove();
    }

    let itemsLeft: HTMLElement | null = document.querySelector(".itemsLeft")
    if(activeItems && itemsLeft) itemsLeft.textContent = activeItems + " items left";
}

function destroySelected(todoArr: todo[]){
    todoArr.forEach(item => {
        if(item.status){
            destroyItem("task"+item.id);
        }
    })
}

export default render;
export {changeStyle, addItem, destroyItem, destroySelected, everyToggleSelected};
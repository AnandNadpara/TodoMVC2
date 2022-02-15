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
            let section = document.createElement("section");
            section.setAttribute("id","task"+item.id);
            
            let input = document.createElement("input");
            input.setAttribute("type","checkbox");
            input.checked = item.status;
            input.classList.add("toggle");
            section.appendChild(input);

            let p  = document.createElement("p");
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

            todoList?.appendChild(section);
        }
    })

    let selectAll = document.querySelector(".selectAll");
    if(selectAll)
    selectAll.innerHTML = todoArr.length ? "V" : "";    

    let container: HTMLElement | null = document.querySelector(".lowerContainer");
    if(container)
    container.style.display = todoArr.length ? "flex" : "none";

    let itemsLeft: HTMLElement | null = document.querySelector(".itemsLeft")
    if(itemsLeft)
    itemsLeft.textContent = items + " items left";


}

function changeStyle(id : string, items: number){
    let task : HTMLElement | null = document.querySelector("#"+id);
    if(task){
        task.querySelector("p")?.classList.toggle("lineThrough");
        let span = task.querySelector("span")
        if(span)
        span.textContent = span.textContent === "Active" ? "Completed" : "Active";
    }
    let itemsLeft = document.querySelector(".itemsLeft")
    if(itemsLeft)
    itemsLeft.textContent = items + " items left";
}

export default render;
export {changeStyle};
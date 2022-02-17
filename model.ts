interface todo{
    id: number,
    task: string,
    status: boolean,
}

class Todo{
    todoArr : todo[] = [];
    state: string;
    constructor(todoArr: todo[]){
        this.todoArr = todoArr;
        this.state = "All";
    }

    getTodo() : todo[]{
        return this.todoArr;
    }
    
    getState() : string {
        return this.state;
    }

    getLastId() : number{
        return this.todoArr.length ? this.todoArr[this.todoArr.length - 1].id + 1 : 1;
    }

    add(obj : todo) : void{
        this.todoArr.push(obj);
    }

    destroy(destroyID : number) : void{
        this.todoArr = this.todoArr.filter( item => item.id != destroyID)
    }

    filterState(state : string) : void{
        this.state = state;
    }

    changeState(toggleID : number) : void {
        this.todoArr = this.todoArr.map( item => {
            if(item.id == toggleID){
                item.status = !item.status;
            }
            return item;
        })
    }

    clearCompleted() : void {
        this.todoArr = this.todoArr.filter( item => item.status !== true)
    }

    selectAll() : void {
        let counter : number = this.todoArr.reduce((x, y) => x + (y.status ? 1 : 0), 0);
        let flag = true;
        if(counter == this.todoArr.length) flag = false;

        this.todoArr.forEach(item => {
            item.status = flag;
        })
    }

    searchInTodo(target: string | undefined) : string | undefined {
        let flag = '';
        if(!target) return flag;
        this.todoArr.map(item => {
            if(!flag && item.task.indexOf(target) === 0)
            flag = item.task;
        })
        return flag;
    }

    itemsActive() : number {
        return this.todoArr.filter( item => !item.status).length;
    }
}

export default Todo;
export {todo};
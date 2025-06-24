import './styles.css'

type Todo={
    id: string,
    name: string,
    completed: boolean,
}

const form = document.querySelector<HTMLFormElement>('#new-todo-form')!
const todoInput = document.querySelector<HTMLInputElement>('#todo-input')!
const list = document.querySelector<HTMLUListElement>('#list')!

let todos: Todo[] = loadTodos();
todos.forEach(renderNewTodo)

form.addEventListener('submit', e => {
    e.preventDefault()

    const todoName = todoInput.value
    if (todoName ===""){
        return
    }
    const newTodo ={
        id: crypto.randomUUID(),
        name: todoName,
        completed: false
    }
    todos.push(newTodo)
    renderNewTodo(newTodo)
    saveTodos()
    todoInput.value =""
})

function renderNewTodo (todo:Todo){
    const listItem = document.createElement('li')
    listItem.classList.add("list-item")
    const label = document.createElement('label')
    label.classList.add("list-item-label")

    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.checked = todo.completed
    checkbox.classList.add("label-input")
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked
        saveTodos()
    })

    const textEl = document.createElement('span')
    textEl.classList.add('label-text')
    textEl.innerText = todo.name

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete-btn')
    deleteBtn.innerHTML = "delete"
    deleteBtn.addEventListener("click", () => {
        listItem.remove()
        todos = todos.filter(t => t.id !== todo.id )
        saveTodos()
    })

    label.append(checkbox,textEl)
    listItem.append(label,deleteBtn)
    list.append(listItem)
}

function saveTodos() {
    localStorage.setItem('todos',JSON.stringify(todos))
}

function loadTodos(){
    const value = localStorage.getItem('todos')
    if (value == null) {
        return []
    }
    return JSON.parse(value) as Todo[]
}
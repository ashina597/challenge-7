interface Tasks{
    TaskTitle:string;
    TaskDescription:string;
    CompletionDate: string;
}

class Todo implements Tasks{
    constructor(
         public TaskTitle:string ,public TaskDescription:string, public CompletionDate:string){}
}
class completeTodo implements Tasks{
    constructor(
         public TaskTitle:string ,public TaskDescription:string, public CompletionDate:string){}
}


const Todos:Tasks[]=[]
const completeTodos: Tasks[]=[]

function create(){
   const create = document.querySelector(".createTask") as HTMLDivElement
    let title =document.getElementById("title") as HTMLInputElement
    let description =document.getElementById("description") as HTMLInputElement
    let date =document.getElementById("date") as HTMLInputElement
    if (!title.value|| !date.value|| !description.value){
        const warning = create.querySelector(".warning") as HTMLElement
        warning.style.display = 'block'
        setTimeout(()=>
        {
            warning.style.display='none'
        },3000)
    }else{
        const newtask = new Todo(title.value, description.value, date.value);
        Todos.push(newtask)
        let index = Todos.indexOf(newtask)
        console.log(index);
        rendertasks(title.value,description.value,date.value, index)
        title.value = ''
        description.value=''
        date.value=''

    }
}


function rendertasks(title:string, description:string, date:string, index:number){          
    const ul = document.querySelector('.ul') as HTMLUListElement
        const li = document.createElement("li")
        li.classList.add("li")
        li.id = index.toString()
        const task = document.createElement("div")
        task.classList.add("list")

        const headertext = document.createElement("h4")
        headertext.classList.add("headertext")
        headertext.textContent= title

        const task_description = document.createElement("p")
        task_description.classList.add('task_description')
        task_description.textContent= description

        const completion_date = document.createElement("p")
        completion_date.classList.add('completion_date')
        completion_date.textContent= "completion date: " + date

        const edit = document.createElement("button")
        edit.classList.add("edit")
        edit.textContent= "Edit"
        edit.addEventListener('click', ()=>{
                const create = document.querySelector('#myform') as HTMLDivElement
                create.style.display = 'none'
                const form = document.querySelector('#editform') as HTMLDivElement
                form.style.display = 'block'

                const edittitle = document.getElementById('edittitle') as HTMLInputElement
                edittitle.value= title
                const editdescription = document.getElementById('editdescription') as HTMLInputElement
                editdescription.value= description
                const editdate = document.getElementById('editdate') as HTMLInputElement
                editdate.value=  date
                const button = document.querySelector('.editbtn') as HTMLButtonElement
                button.value=index.toString()

        })

        const complete = document.createElement("button")
        complete.classList.add("complete")
        complete.textContent = "Complete"
        complete.addEventListener('click', ()=>{
            const newdate = new Date();
                const subdate = new Date(date)
                const diffdate = subdate.valueOf() - newdate.valueOf()
                let diffyear = Math.floor(diffdate / 31556952000);//years
                let diffmonths = Math.floor((diffdate % 31556952000)/ 2592000000)//months
                let diffDays = Math.floor(((diffdate % 31556952000)% 2592000000) / 86400000); // days
                let diffHrs = Math.floor((((diffdate % 31556952000)% 2592000000) % 86400000) / 3600000); // hours
                let diffMins = Math.round(((((diffdate % 31556952000)% 2592000000) % 86400000) % 3600000)/ 60000); // minutes
                let i
                if (diffdate >0){
                    i = 'earlier'
                }
                if (diffdate<0){
                    i = 'late'
                }
                let diff = diffDays+" days "+diffHrs+" hours "+diffMins+" mins " +i
                
           completetask(index,title,description, diff)
            
        })

        const deletebtn = document.createElement("button")
        deletebtn.classList.add("delete")
        deletebtn.textContent = "Delete"
        deletebtn.addEventListener('click', ()=>{
            deletetask(index)
        })

        task.appendChild(headertext)
        task.appendChild(task_description)
        task.appendChild(completion_date)
        task.appendChild(edit)
        task.appendChild(complete)
        task.appendChild(deletebtn)
        li.appendChild(task)
        ul.appendChild(li)
        

}

function updatetask(){
    const editform = document.querySelector('#editform') as HTMLDivElement
    const button = document.querySelector('.editbtn') as HTMLButtonElement
    const index = parseInt(button.value)
    const edittitle = document.getElementById('edittitle') as HTMLInputElement
    const editdescription = document.getElementById('editdescription') as HTMLInputElement
    const editdate = document.getElementById('editdate') as HTMLInputElement
    if (!edittitle.value || !editdescription.value || !editdate)
    {
        const warning = editform.querySelector(".warning") as HTMLElement
        warning.style.display = 'block'

        setTimeout(()=>{
            warning.style.display = 'none'
        }, 3000)
        return
    }
    Todos.splice(index,1,{TaskTitle:edittitle.value, TaskDescription:editdescription.value,CompletionDate:editdate.value})
    console.log(Todos);

    const list = document.getElementById(button.value) as HTMLElement
    const header = list.querySelector('.headertext') as HTMLHeadElement
    header.textContent = edittitle.value
    const description = list.querySelector('.task_description') as HTMLHeadElement
    description.textContent = editdescription.value   
    const date = list.querySelector('.completion_date') as HTMLHeadElement
    date.textContent = "completion date:" + editdate.value

    edittitle.value=''
    editdescription.value=''
    editdate.value=''

    const create = document.querySelector('#myform') as HTMLDivElement
    create.style.display='block'
    editform.style.display='none'
    
    
}

function completetask(index:number,title:string,description:string,date:string){
    const newdate = new Date()
    const todo = new completeTodo(title,description,date)
    completeTodos.push(todo)
    Todos.splice(index,1)
    const li = document.getElementById(index.toString()) as HTMLElement
    const ul = document.querySelector('.ul') as HTMLUListElement
     ul.removeChild(li)

     const completelist = document.querySelector('.ulcomplete') as HTMLUListElement
     const list = document.createElement('li')
     list.classList.add('li')
     list.id = index.toString()

     const task = document.createElement("div")
     task.classList.add("list")

     const headertext = document.createElement("h4")
     headertext.classList.add("headertext")
     headertext.textContent= title

     const task_description = document.createElement("p")
     task_description.textContent= description

     const completion_date = document.createElement("p")
     completion_date.textContent= 'submitted: '+date

     const deletebtn = document.createElement("button")
        deletebtn.classList.add("delete")
        deletebtn.textContent = "Delete"
        deletebtn.addEventListener('click', ()=>{
            Todos.splice(index,1)
            const ul = document.querySelector('.ulcomplete') as HTMLUListElement
            ul.removeChild(list)
        })

        task.appendChild(headertext)
        task.appendChild(task_description)
        task.appendChild(completion_date)
        task.appendChild(deletebtn)
        list.appendChild(task)
        completelist.appendChild(list)
     
}

function deletetask(index:number){
    Todos.splice(index,1)
    const li = document.getElementById(index.toString()) as HTMLElement
    const ul = document.querySelector('.ul') as HTMLUListElement
     ul.removeChild(li)
}


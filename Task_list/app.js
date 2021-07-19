//Define UI var
const form=document.querySelector('#task-form');
const taskList=document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks');
const filter=document.querySelector('#filter');
const taskInput=document.querySelector('#task');

//load all event listeners
loadEventListeners();

//load all event listeners
function loadEventListeners(){
  //DOM Load event
  document.addEventListener('DOMContentLoaded',getTasks)
  //add task event
  form.addEventListener('submit',addTask);
  //Remove task event
  taskList.addEventListener('click',removeTask);
  //clear task event
  clearBtn.addEventListener('click',clearTask);
  //filter task event
  filter.addEventListener('keyup',filtertask);
}

//Get tasks from LS
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks=[];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

 tasks.forEach(function(task){
   //create li element
  const li=document.createElement('li');
  // add class
  li.className='collection-item';
  //create textnode and append to li
  li.appendChild(document.createTextNode(task));
  //create a new link element
  const link=document.createElement('a');
  //Add Class
  link.className='delete-item secondary-content';
  //Add icon html
  link.innerHTML='<i class="far fa-times"></i>';
  //Append the link to li
  li.appendChild(link);

  //Append li to ul
  taskList.appendChild(li);
 });
}

//add task
function addTask(e){
 if(taskInput.value==''){
  alert('add a task');
}


 //create li element
const li=document.createElement('li');
// add class
li.className='collection-item';
//create textnode and append to li
li.appendChild(document.createTextNode(taskInput.value));
//create a new link element
const link=document.createElement('a');
//Add Class
link.className='delete-item secondary-content';
//Add icon html
link.innerHTML='<i class="far fa-times"></i>';
//Append the link to li
li.appendChild(link);

//Append li to ul
taskList.appendChild(li);

//store in Ls(local storage)
storeTaskInLocalStorage(taskInput.value);

//clear Input
taskInput.value='';



  e.preventDefault();
}

//store task in Ls
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks=[];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks',JSON.stringify(tasks));
}


//remove Task
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
    e.target.parentElement.parentElement.remove();

    //remove from LS
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
 }
}

//Remove from LS
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks=[];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task,index){
    if(taskItem.textContent === task){
      tasks.splice(index,1);
    }
  });

  localStorage.setItem('tasks',JSON.stringify(tasks));
}

//clearTask
function clearTask(){
  // taskList.innerHTML = '';
  
  // faster way
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  //clear from LS
  clearTaskFromLocalStorage();
}

//clear Task from Ls
function clearTaskFromLocalStorage(){
  localStorage.clear();
}

//filter task
function filtertask(e){
  const text =e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text)!=-1){
      task.style.display='block'
    }else{
      task.style.display='none'
    }
  });
}
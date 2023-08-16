
import { useEffect, useState } from "react";
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';

function Todo() {
const[isCompleteScreen, setIsCompleteScreen] = useState(false);
const [allTodos,setTodos] = useState([]);
const[newTitle, setNewTitle] = useState("");
const [newDescription,setNewDescription] = useState("");
const [completedTodos, setCompletedTodos] = useState([]);

function handleAddTodo(){
  let newTodoItem ={
    title: newTitle,
    description: newDescription,
  };

  let updatedTodoArr =[...allTodos];
  updatedTodoArr.push(newTodoItem);
  setTodos(updatedTodoArr);
  localStorage.setItem('todolist', JSON.stringify(updatedTodoArr))
};

function handleDeleteTodo (index){
    const reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  }
  
function handleComplete (index){
  let now = new Date ();
  let dd = now.getDate();
  let mm = now.getMonth() + 1;
  let yyyy = now.getFullYear();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();
  let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h +':' + m +':' + s;

  let filteredItem ={
    ...allTodos[index],
    completedOn:completedOn
  }

let updatedCompletedArr = [...completedTodos];
updatedCompletedArr.push(filteredItem);
setCompletedTodos(updatedCompletedArr);
handleDeleteTodo(index);
localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
};

function handleDeleteCompletedTodo (index){
  const reducedTodo = [...completedTodos];
  reducedTodo.splice(index, 1);
  localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
  setCompletedTodos(reducedTodo);
};

useEffect(() =>{
  let savedTodo = JSON.parse(localStorage.getItem('todolist'));
  let savedCompletedTodos = JSON.parse(localStorage.getItem('completedTodos'));
  if(savedTodo){
  setTodos(savedTodo);
}

   if(savedCompletedTodos){
   setCompletedTodos (savedCompletedTodos);
 }}, [])

  return (
    <div className="App">
      <h1>My Todos</h1>
<div className="todo">
<div className="todo-wrapper">

  <div className="todo-input">

<div className="todo-input-item">

<label>Title:</label>
<input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="what the task title?" />
</div>

<div className="todo-input-item">
<label>Description:</label>
<input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="what the task description?" />
</div>

<div className="todo-input-item">
<button onClick={handleAddTodo} className="btn">Add Todo</button>
</div>

</div>

<div className="btn-area">
<button className={`secondarybtn ${isCompleteScreen === false && 'active'}`} onClick={() => setIsCompleteScreen (false)}>Todo</button>
<button className={`secondarybtn ${isCompleteScreen === true && 'active'}`} onClick={() => setIsCompleteScreen (true)}>Completed</button>
</div>

<div className="todo-list">

{isCompleteScreen === false && allTodos.map((item,index) =>{

return(
<div className="todo-list-item"  key={index}>

  <div>
  <h3>{item.title}</h3>
  <p>{item.description}</p>
</div>

<div>
<AiOutlineDelete className="icon"  onClick={()=> handleDeleteTodo(index)} />
<BsCheckLg className="check-icon"  onClick={() => handleComplete(index)} />
</div>
</div>

)
 })}


{isCompleteScreen === true && completedTodos.map((item,index) =>{

return(
<div className="todo-list-item"  key={index}>

  <div>
  <h3>{item.title}</h3>
  <p>{item.description}</p>
  <p><small>Completed on : {item.completedOn}</small></p>
</div>

<div>
<AiOutlineDelete className="icon"  onClick={()=> handleDeleteCompletedTodo (index)} />
</div>
</div>

)
 })}
</div>
</div>
</div>
    </div>
  );
}

export default Todo;

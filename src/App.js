import Header from './components/Header'; 
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import {useState, useEffect} from 'react'


const App =() => 
{ 
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, seTasks ] = useState([])

    useEffect(() =>{
      const getTasks = async () =>{
        const tasksFromServer = await fetchTasks()
        seTasks(tasksFromServer)
      }
      getTasks()
    }, [])

    const fetchTasks = async () =>{
      const res = await fetch('http://localhost:5000/tasks')
      const data = await res.json()
      return data
    }


    const fetchTask = async (id) =>{
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      const data = await res.json()
      return data
    }


    const addTask = async (task) => {
      const res = await fetch('http://localhost:5000/tasks',{
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(task)
      })
      const data = await res.json()
      seTasks([...tasks, data])
      
      // const id  = Math.floor(Math.random() * 10000) + 1
      // const newTask = { id, ...task }
      // seTasks([...tasks, newTask])
    }
    

    const deleteTask = async (id)=> {
      await fetch(`http://localhost:5000/tasks/${id}`,{
        method:'DELETE'
      })

      seTasks(tasks.filter((task) => task.id !== id)) 
    }
     
    const toggleReminder = async (id)=>{
      const taskToToggle = await fetchTask(id)
      const upTask = {...taskToToggle,
      reminder: !taskToToggle.reminder}

      const res = await fetch(`http://localhost:5000/tasks/${id}`,{
        method:'PUT',
        headers:{
          'contant-type':'application/json'
        },
        body: JSON.stringify(upTask)
      })

      const data = await res.json()


      seTasks(
        tasks.map((task)=>
        task.id === id ? {...task, reminder:
          data.reminder}:task
          )
        )
      }  
 
  return (
    <div className="container">
     <Header onAdd={() => setShowAddTask(!showAddTask)}  />
     {showAddTask &&<AddTask onAdd={addTask} />}
    {
     tasks.length > 0 ? (<Tasks tasks={tasks} OnDelete={deleteTask} onToggle={toggleReminder} />)
     :
     <div className="if-no-tasks">nothing todo :)</div>
    }
    </div>
    
  )
  

}



export default App;

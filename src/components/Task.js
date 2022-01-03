import { BsX } from 'react-icons/bs'
const Task = ({task, OnDelete, onToggle}) => {
    return (
        <div className={`task ${task.reminder ? 'reminder':''}`} 
        onDoubleClick={()=>(onToggle(task.id))}>
            <h3>
                {task.text}
                 <BsX className='cross-icon'
                   onClick={()=> OnDelete(task.id)} />
            </h3>
            <p>{task.day}</p>
            
        </div>
    )
}
export default Task

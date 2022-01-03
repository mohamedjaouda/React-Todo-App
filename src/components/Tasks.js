import Task from'./Task'

const Tasks = ({tasks, OnDelete, onToggle}) => {
        
    return (
        <>
        {
        tasks.map((task, index)=>(
          
          <Task key={index}task={task} OnDelete={OnDelete} onToggle={onToggle} />))}
 
        </>
    )
}

export default Tasks
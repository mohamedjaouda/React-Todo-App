import Buttons from './Buttons'
const Header = ({onAdd}) => {
    return (
        <header className='header'>
        <h1>Task Tracker</h1>
        <Buttons onAdd={onAdd}/>
        </header>
    )
}


export default Header

//React
import React, {Component} from 'react'
import SortableListTodo from './sortableListTodo.js'
import SortableListCompleted from './sortableListCompleted.js'
import Header from './header.js'
import Footer from './footer.js'
import { arrayMove } from 'react-sortable-hoc'
    
class App extends Component {
  
    state = { 
        sortableTasks: 
            [
            {id: 1, label: "Rent a car"},
            {id: 2, label: "Eat lunch"},
            {id: 3, label: "Buy a horse"}
            ],
        sortableTasksCompleted:
            [
            {id: 1111, label: "Clean the house"},
            {id: 2222, label: "Do the dishes"},    
            ]   
    }

    render() {
        return (
          <div>
            <div className="container">
                <Header />
                <div className="row">
                    <div className="col-md-6">
                        <SortableListTodo   
                            sortableTasks={this.state.sortableTasks} 
                            onDelete={this.deleteTaskTodo} 
                            onReset={this.emptyListTodo}
                            onAddItem={this.addItem}
                            onDone={this.moveToCompletedList}
                            onSortEnd={this.onSortEndTodo}/> 
                    </div>
                    <div className="col-md-6">
                        <SortableListCompleted   
                            sortableTasksCompleted={this.state.sortableTasksCompleted} 
                            onDelete={this.deleteTaskCompleted} 
                            onReset={this.emptyListCompleted}
                            onAddItem={this.addItem}
                            onNotCompleted={this.moveToTodoList}
                            onSortEnd={this.onSortEndCompleted}/>
                    </div>
                </div>
            </div>
                              
            <Footer />    
          </div>
        );
    }

    moveToTodoList = (itemID) => {
        const sortableTasks = [...this.state.sortableTasks]
        const sortableTasksCompleted = [...this.state.sortableTasksCompleted]
        const updatedSortableTasksCompleted = sortableTasksCompleted.filter(item => item.id !== itemID)
        const movedTask = sortableTasksCompleted.filter(item => item.id === itemID)
        const updatedSortableTasks = sortableTasks.concat(movedTask)
 
        this.setState ({sortableTasksCompleted: [...updatedSortableTasksCompleted]})
        this.setState ({sortableTasks: [...updatedSortableTasks]})

        localStorage.setItem('sortableTasksCompleted', JSON.stringify(updatedSortableTasksCompleted))
        localStorage.setItem('sortableTasks', JSON.stringify(updatedSortableTasks))
    }

    moveToCompletedList = (itemID) => {
        //Delete task from Todo list
        const sortableTasks = [...this.state.sortableTasks]
        const completedTask = sortableTasks.filter(item => item.id === itemID) 
        const updatedSortableTasks = sortableTasks.filter(item => item.id !== itemID) 
        
        const sortableTasksCompleted = [...this.state.sortableTasksCompleted]
        const updatedSortableTasksCompleted = sortableTasksCompleted.concat(completedTask)    

        this.setState ({ sortableTasks: [...updatedSortableTasks]})
        this.setState ({ sortableTasksCompleted: [...updatedSortableTasksCompleted]})

        localStorage.setItem('sortableTasksCompleted', JSON.stringify(updatedSortableTasksCompleted))
        localStorage.setItem('sortableTasks', JSON.stringify(updatedSortableTasks))
    }

    onSortEndTodo = ({oldIndex, newIndex}) => {
        const sortableTasks = [...this.state.sortableTasks]
        const new_sortableTasks = arrayMove(sortableTasks, oldIndex, newIndex)
        this.setState({
            sortableTasks: [...new_sortableTasks]
        })
        localStorage.setItem("sortableTasks", JSON.stringify(new_sortableTasks))
    }

     onSortEndCompleted = ({oldIndex, newIndex}) => {
        const sortableTasksCompleted = [...this.state.sortableTasksCompleted]
        const new_sortableTasksCompleted = arrayMove(sortableTasksCompleted, oldIndex, newIndex)
        this.setState({
            sortableTasksCompleted: [...new_sortableTasksCompleted]
        })
        localStorage.setItem("sortableTasksCompleted", JSON.stringify(new_sortableTasksCompleted))
    }

    deleteTaskTodo = (itemID) => {
        const sortableTasks = [...this.state.sortableTasks]
        const updatedList = sortableTasks.filter(item => item.id !== itemID) 
        this.setState ({ sortableTasks: [...updatedList]})
        localStorage.setItem('sortableTasks', JSON.stringify(updatedList))
    }

    deleteTaskCompleted = (itemID) => {
        const sortableTasksCompleted = [...this.state.sortableTasksCompleted]
        const updatedList = sortableTasksCompleted.filter(item => item.id !== itemID) 
        this.setState ({ sortableTasksCompleted: [...updatedList]})
        localStorage.setItem('sortableTasksCompleted', JSON.stringify(updatedList))
    }

    emptyListTodo = () => { 
        const sortableTasks = [...this.state.sortableTasks]
        sortableTasks.length = 0
        this.setState({ sortableTasks })
        localStorage.setItem('sortableTasks', JSON.stringify(sortableTasks))
    }

    emptyListCompleted = () => { 
        const sortableTasksCompleted = [...this.state.sortableTasksCompleted]
        sortableTasksCompleted.length = 0
        this.setState({ sortableTasksCompleted })
        localStorage.setItem('sortableTasksCompleted', JSON.stringify(sortableTasksCompleted))
    }

    addItem = (event, value) => {    
        const sortableTasks = [...this.state.sortableTasks];
        const newItem = { id: Date.now(), label: value} 
        const updatedList = [...sortableTasks, newItem] 
        this.setState ({ sortableTasks: [...updatedList]})  
     
        localStorage.setItem('sortableTasks', JSON.stringify(updatedList))        
    }

    componentDidMount = () => {
        this.getStateFromLocalStorage()
    }

    getStateFromLocalStorage = () => {
        // for all items in state
        for (let key in this.state) {
            // if the key exists in localStorage
            if (localStorage.hasOwnProperty(key)) {
                // get the key's value from localStorage
                let value = localStorage.getItem(key)

                // parse the localStorage string and setState
                try {
                    value = JSON.parse(value);
                    this.setState({ [key]: value })
                } 
                catch (e) {
                    // handle empty string
                    this.setState({ [key]: value })
                }
            }
        }
    }

}

export default App


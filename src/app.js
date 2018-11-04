//React
import React, {Component} from 'react'
import MultiListContainer from './components/multiListContainer'
import Header from './components/header.js'
import Footer from './components/footer.js'
import { arrayMove } from 'react-sortable-hoc'

import { library } from '@fortawesome/fontawesome-svg-core'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCoffee } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash, faCoffee)

class App extends Component {
  
    state = {
        formValue: '',
        formInfo: '',
        multiList: [
            {id: 111, title: "Not started"},
            {id: 222, title: "In process"},
            {id: 333, title: "Done"},
        ],
        taskList: [
            {id: 101, title: "Task One", listID: 111},
            {id: 102, title: "Task Two", listID: 333},
            {id: 103, title: "Task Three", listID: 222},
            {id: 104, title: "Task Four", listID: 333},
        ],
    }

    /* Controlled form inputs */
    handleFormChange = (event) => {
        this.setState({formInfo: '' })
        this.setState({formValue: event.target.value})
    }

    /* react sortable hoc */
    onSortEnd = ({oldIndex, newIndex}) => {
        const taskList = [...this.state.taskList]
        const updatedTaskList = arrayMove(taskList, oldIndex, newIndex)
        this.setState({ taskList: [...updatedTaskList]})
        localStorage.setItem("taskList", JSON.stringify(updatedTaskList))
    }

    /* Other help-functions */
    getMultiList = (listID, taskID) => {
        const multiList = this.state.multiList.filter(item => item.id !== listID).map(item => <li key={item.id} onClick={() => this.moveTask(taskID, item.id)}>{item.title}</li>)
        return (
                <ul>{multiList}</ul>
        )
    }

    /* functions which handle taskList updates */
    moveTask = (taskID, MoveToListID) => {
        const taskList = [...this.state.taskList]
        const taskTitle = taskList.filter(item => item.id === taskID).map(item => item.title)
        const updatedTask = {id: taskID, title: taskTitle, listID: MoveToListID}
        const updatedTaskList = taskList.filter(item => item.id !== taskID).concat(updatedTask)
        this.setState({ taskList: [...updatedTaskList]})
        localStorage.setItem("taskList", JSON.stringify(updatedTaskList))
    }

    clearTaskList = listID => {
        const filteredTaskList = this.state.taskList.filter(item => item.listID !== listID)
        this.setState ({taskList: [...filteredTaskList]})
        localStorage.setItem("taskList", JSON.stringify(filteredTaskList))     
    }

    deleteTask = taskID => {
        const filteredTaskList = this.state.taskList.filter(item => item.id !== taskID)
        this.setState ({taskList: [...filteredTaskList]}) 
        localStorage.setItem("taskList", JSON.stringify(filteredTaskList))
    }

    addTask = (formValue, listID) => {
            const taskList = [...this.state.taskList]
            const newTask = {id: Date.now(), title: formValue, listID: listID}
            const updatedTaskList = [...taskList, newTask]
            this.setState({ taskList: [...updatedTaskList]})
            localStorage.setItem("taskList", JSON.stringify(updatedTaskList))
    }

    /* Functions which handle multiList updates */
    addList = (event) => {
        event.preventDefault()
        if (this.state.formValue !== "") {
            const thisMultiList = [...this.state.multiList]
            const newList = {id: Date.now(), title: this.state.formValue}
            const updatedMultiList = [...thisMultiList, newList] 
            this.setState ({ multiList: [...updatedMultiList]}) 
            this.setState ({formValue: ''})
            localStorage.setItem("multiList", JSON.stringify(updatedMultiList))
        }
        else
            this.setState({formInfo: 'Form can not be empty!' })
    }

    deleteMultiList = (listID) => {
        const multiList = [...this.state.multiList]
        const taskList = [...this.state.taskList]
        const filteredMultilist = multiList.filter(item => item.id !== listID)
        const filteredTaskList = taskList.filter(item => item.listID !== listID)
        this.setState ({multiList: filteredMultilist})
        this.setState ({taskList: filteredTaskList})
        localStorage.setItem("multiList", JSON.stringify(filteredMultilist))
        localStorage.setItem("taskList", JSON.stringify(filteredTaskList))   
    }

    render() {
        return (
          <div className="app-background">
                <div className="mb-4">
                                   
                    
                            <form>
                                <div className="border-dark border-bottom">
                                    <Header /> 
                                    <div className="row ml-2 mr-2 pb-4">
                                        <div className="col-md-3 mb-2">
                                            <input  type="text" 
                                                    value= {this.state.formValue}
                                                    onChange={this.handleFormChange}
                                                    className="form-control bg-white"/>
                                        </div> 
                                        <div className="col-md-2 mb-2">   
                                            <button onClick={this.addList} className="btn btn-block btn-outline-primary bg-white">Submit new list</button> 
                                        </div>
                                    </div> 
                                </div>   
                            </form>
                            <div className="m-2">{this.state.formInfo}</div>
                    
                </div>
                <div className="row m-2">
                        {<MultiListContainer    
                            multiList={this.state.multiList}
                            taskList={this.state.taskList}
                            getMultiList={this.getMultiList}
                            addTask={this.addTask}
                            deleteTask={this.deleteTask}
                            clearTaskList={this.clearTaskList}
                            onSortEnd={this.onSortEnd}
                            deleteMultiList={this.deleteMultiList}
                        />}
                </div>                             
            <Footer />    
          </div>
        )
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


import React, {Component} from 'react'
import Task from './task'
import { SortableContainer } from 'react-sortable-hoc'

const SortableListContainer = SortableContainer(props => {
        return (
            <div>
                {props.taskList.map ((item, index) =>  
                    <Task   key={item.id} 
                            index={index} 
                            taskID={item.id}
                            title={item.title}
                            deleteTask={props.deleteTask}
                            moveTask={props.moveTask}
                            taskList_listID={item.listID}
                            multiList_ListID={props.listID}
                            getMultiList={props.getMultiList}/>)}
            </div>
        )
    })
    
class MultiList extends Component {

    state = { 
        formValue: '', 
        formInfo: ''
    }

    handleFormChange = event => {
        this.setState({formValue: event.target.value})
        this.setState ({formInfo: ''})
    }

    handleAddTask = (event) => {
        event.preventDefault()
        if (this.state.formValue !== "") {
            this.props.addTask(this.state.formValue, this.props.listID)
            this.setState({formValue: ''})}
        else 
            this.setState({formInfo: 'Task can not be empty!' })
    }

    render() {
        return (
            <div>
                <div className="mb-4 p-2 border rounded bg-light">    
                    <div className="text-center mb-4 ">
                        <h2 className="">{this.props.listTitle}</h2>
                    </div>
                    <div>
                        <form>
                            <input  id="itemLabel"
                                    name="itemLabel"
                                    type="text"
                                    value= {this.state.formValue}
                                    onChange={this.handleFormChange}
                                    className="form-control mb-2"/>
                            <button onClick={this.handleAddTask} className="btn btn-block btn-outline-primary bg-white mb-2">Submit new task</button>
                            <div className="mt-2">{this.state.formInfo}</div>
                        </form>
                            <button onClick={() => this.props.clearTaskList(this.props.listID)} className="btn btn-block btn-outline-primary bg-white mb-2">
                                Clear list
                            </button>
                            <button onClick={() => this.props.deleteMultiList(this.props.listID)} className="btn btn-block btn-outline-primary bg-white mb-2">
                                Delete list
                            </button>
                        {<SortableListContainer 
                            pressDelay={100}
                            taskList={this.props.taskList}
                            listID={this.props.listID}
                            deleteTask={this.props.deleteTask}
                            moveTask={this.moveTask}
                            onSortEnd={this.props.onSortEnd}
                            getMultiList={this.props.getMultiList}/>}
                    </div>
                </div>
            </div>   
        ) 
    }
}

export default MultiList


import React, {Component} from 'react'
import { SortableContainer } from 'react-sortable-hoc'
import SortableTask from './sortableTask.js'
import Nav from './nav.js'

const SortableListTodoContainer = SortableContainer(props => {
  return (
        <div className="list-group rounded">
            {props.sortableTasks.map((item, index) => (
                <SortableTask 
                    key={item.id} 
                    label={item.label} 
                    id={item.id}
                    onDelete={props.onDelete}
                    onDone={props.onDone}
                    index={index}/>
            ))}
        </div>
    )
})

class SortableListTodo extends Component {

    handleClearButton = () => {
        return (
            this.props.sortableTasks.length > 0? 
                 <button style={{backgroundColor: "white"}} className="btn btn-block btn-outline-primary" 
                        onClick={this.props.onReset}>Empty list
                </button>:
                <span></span>
        )
    }

    render() {
        return (
            <div>
                <div className="m-4 p-4 border bg-light">    
                    <div className="text-center mb-4 "><h2 className="">Tasks to do</h2></div>
                    <div style={{height:"80px"}}>
                        <Nav    sortableTasks={this.props.sortableTasks}
                                onAddItem={this.props.onAddItem} 
                                onReset={this.props.onReset}/>
                    </div>
                    <div className="mb-4">{this.handleClearButton()}</div>
                    <div>
                        <SortableListTodoContainer   
                            onSortEnd={this.props.onSortEnd}
                            sortableTasks={this.props.sortableTasks}
                            onDelete={this.props.onDelete} 
                            onDone={this.props.onDone} />
                    </div>
                </div>
            </div>   
        ) 
    }

}

export default SortableListTodo


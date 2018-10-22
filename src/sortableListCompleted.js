import React, {Component} from 'react'
import { SortableContainer } from 'react-sortable-hoc'
import SortableTask from './sortableTask.js'


const SortableListCompletedContainer = SortableContainer(props => {
  return (
        <div className="list-group rounded">
            {props.sortableTasksCompleted.map((item, index) => (
                <SortableTask
                    key={item.id} 
                    label={item.label} 
                    id={item.id}
                    onDelete={props.onDelete}
                    onNotCompleted={props.onNotCompleted}
                    index={index}/>
            ))}
        </div>
    )
})

class SortableListCompleted extends Component {

    
    handleClearButton = () => {
        return (
            this.props.sortableTasksCompleted.length > 0? 
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
                    <div className="text-center mb-4"><h2 className="">Tasks completed</h2></div>
                    <div style={{height:"80px"}}></div>
                    <div className="mb-4">{this.    handleClearButton()}</div>
                    <div>
                        <SortableListCompletedContainer   
                            onSortEnd={this.props.onSortEnd}
                            sortableTasksCompleted={this.props.sortableTasksCompleted}
                            onDelete={this.props.onDelete} 
                            onNotCompleted={this.props.onNotCompleted} />
                    </div>
                </div>
            </div>   
        ) 
    }


}

export default SortableListCompleted


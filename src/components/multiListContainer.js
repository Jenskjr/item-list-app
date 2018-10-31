import React, {Component} from 'react'
import MultiList from './multiList'

class MultiListContainer extends Component {

    render() {
        return (
            this.props.multiList.map((item, index) => (
                <div key={item.id} className="col-md-3">
                    <MultiList 
                        id={item.id}
                        index={index}
                        listID={item.id}
                        listTitle={item.title}
                        getMultiList={this.props.getMultiList}
                        taskList={this.props.taskList}
                        addTask={this.props.addTask}
                        deleteTask={this.props.deleteTask}
                        clearTaskList={this.props.clearTaskList}
                        onSortEnd={this.props.onSortEnd}
                        deleteMultiList={this.props.deleteMultiList}
                    />
                </div>
            ))   
        )      
    }
}


export default MultiListContainer


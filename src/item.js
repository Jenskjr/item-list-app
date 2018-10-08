import React, { Component } from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';



class Item extends Component {

    styles = {  
        fontSize: 10, 
        fontWeight: "bold"
    }

    render() {
        return (
          //label label_count
               
          <div>   
             <span>
                <label className={this.getBadgeClasses()}>{this.formatCount()}</label>
            </span>
            <label className="badge m-2 w_2">{this.props.label}</label>
            <button className="btn btn-success btn-sm m-2" onClick=() => {handleDelete(this.props.handleIncrement)}> Increment</button>
            <button className="btn btn-danger btn-sm m-2" onClick={this.handleDelete}> Delete</button>
        </div>
        )
            
    }

    formatCount = () => {
        const count = this.props.count;
        return count === 0 ? "Zero": count;
    }

    handleIncrement = () => {
        const counterId = this.props.counterId
        this.props.increment (counterId) 
    }

    handleDelete = () => {
        const deleteID = this.props.id;
        this.props.delete (deleteID);
    }

    getBadgeClasses = () => {
        let classes = "w_1 badge m-2 ";
        classes += this.props.count === 0 ? "badge-warning": "badge-primary" 
        return classes; 
    }
}

export default Item;
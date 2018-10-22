import React from "react"
import { SortableElement } from "react-sortable-hoc"

const SortableTask = SortableElement(props => { 

    return (  
       <div style={{cursor: "pointer"}} className="list-group-item ">
            <div className="row">
                <div className="col-md-5 pt-2 pr-2">
                    <h5>{props.label}</h5>
                </div>
                <div className="col-md-7 text-right">  
                    {props.onNotCompleted !== undefined? 
                        <button className="btn border-warning mr-2" onClick={() => {props.onNotCompleted(props.id)}}> Move back</button>: <span></span>}
                    {props.onDone !== undefined?
                        <button className="btn border-success mr-2" onClick={() => {props.onDone(props.id)}}> Done</button>:<span></span>
                    }
                    <button className="btn border-danger" onClick={() => {props.onDelete(props.id)}}> Delete</button>
                </div>
            </div>
        </div>  
    )
})  

export default SortableTask
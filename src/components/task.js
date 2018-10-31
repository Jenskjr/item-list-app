import React from "react"
import { SortableElement } from "react-sortable-hoc"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Task = SortableElement(props => { 

    return (  
       props.multiList_ListID === props.taskList_listID ? 
           <div style={{cursor: "pointer"}} className="list-group-item ">
                <div className="row">
                    <div className="col-6 pt-2 pr-2">
                        <p>{props.title}</p>
                    </div>
                    <div className="col-6 align-content-right text-right d-inline">  
                        <span className="dropdown">
                            <button className="btn border-primary dropdown-toggle d-inline" type="button" data-toggle="dropdown">
                                <FontAwesomeIcon className="text-dark" icon="coffee" />
                            </button>
                            <ul className="dropdown-menu p-2">
                                <span className="text-bold">Move to:</span> 
                                {props.getMultiList(props.multiList_ListID, props.taskID)}
                            </ul>
                        </span>
                        <button onClick={() => props.deleteTask(props.taskID)} className="btn border-primary d-inline ml-1">
                            <FontAwesomeIcon className="text-danger" icon="trash" />
                        </button>
                    </div>
                </div>
            </div>:
            <span></span>  
    )
})

export default Task
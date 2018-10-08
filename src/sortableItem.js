import React from "react"
import { SortableElement } from "react-sortable-hoc"

const SortableItem = SortableElement(props => {
    return (  
       <div className="list-group-item ">
            <div className="d-flex justify-content-between align-items-stretch">
                <div className="custom-control custom-checkbox mb-3">
                    <input className="custom-control-input" type="checkbox" id="customCheck"></input>
                </div>
                <span className="m-2"><h5>{props.label}</h5></span> 
                <button className="btn btn-danger btn m-2" onClick={() => {handleDelete(props)}}> Delete</button>
            </div>
        </div>  
    )
})

const handleDelete = (props) => {
    props.onDelete(props.id) 

}

export default SortableItem
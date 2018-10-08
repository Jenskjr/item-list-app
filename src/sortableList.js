import React, {Component} from 'react'
import { SortableContainer } from 'react-sortable-hoc'
import SortableItem from './sortableItem.js'
import Nav from './nav.js'

const SortableListContainer = SortableContainer(props => {
  return (
        <div className="list-group rounded">
            {props.sortableItems.map((item, index) => (
                <SortableItem 
                    key={item.id} 
                    label={item.label} 
                    id={item.id}
                    onDelete={props.onDelete}
                    index={index}/>
            ))}
        </div>
    )
})

class SortableList extends Component {

    render() {
        return (
            <div className="container mt-4 p-4 border bg-light">
                {this.countItems()}
                <Nav    onAddItem={this.props.onAddItem} 
                        onReset={this.props.onReset}/>
                <div className="mt-4">
                    <SortableListContainer   
                        onSortEnd={this.props.onSortEnd}
                        sortableItems={this.props.sortableItems}
                        onDelete={this.props.onDelete} />
                </div>   
            </div>
        ) 
    }

    countItems = () => {
        const numItems = this.props.sortableItems.length
        return (
            numItems === 0? null: <label className="m-2"><h4>Number of items: {numItems} </h4></label>
            ) 
    }

}

export default SortableList


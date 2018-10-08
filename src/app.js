//React
import React, {Component} from 'react'
import SortableList from './sortableList.js'
import Header from './header.js'
import Footer from './footer.js'
import { arrayMove } from 'react-sortable-hoc'
    
class App extends Component {
  
    state = { 
        sortableItems: 
            [
            {id: 1, label: "Banan"},
            {id: 2, label: "Æble"},
            {id: 3, label: "Pære"},
            {id: 4, label: "Melon"},
            {id: 5, label: "Agurk"},
            {id: 6, label: "Jordbær"}
            ]   
    }

    render() {
        return (
          <div>
            <Header />
            <SortableList   sortableItems={this.state.sortableItems} 
                            onDelete={this.deleteItem} 
                            onReset={this.emptyList}
                            onAddItem={this.addItem}
                            onSortEnd={this.onSortEnd}/> 
            <Footer />    
          </div>
        );
    }
  
    onSortEnd = ({oldIndex, newIndex}) => {
        const old_sortableItems = [...this.state.sortableItems]
        const new_sortableItems = arrayMove(old_sortableItems, oldIndex, newIndex)
        this.setState({
            sortableItems: [...new_sortableItems]
        })
        localStorage.setItem("sortableItems", JSON.stringify(new_sortableItems));
    }

    deleteItem = (itemID) => {
        const sortableItems = [...this.state.sortableItems]
        const updatedList = sortableItems.filter(item => item.id !== itemID) 
        this.setState ({ sortableItems: [...updatedList]})
        localStorage.setItem('sortableItems', JSON.stringify(updatedList))
    }

    emptyList = () => { 
        const sortableItems = [...this.state.sortableItems]
        sortableItems.length = 0
        this.setState({ sortableItems })
        localStorage.setItem('sortableItems', JSON.stringify(sortableItems))
    }

    addItem = (event) => {
        event.preventDefault();
      
        const data = new FormData(event.target);
      
        if (data.get("itemLabel") === "") {
            alert ("Items can not be empty!") 
        }
        else {
            const sortableItems = [...this.state.sortableItems];
            const newItem = { id: Date.now(), 
                              label: data.get("itemLabel"), 
                              count: 1
                            } 
            const updatedList = [...sortableItems, newItem] 
            this.setState ({ sortableItems: [...updatedList]})  
            
            document.getElementById("itemLabel").value = ""
         
            localStorage.setItem('sortableItems', JSON.stringify(updatedList))
        } 
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


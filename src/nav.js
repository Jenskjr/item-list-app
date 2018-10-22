import React, { Component } from 'react';

class Nav extends Component {
    
    state = {
      value: '', 
      formInfo: ''
    }
    
    handleChange = (event) => {
        this.setState({value: event.target.value})
        this.setState ({formInfo: ''})
    }

    handleSubmit = (event) => {
        event.preventDefault()

        if (this.state.value !== "") {
            this.props.onAddItem(event, this.state.value)
            this.setState({ value: ''})
        }
        else {
            this.setState({formInfo: 'Task can not be empty!' })
        }
    }

    render() {
        return (
          	<div>    
            	<form onSubmit={this.handleSubmit}> 
                	<div className="row"> 
                    	<div className="col-md-8">
                        	<input 	className="form-control" id="itemLabel"
    	                            name="itemLabel"
    	                            type="text"
                                    value= {this.state.value}
                                    onChange={this.handleChange}/>
                    	</div> 
                    	<div className="col-md-4">
                        	<input style={{backgroundColor: "white"}} className="btn btn-block btn-outline-primary" 
                                	type="submit" 
                                	value="Add task" />    
                    	</div>
                	</div>   
            	   <div className="mt-2">{this.state.formInfo}</div>
                </form>
                
        	</div>
        );
    }
     
             

}



export default Nav;
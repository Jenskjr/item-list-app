import React, { Component } from 'react';

class Nav extends Component {
  
  render() {
    return (
      	<div>    
        	<form className="mt-4" onSubmit={this.props.onAddItem}> 
            	<div className="row"> 
                	<div className="col-md-8">
                    	<input 	className="form-control" id="itemLabel"
	                            name="itemLabel"
	                            type="text"
	                            placeholder="skriv ny opgave"/>
                	</div> 
                	<div className="col-md-4">
                    	<input style={{backgroundColor: "white"}} className="btn btn-block btn-outline-primary" 
                            	type="submit" 
                            	value="Add item" />    
                	</div>
            	</div>   
        	</form>
        	<button style={{backgroundColor: "white"}} className="mt-4 btn btn-block btn-outline-primary" 
                	onClick={this.props.onReset}>Empty list
        	</button>
    	</div>
    );
  }
}

export default Nav;
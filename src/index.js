//React 
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'


const AppComponents = () => {
  return (
    <div>
      	<App/>		
    </div>
  )  
}

ReactDOM.render(<AppComponents />, document.getElementById('root'))




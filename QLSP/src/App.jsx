import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const Home = () => (
  <div>
    <h1>Home Component</h1>
  </div>
)

const About = () => (
  <div>
    <h1>About Component</h1>
  </div>
)

ReactDOM.render(
  <Router>
      <div>
            <Route path='/' component={Home} />
            <Route path='/about' component={About} />
      </div>
  </Router>,
  document.getElementById('app')
)
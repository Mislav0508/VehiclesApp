import React from "react"
import "./index.css"
import {VehicleList} from "./components/VehicleList"
import {Details} from "./components/Details"
import {useObserver} from "mobx-react"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

function App() {

  return useObserver(() => (
    (
      <Router>
        <Switch>
          <Route exact path="/">
            <VehicleList /> 
          </Route>
          <Route path="/:id" children={<Details />}></Route>

        </Switch>

      </Router>
  

    )
  ))
}

export default App;

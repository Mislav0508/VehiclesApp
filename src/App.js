import React from "react"
import "./index.css"
import {VehicleList} from "./components/VehicleList"
import {useObserver} from "mobx-react"


function App() {

  return useObserver(() => (
    (
      <section className="main-section">
        <VehicleList /> 
  
      </section>
    )
  ))
}

export default App;

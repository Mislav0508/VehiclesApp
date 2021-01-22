import React from 'react'
import {Link} from "react-router-dom"
import Button from 'react-bootstrap/Button'
import {useObserver} from "mobx-react"


export const VehicleCard = ({id,make,model,year}) => {

  return useObserver(()=> (
    (
      <div className="grid-item" key={id}>
        <h3>{make}</h3>      
        <h4>Model: {model}</h4>
        <h4>Year: {year}</h4>
        <div className="details-div">
          <Link to={`/${id}`}>
            <Button>Details</Button>
          </Link>
        </div>
      </div>
    )
  ))
}

import React from 'react'
import {Link} from "react-router-dom"

export const VehicleCard = ({id,make,model,year}) => {
  return (
    <div className="grid-item" key={id}>
      <h3>{make}</h3>      
      <h4>Model: {model}</h4>
      <h4>Year: {year}</h4>
      <Link to={`/${id}`}>Details</Link>
    </div>
  )
}

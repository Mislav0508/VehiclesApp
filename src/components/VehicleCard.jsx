import React from 'react'

export const VehicleCard = ({id,make,model,year,color}) => {
  return (
    <div className="grid-item" key={id}>
      <h3>{make}</h3>      
      <h4>Model: {model}</h4>
      <h4>Year: {year}</h4>
      <h4>Color: {color}</h4>
      <h5>ID: {id}</h5>
    </div>
  )
}

import React, {useState, useEffect} from 'react'
import {useParams, Link} from "react-router-dom"
import {useStore} from "../common/Store"
import { toJS } from 'mobx';

export const Details = () => {
  const store = useStore()
  const [vehicle, setVehicle] = useState("default vehicle")
  const SOURCELIST = toJS(store.mockData)
  const {id} = useParams()
  const result = SOURCELIST.filter((vehicle) => {
    if(vehicle.id === id){
      return vehicle.id
    }else{
      return null
    }
  })
  useEffect(() => {    
    setVehicle(result[0])
  },[])
  return (
    <div className="main-section">
      <h1>Details</h1>
      <h2>{vehicle.make}</h2>
      <h3>{vehicle.model}</h3>
      <h3>Color:{vehicle.color}</h3>
      <h3>ID: {vehicle.id}</h3>
      
      <Link to="/">Back to list</Link>

    </div>
  )
}

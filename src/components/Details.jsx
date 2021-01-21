import React, {useState, useEffect} from 'react'
import {useObserver} from "mobx-react"
import {useParams, Link} from "react-router-dom"
import {useStore} from "../common/Store"
import { toJS } from 'mobx';
import stc from "string-to-color"
import {FaCar} from "react-icons/fa"
import Button from 'react-bootstrap/Button'
import "./Details.css"

export const Details = () => {
  const store = useStore()
  const SOURCELIST = toJS(store.mockData)

  const [vehicle, setVehicle] = useState("default vehicle")
  const [editedSOURCELIST, setEDITEDSOURCELIST] = useState(SOURCELIST)

  const[edit, setEdit] = useState(false)
  const[inputTerm, setInputTerm] = useState("")

  const {id} = useParams()
  const {loading} = store.useVehicleList()

  const result = SOURCELIST.filter((vehicle) => {
    if(vehicle.id === id){
      return vehicle.id
    }else{
      return null
    }
  })
  
  // ---- COLORS ------
  const currentColor = vehicle.color
  const color = stc(currentColor)  

  // ---- IMAGES  ------
  const logos = toJS(store.carLogos)
  const image = logos.filter((item) => {
    if(vehicle.make === item.name){
      return item.url
    }
    return ""
  })

  useEffect(() => {    
    setVehicle(result[0])        
  },[])

  // ---- EDIT AND SAVE ------

  const handleSave = () => {
    setEdit(false)
    if(inputTerm){
      setInputTerm({...vehicle, color: inputTerm}) //new edited object
      const index = SOURCELIST.findIndex((item) => item.id === id) //index based on useParams id
      SOURCELIST[index] = {...SOURCELIST[index], color: inputTerm} //edited SOURCELIST
      setEDITEDSOURCELIST(SOURCELIST)      
    }
    setInputTerm("")
    setVehicle({...vehicle, color: inputTerm})     
  }

  useEffect(()=> {
    store.editVehicleList(editedSOURCELIST) // Invoking the function from the store 
  },[edit,editedSOURCELIST,store])

  return useObserver(()=>(
    (
      <div className="main-section">
        {loading ? "Loading" : <div className="title-container">
          <h1>Details</h1>
          <div className="underline"></div><br/>
          <img src={image[0].url} alt="vehicle img"/>
          <h2>{vehicle.make}</h2>
          <h3>Model: {vehicle.model}</h3>
          {edit ? 
          <input type="text" 
          placeholder="Please type in your desired color"
          value={inputTerm}
          onChange={e => setInputTerm(e.target.value)}
          /> : <h3>Color: {vehicle.color}</h3> }
          <FaCar style={{color: color}} className="car-icon" />
          <h3>ID: {vehicle.id}</h3>
          <Link to="/">
            <Button className="btn">
            Back to list
            </Button>
          </Link>
          {!edit ? <Button onClick={()=>setEdit(true)}>Edit color</Button>
           : 
           <Button variant="danger"
           onClick={handleSave}
           >Save</Button>}
  
        </div> }  
      </div>
    )
  ))
}

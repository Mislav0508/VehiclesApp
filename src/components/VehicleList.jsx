import {useEffect, useState} from "react"
import {useObserver} from "mobx-react"
import {VehicleCard} from "./VehicleCard"
import {GrPrevious, GrNext} from "react-icons/gr"
import "./VehicleList.css"
import {useStore} from "../common/Store"
import { toJS } from 'mobx';
import Button from 'react-bootstrap/Button'

export const VehicleList = () => { 
  const store = useStore() 
  const {loading, data} = store.useVehicleList()
  const [page, setPage] = useState(0)
  const [vehicleCards, setVehicleCards] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const SOURCELIST = toJS(store.mockData)
  const [source,setSource] = useState(SOURCELIST)

  useEffect(() => {
    if(loading) return
    setVehicleCards(data[page])
  },[loading, page, vehicleCards, data])

  const changePage = (index) => {
    setPage(index)
  }
  const prevPage = () => {
    if(page > 0){
      setPage(page - 1)
    }  
  }
  const nextPage = () => {
    if(page < vehicleCards.length - 1){
      setPage(page + 1)
    }else{
      setPage(0)
    }    
  }  
    // --------- SORTING ------------------

    const sortByName = () => {
      const sorted = SOURCELIST.sort((el1,el2) => {
       return (el1.make > el2.make) ? 1 : -1
      })
      setSource(sorted)
    }
    const sortByYearNewest = () => {
      const sorted = SOURCELIST.sort((el1,el2) => {
        return (el1.year > el2.year) ? -1 : 1
      })
      setSource(sorted)
    }
    const sortByYearOldest = () => {
      const sorted = SOURCELIST.sort((el1,el2) => {
        return (el1.year > el2.year) ? 1 : -1
      })
      setSource(sorted)
    }

  return useObserver(() => (
    (
      <section className="main-section">
        <div className="title-container">
          <h1>{loading ? "Loading..." : "Vehicles"}</h1>
          <div className="underline"></div>

          {/* ---- FILTER INPUT ---- */}

          <div className="filter-container">
            <input type="text" placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}/> 
          
          {/* ---- SORTING  ---- */}
          
            {searchTerm && <div className="filter-container">
              <Button className="btn" onClick={sortByName}>Sort by Name</Button>
              <Button className="btn" onClick={sortByYearNewest}>Sort by Year (Newest)</Button>
              <Button className="btn" onClick={sortByYearOldest}>Sort by Year (Oldest)</Button>
            </div>
            }
          </div>

        </div>

        {/* ------ PAGING ------ */}

        {!searchTerm ? (
          <div className="grid">
            {vehicleCards.map((vehicle) => {
              return <VehicleCard key={vehicle.id} {...vehicle}/>
            })}                        
          </div>                                 
        ) : (
          null
        )}

        {/* ------- BUTTONS --------- */}

        {!searchTerm && !loading ? ( <div className="buttons-container">
          <GrPrevious onClick={prevPage} className=".button-icon" />
          {data.map((item, index) => {
            return <Button 
            className={index === page ? "btn active" : "btn" }
            key={index} 
            onClick={()=> changePage(index)}>{index + 1}</Button>
          })}
          <GrNext onClick={nextPage} className=".button-icon"/>
        </div>) : null}

        {/* ------ FILTERING OUTPUT ------ */}

          {searchTerm && !loading ? <div className="grid">          
            {source.filter((value) => {
              if(value.make.toLowerCase().includes(searchTerm.toLowerCase()) || 
              value.model.toLowerCase().includes(searchTerm.toLowerCase()) || 
              value.color.toLowerCase().includes(searchTerm.toLowerCase())){
                return value
              }
              return null
            }).map((value, index) => {
              return <VehicleCard key={index} {...value}/>
            })}            
          </div>
           : null }
      </section>
    )
  ))  
}



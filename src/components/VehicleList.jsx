import {useEffect, useState} from "react"
import {useObserver} from "mobx-react"
import {VehicleCard} from "./VehicleCard"
import {GrPrevious, GrNext} from "react-icons/gr"
import "./VehicleList.css"
import {useVehicleList} from "./useVehicleList"
import {useStore} from "../common/Store"
import { toJS } from 'mobx';


export const VehicleList = () => { 
  const {loading, data} = useVehicleList()
  const [page, setPage] = useState(0)
  const [vehicleCards, setVehicleCards] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const store = useStore() 
  const SOURCELIST = toJS(store.mockData)
  const [source,setSource] = useState(SOURCELIST)

  useEffect(() => {
    if(loading) return
    setVehicleCards(data[page])
    console.log(data)
  },[loading, page, vehicleCards])
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
      <section>
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
              <button className="btn-filter" onClick={sortByName}>Sort by Name</button>
              <button className="btn-filter" onClick={sortByYearNewest}>Sort by Year (Newest)</button>
              <button className="btn-filter" onClick={sortByYearOldest}>Sort by Year (Oldest)</button>
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
            <h1>Page {page + 1}/{data.length}</h1>            
          </div>                       
        ) : (
          null
        )}
        {!searchTerm && !loading ? ( <div className="buttons-container">
          <GrPrevious onClick={prevPage} className=".button-icon" />
          {data.map((item, index) => {
            return <button 
            className={index === page ? "btn active" : "btn" }
            key={index} 
            onClick={()=> changePage(index)}>{index + 1}</button>
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
            }).map((value, index) => {
              return <VehicleCard key={index} {...value}/>
            })}            
          </div>
           : null }
      </section>
    )
  ))  
}



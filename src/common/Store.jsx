import React, {useContext, useState, useEffect} from "react"
import {useLocalObservable} from "mobx-react"
import data from "../api/MOCK_DATA.json"
import {arrayOfArrays} from '../common/utils'
import { toJS } from 'mobx';


const StoreContext = React.createContext()

export const StoreProvider = ({children}) => {
  const store = useLocalObservable(() => ({
    mockData: data,
    useVehicleList: () => {  
      const [loading, setLoading] = useState(true)
      const [data, setData] = useState([])
    
      const store = useStore() 
      const mockup = toJS(store.mockData)
    
      useEffect(() => {
        setData(arrayOfArrays(mockup))
        setLoading(false)
      }, [])
      return { loading, data }
    }
  }))
  return <StoreContext.Provider value={store}>
    {children}
  </StoreContext.Provider>
}

export const useStore = () => useContext(StoreContext)



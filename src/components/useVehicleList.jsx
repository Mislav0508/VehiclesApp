import { useState, useEffect } from 'react'
import {useStore} from "../common/Store"
import {arrayOfArrays} from '../common/utils'
import { toJS } from 'mobx';

export const useVehicleList = () => {  
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
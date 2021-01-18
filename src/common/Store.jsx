import React, {useContext} from "react"
import {useLocalObservable} from "mobx-react"
import data from "../api/MOCK_DATA.json"


const StoreContext = React.createContext()

export const StoreProvider = ({children}) => {
  const store = useLocalObservable(() => ({
    mockData: data
  }))
  return <StoreContext.Provider value={store}>
    {children}
  </StoreContext.Provider>
}

export const useStore = () => useContext(StoreContext)



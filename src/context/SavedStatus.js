import {useState, createContext } from 'react'
//importing the required modules
export const SavedStatus = createContext()
// creates the context that will be used in the component file
export const SavedStatusProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
//state value that will be called in the components
    return <SavedStatus.Provider value={[isLoggedIn, setIsLoggedIn]}><>{props.children}</>
</SavedStatus.Provider>
}


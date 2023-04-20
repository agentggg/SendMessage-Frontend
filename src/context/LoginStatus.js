import {useState, createContext } from 'react'
//importing the required modules
export const LoginStatus = createContext()
// creates the context that will be used in the component file
export const LoginStatusProvider = (props) => {
    const [isSignedIn, setIsSignedIn] = useState(false)
//state value that will be called in the components
    return <LoginStatus.Provider value={[isSignedIn, setIsSignedIn]}><>{props.children}</>
</LoginStatus.Provider>
}


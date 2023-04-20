import {useState, createContext } from 'react'

export const UserContext = createContext()

export const UserProvider = (props) => {
    const [profileUsername, setProfileUsername] = useState("username")
    const [profileToken, setProfileToken] = useState("password")
    return <UserContext.Provider value={{profileUsername, setProfileUsername, profileToken, setProfileToken}}> {props.children} </UserContext.Provider>
}
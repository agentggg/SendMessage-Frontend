import {useState, createContext } from 'react'

export const GetContactInfoContext = createContext()

export const GetContactInfoProvider = (props) => {
    const [contactInfo, setContactInfo] = useState()
    return <GetContactInfoContext.Provider value={[contactInfo, setContactInfo]}> {props.children} </GetContactInfoContext.Provider>
}
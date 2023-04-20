import {useState, createContext } from 'react'

export const SelectedContext = createContext()

export const SelectedProvider  = (props) =>{
    const [selectedOptions, setSelctedOptions] = useState("No value selected")
    return <SelectedContext.Provider value={{selectedOptions, setSelctedOptions}}> {props.children} </SelectedContext.Provider>
}
//now we use the prvider in app.js
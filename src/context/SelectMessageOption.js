import {useState, createContext } from 'react'

export const SelectMessageOptionContext = createContext()

export const SelectMessageOptionProvider = (props) => {
    const [selectOption, setSelectOption] = useState('')
    return <SelectMessageOptionContext.Provider value={[selectOption, setSelectOption]}>{props.children}</SelectMessageOptionContext.Provider>
}
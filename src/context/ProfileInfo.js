import {useState, createContext } from 'react'
//importing the required modules
export const ProfileInfo = createContext()
// creates the context that will be used in the component file
export const ProfileInfoProvider = (props) => {
    const [profileInfo, setProfileInfo] = useState({})
//state value that will be called in the components
    return <ProfileInfo.Provider value={[profileInfo, setProfileInfo]}><>{props.children}</>
</ProfileInfo.Provider>
}


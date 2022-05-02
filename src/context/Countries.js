import React, {createContext, useState} from 'react'
export const CountryContext = createContext()

function CountryContextProvider (props){
    const [contries, setCountries] = useState(null)
    const data = [contries, setCountries]
    return (
        <CountryContext.Provider value={data}>
            {props.children}
        </CountryContext.Provider>
    )
}

export default CountryContextProvider

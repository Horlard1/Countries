import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCountries } from '../api/api'
import { CountryContext } from '../context/Countries'

function Home({isDark}) {
    

    //Context Consumer
    const [countries, setCountries] = useContext(CountryContext)

    // Filtering and Selecting
    const [filteredCountries, setFilteredCountries] = useState([])
    const [region, setRegion] = useState([])

    // Controlled Inputs
    const [regionArea, setRegionArea] = useState('')
    const [countryName, setCountryName] = useState('')

    //Network
    const [isError, setIsError] = useState(false)
    
    useEffect(()=>{
        async function getDatas(){
            await getCountries((data)=>{
                if(typeof data === 'object' && data instanceof Array ){
                    return setCountries(data)
                }
                return setIsError(true)
            })
        }
        getDatas()
    }, [])

    useEffect(()=>{
        if(countryName){
            const pattern = new RegExp(`${countryName}`, 'i');
            if(region.length > 0) return setFilteredCountries(region.filter(country => country.name.match(pattern)))
            const filtered = countries.filter(country => country.name.match(pattern))
            return setFilteredCountries(filtered)
        }
        else{
            setFilteredCountries([])
        }
    }, [countryName, region])

    useEffect(()=>{
        if(regionArea){
            const regions = countries.filter(country=> country.region === regionArea)
            setRegion(regions)
        }
        else{
            setRegion([])
        }
    }, [regionArea])

  return (
    <div className='mt-10'>
        <div className=' mt-5 w-5/6 mx-auto '>
            <div className='mb-10 flex lg:flex-row md:flex-row sm:flex-col justify-between'>
                <input className={`w-2/5  py-2 outline-0 px-5 rounded ${isDark ? "header-dark" :""}`} onChange={(e)=> setCountryName(e.target.value)} placeholder='Search for a country...' />
                <select className={`lg:w-1/6 md:w-1/5 sm:w-1/4 sm:mt-5 outline-0 py-2 px-5 rounded ${isDark ? "header-dark" :""}`} value={regionArea} onChange={(e)=> setRegionArea(e.target.value)} placeholder='Filter by Region'>
                    <option value="">Filter by Region</option>
                    <option>Africa</option>
                    <option>Americas</option>
                    <option>Asia</option>
                    <option>Europe</option>
                    <option>Oceania</option>
                </select>
            </div>
            <div className='mt-4 grid md:grid-cols-3 sm:grid-cols-1 lg:grid-cols-4 gap-10'>
                {
                    isError ? <div className='error'>
                        Error Ocured
                    </div>
                    :
                    <> 
                        {
                            !filteredCountries.length > 0 && region.length > 0 && !countryName &&  regionArea && region.map((country, index)=>(
                                <Link to={`/${country.name.trim()}`} key={index} className="w-full bordered flex flex-col overflow-hidden shadow rounded cursor-pointer">
                                    <img src={country.flag} alt="flag" style={{width: "100%", height: "150px", objectFit: "cover"}} />
                                    <div className={`w-full px-5 py-6 bg-white flex-1 ${isDark ? "header-dark" :""}`}>
                                        <h2 className='text-lg font-bold mb-5'>
                                            {country.name}
                                        </h2>
                                        <span className='flex items-center mb-2'><h2 className='text-base font-normal'>Population:</h2><p className='ml-3 font-light'>{country.population}</p></span>
                                        <span className='flex items-center mb-2'><h2 className='text-base font-normal'>Region:</h2><p className='ml-3 font-light'>{country.region}</p></span>
                                        <span className='flex items-center mb-2'><h2 className='text-base font-normal'>Capital:</h2><p className='ml-3 font-light'>{country.capital}</p></span>
                                    </div>
                                </Link>
                            ))
                        }
                        {
                            !filteredCountries.length > 0 && countryName && region.length > 0 && regionArea && <div className='text-2xl h-full flex items-center justify-center font-bold'><h1 className='text-2xl font-bold'>No Country Found</h1></div>
                        }
                        {
                            filteredCountries.length > 0 && filteredCountries.map((country, index)=>(
                                <Link to={`/${country.name.trim()}`} key={index} className="w-full bordered flex flex-col overflow-hidden shadow rounded cursor-pointer">
                                    <img src={country.flag} alt="flag" style={{width: "100%", height: "150px", objectFit: "cover"}} />
                                    <div className={`w-full px-5 py-6 bg-white flex-1 ${isDark ? "header-dark" :""}`}>
                                        <h2 className='text-lg font-bold mb-5'>
                                            {country.name}
                                        </h2>
                                        <span className='flex items-center mb-2'><h2 className='text-base font-normal'>Population:</h2><p className='ml-3 font-light'>{country.population}</p></span>
                                        <span className='flex items-center mb-2'><h2 className='text-base font-normal'>Region:</h2><p className='ml-3 font-light'>{country.region}</p></span>
                                        <span className='flex items-center mb-2'><h2 className='text-base font-normal'>Capital:</h2><p className='ml-3 font-light'>{country.capital}</p></span>
                                    </div>
                                </Link>
                            ))}
                            
                            {
                            !region.length > 0 && !filteredCountries.length > 0 && !regionArea && !countryName && countries && countries.map((country, index)=>(
                                <Link to={`/${country.name.trim()}`} key={index} className="w-full bordered flex flex-col overflow-hidden shadow rounded cursor-pointer">
                                    <img src={country.flag} alt="flag" style={{width: "100%", height: "150px", objectFit: "cover"}} />
                                    <div className={`w-full px-5 py-6 bg-white flex-1 ${isDark ? "header-dark" :""}`}>
                                        <h2 className='text-lg font-bold mb-5'>
                                            {country.name}
                                        </h2>
                                        <span className='flex items-center mb-2'><h2 className='text-base font-normal'>Population:</h2><p className='ml-3 font-light'>{country.population}</p></span>
                                        <span className='flex items-center mb-2'><h2 className='text-base font-normal'>Region:</h2><p className='ml-3 font-light'>{country.region}</p></span>
                                        <span className='flex items-center mb-2'><h2 className='text-base font-normal'>Capital:</h2><p className='ml-3 font-light'>{country.capital}</p></span>
                                    </div>
                                </Link>
                            ))
                        }
                        {
                            !regionArea && !region.length > 0 && !filteredCountries.length > 0 && countryName && countries && <div className='text-2xl h-full flex items-center justify-center font-bold'><h1 className='text-2xl font-bold'>No Country Found</h1></div>
                        }
                    </>
                }
            </div>
        </div>
    </div>
  )
}

export default Home
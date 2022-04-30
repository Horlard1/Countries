import React, { useEffect, useState } from 'react'
import Header from '../components/Header'

function Home() {
    const [countries, setCountries] = useState(null)
    
    useEffect(()=>{
        const getCountries = async ()=>{
            try {
                const response = await fetch("https://restcountries.com/v2/all")
                const data = await response.json()
                setCountries(data)
            } catch (error) {
                console.log('Error Occured', error)
            }
        }
        getCountries()
    }, [])
  return (
    <div className='bg-gray-200'>
        <Header />
        <div className='container mt-5 w-4/5 mx-auto '>
            <div className='flex justify-between'>
                <input placeholder='Search for a country...' />
                <select placeholder='Filter by Region'>
                    <option>Africa</option>
                    <option>America</option>
                    <option>Asia</option>
                    <option>Europe</option>
                    <option>Oceania</option>
                </select>
            </div>
            <div className='mt-4 grid grid-cols-4 gap-10'>
                {
                    countries && countries.map((country, index)=>(
                        <div key={index} className="w-full bordered overflow-hidden shadow rounded">
                            <img src={country.flag} alt="flag" style={{width: "100%", height: "150px", objectFit: "cover"}} />
                            <div className='w-full px-5 py-6 bg-white'>
                                <h2 className='text-base font-bold mb-3'>
                                    {country.name}
                                </h2>
                                <span className='flex items-center mb-2'><h2 className='text-base font-semibold'>Population:</h2><p className='ml-3'>{country.population}</p></span>
                                <span className='flex items-center mb-2'><h2 className='text-base font-semibold'>Region:</h2><p className='ml-3'>{country.region}</p></span>
                                <span className='flex items-center mb-2'><h2 className='text-base font-semibold'>Capital:</h2><p className='ml-3'>{country.capital}</p></span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Home
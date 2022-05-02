import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CountryContext } from '../context/Countries'

const Country = ({isDark}) => {
    const [countries] = useContext(CountryContext)
    const {name} = useParams()
    const router = useNavigate()
    const [country, setCountry] = useState([])
    const [borders, setBorders] = useState([])
    
    useEffect(()=>{
        if(name){
            setCountry(countries.filter(item => item.name.trim() === name.trim()))
        }
    }, [name, countries])
    useEffect(()=>{
        if(country.length > 0 && country[0].borders){
            const countryBorder = countries.filter(item => country[0].borders.includes(item.alpha3Code))
            setBorders(countryBorder)
        }
    }, [country, countries])
  return (
    <div className={`container mt-5 w-5/6 mx-auto ${isDark ? "dark": ''}`}>
        <div className='flex flex-col mt-10 w-5/6 mx-auto'>
            <h2 className={`cursor-pointer button ${isDark ? 'header-dark': ''} rounded shadow-md`} onClick={()=> router(-1)}>Back</h2>

            {country.length > 0 && country.map((detail, index)=>(
                <div key={index} className={`flex justify-between sm:flex-col lg:flex-row sm:w-full ${isDark ?'dark-desc': ''}`}>
                    <img src={detail.flag} className="flag" alt="flag"/>
                    <div className="flex flex-col lg:w-1/2 w-full lg:mt-0 sm:mt-5 sm:header-dark sm:ml-5">
                        <h1 className="text-2xl mb-10 font-bold">{detail.name}</h1>
                        <div className="flex justify-between">
                            <div>
                                <span className='flex items-center mb-2'><h2 className='text-base font-normal'>Native Name:</h2><p className='ml-3 font-light'>{detail.nativeName}</p></span>
                                <span className='flex items-center mb-2'><h2 className='text-base font-normal'>Population:</h2><p className='ml-3 font-light'>{detail.population}</p></span>
                                <span className='flex items-center mb-2'><h2 className='text-base font-normal'>Region:</h2><p className='ml-3 font-light'>{detail.region}</p></span>
                                <span className='flex items-center mb-2'><h2 className='text-base font-normal'>Sub Region:</h2><p className='ml-3 font-light'>{detail.subregion}</p></span>
                                <span className='flex items-center mb-2'><h2 className='text-base font-normal'>Capital:</h2><p className='ml-3 font-light'>{detail.capital}</p></span>
                            </div>
                            <div className='ml-3'>
                                <span className='flex items-center mb-2'><h2 className='text-base font-normal'>Top Level Domain:</h2><p className='ml-3 font-light'>{detail.topLevelDomain.map((domain, idx)=> (<span key={idx}>{domain}</span>))}</p></span>
                                <span className='flex items-center mb-2'><h2 className='text-base font-normal'>Currencies:</h2><p className='ml-3 font-light'>{detail.currencies.map((curr, idx)=> (<span key={idx}>{curr.name}</span>))}</p></span>
                                <span className='flex items-center mb-2'><h2 className='text-base font-normal'>Languages:</h2><p className='ml-3 font-light'>{detail.languages.map((lang, idx)=> (<span key={idx}>{lang.name}</span>))}</p></span>
                            </div>
                        </div>
                        <div className='flex mt-10'>
                            <span className='flex items-center flex-wrap mb-2'>
                                <h2 className='text-base font-semibold'> Border Countries:</h2>
                                {borders.length > 0 && borders.map((border, idx)=> (<Link to={`/${border.name}`} className='p-4 m-2 rounded text-center header-dark text-sm shadow' key={idx}>{border.name}</Link>))}
                                {!borders.length > 0 && <div  className={`p-4 m-2 rounded text-center ${isDark ? 'header-dark': ''} text-sm shadow`}>No Border Countries</div>}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Country
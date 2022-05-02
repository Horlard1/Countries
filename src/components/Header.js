import React from 'react'

function Header({isDark, setIsDark}) {
  return (
    <div className={`py-4 px-10 bg-white flex justify-between shadow-lg ${isDark ? " header-dark": ''}`}>
        <h2 className='text-lg font-semibold'>Where in the world?</h2>
        <p onClick={()=>setIsDark(prev => !prev)} className='cursor-pointer'>{isDark ? "Light Mode": "Dark Mode"}</p>
    </div>
  )
}

export default Header
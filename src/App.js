import {Route,Routes, BrowserRouter} from 'react-router-dom'
import CountryContextProvider from './context/Countries';
import Header from './components/Header';
import Home from './pages/Home';
import Country from './pages/Country';
import './App.css';
import { useState } from 'react';

function App() {
  const [isDark, setIsDark] = useState(false)
  return (
      <BrowserRouter>
        <CountryContextProvider>
            <div className={`content ${isDark ? "dark": ''}`}>
              <Header isDark={isDark} setIsDark={setIsDark} />
              <Routes>
                <Route path='/' element={<Home isDark={isDark} />} />
                <Route path='/:name' element={<Country isDark={isDark}/>} />
              </Routes>
            </div>     
        </CountryContextProvider>
      </BrowserRouter>
  );
}

export default App;

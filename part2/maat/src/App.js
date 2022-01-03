import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Allcountries from './components/Allcountries'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [result, setResult] = useState([])
  

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])


  const handleSearch = (event) => {
    console.log(event)
    console.log('change');
    let result = countries;
     result = result.filter(function(country) {
     return country.name.common.includes(event.target.value) 
            

    })
    console.log(result)
    
    setResult(result);
    
   
  }

  const selectCountry = (country) => {
    setResult([country]);
  }

  

  

  return (
    <div>
      <h2>Countries</h2>
      <Filter handleSearch={handleSearch}/>
      <h2>Countries</h2>
      <Allcountries countries={result} selectCountry={selectCountry} />
    </div>
  )

}

export default App
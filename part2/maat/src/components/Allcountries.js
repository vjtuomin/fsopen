

const Languages = ({languages}) => {
    return(
    Object.keys(languages).map(key => 
     <li key={languages[key]}> {languages[key]}</li>
    )
    )
}

const Allcountries = ({countries, selectCountry}) => {
   
    if(countries.length === 1 ){
    return (
        countries.map(country =>
            <div key={country.name.common}>
           {country.name.common} 
           <p>Population: {country.population}</p>
           <p>Capital: {country.capital}</p>
            <h2>Languages</h2>
            <ul>
               <Languages languages={country.languages}/>
            </ul>
           
            <img src={country.flags.png} alt='flag'></img>
            </div>
            )
    )
  }
    if(countries.length <= 10){
        return (
            countries.map(country =>
                <div key={country.name.common}>
               {country.name.common} <button onClick={() => selectCountry(country)}>show</button>
               </div>
                )
        )
    }
    if(countries.length > 10){
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
}



export default Allcountries;
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const Country = ({country}) => {
  console.log(country)
  return (
    <div>
      <h1>{country.name.common}</h1>

      <div>Capital {country.capital[0]}</div>
      <div>Area {country.area}</div>

      <h2>Languages</h2>
      <ul>
        {Object.entries(country.languages).map(([abbreviation, language]) =>
          <li key={abbreviation}>{language}</li>
        )}
      </ul>

      <img src={country.flags.png} alt={country.flags.alt}/>
    </div>
  )
}

const SearchResults = ({countries, onClick}) => {
  if (countries.length == 0) {
    return (<></>)
  } else if (countries.length > 10) {
    return (<div>Too many matches, specify another filter</div>)
  } else if (countries.length > 1) {
    return (
      <>
        {countries.map(country => 
          <div key={country.cca2}>
            {country.name.common} &nbsp;
            <button onClick={() => onClick(country)}>
              Show
            </button>
          </div>)
        }
      </>
    )
  } else {
    return (<Country country={countries[0]}/>)
  }
}

const App = () => {
  const [value, setValue] = useState('')
  const [countryData, setCountryData] = useState([])
  const [matchingCountries, setMatchingCountries] = useState([])

  useEffect(() => {
    console.log('get country data')
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountryData(response.data)
      })
  }, [])

  const handleChange = (event) => {
    const query = event.target.value
    setValue(query)
    setMatchingCountries(countryData.filter(c => {
      const name = c.name.common
      return name.toLowerCase().includes(query.toLowerCase())
    }));
  }

  const handleClick = (country) => {
    setMatchingCountries([country])
  }

  
  return(
    <div>
      <form>
        find countries<input value={value} onChange={handleChange}/>
      </form>
      <SearchResults countries={matchingCountries} onClick={handleClick}/>
    </div>
  )
}

export default App

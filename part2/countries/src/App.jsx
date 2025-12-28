import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const Weather = ({city}) => {
  const [weather, setWeather] = useState(null)
  const api_key = import.meta.env.VITE_SOME_KEY
  const base_url = 'http://api.openweathermap.org'

  useEffect(() => {
    console.log(`Requesting weather data from: ${base_url}/geo/1.0/direct?q=${city}&appid=${api_key}`)
    axios
      .get(`${base_url}/geo/1.0/direct?q=${city}&appid=${api_key}`)
      .then(geoData => {
        console.log('geoData of capital:', geoData.data[0])
        const lat = geoData.data[0].lat
        const lon = geoData.data[0].lon
        return (
          axios
            .get(`${base_url}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
        )
      })
      .then(weather => {
        console.log('Weather:', weather.data)
        setWeather(weather.data)
      })
  }, [city])

  if (!weather) {
    return (null)
  } else {
    return(
      <div>
        <h2>Weather in {city}</h2>
        <div>Temperature {weather.main.temp} Celcius</div>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
        <div>Wind {weather.wind.speed} m/s</div>
      </div>
    )
  }
}

const Country = ({country}) => {
  console.log('CountryData:', country)

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

      <Weather city={country.capital[0]}/>
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
      .catch(error => console.error(error))
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

import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'


const SearchResults = ({names, onClick}) => {
  const [country, setCountry] = useState(null)
  if (names.length == 0) {
    return (<></>)
  }
  
  if (names.length > 10) {
    return (<div>Too many matches, specify another filter</div>)
  } else if (names.length > 1) {
    return (
      <>
        {names.map((name, i) => 
          <div key={i}>
            {name} &nbsp;
            <button className={name} onClick={onClick}>Show</button>
          </div>)
        }
      </>
    )
  } else {
    if (country && country.name.common == names[0]) {
      return (
        <div>
          <h1>{country.name.common}</h1>

          <div>Capital {country.capital[0]}</div>
          <div>Area {country.area}</div>

          <h2>Languages</h2>
          <ul>
            {Object.values(country.languages).map(((language, i) =>
              <li key={i}>{language}</li>
            ))}
          </ul>

          <img src={country.flags.png} alt={country.flags.alt}/>
        </div>
      )
    } else {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${names[0]}`)
        .then(response =>
          setCountry(response.data)
        )
    }
  }
}

const App = () => {
  const [value, setValue] = useState('')
  const [countryData, setCountryData] = useState([])
  const [matchingCountries, setMatchingCountries] = useState([])
  const [country, setCountry] = useState(null)

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
    const countryNames = countryData.map(c => c.name.common)
    const matchingNames = countryNames.filter(name =>
      name.toLowerCase().includes(query.toLowerCase()))
    setMatchingCountries(matchingNames);
  }

  const handleClick = (event) => {
    console.log(event.target.className)
    setMatchingCountries([event.target.className])
  }

  const renderCountry = (name) => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(response => {
        console.log(response.data)
        setCountry(response.data)
      })
  }
  
  return(
    <div>
      <form>
        find countries<input value={value} onChange={handleChange}/>
      </form>
      <SearchResults names={matchingCountries} onClick={handleClick}/>
    </div>
  )
}

export default App

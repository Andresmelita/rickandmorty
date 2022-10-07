import axios from 'axios'
import { useState, useEffect } from 'react'
import './App.css'
import CardResident from './components/CardResident'
import Error from './components/Error'
import FilterList from './components/FilterList'
import LocationInfo from './components/LocationInfo'
import Pagination from './components/Pagination'
import getRandomNumber from './utils/getRandomNumber'

function App() {
  //Para guardar una location
  const [location, setLocation] = useState()
  //Para guardar la información del input y hacer la petición cuando se hace submit
  const [searchInput, setSearchInput] = useState('')
  //Para guardar las sugerencias de la api
  const [suggestedList, setSuggestedList] = useState()
  //Para indicar si hay error o no
  const [hasError, setHasError] = useState(false)

  //*Apartado para paginación*//
  const [page, setPage] = useState(1)
  const [eachPage, setEachPage] = useState(4)

  const numberResidents = location?.residents.length
  const maxPages = Math.ceil(numberResidents / eachPage)

  console.log(numberResidents)
  console.log(maxPages)

  //*Fin de apartado de paginación*//

  useEffect(() => {
    let id = getRandomNumber()
    if(searchInput){
      id = searchInput
    }
    const URL= `https://rickandmortyapi.com/api/location/${id}`

    axios.get(URL)
      .then(res => {
        setHasError(false) 
        setLocation(res.data)
      })
      .catch(err => setHasError(true))
  }, [searchInput])

  const handleSubmit = event => {
    event.preventDefault()
    setSearchInput(event.target.idLocation.value)
  }

  const handleChange = event => {
    if(event.target.value === ''){
      setSuggestedList()
    } else {
      const URL = `https://rickandmortyapi.com/api/location?name=${event.target.value}`

      axios.get(URL)
        .then(res=>setSuggestedList(res.data.results))
        .catch(err => console.log(err))
    }
  }

  return (
    <div className="App">
      <img className='header' src='./images/TopImage.png'/>
      <form onSubmit={handleSubmit}>
        <input 
          className='searchText'
          id='idLocation' 
          placeholder='Enter ID (1-126):' 
          type='text'
          onChange={handleChange}
        />
        <button className='buttonSearch'>🔍</button>
        <section className='filterList'>
          <FilterList
            suggestedList={suggestedList}
            setSearchInput={setSearchInput}
          />
        </section>
      </form>
      {
        hasError ?
          <Error />
        :
          <>
            <LocationInfo location={location} />
            <div className='card-container'>
              {
                location?.residents.slice(
                  (page - 1) * eachPage,
                  (page - 1)*eachPage + eachPage
                ).map(url => (
                  <CardResident 
                    key={url}
                    url={url}
                  />
                ))
              }
            </div>
          </>
      }
      {/* <div>
        {location?.residents.slice(
          (page - 1) * eachPage,
          (page - 1)*eachPage + eachPage
          )
        }
      </div> */}
      <Pagination 
        page={page}
        setPage={setPage}
        maxPages={maxPages}
      />
      <footer className='footer'>
        <p class="footerText">Diseñado y programado por Andrés Salazar Melita🍀</p>
      </footer>     
    </div>
  )
}

export default App

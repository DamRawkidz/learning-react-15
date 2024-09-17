import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx'
import { sortPlacesByDistance } from '../loc.js'
import { fetchAvailablePlaces } from '../http.js'
import { useFetch } from '../hooks/useFetch.js';


export default function AvailablePlaces({ onSelectPlace }) {
  // const [isFetching, setIsFetching] = useState(false)
  // const [AvailablePlaces, setAvailablePlaces] = useState([])
  // const [error, setError] = useState()

  const { isFetching, error, setFetchedData: setAvailablePlaces, fetchedData: AvailablePlaces } = useFetch(fetchAvailablePlaces, [])
  useEffect(() => {

    async function featchPlaces() {
      setIsFetching(true)

      try {
        const places = await fetchAvailablePlaces()

        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position)
          const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude)
          setAvailablePlaces(sortedPlaces)
          setIsFetching(false)
        })


      } catch (error) {

        setError(({
          message: error.message || 'Could not getch places, please try again later',
        }))

        setIsFetching(false)
      }


    }

    featchPlaces()

  }, [])


  if (error) return <Error title="An error Occurred" message={error.message} />



  return (
    <Places
      title="Available Places"
      isLoading={isFetching}
      loadingText="Fetching place data..."
      places={AvailablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}

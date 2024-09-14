import { useEffect, useState } from 'react';
import Places from './Places.jsx';

const places = localStorage.getItem('places')

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false)
  const [AvailablePlaces, setAvailablePlaces] = useState([])
  useEffect(() => {

    async function featchPlaces() {
      setIsFetching(true)
      const resposen = await fetch('http://localhost:3000/places')
      const resData = await resposen.json()
      setAvailablePlaces(resData.places)
      setIsFetching(false)
    }

    featchPlaces()

  }, [])



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

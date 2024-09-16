import { useRef, useState, useCallback, useEffect } from "react";

function useFetch(fetchFn, initiaValue) {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initiaValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setUserPlaces(data);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch user places." });
      }
      setIsFetching(false);
    }

    fetchData();
  }, [fetchFn]);

  return {
    isFetching,
    fetchedData,
    error,
  };
}

import { useEffect, useState } from "react";
import { UNSPLASH_API_URL, SECRET_KEY } from "./Constants";

// Custom hook to search photos based on a query and pagination
const useSearchPhotos = (query, page) => {
  // State to store photo data from API
  const [photoData, setPhotoData] = useState(null);
  // State to track the last successful query
  const [lastQuery, setLastQuery] = useState("");
  // State to handle any errors during fetching
  const [error, setError] = useState(null);
  // State to show loading status
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If query is empty, reset photoData and error, then exit the effect
    if (query.trim() === "") {
      setPhotoData(null);
      setError(null);
      return;
    }

    // Function to fetch data asynchronously from Unsplash API
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        // Make API call with the query and page parameters
        const response = await fetch(
          `${UNSPLASH_API_URL}search/photos?query=${query}&page=${page}&per_page=9&client_id=${SECRET_KEY}`
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();

        // Check if the query has changed during the request
        if (query !== lastQuery) {
          // If query changed, update with new data
          setPhotoData(json);
        } else {
          // If query same, append new results to existing data
          setPhotoData((prevData) => {
            // Ensure prevData is not null and has results before trying to spread its results
            return prevData && prevData.results
              ? {
                  ...json,
                  results: [...prevData.results, ...json.results]
                }
              : json;
          });
        }
        setLastQuery(query); // Update lastQuery state with the current query
      } catch (e) {
        setError(e); // Set error if any occurs
      } finally {
        setLoading(false); // Ensure loading is false after fetch
      }
    };

    // Debounce fetching data by 300ms
    const timer = setTimeout(() => fetchData(), 300);
    // Cleanup function to clear timeout if query/page changes or component unmounts
    return () => clearTimeout(timer);
  }, [query, page]);

  // Expose the photo data, loading state, and any errors to the component using this hook
  return { photoData, loading, error };
};

export default useSearchPhotos;

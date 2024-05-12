import { useEffect, useState } from "react";
import { UNSPLASH_API_URL, SECRET_KEY } from "./Constants";

const useSearchPhotos = (query, page) => {
  const [photoData, setPhotoData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If the query is empty, reset photoData and error
    if (query.trim() === "") {
      setPhotoData(null);
      setError(null);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch photos from Unsplash API
        const data = await fetch(
          `${UNSPLASH_API_URL}${query}&page=${page}&per_page=9&client_id=${SECRET_KEY}`
        );
        if (!data.ok) {
          throw new Error(`Failed to fetch: ${data.status} ${data.statusText}`);
        }
        const json = await data.json();
        // Update photoData with new photos or append to existing data
        setPhotoData((prevData) =>
          prevData ? { ...json, results: [...prevData.results, ...json.results] } : json
        );
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    // Debouncing the API calls to reduce frequency of calls on keypresses
    const timer = setTimeout(() => fetchData(), 300);
    // cleanup
    return () => {
      clearTimeout(timer);
    };
  }, [query, page]);

  return { photoData, loading, error };
};

export default useSearchPhotos;

import { useEffect, useState } from "react";
import { UNSPLASH_API_URL, SECRET_KEY } from "./Constants";

const useGetRandomPhotos = (page) => {
  const [photoData, setPhotoData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRandomPhotos = async () => {
    const response = await fetch(
      `${UNSPLASH_API_URL}/photos/random?&page=${page}&count=9&client_id=${SECRET_KEY}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }
    const json = await response.json();
    // console.log(page);
    return json.results;
  };

  useEffect(() => {
    const getRandomPhotos = async () => {
      setLoading(true);
      try {
        const photos = await fetchRandomPhotos();
        if (Array.isArray(photos)) {
          setPhotoData((prevPhotos) => [...prevPhotos, ...photos]);
        } else {
          console.error("Unexpected response format:", photos);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getRandomPhotos();
  }, [page]);

  return { photoData, loading, error };
};

export default useGetRandomPhotos;

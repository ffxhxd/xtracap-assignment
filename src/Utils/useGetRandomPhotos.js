import { useEffect, useState } from "react";
import { UNSPLASH_API_URL, SECRET_KEY } from "./Constants";

const useGetRandomPhotos = () => {
  const [photoData, setPhotoData] = useState(null);

  // Function to fetch random photos from Unsplash API
  const fetchRandomPhotos = async () => {
    const data = await fetch(
      `${UNSPLASH_API_URL}photos/random?count=12&client_id=${SECRET_KEY}`
    );
    if (!data.ok) {
      throw new Error(`Failed to fetch: ${data.status} ${data.statusText}`);
    }
    const json = await data.json();
    return json;
  };

  useEffect(() => {
    // Fetch random photos when the component mounts
    const getRandomPhotos = async () => {
      const photos = await fetchRandomPhotos();
      setPhotoData(photos.results);
    };
    getRandomPhotos();
  }, []);

  return photoData;
};

export default useGetRandomPhotos;

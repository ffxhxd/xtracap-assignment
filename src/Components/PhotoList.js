import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import PhotoGrid from './PhotoGrid';
import useSearchPhotos from '../Utils/useSearchPhotos';
import SearchBar from './SearchBar';
import Loader from './Loader';
import useGetRandomPhotos from '../Utils/useGetRandomPhotos';

// PhotoList component handles the display of photos based on user queries or random selections.
// It features an infinite scrolling mechanism, a sticky search bar at the top, and displays loading states and errors.
const PhotoList = () => {
  const [query, setQuery] = useState(""); // State for the search query
  const [page, setPage] = useState(1); // State for pagination
  const { photoData, loading, error } = useSearchPhotos(query, page); // Custom hook to fetch photos based on search query and page
  const randomImages = useGetRandomPhotos(); // Custom hook to fetch random photos

  // Function to handle search input and reset pagination
  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
  };

  // Function to handle infinite scroll
  const handleInfiniteScroll = () => {
    try {
      if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error handling infinite scroll:', error);
    }
  };

  // Attach scroll event listener for infinite scroll
  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll);
    return () => window.removeEventListener('scroll', handleInfiniteScroll); // Cleanup on component unmount
  }, []);

  return (
    <>
      {/* Sticky search bar at the top */}
      <div className="flex bg-black flex-col items-center justify-center gap-1 pt-1 pb-2 sticky top-0">
        <Typography sx={{ color: '#fff' }} variant="h6">
          Search Photos
        </Typography>
        <SearchBar onSubmit={handleSearch} />
      </div>

      {/* Error handling section */}
      {error && <p>Error fetching photos: {error.message}</p>}

      {/* Photo display section */}
      <div className="flex items-center justify-start flex-col m-5">
        {query ? (
          // Display search results if there's a query
          <>
            {photoData && <PhotoGrid photos={photoData.results} />}
            {loading && <Loader />}
          </>
        ) : (
          // Display random images if no query is made
          <>
            {randomImages ? <PhotoGrid photos={randomImages} /> : <Loader />}
          </>
        )}
      </div>
    </>
  );
};

export default PhotoList;

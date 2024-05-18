import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import PhotoGrid from './PhotoGrid';
import useSearchPhotos from '../Utils/useSearchPhotos';
import SearchBar from './SearchBar';
import ShimmerPhotoGrid from './ShimmerPhotoGrid';
import useGetRandomPhotos from '../Utils/useGetRandomPhotos';

const PhotoList = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  
  const { photoData: searchPhotoData, loading: searchLoading, error: searchError } = useSearchPhotos(query, page);
  const { photoData: randomPhotoData, loading: randomLoading, error: randomError } = useGetRandomPhotos(page);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1); // Reset pagination on new search
  };

  const handleInfiniteScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll);
    return () => window.removeEventListener('scroll', handleInfiniteScroll);
  }, [page]);

  return (
    <>
      <div className="sticky top-0 bg-black flex flex-col items-center justify-center gap-1 pt-1 pb-2">
        <Typography sx={{ color: '#fff' }} variant="h6">
          Search Photos
        </Typography>
        <SearchBar onSubmit={handleSearch} />
      </div>

      {searchError && <p>Error fetching photos: {searchError.message}</p>}
      {randomError && <p>Error fetching random photos: {randomError.message}</p>}

      <div className="flex items-center justify-start flex-col m-5">
        {query ? (
          <>
            {searchPhotoData ? <PhotoGrid photos={searchPhotoData.results} /> : <ShimmerPhotoGrid />} 
            {searchLoading && <ShimmerPhotoGrid />} 
          </>
        ) : (
          <>
            {randomPhotoData ? <PhotoGrid photos={randomPhotoData} /> : <ShimmerPhotoGrid />} 
            {randomLoading && <ShimmerPhotoGrid />}
          </>
        )}
      </div>
    </>
  );
};

export default PhotoList;

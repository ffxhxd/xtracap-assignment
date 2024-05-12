import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import PhotoGrid from "./PhotoGrid";
import useSearchPhotos from "../Utils/useSearchPhotos";
import SearchBar from "./SearchBar";
import Loader from "./Loader";
import useGetRandomPhotos from "../Utils/useGetRandomPhotos";


const PhotoList = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { photoData, loading, error } = useSearchPhotos(query, page);
  const randomImages = useGetRandomPhotos();

  // Function to handle search input
  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
  };

  // Function to handle infinite scroll
  const handleInfiniteScroll = () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error handling infinite scroll:", error);
    }
  };

  // Attach scroll event listener when component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    //cleanup 
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  return (
    <>
      {/* Search bar section */}
      <div className="flex bg-black flex-col items-center justify-center gap-1 pt-1 pb-2 sticky top-0">
        <Typography sx={{ color: "#fff" }} variant="h6">
          Search Photos
        </Typography>
        <SearchBar onSubmit={handleSearch} />
      </div>

       {/* Display error message in case of any error in search */}
       {error && <p>Error fetching photos: {error.message}</p>}

      {/* Main content section */}
      <div className="flex items-center justify-start flex-col m-5">
        {query ? (
          // Render search results if query is present
          <>
            {photoData && <PhotoGrid photos={photoData.results} />}
            {loading && <Loader />}
          </>
        ) : (
          // Render random images if no query is present
          <>
            {randomImages !== null ? (
              <PhotoGrid photos={randomImages} />
            ) : (
              <Loader />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default PhotoList;

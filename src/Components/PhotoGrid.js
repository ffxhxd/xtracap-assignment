import React from 'react';
import PhotoCard from './PhotoCard'; 
import { Grid } from '@mui/material'; 
import ScrollToTop from './ScrollToTop'; 

// Component to display a grid of photo cards
const PhotoGrid = ({ photos }) => {
  // Check if the photos prop is an array, if not, display a fallback message
  if (!Array.isArray(photos)) {
    return <h1>No Photos</h1>;
  }

  return (
    <>
      <ScrollToTop /> {/* Component that enables a scroll to top functionality */}
      <Grid container spacing={2}> 
        {photos.map((photo, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <PhotoCard photo={photo} /> 
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default PhotoGrid;

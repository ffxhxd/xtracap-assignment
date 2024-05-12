import React from "react";
import PhotoCard from "./PhotoCard";
 import { Grid } from "@mui/material";
import ScrollToTop from "./ScrollToTop";

const PhotoGrid = ({ photos }) => {

  if (!Array.isArray(photos)) {
    return <h1>No Photos</h1>; 
  }

  return (
  <>
   <ScrollToTop />
    <Grid container spacing={2}>
      {photos.map((photo) => (
        <Grid item xs={12} sm={6} md={4} key={photo.id}>
          <PhotoCard photo={photo} />
        </Grid>
      ))}
    </Grid>
  </>
  );
};

export default PhotoGrid;

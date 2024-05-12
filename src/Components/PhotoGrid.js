import React from "react";
import PhotoCard from "./PhotoCard";

const PhotoGrid = ({ photos }) => {

  if (!Array.isArray(photos)) {
    return <h1>No Photos</h1>; 
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {photos.map((photo) => (
      <PhotoCard key={photo.id} photo={photo} />
    ))}
  </div>
  
  );
};

export default PhotoGrid;

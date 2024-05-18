import React from 'react';

const ShimmerPhotoGrid = () => {
  const shimmerCards = Array.from({ length: 3 }, (_, index) => (
    <div key={index} className="p-4 bg-white shadow-md rounded-lg mx-4 my-2 flex flex-col items-center justify-center animate-pulse">
      <div className="h-[300px] w-full bg-gray-200 rounded-md mb-4"></div> 
    </div>
  ));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {shimmerCards}
    </div>
  );
};

export default ShimmerPhotoGrid;

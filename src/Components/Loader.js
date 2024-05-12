import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-[200px]">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-t-indigo-900 h-16 w-16 animate-spin"></div>
    </div>
  );
};

export default Loader;

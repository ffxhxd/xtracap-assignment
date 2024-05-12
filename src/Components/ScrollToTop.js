import React from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ScrollToTop = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      onClick={handleScrollToTop}
      className="fixed right-8 bg-indigo-800 p-2 rounded-full bottom-8 cursor-pointer z-10 hover:scale-110"
    >
      <KeyboardArrowUpIcon style={{ fill: "white", fontSize: 40 }} className="animate-pulse" />
    </div>
  );
};

export default ScrollToTop;

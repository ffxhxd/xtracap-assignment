import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";

const SearchBar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [timer, setTimer] = useState(null);
  const [isFocused, setIsFocused] = useState(false); // State to track focus

  // Load suggestions from local storage when the component mounts
  useEffect(() => {
    const loadedSuggestions = JSON.parse(localStorage.getItem("searchSuggestions")) || [];
    setSuggestions(loadedSuggestions);
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
    onSubmit(value);
    debounceSaveToLocalStorage(value);
  };

  const debounceSaveToLocalStorage = (query) => {
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      saveSearchQuery(query);
    }, 2000); 
    setTimer(newTimer);
  };

  const saveSearchQuery = (query) => {
    if (query.trim() !== "") {
      let updatedSuggestions = suggestions.filter(item => item !== query);
      updatedSuggestions = [query, ...updatedSuggestions].slice(0, 6);
      setSuggestions(updatedSuggestions);
      localStorage.setItem("searchSuggestions", JSON.stringify(updatedSuggestions));
    }
  };

  // Function to handle the delay of hiding suggestions
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    // Delay hiding the suggestions box to allow for suggestion click to be processed
    setTimeout(() => {
      setIsFocused(false);
    }, 200); // Delay can be adjusted based on the responsiveness of your UI
  };

  const fillInputWithSuggestion = (suggestion) => {
    setInputValue(suggestion);
    onSubmit(suggestion);
    setIsFocused(false);
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("searchSuggestions");
    setSuggestions([]);
  };


  return (
    <div className="relative">
      <TextField
        label="Search Images"
        variant="outlined"
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={inputValue}
        sx={{
          "& .MuiOutlinedInput-root": {
            color: "#fff",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#fff",
              borderWidth: "1px"
            }
          },
          "& .MuiInputLabel-outlined": {
            color: "#fff",
            fontWeight: "bold"
          },
          width: '300px'
        }}
        autoComplete="off"
      />
      {isFocused && suggestions.length > 0 && (
        <div className="absolute top-full mt-0 left-0 w-full bg-white p-2 flex flex-col">
          {suggestions.map((suggestion, index) => (
            <span
              key={index}
              className="cursor-pointer bg-gray-200 text-black font-medium mr-2 mb-2 inline-block px-2 py-1 rounded truncate"
              onClick={() => fillInputWithSuggestion(suggestion)}
            >
              {suggestion}
            </span>
          ))}
          <button
            onClick={clearLocalStorage}
            className="bg-red-800 text-white font-medium mr-2 mt-1 mb-1 inline-block px-2 py-1 rounded-sm hover:bg-red-600"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

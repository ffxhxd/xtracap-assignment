import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';

// SearchBar component that handles search input, suggestions, and local storage for search history
const SearchBar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [timer, setTimer] = useState(null);
  const [isFocused, setIsFocused] = useState(false); // Tracks if the input field is focused

  // Load suggestions from local storage on component mount
  useEffect(() => {
    const loadedSuggestions = JSON.parse(localStorage.getItem('searchSuggestions')) || [];
    setSuggestions(loadedSuggestions);
  }, []);

  // Handles input changes with debounce to limit intensive operations like saving to local storage
  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
    onSubmit(value);
    debounceSaveToLocalStorage(value);
  };

  // Debounces saving the search query to local storage after every 2 seconds we can adjust the timing as per requirment
  const debounceSaveToLocalStorage = (query) => {
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      saveSearchQuery(query);
    }, 2000);
    setTimer(newTimer);
  };

  // Saves the search query to local storage and updates suggestions
  const saveSearchQuery = (query) => {
    if (query.trim() !== "") {
      let updatedSuggestions = suggestions.filter(item => item !== query);
      updatedSuggestions = [query, ...updatedSuggestions].slice(0, 6);
      setSuggestions(updatedSuggestions);
      localStorage.setItem('searchSuggestions', JSON.stringify(updatedSuggestions));
    }
  };

  // Focus handler to show suggestions
  const handleFocus = () => {
    setIsFocused(true);
  };

  // Blur handler to hide suggestions after a short delay so that we can click the button we can also adjust this for btter UX
  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 200);
  };

  // Fills the input when a suggestion is clicked and submits the query
  const fillInputWithSuggestion = (suggestion) => {
    setInputValue(suggestion);
    onSubmit(suggestion);
    setIsFocused(false);
  };

  // Clears search suggestions from local storage
  const clearLocalStorage = () => {
    localStorage.removeItem('searchSuggestions');
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

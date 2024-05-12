import React, { useState } from "react";
import { TextField } from "@mui/material";

const SearchBar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  // Function to handle input change
  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
    // Call onSubmit prop with the new value
    onSubmit(value);
  };

  return (
    <TextField
      label="Search Images"
      variant="outlined"
      onChange={handleChange}
      value={inputValue}
      sx={{
        "& .MuiOutlinedInput-root": {
          color: "#fff",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
            borderWidth: "1px",
          },
        },
        "& .MuiInputLabel-outlined": {
          color: "#fff",
          fontWeight: "bold",
        },
        width: '300px',
      }}
    />
  );
};

export default SearchBar;

import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchFilter = ({ searchTerm, setSearchTerm }) => {
  return (
    <TextField
      label="Search by product name"
      variant="outlined"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ margin: "10px" }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton disabled>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchFilter;

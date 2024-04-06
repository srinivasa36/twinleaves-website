import React from "react";
import { TextField } from "@mui/material";

const SearchFilter = ({ searchTerm, setSearchTerm }) => {
  return (
    <TextField
      label="Search by product name"
      variant="outlined"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ margin: "10px" }}
    />
  );
};

export default SearchFilter;

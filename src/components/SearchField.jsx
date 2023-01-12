import { alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import SearchFilters from "./SearchFilters";

export default function SearchField({ params, setParams }) {
  const [itemName, setItemName] = useState("");
  const [filters, setFilters] = useState("All Items");

  const handleChange = (event) => {
    setItemName(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newParams = { ...params, query: itemName, filters: filters, page: 1 };
    setParams(newParams);
  };

  return (
    <form
      style={{ width: "100%" }}
      onSubmit={handleSubmit}
    >
      <Box sx={{ display: "flex" }}>
        <TextField
          fullWidth
          value={itemName}
          onChange={handleChange}
          id="standard-basic"
          label="Search Item"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon
                  sx={[
                    {
                      color: alpha("#FFFFFF", 0.7),
                    },
                  ]}
                />
              </InputAdornment>
            ),
          }}
          sx={[
            {
              "& .MuiInput-root": {
                p: 1,
              },
              "& .MuiInput-input": {
                color: alpha("#FFFFFF", 0.9),
              },
              backgroundColor: alpha("#FFFFFF", 0.15),
              "&:hover": {
                backgroundColor: alpha("#FFFFFF", 0.25),
              },
              "& label": {
                color: alpha("#FFFFFF", 0.5),
                p: 1,
              },
              "& label.Mui-focused": {
                color: alpha("#FFFFFF", 0.7),
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: alpha("#FFFFFF", 0.7),
              },
              "& .MuiInput-underline:before, & .MuiInput-underline:after": {
                borderBottomLeftRadius: "0.25rem",
              },
              borderTopLeftRadius: "0.25rem",
              borderBottomLeftRadius: "0.25rem",
            },
          ]}
        />
        <Button
          type="submit"
          sx={{
            "&:hover": {
              backgroundColor: alpha("#2196f3", 0.8),
            },
            backgroundColor: alpha("#2196f3", 0.5),
            color: "white",
            width: "7rem",
            borderTopLeftRadius: "0",
            borderBottomLeftRadius: "0",
          }}
        >
          Search
        </Button>
      </Box>
      <SearchFilters
        filters={filters}
        setFilters={setFilters}
      />
    </form>
  );
}

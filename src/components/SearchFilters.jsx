import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { alpha } from "@mui/material/styles";
import ItemUICategory from "../data/ItemUICategory.json";

export default function SearchFilters({
  filters,
  setFilters,
  itemName,
  params,
  setParams,
}) {
  const handleChange = (event) => {
    setFilters(event.target.value);
    const newParams = {
      ...params,
      query: itemName,
      filters: event.target.value,
      page: 1,
    };
    setParams(newParams);
  };

  return (
    <FormControl
      fullWidth
      sx={{ marginTop: "1rem" }}
    >
      <InputLabel
        sx={{
          color: alpha("#FFFFFF", 0.7),
          "&.Mui-focused": {
            color: alpha("#FFFFFF", 0.9),
          },
        }}
        id="filter-label"
      >
        Filter
      </InputLabel>
      <Select
        sx={{
          color: alpha("#FFFFFF", 0.9),
          backgroundColor: alpha("#FFFFFF", 0.15),
          ".MuiSelect-select": {
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          },
        }}
        labelId="filter-select"
        id="filter-select"
        value={filters}
        label="Filter"
        onChange={handleChange}
      >
        <MenuItem value={"All Items"}>All Items</MenuItem>
        {ItemUICategory.Results.map((category) => (
          <MenuItem
            value={category.ID}
            key={category.ID}
            sx={{
              gap: "1rem",
            }}
          >
            <img src={`https://xivapi.com${category.Icon}`} /> {category.Name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

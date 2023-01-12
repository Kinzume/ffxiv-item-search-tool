import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { alpha } from "@mui/material/styles";
import { Skeleton } from "@mui/material";

export default function SearchFilters({ filters, setFilters }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [results, setResults] = useState([]);

  const handleChange = (event) => {
    setFilters(event.target.value);
  };

  useEffect(() => {
    setError(false);
    setLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      signal: signal,
    };
    fetch(`https://xivapi.com/ItemUICategory?limit=109`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result.Results);
        setResults(result.Results);
        return setLoading(false);
      })
      .catch((error) => {
        if (signal.aborted) return;
        console.log("error", error);
        return setError(true);
      });

    return () => {
      controller.abort();
      // console.log("Download aborted");
    };
  }, []);

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
        {loading ? (
          <Skeleton
            height={200}
            animation="wave"
          />
        ) : error ? (
          <Skeleton
            height={200}
            animation={false}
          />
        ) : (
          results.map((category) => (
            <MenuItem
              value={category.ID}
              key={category.ID}
              sx={{
                gap: "1rem",
              }}
            >
              <img src={`https://xivapi.com${category.Icon}`} /> {category.Name}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
}

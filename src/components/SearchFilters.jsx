import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function SearchFilters() {
  const matchesDefaultMd = useMediaQuery("(min-width:900px)");
  const matchesDefaultLg = useMediaQuery("(min-width:1200px)");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [results, setResults] = useState([]);
  const [value, setValue] = useState(false);
  const [age, setAge] = useState("");
  const [filteredBy, setFilteredBy] = useState("(none)");

  const handleChange = (event) => {
    setAge(event.target.value);
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
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Categories</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        label="Category"
        onChange={handleChange}
      >
        {results.map((category) => (
          <MenuItem
            value={category.Name}
            key={category.ID}
          >
            <img src={`https://xivapi.com${category.Icon}`} /> {category.Name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

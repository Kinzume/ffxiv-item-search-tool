import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import SearchField from "./SearchField";
import SearchResults from "./SearchResults";
import SearchPagination from "./SearchPagination";
import Button from "@mui/material/Button";
import Container from "@mui/system/Container";
import { useMediaQuery } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide
      direction="up"
      ref={ref}
      {...props}
    />
  );
});

export default function ItemSearch({ setItem }) {
  //Item Search TODOs:
  // Fetch https://xivapi.com/search?indexes=Item
  // Display name and icon, add pagination and onclick logic
  // Add filters https://xivapi.com/search?indexes=Item&filters=LevelItem>35

  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [pagination, setPagination] = useState(0);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [paginationPageNumber, setPaginationPageNumber] = useState(0);
  const matches = useMediaQuery("(min-width: 1200px)");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    // if (query === "") return;
    setNoResults(false);
    setError(false);
    setLoading(true);
    setPageNumber(0);
    setPaginationPageNumber(0);
    setPagination(0);
    const controller = new AbortController();
    const signal = controller.signal;
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      signal: signal,
    };
    fetch(
      `https://xivapi.com/search?indexes=Item&string=${query}&page=1`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setResults(result);
        if (!result?.Results.length) {
          setNoResults(true);
          setPagination(result.Pagination.PageTotal);
          setPaginationPageNumber(1);
          return setLoading(false);
        }
        setPagination(result.Pagination.PageTotal);
        setPaginationPageNumber(1);
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
  }, [query]);
  useEffect(() => {
    if (pageNumber === 0) return;
    setError(false);
    setLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      signal: signal,
    };
    fetch(
      `https://xivapi.com/search?indexes=Item&string=${query}&page=${pageNumber}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setResults(result);
        setPagination(result.Pagination.PageTotal);
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
  }, [pageNumber]);
  return (
    <div>
      <AppBar sx={{ backgroundColor: "white", padding: "0.8rem" }}>
        <Container>
          <Button
            onClick={handleClickOpen}
            sx={{
              "&:hover": {
                backgroundColor: "#1769aa",
              },
              backgroundColor: "#2196f3",
              color: "white",
              width: "fit-content",
              marginY: "0.5rem",
              marginX: "0.5rem",
            }}
          >
            <SearchIcon sx={{ marginRight: "5px" }} />
            Search
          </Button>
        </Container>
      </AppBar>
      <Dialog
        fullScreen
        disableScrollLock={true}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "sticky" }}>
          <Toolbar
            sx={matches ? {} : { maxWidth: "1200px", marginRight: "auto" }}
          >
            {matches ? (
              <Container>
                <Button
                  onClick={handleClose}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#1769aa",
                    },
                    backgroundColor: "#2196f3",
                    color: "white",
                    width: "fit-content",
                  }}
                >
                  <CloseIcon sx={{ marginRight: "5px" }} />
                  Close
                </Button>
              </Container>
            ) : (
              <Button
                onClick={handleClose}
                sx={{
                  "&:hover": {
                    backgroundColor: "#1769aa",
                  },
                  backgroundColor: "#2196f3",
                  color: "white",
                  width: "fit-content",
                }}
              >
                <CloseIcon sx={{ marginRight: "5px" }} />
                Close
              </Button>
            )}
          </Toolbar>
          <Container>
            <SearchField setQuery={setQuery} />
          </Container>
          <SearchPagination
            pagination={pagination}
            setPageNumber={setPageNumber}
            paginationPageNumber={paginationPageNumber}
            setPaginationPageNumber={setPaginationPageNumber}
          />
        </AppBar>
        <SearchResults
          results={results}
          noResults={noResults}
          loading={loading}
          error={error}
          setItem={setItem}
          handleClose={handleClose}
        />
      </Dialog>
    </div>
  );
}

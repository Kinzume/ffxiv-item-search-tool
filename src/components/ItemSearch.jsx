import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import SearchMenu from "./SearchMenu";
import SearchResults from "./SearchResults";
import SearchPagination from "./SearchPagination";
import Button from "@mui/material/Button";
import Container from "@mui/system/Container";
import useMediaQuery from "@mui/material/useMediaQuery";

const Transition = React.forwardRef(function Transition(props, ref) {
  // Animation for Dialog
  return (
    <Slide
      direction="up"
      ref={ref}
      {...props}
    />
  );
});

const createUrl = (stringQuery, filtersQuery, pageQuery) => {
  const endpoint = "https://xivapi.com/search?indexes=item";
  let string, filters, page;
  if (stringQuery === "") {
    string = "&string=";
  } else {
    string = "&string=" + stringQuery;
  }
  if (filtersQuery === "All Items") {
    filters = "&filters=";
  } else {
    filters = "&filters=ItemUICategory.ID=" + filtersQuery;
  }
  if (pageQuery === "") {
    page = "&page=";
  } else {
    page = "&page=" + pageQuery;
  }

  return endpoint + string + filters + page;
};

const initialParams = {
  query: "",
  filters: "All Items",
  page: 1,
};

export default function ItemSearch({ setItem }) {
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [pagination, setPagination] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const matches = useMediaQuery("(min-width: 1200px)");
  const [params, setParams] = useState(initialParams);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setNoResults(false);
    setError(false);
    setLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      signal: signal,
    };
    const endpoint = createUrl(params.query, params.filters, params.page);
    fetch(endpoint, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setResults(result);
        if (!result?.Results.length) {
          setNoResults(true);
          setPagination(result.Pagination.PageTotal);
          return setLoading(false);
        }
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
  }, [params]);

  return (
    <>
      <AppBar sx={{ backgroundColor: "white", padding: "0.8rem" }}>
        <Container>
          {/* Opens ItemSearchMenu */}
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
            {/* Responsive close button */}
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

          <SearchMenu
            params={params}
            setParams={setParams}
          />

          <SearchPagination
            params={params}
            setParams={setParams}
            pagination={pagination}
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
    </>
  );
}

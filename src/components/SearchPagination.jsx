import { Container, Pagination } from "@mui/material";
import { alpha } from "@mui/material/styles";
import React, { useState } from "react";

export default function SearchPagination({
  pagination,
  setPageNumber,
  paginationPageNumber,
  setPaginationPageNumber,
}) {
  // const [pageNumber, setPageNumber] = useState(1);

  const handleChange = (event, page) => {
    // console.log(page);
    setPageNumber(page);
    setPaginationPageNumber(page);
  };

  return (
    <Container>
      <Pagination
        size="large"
        siblingCount={0}
        count={pagination}
        defaultPage={0}
        page={paginationPageNumber}
        onChange={handleChange}
        sx={{
          p: 1,
          "& .MuiPaginationItem-root": {
            color: alpha("#FFFFFF", 1),
          },
          "& .MuiPagination-ul": {
            justifyContent: "center",
          },
        }}
      />
    </Container>
  );
}

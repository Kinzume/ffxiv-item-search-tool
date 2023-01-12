import { Container, Pagination } from "@mui/material";
import { alpha } from "@mui/material/styles";
import React, { useState } from "react";

export default function SearchPagination({ params, setParams, pagination }) {
  const handleChange = (event, page) => {
    const newParams = { ...params, page: page };
    setParams(newParams);
  };

  return (
    <Container>
      <Pagination
        size="large"
        siblingCount={3}
        count={pagination}
        defaultPage={0}
        page={params.page}
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

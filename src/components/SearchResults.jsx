import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";
import { alpha } from "@mui/material";

export default function SearchResults({
  results,
  noResults,
  loading,
  error,
  setId,
  handleClose,
}) {
  return (
    <Container>
      <List>
        {loading ? (
          <ListItem divider>
            <ListItemText>
              <Skeleton
                variant="text"
                sx={{ fontSize: "1.5rem" }}
              />
            </ListItemText>
            <Skeleton
              variant="rectangular"
              width={40}
              height={40}
              sx={{ marginLeft: "15px" }}
            />
          </ListItem>
        ) : error ? (
          <ListItem divider>
            <ListItemText primary={"Error, something went wrong"} />
          </ListItem>
        ) : noResults ? (
          <ListItem divider>
            <ListItemText primary={"No results, please try again"} />
          </ListItem>
        ) : (
          results?.Results?.map((item, index) => (
            <ListItem
              onClick={() => {
                setId(item?.ID);
                return handleClose();
              }}
              key={item?.ID}
              divider={index + 1 === results?.Results.length ? false : true}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor: alpha("#808080", 0.2),
                },
              }}
            >
              <ListItemText primary={item?.Name} />
              <img
                src={`https://xivapi.com${item?.Icon}`}
                alt={item?.Name}
              />
            </ListItem>
          ))
        )}
      </List>
    </Container>
  );
}

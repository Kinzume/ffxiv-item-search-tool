import { List, ListItem, ListItemText } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import Bravura from "../data/Bravura.json";
import React from "react";

const ItemDataList = styled(List)(({ theme }) => ({
  marginTop: "5rem",
}));

// Given a json response from XIVAPI, display data like name, description, etc
export default function ItemData() {
  return (
    <ItemDataList>
      <ListItem>
        <ListItemText
          primary="Name"
          secondary={Bravura?.Name}
        ></ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Description"
          secondary={Bravura?.Description}
        ></ListItemText>
      </ListItem>
    </ItemDataList>
  );
}

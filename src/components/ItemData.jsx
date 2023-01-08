import {
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import Bravura from "../data/Bravura.json";
import Head from "../data/Head.json";
import React from "react";

const ItemDataList = styled(List)(({ theme }) => ({
  marginTop: "5rem",
}));

function description(description) {
  return description === "" ? "(none)" : description;
}
function delay(delayMs) {
  return delayMs / 1000;
}
function autoAttack(damagePhys, delay) {
  if (damagePhys === 0 && delay === 0) return 0;
  return ((damagePhys / 3) * delay).toFixed(2);
}
function dps(damagePhys, delay) {
  if (damagePhys === 0 && delay === 0) return 0;
  return (damagePhys / delay).toFixed(2);
}

function createRow(name, data) {
  return { name, data };
}
function createRows(json) {
  const rows = [];
  rows.push(
    createRow("Name", json?.Name),
    createRow("Image", json?.IconHD),
    createRow("Description", description(json?.Description)),
    createRow("Requires", json?.ClassJobCategory?.Name),
    createRow("Level", json?.LevelEquip),
    createRow("Item Level", json?.LevelItem),
    createRow("Physical Damage", json?.DamagePhys),
    createRow("Magical Damage", json?.DamageMag),
    createRow(
      "Auto-attack",
      autoAttack(json?.DamagePhys, delay(json?.DelayMs))
    ),
    createRow("Delay", delay(json?.DelayMs)),
    createRow("DPS", dps(json?.DamagePhys, delay(json?.DelayMs))),
    createRow(json?.BaseParam0?.Name, json?.BaseParamValue0),
    createRow(json?.BaseParam1?.Name, json?.BaseParamValue1),
    createRow(json?.BaseParam2?.Name, json?.BaseParamValue2),
    createRow(json?.BaseParam3?.Name, json?.BaseParamValue3),
    createRow(json?.BaseParam4?.Name, json?.BaseParamValue4),
    createRow(json?.BaseParam5?.Name, json?.BaseParamValue5),
    createRow("CooldownS", json?.CooldownS),
    createRow("Defense", json?.DefensePhys),
    createRow("Magic Defense", json?.DefenseMag)
  );

  return rows;
}
function ItemTable({ rows }) {
  return (
    <TableContainer
      component={Paper}
      sx={{ marginY: "7rem", maxWidth: 650 }}
    >
      <Table aria-label="Item Data">
        <TableHead>
          <TableRow>
            <TableCell>Profile</TableCell>
            <TableCell>Information</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.name === undefined ? index : row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
              >
                {createCellName(row.name)}
              </TableCell>
              <TableCell>{createCellData(row.name, row.data)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
function Tables({ array }) {
  return array.map((table, index) => {
    return (
      <ItemTable
        rows={table}
        key={index}
      />
    );
  });
}

function createCellName(name) {
  return name === undefined ? "Undefined stat" : name;
}
function createCellData(name, data) {
  return name === "Image" ? (
    <img src={`https://xivapi.com${data}`} />
  ) : name === undefined ? (
    ""
  ) : (
    data
  );
}

// Given a json response from XIVAPI, display data like name, description, etc

// Technical notes:
// BaseParam2 is Tenacity for Arms and Vitality for Head
const array = [createRows(Bravura), createRows(Head)];
export default function ItemData() {
  return (
    <Container sx={{ display: "flex" }}>
      <Tables array={array} />
    </Container>
  );
}

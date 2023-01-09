import {
  Container,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";

function display(data) {
  return (data === "") | (data === undefined) ? "(none)" : data;
}
function delay(delayMs) {
  return delayMs === undefined ? "" : delayMs / 1000;
}
function autoAttack(damagePhys, delay) {
  if (damagePhys === 0 && delay === 0) return 0;
  return delay === "" ? "" : ((damagePhys / 3) * delay).toFixed(2);
}
function dps(damagePhys, delay) {
  if (damagePhys === 0 && delay === 0) return 0;
  return delay === "" ? "" : (damagePhys / delay).toFixed(2);
}
function createRow(name, data) {
  return { name, data };
}

function createRows(json) {
  const rows = [];
  rows.push(
    createRow("Name", json?.Name),
    createRow("Image", json?.IconHD),
    createRow("Description", display(json?.Description)),
    createRow("Requires", display(json?.ClassJobCategory?.Name)),
    createRow("Level", json?.LevelEquip),
    createRow("Item Level", json?.LevelItem),
    createRow("Physical Damage", json?.DamagePhys),
    createRow("Magical Damage", json?.DamageMag),
    createRow("Defense", json?.DefensePhys),
    createRow("Magic Defense", json?.DefenseMag),
    createRow(
      "Auto-attack",
      autoAttack(json?.DamagePhys, delay(json?.DelayMs))
    ),
    createRow("Delay (s)", delay(json?.DelayMs)),
    createRow("DPS", dps(json?.DamagePhys, delay(json?.DelayMs))),
    createRow(json?.BaseParam0?.Name, json?.BaseParamValue0),
    createRow(json?.BaseParam1?.Name, json?.BaseParamValue1),
    createRow(json?.BaseParam2?.Name, json?.BaseParamValue2),
    createRow(json?.BaseParam3?.Name, json?.BaseParamValue3),
    createRow(json?.BaseParam4?.Name, json?.BaseParamValue4),
    createRow(json?.BaseParam5?.Name, json?.BaseParamValue5),
    createRow("Cooldown (s)", json?.CooldownS)
  );

  return rows;
}

function ItemTable({ results, loading, error }) {
  const matchesDefaultLg = useMediaQuery("(min-width:1200px)");
  return (
    <TableContainer component={Paper}>
      <Table aria-label="Item Data">
        <TableHead>
          <TableRow>
            <TableCell sx={{ paddingLeft: matchesDefaultLg ? "5rem" : "1rem" }}>
              Data
            </TableCell>
            <TableCell align="center">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((row, index) => (
            <TableRow
              key={row.name === undefined ? index : row.name}
              sx={{
                backgroundColor: row.name === undefined ? "#ededed" : "white",
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{
                  width: "15rem",
                  height: row.name === "Image" ? "9rem" : "3rem",
                  paddingLeft: matchesDefaultLg ? "5rem" : "1rem",
                }}
              >
                {loading ? <Skeleton /> : createCellName(row.name)}
              </TableCell>
              <TableCell align="center">
                {loading ? <Skeleton /> : createCellData(row.name, row.data)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function createCellName(name) {
  return name;
}
function createCellData(name, data) {
  return name === "Image"
    ? data && <img src={`https://xivapi.com${data}`} />
    : name === undefined
    ? ""
    : data;
}

// Technical notes:
// BaseParam2 is Tenacity for Arms and Vitality for Head
// BaseParams may switch positions, e.g. BaseParam2 can switch from Spell Speed to Determination, etc

export default function ItemData({ item }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [results, setResults] = useState(createRows({}));

  useEffect(() => {
    if (item === null) return;

    setError(false);
    setLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      signal: signal,
    };
    fetch(`https://xivapi.com${item}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setResults(createRows(result));
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
  }, [item]);
  return (
    <Container sx={{ marginY: "7rem", maxWidth: 650 }}>
      <ItemTable
        results={results}
        loading={loading}
        error={error}
      />
    </Container>
  );
}

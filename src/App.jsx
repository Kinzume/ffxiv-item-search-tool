import { useState } from "react";
import "./App.css";
import ItemData from "./components/ItemData";
import ItemSearch from "./components/ItemSearch";

function App() {
  const [count, setCount] = useState(0);
  const [item, setItem] = useState(null);
  return (
    <>
      <ItemSearch setItem={setItem} />
      <ItemData item={item} />
    </>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import ItemSearch from "./components/ItemSearch";

function App() {
  const [count, setCount] = useState(0);
  const [id, setId] = useState(null);
  return <ItemSearch setId={setId} />;
}

export default App;

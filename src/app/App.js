import { Route, Routes } from "react-router-dom";
import Card from "./layout/Card.js";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/:action?" element={<Card />} />
      </Routes>
    </div>
  );
}

export default App;

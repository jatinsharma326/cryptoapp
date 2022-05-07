import "./App.css";
import Button from "@mui/material/Button";
import Navbar from "./components/Navbar";
import {
  CryptoCurrencies,
  CryptoDetails,
  Exchanges,
  HomePage,
  News,
} from "./components";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route
            path="/crypto-currencies"
            element={<CryptoCurrencies />}
          ></Route>
          <Route path="/crypto-details" element={<CryptoDetails />}></Route>
          <Route path="/exchanges" element={<Exchanges />}></Route>
          <Route path="/news" element={<News />}></Route>
        </Routes>
      </header>
    </div>
  );
}

export default App;

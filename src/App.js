import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Coin from "./components/Coin";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/coin/:id/" element={<Coin />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

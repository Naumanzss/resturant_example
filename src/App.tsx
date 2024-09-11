import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Events from "./screens/Events/Events";
import Footer from "./screens/Footer/Footer";
import AllMenu from "./screens/Menu/AllMenu";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<AllMenu />} />
            <Route path="/events" element={<Events />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
export default App;

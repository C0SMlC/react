import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home.jsx";
import AboutMe from "./components/AboutMe.jsx";
import AboutPratik from "./components/AboutPratik.jsx";
import AboutJack from "./components/AboutJack.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutMe />}>
          <Route path="pratik" element={<AboutPratik />} />
          <Route path="jack" element={<AboutJack />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

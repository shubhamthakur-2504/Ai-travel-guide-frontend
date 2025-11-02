import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import Plan from "./pages/Plan";
import Result from "./pages/Result";
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App

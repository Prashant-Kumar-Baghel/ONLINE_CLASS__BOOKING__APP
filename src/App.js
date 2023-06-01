import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClassBooking from "./Pages/classBooking";

function App() {
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<ClassBooking />} />
          <Route path="/cart" element={<div>Hello</div>} />
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;

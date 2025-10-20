import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactosContainer from "./components/ContactosContainer.jsx";
import AddContact from "./components/AddContact.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContactosContainer />} />
        <Route path="/contact" element={<ContactosContainer />} />
        <Route path="/addcontact" element={<AddContact />} />
        <Route path="/edit/:id" element={<AddContact />} />
      </Routes>
    </BrowserRouter>
  );
}

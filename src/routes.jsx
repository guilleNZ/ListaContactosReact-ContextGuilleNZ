import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Demo from "./pages/Demo";
import Single from "./pages/Single";
import ContactosContainer from "./components/ContactosContainer";
import AddContact from "./components/AddContact";

export default function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/single" element={<Single />} />

      {/* Contact app */}
      <Route path="/contact" element={<ContactosContainer />} />
      <Route path="/addcontact" element={<AddContact />} />
      <Route path="/addcontact/:id" element={<AddContact />} />
    </Routes>
  );
}
